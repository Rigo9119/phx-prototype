import { RegisterForm } from "@/components/forms/registerForm/registerForm";

export function generateStaticParams() {
	return [{ userType: "client" }, { userType: "investor" }];
}

export default async function Register({
  params,
}: {
  params: Promise<{ userType: string }>
}) {
	const userType = (await params).userType;

	return (
		<div className="flex items-center justify-center h-screen">
			<RegisterForm userType={userType} />
		</div>
	);
}
