import { z } from "zod";

const numericString = (message: string) =>
  z
    .string()
    .min(1, message)
    .regex(/^\d+(\.\d+)?$/, message);

export const proyectSchema = z.object({
  id: z.string(),
  transactionId: z.string().min(1, "El ID del proyecto es requerido"),
  debtor: z.string().min(1, "El deudor es requerido"),
  creditor: z.string().min(1, "El acreedor es requerido"),
  createdAt: z.string(),
  createdBy: z.string(),
  capital: numericString("El capital debe ser un valor numerico"),
  paymentFee: numericString("La cuota debe ser un valor numerico"),
  description: z.string().min(1, "La descripcion es requerida"),
  disbursement: z.string().min(1, "El desembolso es requerido"),
  finishDate: z.string().min(1, "La fecha final es requerida"),
  warranty: z.string().min(1, "La garantia es requerida"),
  interestNMV: numericString("El interes N.M.V debe ser un valor numerico"),
  promissoryNote: z.string().min(1, "El pagare es requerido"),
  installment: numericString("El plazo debe ser un valor numerico"),
  status: z.string().min(1, "Debe seleccionar un estado"),
});

export type ProyectFormValues = z.infer<typeof proyectSchema>;
