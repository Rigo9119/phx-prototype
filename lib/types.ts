export type UserType = "creditor" | "debtor";
export type Status = "open" | "finish";
export type SelectOption = { label: string; value: string };
export type BankAccount = "savings" | "credit"

export type Proyect = {
  id: string;
  proyectID: string;
  debtor: string;
  creditor: string;
  createdAt: string; // Date
  createdBy: string;
  capital: string;
  paymentFee: string;
  description: string;
  disbursement: string;
  finishDate: string; // Date
  warranty: string;
  interestNMV: string;
  promissoryNote: string;
  installment: string;
  status: Status;
  editedAt: string; // Date
};

export type User = {
  id: string;
  name: string;
  lastName: string;
  npi: string;
  npyType: "C.C";
  email: string;
  cellphone: string;
  address: string;
  city: string;
  dateOfBirth: string;
  file: string;
  userType: UserType;
  editedAt: string; // Date
  createdAt: string; // Date
};

export type PaymentFee = {
  paymentDate: string; // Date
  paymentFee: string;
  daysInDebt: string; // Date
  creditor: string; 
  bank: string;
  bankAccountType: BankAccount;
  bankAccountId: string;
  proyectID: string; 
}

export type Statement = {
  id: string;
  investor: string;
  period: string; // number fraccion 1/60
  dueDate: string; // Date
  paymentDate: string; // Date
  dayInDebt: string; // Date
  interest: string; // float
  capitalPayment: string;
  paymentFee: string; // interest + capitalPayment (interes + abono a capital)
  balance: string;
  interesRate: string;
  proyectId: string;
}
