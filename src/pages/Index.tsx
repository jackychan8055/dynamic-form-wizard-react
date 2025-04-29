
import { useState } from "react";
import LoginForm from "@/components/LoginForm";
import FormWizard from "@/components/FormWizard";
import { createUser, getForm } from "@/services/api";
import { User, FormResponse, FormData } from "@/types/form";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [user, setUser] = useState<User | null>(null);
  const [formData, setFormData] = useState<FormResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleLogin = async (userData: User) => {
    setIsLoading(true);
    try {
      // Register user
      const createUserResult = await createUser(userData);
      
      if (!createUserResult.success) {
        toast({
          title: "Login Failed",
          description: createUserResult.message,
          variant: "destructive",
        });
        return;
      }
      
      // Fetch form data
      const formResponse = await getForm(userData.rollNumber);
      
      // Update state
      setUser(userData);
      setFormData(formResponse);
      
      toast({
        title: "Login Successful",
        description: "You can now fill the form",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "An unknown error occurred",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleFormSubmit = (collectedData: FormData) => {
    console.log("Form submitted with data:", collectedData);
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-extrabold form-title-gradient mb-2">Dynamic Form Wizard</h1>
          <p className="text-gray-600">Complete all sections to submit your form</p>
        </div>
        
        {!user || !formData ? (
          <LoginForm onLogin={handleLogin} isLoading={isLoading} />
        ) : (
          <FormWizard formData={formData} onSubmit={handleFormSubmit} />
        )}
      </div>
    </div>
  );
};

export default Index;
