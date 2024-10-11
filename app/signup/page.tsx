'use client'

import { useState } from "react"
import Link from "next/link"
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth'
import { auth } from '@/app/firebase/config'
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/hooks/use-toast"

export default function MultiStepSignUpForm() {
  const [createUserWithEmailAndPassword, user, loading, error] = useCreateUserWithEmailAndPassword(auth);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    displayName: '',
    email: '',
    password: '',
    department: '',
    passoutYear: '',
    batch: '',
    github: '',
    linkedin: '',
    portfolio: '',
    techStack: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleNext = () => {
    if (step === 1 && !formData.displayName.trim()) {
      toast({
        title: "Username required",
        description: "Please enter a display name to continue.",
        variant: "destructive",
      });
      return;
    }
    if (step === 2 && (!formData.email.trim() || !formData.password.trim())) {
      toast({
        title: "Email and password required",
        description: "Please enter both email and password to continue.",
        variant: "destructive",
      });
      return;
    }
    setStep(prev => prev + 1);
  };

  const handleBack = () => {
    setStep(prev => prev - 1);
  };

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const result = await createUserWithEmailAndPassword(formData.email, formData.password);
      if (result) {
        // Here you would typically save the additional user data to your database
        console.log("User created successfully", formData);
        toast({
          title: "Account created",
          description: "Your account has been created successfully.",
        });
      }
    } catch (error) {
      console.error("Error creating user:", error);
      toast({
        title: "Error",
        description: "There was an error creating your account. Please try again.",
        variant: "destructive",
      });
    }
  };

  const renderStep = () => {
    switch(step) {
      case 1:
        return (
          <>
            <CardHeader>
              <CardTitle className="text-xl">Choose Username</CardTitle>
              <CardDescription>What name would you like to display?</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="displayName">Username</Label>
                  <Input
                    id="displayName"
                    name="displayName"
                    value={formData.displayName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleNext} className="w-full">Next</Button>
            </CardFooter>
          </>
        );
      case 2:
        return (
          <>
            <CardHeader>
              <CardTitle className="text-xl">Account Information</CardTitle>
              <CardDescription>Enter your email and password</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button onClick={handleBack} variant="outline">Back</Button>
              <Button onClick={handleNext}>Next</Button>
            </CardFooter>
          </>
        );
      case 3:
        return (
          <>
            <CardHeader>
              <CardTitle className="text-xl">Academic Information</CardTitle>
              <CardDescription>Enter your department, passout year, and batch</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="department">Department</Label>
                  <Input
                    id="department"
                    name="department"
                    value={formData.department}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="passoutYear">Passout Year</Label>
                  <Input
                    id="passoutYear"
                    name="passoutYear"
                    type="number"
                    value={formData.passoutYear}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="batch">Batch</Label>
                  <Input
                    id="batch"
                    name="batch"
                    value={formData.batch}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button onClick={handleBack} variant="outline">Back</Button>
              <Button onClick={handleNext}>Next</Button>
            </CardFooter>
          </>
        );
      case 4:
        return (
          <>
            <CardHeader>
              <CardTitle className="text-xl">Professional Links</CardTitle>
              <CardDescription>Enter your GitHub, LinkedIn, and portfolio links</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="github">GitHub</Label>
                  <Input
                    id="github"
                    name="github"
                    value={formData.github}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="linkedin">LinkedIn</Label>
                  <Input
                    id="linkedin"
                    name="linkedin"
                    value={formData.linkedin}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="portfolio">Portfolio Website</Label>
                  <Input
                    id="portfolio"
                    name="portfolio"
                    value={formData.portfolio}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button onClick={handleBack} variant="outline">Back</Button>
              <Button onClick={handleNext}>Next</Button>
            </CardFooter>
          </>
        );
      case 5:
        return (
          <>
            <form onSubmit={handleSignUp}>
            <CardHeader>
              <CardTitle className="text-xl">Tech Stack</CardTitle>
              <CardDescription>Describe your tech stack and expertise</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="techStack">Tech Stack Expertise</Label>
                    <Textarea
                      id="techStack"
                      name="techStack"
                      value={formData.techStack}
                      onChange={handleInputChange}
                      rows={5}
                    />
                  </div>
                </div>

            </CardContent>
            <CardFooter className="flex justify-between">
            <Button onClick={handleBack} variant="outline">Back</Button>
                <Button type="submit" disabled={loading}>
                  {loading ? "Creating Account..." : "Create Account"}
            </Button>
            </CardFooter>
            </form>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-950 p-4">
      <Card className="w-full max-w-md">
        {renderStep()}
      </Card>
    </div>
  )
}