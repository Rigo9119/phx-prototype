"use client";

import type * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Label } from "@/components/ui/label";

interface DatePickerprops {
  date: Date;
  label: string;
  setDate: React.Dispatch<React.SetStateAction<Date>>;
}

export function DatePicker({ date, label, setDate }: DatePickerprops) {
  return (
    <div className="flex flex-col">
      <Label className="pb-1">{label}</Label>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "w-[280px] justify-start text-left font-normal",
              !date && "text-muted-foreground",
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? format(date, "PPP") : <span>Pick a date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            selected={date}
            onSelect={(day) => setDate(day ?? new Date())}
            initialFocus
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
