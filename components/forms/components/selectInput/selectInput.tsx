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
  onValueChange: (value: string) => void;
  error?: string;
}

export default function SelectInput({
  label,
  placeholder,
  value,
  options,
  onValueChange,
  error,
}: SelectInputProps) {
  return (
    <div className="w-full">
      <Label>{label}</Label>
      <Select value={value || undefined} onValueChange={onValueChange}>
        <SelectTrigger>
          <SelectValue placeholder={placeholder} />
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
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
}
