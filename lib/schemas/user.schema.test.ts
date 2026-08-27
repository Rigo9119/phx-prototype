import { describe, expect, it } from "vitest";
import { userSchema } from "./user.schema";

const validUser = {
  name: "Juan",
  lastName: "Perez",
  npi: "1234567890",
  npiType: "C.C",
  email: "juan.perez@example.com",
  cellphone: "3001234567",
  address: "Calle 123",
  city: "Bogota",
  dateOfBirth: new Date("1990-01-01"),
  file: new File(["content"], "cedula.pdf", { type: "application/pdf" }),
  userType: "client",
};

describe("userSchema", () => {
  it("accepts a fully valid user payload", () => {
    const result = userSchema.safeParse(validUser);
    expect(result.success).toBe(true);
  });

  it("rejects an empty name", () => {
    const result = userSchema.safeParse({ ...validUser, name: "" });
    expect(result.success).toBe(false);
  });

  it("rejects an empty lastName", () => {
    const result = userSchema.safeParse({ ...validUser, lastName: "" });
    expect(result.success).toBe(false);
  });

  it("rejects a non-numeric npi", () => {
    const result = userSchema.safeParse({ ...validUser, npi: "abc123" });
    expect(result.success).toBe(false);
  });

  it("rejects an invalid email", () => {
    const result = userSchema.safeParse({ ...validUser, email: "not-an-email" });
    expect(result.success).toBe(false);
  });

  it("rejects a non-numeric cellphone", () => {
    const result = userSchema.safeParse({ ...validUser, cellphone: "call-me" });
    expect(result.success).toBe(false);
  });

  it("rejects an empty address", () => {
    const result = userSchema.safeParse({ ...validUser, address: "" });
    expect(result.success).toBe(false);
  });

  it("rejects an empty city", () => {
    const result = userSchema.safeParse({ ...validUser, city: "" });
    expect(result.success).toBe(false);
  });

  it("rejects a missing dateOfBirth", () => {
    const result = userSchema.safeParse({ ...validUser, dateOfBirth: undefined });
    expect(result.success).toBe(false);
  });

  it("rejects a missing file", () => {
    const result = userSchema.safeParse({ ...validUser, file: null });
    expect(result.success).toBe(false);
  });
});
