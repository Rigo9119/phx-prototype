# Plan de Gestión de Configuración de Software — Proyecto Quimera

**Repositorio técnico:** `phx-prototype`
**Curso:** Gestión de Configuración y Mantenimiento de Software
**Programa:** Maestría en Ingeniería de Software, Facultad de Ingeniería
**Institución:** Universidad de La Sabana
**Profesor:** César Vega Fernández
**Autor:** Rigo Armando Rosero Castillo
**Fecha:** Agosto 2026

> **Nota de nomenclatura.** Por el acuerdo de anonimización establecido en el diagnóstico previo de esta serie de actividades (*Mantenimiento y Evolución del Software: Análisis de Quimera*, julio 2026), el sistema se referencia como **Quimera**. El nombre técnico interno del código fuente, tal como aparece en `package.json` y en el repositorio, es `phx-prototype`. Ambos nombres identifican el mismo sistema.

---

## Tabla de contenido

1. [Contexto y alcance](#1-contexto-y-alcance)
2. [Estándares de referencia](#2-estándares-de-referencia)
3. [Identificación de configuration items (CI)](#3-identificación-de-configuration-items-ci)
4. [Definición de baselines](#4-definición-de-baselines)
5. [Estrategia de control de cambios](#5-estrategia-de-control-de-cambios)
6. [Definición de trazabilidad](#6-definición-de-trazabilidad)
7. [Modelo de gestión de configuración propuesto](#7-modelo-de-gestión-de-configuración-propuesto)
8. [Puesta en marcha del prototipo](#8-puesta-en-marcha-del-prototipo)
9. [Referencias](#9-referencias)

---

## 1. Contexto y alcance

Quimera es una plataforma web que conecta dos tipos de usuario: un **cliente/dreamer** que propone un proyecto y solicita financiación, y un **inversionista** que evalúa y financia ese proyecto (le "presta" el dinero). Un tercer rol, **admin**, administra la plataforma y supervisa las transacciones. El diagnóstico previo identificó cinco servicios lógicos objetivo: `Login/Auth`, `Transactions`, `Proyect`, `User` y `Payments`.

El estado actual del repositorio corresponde exactamente a lo descrito en ese diagnóstico: **solo existe el frontend**, construido en Next.js 15 (App Router) + React 19 + TypeScript, con datos "quemados" en módulos de mock data (`data/mockdata/*`). No hay backend accesible ni persistencia real; el servicio `Login/Auth` no está implementado; no existen pruebas unitarias ni de integración. Esta es la causa raíz por la que este documento trata al frontend actual como una **base de partida auditable**, no como un sistema completo.

El objetivo de este documento es distinto al de la actividad anterior. El diagnóstico identificó *qué salió mal* (ambigüedad de alcance, rotación de equipo, cambios de stack sin gobierno, ausencia de documentación y de pruebas). Este documento propone el **mecanismo de gestión de configuración** que, de retomarse el proyecto, evita que esos mismos problemas se repitan: cómo se identifican y versionan los componentes (CI), cómo se congelan puntos de referencia estables (baselines), cómo se autoriza y registra cualquier cambio — incluyendo cambios de arquitectura o de stack, que fueron el origen de buena parte de la deuda técnica — y cómo se traza cada cambio hasta el requerimiento y el hallazgo que lo motiva.

---

## 2. Estándares de referencia

| Estándar | Uso en este documento |
|---|---|
| **IEEE 828-2012** — *Standard for Configuration Management in Systems and Software Engineering* | Estructura general del plan: identificación de CI, control de cambios, contabilización de estado (status accounting) y auditoría de configuración. |
| **ISO/IEC/IEEE 12207:2017** — *Software Life Cycle Processes* | Ubica la gestión de configuración como proceso de soporte transversal al ciclo de vida, coherente con el proceso de mantenimiento (ISO/IEC 14764) citado en el diagnóstico previo. |
| **Conventional Commits 1.0.0** | Convención de mensajes de commit usada para automatizar versionado semántico y generación de *changelog*. |
| **Semantic Versioning 2.0.0** | Esquema de versionado de baselines y paquetes. |

No se exigen normas APA por tratarse de un entregable en formato `README.md`, según lo indicado en la guía de la actividad.

---

## 3. Identificación de configuration items (CI)

Un **configuration item (CI)** es cualquier artefacto que se pone bajo control de configuración porque cambia de forma independiente y su versión debe poder reconstruirse en cualquier momento (IEEE 828-2012, §4). Se identificaron los CI reales del repositorio, agrupados por categoría, y se les asignó un identificador estable.

**Convención de nombres:** `CI-<CATEGORÍA>-<dominio>-<secuencial>`, donde `CATEGORÍA` ∈ `{SRC, CFG, DAT, DOC, INF}`.

### 3.1 CI de código fuente (SRC)

| ID | CI | Ruta | Dominio funcional | Responsable |
|---|---|---|---|---|
| CI-SRC-app-01 | Landing y enrutamiento de acceso | `app/page.tsx`, `app/layout.tsx` | Acceso / navegación | Rigo Rosero |
| CI-SRC-app-02 | Registro de usuario | `app/register/[userType]/page.tsx` | Servicio `User` | Rigo Rosero |
| CI-SRC-app-03 | Dashboard por tipo de usuario | `app/dashboard/[userType]/page.tsx` y `components/charts/*` | Servicio `Proyect`, `Payments` | Rigo Rosero |
| CI-SRC-app-04 | Panel de administración | `app/admin/page.tsx`, `app/admin/components/table/columns.tsx` | Servicio `Transactions` | Rigo Rosero |
| CI-SRC-cmp-01 | Formularios de dominio | `components/forms/**` | Servicios `User`, `Proyect` | Rigo Rosero |
| CI-SRC-cmp-02 | Tabla de datos genérica | `components/dataTable/dataTable.tsx` | Transversal | Rigo Rosero |
| CI-SRC-cmp-03 | Estados de cuenta | `components/statements/*` | Servicio `Payments` | Rigo Rosero |
| CI-SRC-cmp-04 | Sistema de diseño (UI primitives) | `components/ui/**` | Transversal | Rigo Rosero |
| CI-SRC-lib-01 | Contrato de tipos del dominio | `lib/types.ts` | Transversal | Rigo Rosero |
| CI-SRC-lib-02 | Constantes de dominio | `lib/constatns.ts`¹ | Transversal | Rigo Rosero |

¹ Nombre de archivo tal como existe en el repositorio; ver hallazgo de trazabilidad §6.

### 3.2 CI de datos (DAT)

Estos CI sustituyen temporalmente al servicio `Payments`/`Proyect`/`User`/`Transactions` mientras no existe backend. Se versionan igual que el código porque son la única fuente de verdad del comportamiento observable del prototipo.

| ID | CI | Ruta | Sustituye a |
|---|---|---|---|
| CI-DAT-users | Mock de usuarios | `data/mockdata/users.ts` | Servicio `User` |
| CI-DAT-statements | Mock de estados de cuenta | `data/mockdata/statements.ts` | Servicio `Payments` |
| CI-DAT-cuotas | Mock de cuotas | `data/mockdata/cuotas.ts` | Servicio `Payments` |
| CI-DAT-transactions | Mock de transacciones | `data/mockdata/transactions.ts` | Servicio `Transactions` |

### 3.3 CI de configuración y build (CFG)

| ID | CI | Ruta | Efecto si cambia |
|---|---|---|---|
| CI-CFG-pkg | Manifiesto y dependencias | `package.json`, `pnpm-lock.yaml` | Afecta reproducibilidad del build completo |
| CI-CFG-workspace | Topología del workspace pnpm | `pnpm-workspace.yaml` | Afecta resolución de paquetes; base para una futura separación en `apps/`/`packages/` |
| CI-CFG-ts | Compilador TypeScript | `tsconfig.json` | Afecta *strictness* y superficie de tipos válida |
| CI-CFG-next | Framework | `next.config.ts` | Afecta build/runtime de Next.js |
| CI-CFG-tw | Tema visual | `tailwind.config.ts`, `app/globals.css` | Afecta todo el sistema de diseño |
| CI-CFG-shadcn | Generador de componentes UI | `components.json` | Afecta convención de alias y estilo de componentes nuevos |
| CI-CFG-lint | Reglas de calidad estática | `eslint.config.mjs` | Afecta el gate de calidad en CI |

### 3.4 CI de documentación (DOC)

| ID | CI | Ruta | Naturaleza |
|---|---|---|---|
| CI-DOC-readme | Este documento (plan de SCM) | `README.md` | Editable manualmente |
| CI-DOC-diagnostico | Diagnóstico de mantenimiento previo | *externo* (Análisis de Quimera, jul. 2026) | Insumo, no versionado en este repo |
| CI-DOC-adr | Registro de decisiones de arquitectura (propuesto) | `docs/adr/*` | Ver §5.3 — a crear |
| CI-DOC-changelog | Historial de versiones | `CHANGELOG.md` (propuesto) | **Autogenerado**, nunca editado a mano |

### 3.5 CI de infraestructura (INF)

| ID | CI | Estado actual |
|---|---|---|
| CI-INF-repo | Repositorio Git (`github.com/Rigo9119/phx-prototype`) | Existe, rama única `main`, sin protección de rama |
| CI-INF-backend | Backend / base de datos (Supabase-Postgres, según diagnóstico) | **No existe en este repositorio** — deuda pendiente identificada en el diagnóstico |
| CI-INF-ci | Pipeline de integración continua | **No existe** — propuesto en §7 |

---

## 4. Definición de baselines

Una **baseline** es una fotografía formalmente revisada y congelada de un conjunto de CI que sirve de punto de partida estable para el trabajo siguiente y solo cambia mediante un procedimiento de control de cambios (IEEE 828-2012, §3.1.3). Se definen tres tipos, adaptados del ciclo clásico *functional / allocated / product baseline*:

| Tipo | Qué congela | Cuándo se establece |
|---|---|---|
| **Baseline funcional (FBL)** | Alcance y requerimientos acordados | Antes de iniciar desarrollo de un incremento |
| **Baseline asignada (ABL)** | Diseño/arquitectura de los CI que implementan la FBL | Al cerrar el diseño técnico del incremento |
| **Baseline de producto (PBL)** | Código + configuración + datos ya implementados y verificados | Al cerrar el incremento, etiquetada en Git |

### 4.1 Línea de tiempo de baselines de Quimera

```
BL-0.0                    BL-1.0 (ACTUAL)         BL-1.1          BL-1.2              BL-1.3           BL-2.0
Legado Ruby/Angular   →   Frontend MVP        →   Auth/Autoriz. → Backend real     →  Cobertura     →  Release
+ intento Supabase        (este repositorio)      (propuesta)     (Supabase/Postgres) de pruebas       candidate
No reproducible            commit 384d8dd                          (propuesta)         (propuesta)      (propuesta)
Solo referencia histórica  PBL congelada
```

| Baseline | Estado | Contenido | CI incluidos |
|---|---|---|---|
| **BL-0.0** — Legado | Histórico, no reproducible | Backend Ruby on Rails + frontend AngularJS, y el intento posterior con Supabase. Repos no accesibles según el diagnóstico. | N/A — solo se documenta como antecedente |
| **BL-1.0** — Frontend MVP (**baseline actual de este repositorio**) | **PBL vigente** | Todo lo listado en §3.1–§3.3, en el estado del commit `384d8dd` (rama `main`) | CI-SRC-*, CI-DAT-*, CI-CFG-* |
| **BL-1.1** — Autenticación y autorización | Propuesta | Implementación real del servicio `Login/Auth`, ausente hoy | CI-SRC-app-02 extendido, nuevo `lib/auth/*` |
| **BL-1.2** — Backend real | Propuesta | Reemplazo de CI-DAT-* por integraciones a Supabase/Postgres para `User`, `Proyect`, `Payments`, `Transactions` | CI-DAT-* migran a CI-SRC-*/CI-INF-backend |
| **BL-1.3** — Cobertura de pruebas | Propuesta | Suite de pruebas unitarias e integración (Jest + React Testing Library, mencionadas como intención en el diagnóstico pero nunca alcanzadas) | Nuevos CI `__tests__/*` |
| **BL-2.0** — Release candidate | Propuesta | Endurecimiento de seguridad, definición de términos legales (vacío señalado en el diagnóstico), pipeline de CI/CD activo | Todos los anteriores + CI-INF-ci |

**Regla de congelamiento:** cada baseline se marca con un *tag* de Git anotado (`git tag -a BL-1.0 -m "..."`) sobre el commit exacto que la compone. Ningún CI dentro de una baseline cerrada se modifica sin pasar por el procedimiento de la §5; el cambio da lugar a una baseline nueva, nunca a una edición retroactiva de la anterior.

---

## 5. Estrategia de control de cambios

El diagnóstico atribuye buena parte del fracaso del proyecto a cambios sin gobierno: migración de stack (Ruby→Supabase, AngularJS→React) decidida sin registro, pausas y reanudaciones del cliente sin re-alineación de alcance, y rotación de equipo sin traspaso documentado. La estrategia que sigue ataca directamente esas tres causas.

### 5.1 Flujo de una solicitud de cambio (Change Request)

```
 1. Solicitud de cambio (CR)
        │
        ▼
 2. ¿Afecta arquitectura o stack tecnológico?
        │                              │
       Sí                              No
        │                              │
        ▼                              │
 3. Redactar ADR                       │
    (docs/adr/NNNN-titulo.md)          │
        │                              │
        ▼                              │
 4. Revisión CCB                       │
        │                              │
   ┌────┴────┐                         │
 Rechazado  Aprobado                   │
   │           │                       │
   ▼           └──────────┬────────────┘
 CR cerrada                ▼
 (rechazada)     5. Branch de feature
                  (feat/CR-ID-descripcion)
                            │
                            ▼
                  6. Pull Request
                  (commits Conventional Commits)
                            │
                            ▼
                  7. Checks automáticos
                  (lint + build + tests)
                            │
                     ┌──────┴──────┐
                   Falla          Pasa
                     │              │
                     │              ▼
                     │      8. Revisión de código
                     │              │
                     │      ┌───────┴───────┐
                     │  Cambios         Aprobado
                     │ solicitados          │
                     │      │               ▼
                     └──────┘      9. Merge a main
                                            │
                                            ▼
                              10. ¿Cierra un incremento de baseline?
                                    │                  │
                                   Sí                  No
                                    │                  │
                                    ▼                  ▼
                     11. Tag de nueva baseline   Queda en main
                         (BL-x.y)                (sin tag de baseline)
```

### 5.2 Plantilla de Change Request (CR)

Toda modificación a un CI bajo control — incluida la actual `main` — se registra como un *issue* de GitHub con esta plantilla mínima:

```
CR-ID:            CR-<secuencial>
Título:
Solicitante:
CI afectados:      (IDs de la §3, ej. CI-SRC-app-03, CI-DAT-statements)
Tipo de cambio:     [ ] Correctivo  [ ] Adaptativo  [ ] Perfectivo  [ ] Preventivo
                     (categorías consistentes con el diagnóstico previo)
¿Cambia arquitectura o stack?  [ ] Sí (requiere ADR)   [ ] No
Justificación:
Impacto / riesgo:
Baseline de origen:
Baseline destino (si aplica):
```

### 5.3 Comité de Control de Cambios (CCB) y ADR

Con un equipo de un solo desarrollador — la misma condición que, sin gobierno, causó los cambios de stack no documentados del proyecto original — el CCB se mantiene como **rol formal aunque sea ejercido por la misma persona**: antes de aprobar un CR que toca arquitectura o tecnología, el autor debe producir un **Architecture Decision Record (ADR)** en `docs/adr/`, con el formato estándar (contexto, decisión, alternativas consideradas, consecuencias). Esto es exactamente lo que faltó al pasar de Ruby/Angular a Supabase/React: ninguna decisión quedó registrada, por lo que ningún equipo posterior pudo entender el porqué. El ADR es en sí mismo un CI (CI-DOC-adr, §3.4) y queda bajo el mismo control de versiones que el código.

Si el equipo crece, el CCB se formaliza como los roles de `CODEOWNERS` de GitHub sobre las rutas de la §3, sin cambiar el procedimiento.

### 5.4 Estrategia de ramas y versionado

- **Modelo de ramas:** *trunk-based* con ramas de vida corta `feat/`, `fix/`, `chore/`, nombradas `<tipo>/CR-<id>-<slug>`. `main` permanece siempre desplegable.
- **Mensajes de commit:** Conventional Commits (`feat:`, `fix:`, `refactor:`, `chore:`, `docs:`), lo que permite generar automáticamente el CI-DOC-changelog — nunca editado a mano, conforme a la convención de que los artefactos autogenerados no se tocan manualmente.
- **Versionado:** SemVer (`MAJOR.MINOR.PATCH`) por baseline de producto; un `MAJOR` solo se incrementa en un cambio de BL con ruptura de compatibilidad (p. ej. BL-1.x → BL-2.0).
- **Protección de rama:** `main` requiere PR con al menos un check de CI en verde (lint + build; tests cuando exista BL-1.3) antes de merge, incluso en solitario, para dejar rastro auditable — el rastro que el diagnóstico señala como ausente en el proyecto original.

---

## 6. Definición de trazabilidad

La trazabilidad conecta cada CI con el requerimiento/hallazgo que lo origina, la baseline a la que pertenece y el mecanismo de verificación aplicable. Esto responde directamente al problema que el diagnóstico marca como raíz: *"sin unos requerimientos claros los avances... no mostraban el progreso que el proyecto de verdad requería."* Sin una matriz de trazabilidad, no hay forma de confirmar que un cambio efectivamente cierra el hallazgo que lo motivó.

### 6.1 Matriz de trazabilidad (extracto representativo)

| Hallazgo / requerimiento origen | CI que lo implementa | Baseline | Verificación |
|---|---|---|---|
| Servicio `User` (registro de inversionista/dreamer) | CI-SRC-app-02, CI-DAT-users | BL-1.0 | Verificación manual de flujo (sin backend aún) |
| Servicio `Proyect` (creación de solicitud de financiación) | `components/forms/createProyectForm`, `components/sheets/createProyectSheet` | BL-1.0 | Verificación manual |
| Servicio `Payments` (cuotas y estados de cuenta) | CI-SRC-app-03, CI-SRC-cmp-03, CI-DAT-statements, CI-DAT-cuotas | BL-1.0 | Verificación manual |
| Servicio `Transactions` (panel admin) | CI-SRC-app-04, CI-DAT-transactions | BL-1.0 | Verificación manual |
| Servicio `Login/Auth` (no implementado — deuda técnica confirmada en el diagnóstico) | *pendiente* | BL-1.1 (propuesta) | Pruebas de integración de sesión, a definir en BL-1.3 |
| Mantenimiento preventivo: falta de validación de formularios (ejemplo citado en el diagnóstico) | `components/forms/components/inputField`, uso de `@tanstack/react-form` + `zod` | BL-1.0 | Revisión de código; falta prueba automatizada — brecha abierta |
| Falta de pruebas unitarias/integración (hallazgo central del diagnóstico) | *no existe CI de pruebas hoy* | BL-1.3 (propuesta) | Cobertura mínima a definir por CCB |
| Ausencia de documentación técnica que "diera visión del proyecto" (hallazgo del diagnóstico) | CI-DOC-readme (este documento), CI-DOC-adr (propuesto) | BL-1.0 en adelante | Revisión de CCB en cada CR de arquitectura |
| Cambios de stack sin gobierno (Ruby→Supabase, Angular→React) | CI-DOC-adr obligatorio para CR de arquitectura (§5.3) | A partir de BL-1.1 | Ningún CR de arquitectura se aprueba sin ADR |

### 6.2 Mecanismo de trazabilidad hacia adelante

Cada commit referencia su `CR-ID` en el pie del mensaje (`Refs: CR-014`), y cada Pull Request enlaza el *issue* de la CR. Esto permite reconstruir, para cualquier CI, la cadena completa: **requerimiento → CR → ADR (si aplica) → commits → baseline → verificación**, sin depender de memoria institucional — precisamente lo que la rotación de equipo destruyó en el proyecto original.

### 6.3 Hallazgo de higiene menor

Durante la identificación de CI se encontró que `lib/constatns.ts` (CI-SRC-lib-02) tiene un error tipográfico en el nombre de archivo (`constatns` en vez de `constants`) y que `data/mockdata/users.ts` usa la llave `npiType`, mientras `lib/types.ts` declara el campo como `npyType` en el tipo `User`. Se documentan aquí como hallazgos de trazabilidad de datos — no se corrigen en este entregable para no invalidar la baseline BL-1.0 fuera de un CR formal, conforme a la propia estrategia de control de cambios definida en la §5.

---

## 7. Modelo de gestión de configuración propuesto

### 7.1 Componentes del modelo

```
 Fuentes de cambio
 ┌───────────────────────────┬───────────────────┬──────────────────────────────┐
 │ Requerimiento de negocio  │ Defecto reportado  │ Necesidad de evolución técnica│
 └─────────────┬─────────────┴─────────┬──────────┴───────────────┬────────────┘
               └───────────────────────┼──────────────────────────┘
                                        ▼
                              1. Change Request
                                        │
                                        ▼
                              2. ¿CCB aprueba?
                          ┌─────────────┴─────────────┐
                        Rechaza                     Aprueba
                          │                             │
                          ▼                             ▼
                    CR cerrada              3. Desarrollo en rama
                                                (sobre BL vigente)
                                                        │
                                                        ▼
                                          4. Pipeline CI (lint + build + test)
                                                        │
                                              ┌─────────┴─────────┐
                                            Falla                Pasa
                                              │                    │
                                              │                    ▼
                                              │          5. Revisión de código
                                              │                    │
                                              └────────────────────┤
                                                                    ▼
                                                          6. Merge a main
                                                                    │
                                                                    ▼
                                          7. Status accounting
                                             (actualiza matriz de trazabilidad)
                                                                    │
                                                                    ▼
                                          8. ¿Cierra un incremento?
                                        ┌─────────────┴─────────────┐
                                       Sí                            No
                                        │                             │
                                        ▼                             ▼
                          9. Nueva baseline                 Permanece en main
                             (etiquetada BL-x.y)
                                        │
                                        ▼
                          10. Auditoría de configuración
                              (BL vs. CI declarados)
```

### 7.2 Herramientas propuestas

| Función | Herramienta | Justificación |
|---|---|---|
| Control de versiones | Git + GitHub | Ya en uso; historial existente es la fuente primaria de auditoría |
| Gestión de CR | GitHub Issues + Projects | Sin costo adicional; se integra con PR mediante referencias cruzadas |
| Integración continua | GitHub Actions | Ejecuta lint (`eslint.config.mjs`), build (`next build`) y, desde BL-1.3, tests, en cada PR |
| Versionado y changelog | Conventional Commits + `semantic-release` o `changesets` | Genera CI-DOC-changelog automáticamente; elimina edición manual, fuente histórica de inconsistencia |
| Gestión de paquetes/monorepo | pnpm workspaces (`pnpm-workspace.yaml`, ya presente) | Preparado para separar en el futuro `apps/web` de paquetes compartidos si el backend se incorpora al mismo repositorio |
| Registro de decisiones | ADR en `docs/adr/` (Markdown, sin herramienta externa) | Bajo costo, versionado junto al código, resuelve directamente el vacío de documentación señalado en el diagnóstico |

### 7.3 Roles y responsabilidades

| Rol | Responsabilidad | Titular actual |
|---|---|---|
| Configuration Manager (CM) | Mantiene la lista de CI (§3), etiqueta baselines, ejecuta auditorías de configuración | Rigo Rosero |
| Change Control Board (CCB) | Aprueba/rechaza CR, exige ADR en cambios de arquitectura | Rigo Rosero (rol formal, aunque unipersonal) |
| Desarrollador | Implementa CR aprobadas, sigue convención de ramas y commits | Rigo Rosero |
| QA / Verificación | Ejecuta y valida checks de CI, valida trazabilidad antes de cerrar CR | Pendiente de asignar a partir de BL-1.3 |

La separación explícita de roles — incluso ejercidos por la misma persona — es deliberada: el diagnóstico atribuye parte del caos organizacional a que nadie tenía un rol claramente definido de gobierno técnico, lo que permitió que decisiones de arquitectura se tomaran de forma ad hoc.

### 7.4 Auditoría de configuración

En cada cierre de baseline, el CM verifica que:

1. Todo CI listado en la baseline corresponde a un commit real en el tag correspondiente (integridad).
2. Toda CR asociada a la baseline está cerrada y trazada (§6).
3. Todo cambio de arquitectura o stack incluido tiene su ADR correspondiente (§5.3).

Esta auditoría es el control que impide que se repita el patrón del proyecto original: llegar a una nueva etapa del desarrollo sin poder reconstruir qué se decidió y por qué.

---

## 8. Puesta en marcha del prototipo

Instrucciones funcionales del CI actual (BL-1.0), conservadas del README original del proyecto:

```bash
pnpm install
pnpm dev
```

Abrir [http://localhost:3000](http://localhost:3000). El punto de entrada de la UI es `app/page.tsx`; el dashboard por tipo de usuario vive en `app/dashboard/[userType]/page.tsx`.

---

## 9. Referencias

- IEEE. (2012). *IEEE Std 828-2012 — IEEE Standard for Configuration Management in Systems and Software Engineering*. IEEE.
- ISO/IEC/IEEE. (2017). *ISO/IEC/IEEE 12207:2017 — Systems and software engineering — Software life cycle processes*. ISO.
- International Organization for Standardization. (2006). *ISO/IEC 14764:2006. Software Engineering — Software Life Cycle Processes — Maintenance*. ISO.
- Conventional Commits. (s.f.). *Conventional Commits 1.0.0*. https://www.conventionalcommits.org
- Preston-Werner, T. (2013). *Semantic Versioning 2.0.0*. https://semver.org
- Rosero Castillo, R. A. (2026). *Mantenimiento y Evolución del Software: Análisis de Quimera*. Universidad de La Sabana, Maestría en Ingeniería de Software.
