"use client";
import type { Proyect } from "@/lib/types";
import type { ColumnDef } from "@tanstack/react-table";

export const transactionsColumns: ColumnDef<Proyect>[] = [
  {
    accessorKey: "transactionId",
    header: "Numero",
  },
  {
    accessorKey: "debtor",
    header: "Deudor",
  },
  {
    accessorKey: "creditor",
    header: "Acreedor",
  },
  {
    accessorKey: "createdAt",
    header: "Creado ",
  },
  {
    accessorKey: "createdBy",
    header: "Creado por",
  },
  {
    accessorKey: "capital",
    header: "Capital",
  },
  {
    accessorKey: "paymentFee",
    header: "Cuota",
  },
  {
    accessorKey: "description",
    header: "Descripción",
  },
  {
    accessorKey: "disbursement",
    header: "Desembolso",
  },
  {
    accessorKey: "finishDate",
    header: "Termina en",
  },
  {
    accessorKey: "warranty",
    header: "Garantia",
  },
  {
    accessorKey: "interestNMV",
    header: "Interes N.M.V",
  },
  {
    accessorKey: "promissoryNote",
    header: "Pagaré",
  },
  {
    accessorKey: "installment",
    header: "Plazo (meses)",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
];
