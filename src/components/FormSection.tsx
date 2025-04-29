
import { FormSection as FormSectionType, FormField, FormData } from "@/types/form";
import DynamicField from "./DynamicField";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface FormSectionProps {
  section: FormSectionType;
  formData: FormData;
  errors: { [key: string]: string };
  onChange: (fieldId: string, value: any) => void;
}

const FormSection = ({ section, formData, errors, onChange }: FormSectionProps) => {
  const { title, description, fields } = section;

  return (
    <Card className="w-full card-gradient animate-fade-in">
      <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b">
        <CardTitle className="text-2xl font-bold text-form-dark">{title}</CardTitle>
        {description && <CardDescription className="text-gray-600">{description}</CardDescription>}
      </CardHeader>
      <CardContent className="space-y-6 p-6">
        {fields.map((field: FormField) => (
          <DynamicField
            key={field.fieldId}
            field={field}
            value={formData[field.fieldId]}
            onChange={onChange}
            error={errors[field.fieldId]}
          />
        ))}
      </CardContent>
    </Card>
  );
};

export default FormSection;
