import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SelectInput from "./selectInput";

const options = [
  { label: "Abierto", value: "open" },
  { label: "Cerrado", value: "closed" },
];

describe("SelectInput", () => {
  it("renders the label", () => {
    render(
      <SelectInput
        label="Status"
        placeholder="Status"
        value=""
        options={options}
        onValueChange={vi.fn()}
      />
    );
    expect(screen.getByText("Status", { selector: "label" })).toBeInTheDocument();
  });

  it("fires onValueChange with the selected option's value when the user picks it", async () => {
    const user = userEvent.setup();
    const handleValueChange = vi.fn();
    render(
      <SelectInput
        label="Status"
        placeholder="Status"
        value=""
        options={options}
        onValueChange={handleValueChange}
      />
    );

    await user.click(screen.getByRole("combobox"));
    await user.click(await screen.findByText("Cerrado"));

    expect(handleValueChange).toHaveBeenCalledWith("closed");
  });

  it("does not render an error message when no error is provided", () => {
    render(
      <SelectInput
        label="Status"
        placeholder="Status"
        value=""
        options={options}
        onValueChange={vi.fn()}
      />
    );
    expect(screen.queryByText(/estado/i)).not.toBeInTheDocument();
  });

  it("renders the error message when an error is provided", () => {
    render(
      <SelectInput
        label="Status"
        placeholder="Status"
        value=""
        options={options}
        onValueChange={vi.fn()}
        error="Debe seleccionar un estado"
      />
    );
    expect(screen.getByText("Debe seleccionar un estado")).toBeInTheDocument();
  });
});
