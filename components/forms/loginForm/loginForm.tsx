"use client";
import { useEffect, useState } from "react";
import { useForm } from "@tanstack/react-form";
import InputField from "../components/inputField/inputField";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { loginSchema } from "@/lib/schemas/auth.schema";
import { getFieldError } from "../utils/getFieldError";
import { useAuth } from "@/lib/auth/authContext";
import { roleToRoutePath } from "@/lib/auth/roleToRouteSegment";

export function LoginForm() {
  const router = useRouter();
  const { login, user } = useAuth();
  const [formError, setFormError] = useState<string | undefined>(undefined);
  const [loginSucceeded, setLoginSucceeded] = useState(false);

  // `login()` only resolves { ok: true } on success (no user payload, per
  // the AuthContext contract) and updates context state asynchronously, so
  // the redirect waits for `user` to actually reflect in this render.
  useEffect(() => {
    if (loginSucceeded && user) {
      router.push(roleToRoutePath(user.role));
    }
  }, [loginSucceeded, user, router]);

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    onSubmit: async ({ value }) => {
      setFormError(undefined);
      const result = await login(value.email, value.password);

      if (!result.ok) {
        setFormError(result.error);
        return;
      }

      setLoginSucceeded(true);
    },
  });

  return (
    <div className="flex flex-col items-center justify-center">
      <h2 className="font-semibold text-xl mb-4">Inicia sesion</h2>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          event.stopPropagation();
          form.handleSubmit();
        }}
      >
        <form.Field name="email" validators={{ onChange: loginSchema.shape.email }}>
          {(field) => {
            return (
              <InputField
                label="Correo electronico"
                name={field.name}
                type="email"
                placeholder="Correo electronico"
                value={field.state.value}
                onChange={(event) => field.handleChange(event.target.value)}
                error={getFieldError(field)}
              />
            );
          }}
        </form.Field>
        <form.Field name="password" validators={{ onChange: loginSchema.shape.password }}>
          {(field) => {
            return (
              <InputField
                label="Contrasena"
                name={field.name}
                type="password"
                placeholder="Contrasena"
                value={field.state.value}
                onChange={(event) => field.handleChange(event.target.value)}
                error={getFieldError(field)}
              />
            );
          }}
        </form.Field>
        {formError && <p className="text-red-500 text-sm">{formError}</p>}
        <form.Subscribe selector={(state) => [state.canSubmit, state.isSubmitting]}>
          {([canSubmit, isSubmitting]) => (
            <Button type="submit" disabled={!canSubmit} className="w-full mt-4">
              {isSubmitting ? "..." : "Ingresar"}
            </Button>
          )}
        </form.Subscribe>
      </form>
    </div>
  );
}
