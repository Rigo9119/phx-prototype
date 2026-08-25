"use client"
import { useForm } from "@tanstack/react-form";
import InputField from "../components/inputField/inputField";
import SelectInput from "../components/selectInput/selectInput";
import { Button } from "@/components/ui/button";
import { proyectSchema } from "@/lib/schemas/proyect.schema";
import { getFieldError } from "../utils/getFieldError";

export default function CreateTransactionForm() {
  const form = useForm({
    defaultValues: {
      id: "",
      transactionId: "",
      debtor: "",
      creditor: "",
      createdAt: "",
      createdBy: "",
      capital: "",
      paymentFee: "",
      description: "",
      disbursement: "",
      finishDate: "",
      warranty: "",
      interestNMV: "",
      promissoryNote: "",
      installment: "",
      status: "",
    },
    onSubmit: async ({ value }) => {
      console.log("create transaction: ", value);
    },
  });
  return (
    <form
      className="flex flex-col items-center justify-between gap-2 w-full"
      onSubmit={(event) => {
        event.preventDefault();
        event.stopPropagation();
        form.handleSubmit();
      }}
    >
      <form.Field name="transactionId" validators={{ onChange: proyectSchema.shape.transactionId }}>
        {(field) => {
          return (
            <InputField
              name={field.name}
              type="text"
              label="ID del proyecto"
              placeholder="ID del proyecto"
              value={field.state.value}
              onChange={(event) => field.handleChange(event.target.value)}
              error={getFieldError(field)}
            />
          );
        }}
      </form.Field>
      <form.Field name="debtor" validators={{ onChange: proyectSchema.shape.debtor }}>
        {(field) => {
          return (
            <InputField
              name={field.name}
              type="text"
              label="Deudor"
              placeholder="Deudor"
              value={field.state.value}
              onChange={(event) => field.handleChange(event.target.value)}
              error={getFieldError(field)}
            />
          );
        }}
      </form.Field>
      <form.Field name="creditor" validators={{ onChange: proyectSchema.shape.creditor }}>
        {(field) => {
          return (
            <InputField
              name={field.name}
              type="text"
              label="Acreedor"
              placeholder="Acreedor"
              value={field.state.value}
              onChange={(event) => field.handleChange(event.target.value)}
              error={getFieldError(field)}
            />
          );
        }}
      </form.Field>
      <form.Field name="capital" validators={{ onChange: proyectSchema.shape.capital }}>
        {(field) => {
          return (
            <InputField
              name={field.name}
              type="text"
              label="Capital"
              placeholder="Capital"
              value={field.state.value}
              onChange={(event) => field.handleChange(event.target.value)}
              error={getFieldError(field)}
            />
          );
        }}
      </form.Field>
      <form.Field name="paymentFee" validators={{ onChange: proyectSchema.shape.paymentFee }}>
        {(field) => {
          return (
            <InputField
              name={field.name}
              type="text"
              label="Cuota"
              placeholder="Cuota"
              value={field.state.value}
              onChange={(event) => field.handleChange(event.target.value)}
              error={getFieldError(field)}
            />
          );
        }}
      </form.Field>
      <form.Field name="description" validators={{ onChange: proyectSchema.shape.description }}>
        {(field) => {
          return (
            <InputField
              name={field.name}
              type="text"
              label="Descripción"
              placeholder="Descripción"
              value={field.state.value}
              onChange={(event) => field.handleChange(event.target.value)}
              error={getFieldError(field)}
            />
          );
        }}
      </form.Field>
      <form.Field name="disbursement" validators={{ onChange: proyectSchema.shape.disbursement }}>
        {(field) => {
          return (
            <InputField
              name={field.name}
              type="text"
              label="Desembolso"
              placeholder="Desembolso"
              value={field.state.value}
              onChange={(event) => field.handleChange(event.target.value)}
              error={getFieldError(field)}
            />
          );
        }}
      </form.Field>
      <form.Field name="finishDate" validators={{ onChange: proyectSchema.shape.finishDate }}>
        {(field) => {
          return (
            <InputField
              name={field.name}
              type="text"
              label="Fecha final"
              placeholder="Fecha final"
              value={field.state.value}
              onChange={(event) => field.handleChange(event.target.value)}
              error={getFieldError(field)}
            />
          );
        }}
      </form.Field>
      <form.Field name="warranty" validators={{ onChange: proyectSchema.shape.warranty }}>
        {(field) => {
          return (
            <InputField
              name={field.name}
              type="text"
              label="Garantia"
              placeholder="Garantia"
              value={field.state.value}
              onChange={(event) => field.handleChange(event.target.value)}
              error={getFieldError(field)}
            />
          );
        }}
      </form.Field>
      <form.Field name="interestNMV" validators={{ onChange: proyectSchema.shape.interestNMV }}>
        {(field) => {
          return (
            <InputField
              name={field.name}
              type="text"
              label="Interes N.M.V"
              placeholder="Interes N.M.V"
              value={field.state.value}
              onChange={(event) => field.handleChange(event.target.value)}
              error={getFieldError(field)}
            />
          );
        }}
      </form.Field>
      <form.Field name="promissoryNote" validators={{ onChange: proyectSchema.shape.promissoryNote }}>
        {(field) => {
          return (
            <InputField
              name={field.name}
              type="text"
              label="Pagare"
              placeholder="Pagare"
              value={field.state.value}
              onChange={(event) => field.handleChange(event.target.value)}
              error={getFieldError(field)}
            />
          );
        }}
      </form.Field>
      <form.Field name="installment" validators={{ onChange: proyectSchema.shape.installment }}>
        {(field) => {
          return (
            <InputField
              name={field.name}
              type="text"
              label="Plazo"
              placeholder="PLazo"
              value={field.state.value}
              onChange={(event) => field.handleChange(event.target.value)}
              error={getFieldError(field)}
            />
          );
        }}
      </form.Field>
      <form.Field name="status" validators={{ onChange: proyectSchema.shape.status }}>
        {(field) => {
          return (
            <SelectInput
              label="Status"
              placeholder="Status"
              value={field.state.value}
              onValueChange={(value) => field.handleChange(value)}
              options={[
                { label: "Abierto", value: "open" },
                { label: "Cerrado", value: "closed" },
              ]}
              error={getFieldError(field)}
            />
          );
        }}
      </form.Field>
      <Button className="w-full mt-2">Crear</Button>
    </form>
  );
}
