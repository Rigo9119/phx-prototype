import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import DataTable from "../dataTable/dataTable"
import { statementsCols } from "./columns"

export function Statements() {
  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="item-1">
        <AccordionTrigger>Diciembre 2024</AccordionTrigger>
        <AccordionContent>
          <DataTable columns={statementsCols} data={[]}/>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Enero 2025</AccordionTrigger>
        <AccordionContent>
        <DataTable columns={statementsCols} data={[]}/>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Febrero 2025</AccordionTrigger>
        <AccordionContent>
        <DataTable columns={statementsCols} data={[]}/>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
