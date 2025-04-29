
import { useState } from "react";
import { User } from "../types/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { User as UserIcon, LogIn } from "lucide-react";

interface LoginFormProps {
  onLogin: (user: User) => void;
  isLoading: boolean;
}

const LoginForm = ({ onLogin, isLoading }: LoginFormProps) => {
  const [formData, setFormData] = useState<User>({
    rollNumber: "",
    name: "",
  });
  const [errors, setErrors] = useState<{ rollNumber?: string; name?: string }>({});
  const { toast } = useToast();

  const validateForm = (): boolean => {
    const newErrors: { rollNumber?: string; name?: string } = {};
    
    if (!formData.rollNumber.trim()) {
      newErrors.rollNumber = "Roll Number is required";
    }
    
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (validateForm()) {
      onLogin(formData);
    } else {
      toast({
        title: "Validation Error",
        description: "Please fill all required fields",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto card-gradient animate-fade-in">
      <div className="w-full h-2 bg-gradient-to-r from-blue-400 to-blue-600 rounded-t-lg"></div>
      <CardHeader className="pt-8 pb-4">
        <div className="mx-auto bg-blue-100 p-3 rounded-full mb-4 w-16 h-16 flex items-center justify-center">
          <UserIcon className="h-8 w-8 text-form" />
        </div>
        <CardTitle className="text-2xl text-center font-bold form-title-gradient">Student Login</CardTitle>
        <CardDescription className="text-center text-gray-600">
          Enter your roll number and name to continue
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="rollNumber" className="text-sm font-medium text-gray-700">Roll Number</Label>
            <Input
              id="rollNumber"
              name="rollNumber"
              type="text"
              placeholder="Enter your roll number"
              value={formData.rollNumber}
              onChange={handleChange}
              disabled={isLoading}
              data-testid="roll-number-input"
              className="border-gray-300 focus:border-form focus:ring focus:ring-blue-200 transition-all"
            />
            {errors.rollNumber && (
              <p className="text-red-500 text-sm">{errors.rollNumber}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="name" className="text-sm font-medium text-gray-700">Name</Label>
            <Input
              id="name"
              name="name"
              type="text"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
              disabled={isLoading}
              data-testid="name-input"
              className="border-gray-300 focus:border-form focus:ring focus:ring-blue-200 transition-all"
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name}</p>
            )}
          </div>

          <Button 
            type="submit" 
            className="w-full bg-form hover:bg-form-dark transition-all duration-200 flex items-center justify-center gap-2 py-5" 
            disabled={isLoading}
          >
            {isLoading ? "Logging in..." : (
              <>
                <LogIn className="h-5 w-5" />
                <span>Login</span>
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default LoginForm;
