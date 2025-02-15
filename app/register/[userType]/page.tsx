import { RegisterForm } from "@/components/forms/registerForm/registerForm";


interface RegisterProps {
	params: {
		userType: string;
	};
}

export default async function Register({ params }: RegisterProps) {
	const { userType } = await params;

	return (
		<div className="flex items-center justify-center h-screen">
			<RegisterForm userType={userType} />
		</div>
	);
}
