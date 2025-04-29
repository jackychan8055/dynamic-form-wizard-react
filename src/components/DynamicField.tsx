
import { FormField } from "@/types/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Info } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

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
            className="w-full transition-all border-gray-300 focus:border-form focus:ring-2 focus:ring-form-light"
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
            className="w-full min-h-[120px] transition-all border-gray-300 focus:border-form focus:ring-2 focus:ring-form-light"
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
            className="w-full transition-all border-gray-300 focus:border-form focus:ring-2 focus:ring-form-light"
          />
        );

      case "dropdown":
        return (
          <Select
            value={value || ""}
            onValueChange={(val) => onChange(fieldId, val)}
          >
            <SelectTrigger className="w-full transition-all border-gray-300 focus:border-form focus:ring-2 focus:ring-form-light" data-testid={dataTestId}>
              <SelectValue placeholder={placeholder || "Select an option"} />
            </SelectTrigger>
            <SelectContent className="bg-white">
              {options?.map((option) => (
                <SelectItem
                  key={option.value}
                  value={option.value}
                  data-testid={option.dataTestId}
                  className="cursor-pointer hover:bg-blue-50"
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
            className="flex flex-col space-y-2"
          >
            {options?.map((option) => (
              <div key={option.value} className="flex items-center space-x-2 hover:bg-blue-50 p-2 rounded-md transition-colors">
                <RadioGroupItem
                  value={option.value}
                  id={`${fieldId}-${option.value}`}
                  data-testid={option.dataTestId}
                  className="border-gray-400 text-form"
                />
                <Label htmlFor={`${fieldId}-${option.value}`} className="cursor-pointer">{option.label}</Label>
              </div>
            ))}
          </RadioGroup>
        );

      case "checkbox":
        return (
          <div className="flex items-center space-x-2 hover:bg-blue-50 p-2 rounded-md transition-colors">
            <Checkbox
              id={fieldId}
              checked={Boolean(value)}
              onCheckedChange={(checked) => onChange(fieldId, checked)}
              data-testid={dataTestId}
              className="border-gray-400 text-form data-[state=checked]:bg-form data-[state=checked]:border-form"
            />
            <Label htmlFor={fieldId} className="cursor-pointer">I agree</Label>
          </div>
        );

      default:
        return <div>Unsupported field type: {type}</div>;
    }
  };

  const renderRequiredFlag = () => {
    if (required) {
      return (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <span className="text-red-500 ml-1">*</span>
            </TooltipTrigger>
            <TooltipContent className="bg-gray-800 text-white">
              <p>This field is required</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );
    }
    return null;
  };

  return (
    <div className="space-y-2 mb-4 transition-all">
      <div className="flex items-start">
        <Label htmlFor={fieldId} className="block mb-1 text-gray-700 font-medium flex items-center">
          {label}
          {renderRequiredFlag()}
          {(minLength || maxLength) && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <span className="ml-2 inline-flex">
                    <Info className="h-4 w-4 text-gray-400" />
                  </span>
                </TooltipTrigger>
                <TooltipContent className="bg-gray-800 text-white">
                  <p>
                    {minLength && `Minimum length: ${minLength} characters`}
                    {minLength && maxLength && <br />}
                    {maxLength && `Maximum length: ${maxLength} characters`}
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </Label>
      </div>
      {renderField()}
      {error && (
        <p className="text-red-500 text-sm mt-1 bg-red-50 p-2 rounded border-l-2 border-red-500">{error}</p>
      )}
    </div>
  );
};

export default DynamicField;
