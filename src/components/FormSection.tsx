
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
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent className="space-y-4">
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
