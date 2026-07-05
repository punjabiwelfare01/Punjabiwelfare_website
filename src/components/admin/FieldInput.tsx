import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import ImageField from "./ImageField";
import { iconNames, getIcon } from "@/lib/icons";
import type { FieldDef } from "@/admin/config";

interface Props {
  field: FieldDef;
  value: string;
  onChange: (value: string) => void;
}

const FieldInput = ({ field, value, onChange }: Props) => {
  return (
    <div className="space-y-2">
      <Label>
        {field.label}
        {field.required && <span className="text-destructive ml-1">*</span>}
      </Label>
      {field.type === "textarea" ? (
        <Textarea value={value} onChange={(e) => onChange(e.target.value)} rows={3} />
      ) : field.type === "image" ? (
        <ImageField value={value} onChange={onChange} />
      ) : field.type === "icon" ? (
        <Select value={value || undefined} onValueChange={onChange}>
          <SelectTrigger><SelectValue placeholder="Choose an icon" /></SelectTrigger>
          <SelectContent>
            {iconNames.map((name) => {
              const Icon = getIcon(name);
              return (
                <SelectItem key={name} value={name}>
                  <span className="flex items-center gap-2">
                    <Icon className="w-4 h-4" /> {name}
                  </span>
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
      ) : (
        <Input
          type={field.type === "url" ? "url" : "text"}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      )}
    </div>
  );
};

export default FieldInput;
