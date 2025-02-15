
import type { PaymentFee } from "@/lib/types";
import type { ColumnDef } from "@tanstack/react-table";

export const paymentFeeColumns: ColumnDef<PaymentFee>[]= [
  {
    accessorKey: "paymentDate",
    header: "Fecha",
  },
  {
    accessorKey: "paymentFee",
    header: "Cuota",
  },
  {
    accessorKey: "daysInDebt",
    header: "Mora",
  },
  {
    accessorKey: "creditor",
    header: "Acreedor",
  },
  {
    accessorKey: "bank",
    header: "Banco",
  },  
  {
    accessorKey: "bankAcountType",
    header: "Tipo de cuenta",
  },
  {
    accessorKey: "bankAccountId",
    header: "Numero de cuenta",
  },
  {
    accessorKey: "proyectId",
    header: "ID de proyecto",
  },
]