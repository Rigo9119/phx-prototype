import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { FileInput } from "./fileInput";

describe("FileInput", () => {
  it("renders the label", () => {
    render(<FileInput label="Archivo" name="file" onChange={vi.fn()} />);
    expect(screen.getByText("Archivo")).toBeInTheDocument();
  });

  it("calls onChange with the selected file", async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();
    render(<FileInput label="Archivo" name="file" onChange={handleChange} />);

    const file = new File(["content"], "cedula.pdf", { type: "application/pdf" });
    const input = document.getElementById("file") as HTMLInputElement;
    await user.upload(input, file);

    expect(handleChange).toHaveBeenCalledWith(file);
  });

  it("does not render an error message when no error is provided", () => {
    render(<FileInput label="Archivo" name="file" onChange={vi.fn()} />);
    expect(screen.queryByText(/requerido/i)).not.toBeInTheDocument();
  });

  it("renders the error message when an error is provided", () => {
    render(
      <FileInput
        label="Archivo"
        name="file"
        onChange={vi.fn()}
        error="Debe seleccionar un archivo"
      />
    );
    expect(screen.getByText("Debe seleccionar un archivo")).toBeInTheDocument();
  });
});
