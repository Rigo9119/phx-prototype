import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { DatePicker } from "./datePicker";

describe("DatePicker", () => {
  it("renders the label", () => {
    render(<DatePicker label="Fecha de nacimiento" date={new Date("1990-01-01")} setDate={vi.fn()} />);
    expect(screen.getByText("Fecha de nacimiento")).toBeInTheDocument();
  });

  it("does not render an error message when no error is provided", () => {
    render(<DatePicker label="Fecha de nacimiento" date={new Date("1990-01-01")} setDate={vi.fn()} />);
    expect(screen.queryByText(/requerida/i)).not.toBeInTheDocument();
  });

  it("renders the error message when an error is provided", () => {
    render(
      <DatePicker
        label="Fecha de nacimiento"
        date={new Date("1990-01-01")}
        setDate={vi.fn()}
        error="La fecha de nacimiento es requerida"
      />
    );
    expect(screen.getByText("La fecha de nacimiento es requerida")).toBeInTheDocument();
  });
});
