import { z } from "zod";

export const userSchema = z.object({
  name: z.string().min(1, "El nombre es requerido"),
  lastName: z.string().min(1, "El apellido es requerido"),
  npi: z
    .string()
    .min(1, "La cedula es requerida")
    .regex(/^\d+$/, "La cedula debe contener solo numeros"),
  npiType: z.string().min(1, "El tipo de documento es requerido"),
  email: z.string().email("Correo electronico invalido"),
  cellphone: z
    .string()
    .min(7, "El celular debe tener al menos 7 digitos")
    .regex(/^\d+$/, "El celular debe contener solo numeros"),
  address: z.string().min(1, "La direccion es requerida"),
  city: z.string().min(1, "La ciudad es requerida"),
  dateOfBirth: z.date({
    required_error: "La fecha de nacimiento es requerida",
    invalid_type_error: "La fecha de nacimiento es invalida",
  }),
  file: z
    .instanceof(File, { message: "Debe seleccionar un archivo" })
    .nullable()
    .refine((file) => file !== null, "Debe seleccionar un archivo"),
  userType: z.string().min(1, "El tipo de usuario es requerido"),
});

export type UserFormValues = z.infer<typeof userSchema>;
