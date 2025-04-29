
import { useState } from "react";
import { FormResponse, FormSection, FormData } from "@/types/form";
import FormSectionComponent from "./FormSection";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface FormWizardProps {
  formData: FormResponse;
  onSubmit: (data: FormData) => void;
}

const FormWizard = ({ formData, onSubmit }: FormWizardProps) => {
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [formValues, setFormValues] = useState<FormData>({});
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const { toast } = useToast();

  const { formTitle, sections } = formData.form;
  const currentSection = sections[currentSectionIndex];
  const isFirstSection = currentSectionIndex === 0;
  const isLastSection = currentSectionIndex === sections.length - 1;

  const validateSection = (section: FormSection): boolean => {
    const newErrors: { [key: string]: string } = {};
    let isValid = true;

    section.fields.forEach((field) => {
      const value = formValues[field.fieldId];
      
      // Check required
      if (field.required && (value === undefined || value === "" || value === null)) {
        newErrors[field.fieldId] = field.validation?.message || "This field is required";
        isValid = false;
      } 
      // Check minLength
      else if (field.minLength && typeof value === 'string' && value.length < field.minLength) {
        newErrors[field.fieldId] = `Minimum length is ${field.minLength} characters`;
        isValid = false;
      }
      // Check maxLength
      else if (field.maxLength && typeof value === 'string' && value.length > field.maxLength) {
        newErrors[field.fieldId] = `Maximum length is ${field.maxLength} characters`;
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  const handleFieldChange = (fieldId: string, value: any) => {
    setFormValues((prev) => ({
      ...prev,
      [fieldId]: value,
    }));
    
    // Clear error for this field when changing
    if (errors[fieldId]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[fieldId];
        return newErrors;
      });
    }
  };

  const handleNext = () => {
    if (validateSection(currentSection)) {
      setCurrentSectionIndex((prev) => prev + 1);
      window.scrollTo(0, 0);
    } else {
      toast({
        title: "Validation Error",
        description: "Please fix the errors before proceeding",
        variant: "destructive",
      });
    }
  };

  const handlePrev = () => {
    setCurrentSectionIndex((prev) => prev - 1);
    window.scrollTo(0, 0);
  };

  const handleSubmit = () => {
    if (validateSection(currentSection)) {
      onSubmit(formValues);
      toast({
        title: "Form Submitted",
        description: "Your form has been submitted successfully",
      });
    } else {
      toast({
        title: "Validation Error",
        description: "Please fix the errors before submitting",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-center mb-2">{formTitle}</h1>
        <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
          <div
            className="h-full bg-form transition-all duration-300 ease-in-out"
            style={{
              width: `${((currentSectionIndex + 1) / sections.length) * 100}%`,
            }}
          ></div>
        </div>
        <p className="text-center mt-2 text-sm text-gray-500">
          Section {currentSectionIndex + 1} of {sections.length}
        </p>
      </div>
      
      <FormSectionComponent
        section={currentSection}
        formData={formValues}
        errors={errors}
        onChange={handleFieldChange}
      />
      
      <div className="flex justify-between mt-6">
        {!isFirstSection && (
          <Button
            onClick={handlePrev}
            variant="outline"
            className="flex items-center"
          >
            <ChevronLeft className="mr-1 h-4 w-4" /> Previous
          </Button>
        )}
        <div className="ml-auto">
          {!isLastSection ? (
            <Button onClick={handleNext} className="bg-form hover:bg-form-dark flex items-center">
              Next <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          ) : (
            <Button onClick={handleSubmit} className="bg-form hover:bg-form-dark">
              Submit
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default FormWizard;
