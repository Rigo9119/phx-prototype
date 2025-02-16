import CreateProyectSheet from "@/components/sheets/createProyectSheet/createProyectSheet";
import { paymentFeeColumns } from "./components/table/columns";
import DataTable from "@/components/dataTable/dataTable";
import { Statements } from "@/components/statements/statements";
import PieChartCmp from "./components/charts/pieChart";
import { BarChartCmp } from "./components/charts/barCharts";

export default async function Page({
  params,
}: {
  params: Promise<{ userType: string }>
}) {
	const userType = (await params).userType;

	return (
		<div>
			<div className="flex flex-item items-center justify-between w-full">
				<div>
					<h2 className="text-3xl font-bold">Bienvenido {userType}</h2>
				</div>
				<div>
					<CreateProyectSheet triggerLabel="¿Qué tal un prestamo?" />
				</div>
			</div>
      <div className="flex flex-item items-start justify-between gap-8 w-full">
        <section className="mt-8 w-1/2">
          <h2 className="text-2xl font-bold pb-4">Proyectos</h2>
          <PieChartCmp />
        </section>
        <section className="mt-8 w-1/2">
          <h2 className="text-2xl font-bold pb-4">Nivel de deuda</h2>
          <BarChartCmp />
        </section>
      </div>
			<section className="mt-8">
				<h2 className="text-2xl font-bold pb-4">Cuotas</h2>
				<DataTable columns={paymentFeeColumns} data={[]} />
			</section>
			<section className="mt-8">
				<h2 className="text-2xl font-bold pb-4">Estados de cuenta</h2>
        <Statements />
			</section>
		</div>
	);
}
