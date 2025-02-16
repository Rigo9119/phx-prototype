import CreateProyectSheet from "@/components/sheets/createProyectSheet/createProyectSheet";
import { paymentFeeColumns } from "./components/table/columns";
import DataTable from "@/components/dataTable/dataTable";
import { Statements } from "@/components/statements/statements";
import PieChartCmp from "./components/charts/pieChart";
import { BarChartCmp } from "./components/charts/barCharts";
import { LineChartCmp } from "./components/charts/lineChart";
import { BarChartStackCmp } from "./components/charts/barChartStack";

export default async function Page({
	params,
}: {
	params: Promise<{ userType: string }>;
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
					<h2 className="text-2xl font-bold pb-4">
						{userType === "client" ? "Proyectos" : "Inversiones"}
					</h2>
					<PieChartCmp />
				</section>
				{userType === "client" && (
					<section className="mt-8 w-1/2">
						<h2 className="text-2xl font-bold pb-4">Nivel de deuda</h2>
						<BarChartCmp />
					</section>
				)}
				{userType === "investor" && (
					<section className="mt-8 w-1/2">
						<h2 className="text-2xl font-bold pb-4">Cartera ultimos 6 meses</h2>
						<LineChartCmp />
					</section>
				)}
				{userType === "investor" && (
					<section className="mt-8 w-1/2">
						<h2 className="text-2xl font-bold pb-4">Ganancias por mes</h2>
						<BarChartCmp />
					</section>
				)}
				{userType === "investor" && (
					<section className="mt-8 w-1/2">
						<h2 className="text-2xl font-bold pb-4">Ganancia acumulada</h2>
						<BarChartStackCmp />
					</section>
				)}
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
