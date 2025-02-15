"use client";
import { useForm } from "@tanstack/react-form";
import InputField from "../components/inputField/inputField";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { DatePicker } from "../components/datePicker/datePicker";
import { FileInput } from "../components/fileInput/fileInput";
import { useRouter } from "next/navigation";

interface RegisterFormProps {
  userType: string;
}
export function RegisterForm({ userType }: RegisterFormProps) {
  const router = useRouter()
  const form = useForm({
    defaultValues: {
      name: "",
      lastName: "",
      npi: "",
      npyType: "C.C",
      email: "",
      cellphone: "",
      address: "",
      city: "",
      dateOfBirth: "",
      file: "",
      userType: userType,
    },
    onSubmit: async ({ value }) => {
      console.log('register form data: ', value)
      router.push(`/dashboard/${userType}`)
    }
  });

  const [dateOfBirth, setDateOfBirth] = useState<Date>(new Date());

  return (
    <div className="flex flex-col items-center justify-center">
      <h2 className="font-semibold text-xl mb-4">
        Registrate como {userType === "client" ? "cliente" : "inversionista"}
      </h2>
      <form onSubmit={(event) => {
        event.preventDefault()
        event.stopPropagation()
        form.handleSubmit()
      }}>
        <div>
          <form.Field name="name">
            {(field) => {
              return (
                <InputField
                  label="Nombre"
                  name={field.name}
                  type="text"
                  placeholder="Nombre"
                  value={field.state.value}
                  onChange={(event) => field.handleChange(event.target.value)}
                />
              );
            }}
          </form.Field>
          <form.Field name="lastName">
            {(field) => {
              return (
                <InputField
                  label="Apellido"
                  name={field.name}
                  type="text"
                  placeholder="Apellido"
                  value={field.state.value}
                  onChange={(event) => field.handleChange(event.target.value)}
                />
              );
            }}
          </form.Field>
        </div>
        <form.Field name="npi">
          {(field) => {
            return (
              <InputField
                label="Cedula"
                name={field.name}
                type="number"
                placeholder="Cedula"
                value={field.state.value}
                onChange={(event) => field.handleChange(event.target.value)}
              />
            );
          }}
        </form.Field>
        <form.Field name="email">
          {(field) => {
            return (
              <InputField
                label="Correo electronico"
                name={field.name}
                type="email"
                placeholder="Correo electronico"
                value={field.state.value}
                onChange={(event) => field.handleChange(event.target.value)}
              />
            );
          }}
        </form.Field>
        <form.Field name="cellphone">
          {(field) => {
            return (
              <InputField
                label="Celular"
                name={field.name}
                type="text"
                placeholder="Celular"
                value={field.state.value}
                onChange={(event) => field.handleChange(event.target.value)}
              />
            );
          }}
        </form.Field>
        <form.Field name="address">
          {(field) => {
            return (
              <InputField
                label="Dirección"
                name={field.name}
                type="text"
                placeholder="Dirección"
                value={field.state.value}
                onChange={(event) => field.handleChange(event.target.value)}
              />
            );
          }}
        </form.Field>
        <form.Field name="city">
          {(field) => {
            return (
              <InputField
                label="Ciudad"
                name={field.name}
                type="text"
                placeholder="Ciudad"
                value={field.state.value}
                onChange={(event) => field.handleChange(event.target.value)}
              />
            );
          }}
        </form.Field>
        <form.Field name="dateOfBirth">
          {() => {
            return (
              <DatePicker
                label="Fecha de nacimiento"
                date={dateOfBirth}
                setDate={setDateOfBirth}
              />
            );
          }}
        </form.Field>
        <form.Field name="file">
          {() => (
          <FileInput
            label={""}
            name={""}
            onChange={(file: File | null): void => {
              if (file) {
                console.log("File selected: ", file);
              } else {
                console.log("No file selected.");
              }
            }}
          />
          )}
        </form.Field>
        <form.Subscribe
          selector={(state) => [state.canSubmit, state.isSubmitting]}
        >
          {([canSubmit, isSubmitting]) => (
            <Button type="submit" disabled={!canSubmit} className="w-full mt-4">
              {isSubmitting ? "..." : "Enviar"}
            </Button>
          )}
        </form.Subscribe>
      </form>
    </div>
  );
}
