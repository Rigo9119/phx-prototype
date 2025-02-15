import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SelectOption } from "@/lib/types";

interface SelectInputProps {
  label: string;
  placeholder: string;
  value: string;
  options: SelectOption[];
}

export default function SelectInput({
  label,
  placeholder,
  value,
  options,
}: SelectInputProps) {
  return (
    <div className="w-full">
      <Label>{label}</Label>
      <Select>
        <SelectTrigger>
          <SelectValue placeholder={value ? value : placeholder} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {options.map((option, index: number) => (
              <SelectItem key={`${option.value}-${index}`} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
