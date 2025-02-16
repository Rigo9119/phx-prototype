import { RegisterForm } from "@/components/forms/registerForm/registerForm";

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
