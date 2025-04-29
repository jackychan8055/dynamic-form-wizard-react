
import { FormField } from "@/types/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface DynamicFieldProps {
  field: FormField;
  value: any;
  onChange: (fieldId: string, value: any) => void;
  error?: string;
}

const DynamicField = ({ field, value, onChange, error }: DynamicFieldProps) => {
  const {
    fieldId,
    type,
    label,
    placeholder,
    required,
    dataTestId,
    options,
    maxLength,
    minLength,
  } = field;

  const renderField = () => {
    switch (type) {
      case "text":
      case "tel":
      case "email":
        return (
          <Input
            type={type}
            id={fieldId}
            placeholder={placeholder || ""}
            value={value || ""}
            onChange={(e) => onChange(fieldId, e.target.value)}
            data-testid={dataTestId}
            maxLength={maxLength}
            minLength={minLength}
            className="w-full"
          />
        );

      case "textarea":
        return (
          <Textarea
            id={fieldId}
            placeholder={placeholder || ""}
            value={value || ""}
            onChange={(e) => onChange(fieldId, e.target.value)}
            data-testid={dataTestId}
            maxLength={maxLength}
            minLength={minLength}
            className="w-full"
          />
        );

      case "date":
        return (
          <Input
            type="date"
            id={fieldId}
            value={value || ""}
            onChange={(e) => onChange(fieldId, e.target.value)}
            data-testid={dataTestId}
            className="w-full"
          />
        );

      case "dropdown":
        return (
          <Select
            value={value || ""}
            onValueChange={(val) => onChange(fieldId, val)}
          >
            <SelectTrigger className="w-full" data-testid={dataTestId}>
              <SelectValue placeholder={placeholder || "Select an option"} />
            </SelectTrigger>
            <SelectContent>
              {options?.map((option) => (
                <SelectItem
                  key={option.value}
                  value={option.value}
                  data-testid={option.dataTestId}
                >
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );

      case "radio":
        return (
          <RadioGroup
            value={value || ""}
            onValueChange={(val) => onChange(fieldId, val)}
            className="flex flex-col space-y-1"
          >
            {options?.map((option) => (
              <div key={option.value} className="flex items-center space-x-2">
                <RadioGroupItem
                  value={option.value}
                  id={`${fieldId}-${option.value}`}
                  data-testid={option.dataTestId}
                />
                <Label htmlFor={`${fieldId}-${option.value}`}>{option.label}</Label>
              </div>
            ))}
          </RadioGroup>
        );

      case "checkbox":
        return (
          <div className="flex items-center space-x-2">
            <Checkbox
              id={fieldId}
              checked={Boolean(value)}
              onCheckedChange={(checked) => onChange(fieldId, checked)}
              data-testid={dataTestId}
            />
          </div>
        );

      default:
        return <div>Unsupported field type: {type}</div>;
    }
  };

  return (
    <div className="space-y-2 mb-4">
      <div className="flex items-start">
        <Label htmlFor={fieldId} className="block mb-1">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </Label>
      </div>
      {renderField()}
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default DynamicField;
