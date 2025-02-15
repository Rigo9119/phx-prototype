import CreateTransactionForm from "@/components/forms/createProyectForm/createProyectForm";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

interface CreateProyectSheetProps {
  triggerLabel: string; 
}

export default function CreateProyectSheet({triggerLabel}: CreateProyectSheetProps ) {
  return (
    <Sheet>
      <SheetTrigger className="bg-emerald-700 px-4 py-2 rounded text-white">
        {triggerLabel}
      </SheetTrigger>
      <SheetContent className="overflow-y-auto max-h-screen">
        <SheetHeader>
          <SheetTitle>Crear proyecto</SheetTitle>
        </SheetHeader>
        <div className="pt-2">
          <CreateTransactionForm />
        </div>
      </SheetContent>
    </Sheet>
  );
}
