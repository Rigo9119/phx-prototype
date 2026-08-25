import { describe, expect, it } from "vitest";
import { proyectSchema } from "./proyect.schema";

const validProyect = {
  id: "1",
  transactionId: "TX-001",
  debtor: "Juan Perez",
  creditor: "Ana Gomez",
  createdAt: "2024-01-01",
  createdBy: "admin",
  capital: "1000000",
  paymentFee: "50000",
  description: "Prestamo de capital de trabajo",
  disbursement: "2024-01-05",
  finishDate: "2025-01-05",
  warranty: "Hipoteca",
  interestNMV: "1.5",
  promissoryNote: "PN-001",
  installment: "12",
  status: "open",
};

describe("proyectSchema", () => {
  it("accepts a fully valid proyect payload", () => {
    const result = proyectSchema.safeParse(validProyect);
    expect(result.success).toBe(true);
  });

  it("rejects an empty transactionId", () => {
    const result = proyectSchema.safeParse({ ...validProyect, transactionId: "" });
    expect(result.success).toBe(false);
  });

  it("rejects an empty debtor", () => {
    const result = proyectSchema.safeParse({ ...validProyect, debtor: "" });
    expect(result.success).toBe(false);
  });

  it("rejects an empty creditor", () => {
    const result = proyectSchema.safeParse({ ...validProyect, creditor: "" });
    expect(result.success).toBe(false);
  });

  it("rejects a non-numeric capital", () => {
    const result = proyectSchema.safeParse({ ...validProyect, capital: "not-a-number" });
    expect(result.success).toBe(false);
  });

  it("rejects a non-numeric paymentFee", () => {
    const result = proyectSchema.safeParse({ ...validProyect, paymentFee: "not-a-number" });
    expect(result.success).toBe(false);
  });

  it("rejects a non-numeric interestNMV", () => {
    const result = proyectSchema.safeParse({ ...validProyect, interestNMV: "high" });
    expect(result.success).toBe(false);
  });

  it("rejects a non-numeric installment", () => {
    const result = proyectSchema.safeParse({ ...validProyect, installment: "twelve" });
    expect(result.success).toBe(false);
  });

  it("rejects an empty description", () => {
    const result = proyectSchema.safeParse({ ...validProyect, description: "" });
    expect(result.success).toBe(false);
  });

  it("rejects an empty status", () => {
    const result = proyectSchema.safeParse({ ...validProyect, status: "" });
    expect(result.success).toBe(false);
  });
});
