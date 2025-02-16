import type { Statement } from "@/lib/types";
import type { ColumnDef } from "@tanstack/react-table";

export const statementsCols: ColumnDef<Statement>[] = [
  {
    accessorKey: "investor",
    header: "Inversionista",
  },
  {
    accessorKey: "period",
    header: "Period",
  },
  {
    accessorKey: "dueDate",
    header: "Fecha de corte",
  },
  {
    accessorKey: "paymentDate",
    header: "Fecha de pago",
  },
  {
    accessorKey: "daysInDebt",
    header: "Mora",
  },
  {
    accessorKey: "interest",
    header: "Interes",
  },
  {
    accessorKey: "capitalPayment",
    header: "Abono a K",
  },
  {
    accessorKey: "paymentFee",
    header: "Cuota",
  },
  {
    accessorKey: "balance",
    header: "Balance",
  },
  {
    accessorKey: "interestRate",
    header: "Tasa",
  },
  {
    accessorKey: "proyectId",
    header: "Id de proyecto",
  },
]