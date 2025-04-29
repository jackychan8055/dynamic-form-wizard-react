
import { useState } from "react";
import { User } from "../types/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

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
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl text-center">Student Login</CardTitle>
        <CardDescription className="text-center">
          Enter your roll number and name to continue
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="rollNumber">Roll Number</Label>
            <Input
              id="rollNumber"
              name="rollNumber"
              type="text"
              placeholder="Enter your roll number"
              value={formData.rollNumber}
              onChange={handleChange}
              disabled={isLoading}
              data-testid="roll-number-input"
            />
            {errors.rollNumber && (
              <p className="text-red-500 text-sm">{errors.rollNumber}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              name="name"
              type="text"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
              disabled={isLoading}
              data-testid="name-input"
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name}</p>
            )}
          </div>

          <Button type="submit" className="w-full bg-form hover:bg-form-dark" disabled={isLoading}>
            {isLoading ? "Logging in..." : "Login"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default LoginForm;
