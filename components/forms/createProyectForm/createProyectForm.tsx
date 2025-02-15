"use client"
import { useForm } from "@tanstack/react-form";
import InputField from "../components/inputField/inputField";
import SelectInput from "../components/selectInput/selectInput";
import { Button } from "@/components/ui/button";

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
    <form className="flex flex-col items-center justify-between gap-2 w-full">
      <form.Field name="transactionId">
        {(field) => {
          return (
            <InputField
              name={field.name}
              type="text"
              label="ID del proyecto"
              placeholder="ID del proyecto"
              value={field.state.value}
              onChange={(event) => field.handleChange(event.target.value)}
            />
          );
        }}
      </form.Field>
      <form.Field name="debtor">
        {(field) => {
          return (
            <InputField
              name={field.name}
              type="text"
              label="Deudor"
              placeholder="Deudor"
              value={field.state.value}
              onChange={(event) => field.handleChange(event.target.value)}
            />
          );
        }}
      </form.Field>
      <form.Field name="creditor">
        {(field) => {
          return (
            <InputField
              name={field.name}
              type="text"
              label="Acreedor"
              placeholder="Acreedor"
              value={field.state.value}
              onChange={(event) => field.handleChange(event.target.value)}
            />
          );
        }}
      </form.Field>
      <form.Field name="capital">
        {(field) => {
          return (
            <InputField
              name={field.name}
              type="text"
              label="Capital"
              placeholder="Capital"
              value={field.state.value}
              onChange={(event) => field.handleChange(event.target.value)}
            />
          );
        }}
      </form.Field>
      <form.Field name="paymentFee">
        {(field) => {
          return (
            <InputField
              name={field.name}
              type="text"
              label="Cuota"
              placeholder="Cuota"
              value={field.state.value}
              onChange={(event) => field.handleChange(event.target.value)}
            />
          );
        }}
      </form.Field>
      <form.Field name="description">
        {(field) => {
          return (
            <InputField
              name={field.name}
              type="text"
              label="Descripción"
              placeholder="Descripción"
              value={field.state.value}
              onChange={(event) => field.handleChange(event.target.value)}
            />
          );
        }}
      </form.Field>
      <form.Field name="disbursement">
        {(field) => {
          return (
            <InputField
              name={field.name}
              type="text"
              label="Desembolso"
              placeholder="Desembolso"
              value={field.state.value}
              onChange={(event) => field.handleChange(event.target.value)}
            />
          );
        }}
      </form.Field>
      <form.Field name="finishDate">
        {(field) => {
          return (
            <InputField
              name={field.name}
              type="text"
              label="Fecha final"
              placeholder="Fecha final"
              value={field.state.value}
              onChange={(event) => field.handleChange(event.target.value)}
            />
          );
        }}
      </form.Field>
      <form.Field name="warranty">
        {(field) => {
          return (
            <InputField
              name={field.name}
              type="text"
              label="Garantia"
              placeholder="Garantia"
              value={field.state.value}
              onChange={(event) => field.handleChange(event.target.value)}
            />
          );
        }}
      </form.Field>
      <form.Field name="interestNMV">
        {(field) => {
          return (
            <InputField
              name={field.name}
              type="text"
              label="Interes N.M.V"
              placeholder="Interes N.M.V"
              value={field.state.value}
              onChange={(event) => field.handleChange(event.target.value)}
            />
          );
        }}
      </form.Field>
      <form.Field name="promissoryNote">
        {(field) => {
          return (
            <InputField
              name={field.name}
              type="text"
              label="Pagare"
              placeholder="Pagare"
              value={field.state.value}
              onChange={(event) => field.handleChange(event.target.value)}
            />
          );
        }}
      </form.Field>
      <form.Field name="installment">
        {(field) => {
          return (
            <InputField
              name={field.name}
              type="text"
              label="Plazo"
              placeholder="PLazo"
              value={field.state.value}
              onChange={(event) => field.handleChange(event.target.value)}
            />
          );
        }}
      </form.Field>
      <form.Field name="status">
        {(field) => {
          return (
            <SelectInput
              label="Status"
              placeholder="Status"
              value={field.state.value}
              options={[
                { label: "Abierto", value: "open" },
                { label: "Cerrado", value: "closed" },
              ]}
            />
          );
        }}
      </form.Field>
      <Button className="w-full mt-2">Crear</Button>
    </form>
  );
}
