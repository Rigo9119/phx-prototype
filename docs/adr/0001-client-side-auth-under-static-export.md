# ADR-0001: Autenticación del lado del cliente bajo static export

**Estado:** Aceptada
**Fecha:** 2026-08-25
**CR relacionada:** CR-003
**CI afectados:** `CI-SRC-lib-04` (`lib/auth/*`), `CI-DAT-credentials`

## Contexto

BL-1.1 (README §4.1) exige implementar el servicio `Login/Auth`, ausente desde el diagnóstico original. `next.config.ts` fija `output: "export"` de forma incondicional (`CI-INF-ci`, CR-001): el sitio se publica como HTML estático en GitHub Pages, sin runtime de servidor en tiempo de petición.

Esa restricción descarta la forma habitual de proteger rutas en Next.js: **Next.js Middleware no se ejecuta bajo `output: "export"`**. Un `middleware.ts` en este repositorio quedaría silenciosamente inerte o rompería el build — no es una opción, no un trade-off a evaluar.

Tampoco existe un backend real (README §1: "solo existe el frontend"). Los usuarios mock en `data/mockdata/users.ts` no tienen contraseña ni ningún campo de credencial.

## Decisión

1. **Estado de sesión en un React Context** (`lib/auth/authContext.tsx`), persistido en `localStorage`, no en cookies ni en un store de servidor.
2. **Guardado de rutas del lado del cliente** (`components/auth/routeGuard/routeGuard.tsx`): un componente cliente que se monta dentro de los layouts existentes de `/dashboard/[userType]` y `/admin` (que permanecen como server components — el guard es una hoja cliente, no requiere convertir el layout completo), verifica el estado resuelto por `AuthProvider` y redirige con `router.replace` si la ruta protegida no es accesible para la sesión actual.
3. **`status` de auth arranca en `"idle"`**, nunca se lee `localStorage` de forma anticipada en `useState`: el HTML pre-renderizado del export estático no tiene acceso a `localStorage`, así que una lectura eager desincronizaría el marcado servidor/cliente y produciría un *hydration mismatch*. El estado real solo se resuelve dentro de un `useEffect` posterior al montaje.
4. **Credenciales mock en un archivo separado** (`data/mockdata/credentials.ts`, `CI-DAT-credentials`), no como campo adicional en `data/mockdata/users.ts`. `users.ts` cumple el rol del servicio `User` (`CI-DAT-users`); las credenciales pertenecen conceptualmente al servicio `Login/Auth`, distinto en el listado de servicios de §1. Contraseñas en texto plano — simplificación deliberada de prototipo, no un descuido.
5. **Dos vocabularios de "tipo de usuario" se mantienen separados, no se unifican**: `USER_TYPES` (`client`/`investor`, `lib/constatns.ts`) sigue siendo un concepto de enrutamiento; el rol de sesión (`creditor`/`debtor`/`admin`, `lib/auth/authContext.tsx`) sigue el vocabulario de dominio de `lib/types.ts`. El único punto de contacto es `lib/auth/roleToRouteSegment.ts`, usado solo para calcular el destino de redirección tras login/registro.

## Alternativas consideradas

- **Next.js Middleware** — rechazada: incompatible con `output: "export"`, no es un trade-off sino una imposibilidad técnica bajo la configuración actual del proyecto.
- **Backend real con sesiones de servidor** (Supabase/Postgres, según el diagnóstico previo) — es la solución correcta a largo plazo, pero corresponde a **BL-1.2** (README §4.1), fuera del alcance de este CR. Esta ADR documenta una solución intermedia explícitamente temporal, no una alternativa descartada por preferencia.
- **Unificar `USER_TYPES` y `UserType` en un solo vocabulario** — rechazada para este CR: es un cambio de mayor alcance que afecta rutas existentes (`/dashboard/[userType]`, `/register/[userType]`) y datos mock ya poblados; se documenta como hallazgo abierto en la matriz de trazabilidad (§6.1), no se resuelve silenciamente como efecto colateral de la autenticación.

## Consecuencias

- El HTML pre-renderizado de una ruta protegida es brevemente visible antes de que el guard del cliente redirija — limitación inherente a esta aproximación bajo static export, no un defecto a corregir; queda documentada aquí para que no se "redescubra" como bug.
- Los usuarios registrados durante una sesión solo existen en `localStorage`: no se persisten en `data/mockdata/users.ts` (no hay backend al cual escribir). Se pierden si el usuario limpia el almacenamiento local o cambia de navegador.
- Las contraseñas mock en texto plano son aceptables únicamente mientras no exista BL-1.2; cualquier reutilización de este mecanismo de credenciales más allá del prototipo requiere reemplazo antes de considerarse segura.
- La superficie de `lib/auth/*` queda lista para ser reemplazada por integraciones reales (Supabase Auth u otra) en BL-1.2 sin requerir cambios en `RouteGuard` ni en los componentes que consumen `useAuth()`, siempre que la forma de `AuthContextValue` se preserve.
