import DataTable from "@/components/dataTable/dataTable";
import { mockTransactions } from "@/data/mockdata/transactions";
import type { Proyect } from "@/lib/types";
import { transactionsColumns } from "./components/table/columns";

export default function AdminPage() {
  const { result } = mockTransactions;

  return (
    <div>
      <h2 className="text-3xl font-bold mb-4">Transacciones</h2>
      <DataTable tableTop columns={transactionsColumns as Proyect[]} data={result} />
    </div>
  );
}
