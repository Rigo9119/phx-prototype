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
  error?: string;
}

export default function InputField({
  label,
  name,
  placeholder,
  type,
  value,
  onChange,
  error,
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
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
}
