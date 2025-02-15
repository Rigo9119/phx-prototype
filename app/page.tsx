import { USER_TYPES } from "@/lib/constatns";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <header
        className="flex flex-row items-center justify-between px-6 py-4 
        bg-black text-white"
      >
        <h2>PHX</h2>
        <Link href={"/admin"} className="bg-red-700 rounded-md px-4 py-2">
          Admin
        </Link>
      </header>
      <main className="flex flex-col items-center justify-center gap-8 h-screen">
        <div className="flex flex-col items-center justify-center gap-8 p-8 rounded-md border border-black">
          <h2>Registrate</h2>
          <div className="flex flex-row items-center justify-center gap-4">
            <Link
              className="bg-black px-4 py-2 text-white rounded-md"
              href={`/register/${USER_TYPES.CLIENT}`}
            >
              Cliente
            </Link>
            <Link
              className="bg-black px-4 py-2 text-white rounded-md"
              href={`/register/${USER_TYPES.INVESTOR}`}
            >
              Inversionista
            </Link>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center gap-8 p-8 rounded-md border border-black">
          <h2>Ingresa</h2>
          <div className="flex flex-row items-center justify-center gap-4">
            <Link
              className="bg-black px-4 py-2 text-white rounded-md"
              href={`/dashboard/${USER_TYPES.CLIENT}`}
            >
              Cliente
            </Link>
            <Link
              className="bg-black px-4 py-2 text-white rounded-md"
              href={`/dashboard/${USER_TYPES.INVESTOR}`}
            >
              Inversionista
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
