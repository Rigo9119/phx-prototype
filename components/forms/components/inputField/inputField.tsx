import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { ChangeEvent } from "react";

interface InputFieldProps {
  label: string;
  name: string;
  placeholder: string;
  type: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export default function InputField({
  label,
  name,
  placeholder,
  type,
  value,
  onChange,
}: InputFieldProps) {
  return (
    <div className="w-full">
      <Label>{label}</Label>
      <Input
        name={name}
        placeholder={placeholder}
        type={type}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}
