import { beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { RegisterForm } from "./registerForm";
import { AuthProvider } from "@/lib/auth/authContext";

const pushMock = vi.fn();

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: pushMock }),
}));

function renderRegisterForm(userType: string) {
  return render(
    <AuthProvider>
      <RegisterForm userType={userType} />
    </AuthProvider>
  );
}

async function fillValidCoreFields(user: ReturnType<typeof userEvent.setup>) {
  await user.type(screen.getByPlaceholderText("Nombre"), "Juan");
  await user.type(screen.getByPlaceholderText("Apellido"), "Perez");
  await user.type(screen.getByPlaceholderText("Cedula"), "123456789");
  await user.type(screen.getByPlaceholderText("Correo electronico"), "juan@example.com");
  await user.type(screen.getByPlaceholderText("Celular"), "3001234567");
  await user.type(screen.getByPlaceholderText("Dirección"), "Calle 123");
  await user.type(screen.getByPlaceholderText("Ciudad"), "Bogota");
}

async function uploadFile(user: ReturnType<typeof userEvent.setup>) {
  const file = new File(["content"], "cedula.pdf", { type: "application/pdf" });
  const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
  await user.upload(fileInput, file);
  return file;
}

async function pickCalendarDay(user: ReturnType<typeof userEvent.setup>, day: number) {
  const calendarIcon = document.querySelector("svg.lucide-calendar");
  const trigger = calendarIcon?.closest("button");
  if (!trigger) throw new Error("Date picker trigger button not found");
  await user.click(trigger);

  const dayCandidates = await screen.findAllByText(String(day));
  const target = dayCandidates.find(
    (el) => el.tagName === "BUTTON" && !el.className.includes("day-outside")
  );
  if (!target) throw new Error(`Calendar day ${day} not found`);
  await user.click(target);
}

describe("RegisterForm", () => {
  beforeEach(() => {
    pushMock.mockClear();
  });

  it("blocks submit and shows an error when a required field is empty", async () => {
    const user = userEvent.setup();
    renderRegisterForm("client");

    await user.click(screen.getByRole("button", { name: /enviar/i }));

    expect(await screen.findByText(/el nombre es requerido/i)).toBeInTheDocument();
    expect(pushMock).not.toHaveBeenCalled();
  });

  it("blocks submit and shows an error when the email is invalid", async () => {
    const user = userEvent.setup();
    renderRegisterForm("client");

    await fillValidCoreFields(user);
    await user.clear(screen.getByPlaceholderText("Correo electronico"));
    await user.type(screen.getByPlaceholderText("Correo electronico"), "not-an-email");

    await user.click(screen.getByRole("button", { name: /enviar/i }));

    expect(await screen.findByText(/correo electronico invalido/i)).toBeInTheDocument();
    expect(pushMock).not.toHaveBeenCalled();
  });

  it("includes the selected file in the submitted values (bug #1)", async () => {
    const consoleSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    const user = userEvent.setup();
    renderRegisterForm("client");

    await fillValidCoreFields(user);
    const file = await uploadFile(user);

    await user.click(screen.getByRole("button", { name: /enviar/i }));

    await waitFor(() => expect(pushMock).toHaveBeenCalledWith("/dashboard/client"));
    const call = consoleSpy.mock.calls.find((args) => args[0] === "register form data: ");
    expect(call?.[1]?.file).toBe(file);

    consoleSpy.mockRestore();
  });

  it("includes the picked date in the submitted values (bug #2)", async () => {
    const consoleSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    const user = userEvent.setup();
    renderRegisterForm("client");

    await fillValidCoreFields(user);
    await uploadFile(user);
    await pickCalendarDay(user, 10);

    await user.click(screen.getByRole("button", { name: /enviar/i }));

    await waitFor(() => expect(pushMock).toHaveBeenCalledWith("/dashboard/client"));
    const call = consoleSpy.mock.calls.find((args) => args[0] === "register form data: ");
    const submittedDate = call?.[1]?.dateOfBirth as Date;
    expect(submittedDate).toBeInstanceOf(Date);
    expect(submittedDate.getDate()).toBe(10);

    consoleSpy.mockRestore();
  });
});
