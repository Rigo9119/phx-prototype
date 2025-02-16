import CreateProyectSheet from "@/components/sheets/createProyectSheet/createProyectSheet";
import { paymentFeeColumns } from "./components/table/columns";
import DataTable from "@/components/dataTable/dataTable";

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
			<section className="mt-8">
				<h2 className="text-2xl font-bold pb-4">Proyectos</h2>
			</section>
			<section className="mt-8">
				<h2 className="text-2xl font-bold pb-4">Nivel de deuda</h2>
			</section>
			<section className="mt-8">
				<h2 className="text-2xl font-bold pb-4">Cuotas</h2>
				<DataTable columns={paymentFeeColumns} data={[]} />
			</section>
			<section className="mt-8">
				<h2 className="text-2xl font-bold pb-4">Estados de cuenta</h2>
			</section>
		</div>
	);
}
