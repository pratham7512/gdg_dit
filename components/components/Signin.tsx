"use client";

import React, { useState } from 'react';
import { X, Loader2, EyeIcon, EyeOffIcon } from 'lucide-react';
import * as Dialog from '@radix-ui/react-dialog';
import { signIn } from "next-auth/react";

interface AuthDialogProps {
  children: React.ReactNode;
  initialMode?: 'signin' | 'signup';
  onSuccess?: () => void;
}

export const AuthDialog: React.FC<AuthDialogProps> = ({ 
  children, 
  initialMode = 'signin',
  onSuccess 
}) => {

  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState<'signin' | 'signup'>(initialMode);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
    setError(null); // Clear error when user starts typing
  };

  const resetForm = () => {
    setFormData({
      name: '',
      surname: '',
      email: '',
      password: '',
      confirmPassword: ''
    });
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      if (mode === 'signin') {
        const result = await signIn("credentials", {
          username: formData.email,
          password: formData.password,
          redirect: false,
        });

        if (result?.error) {
          setError("Invalid email or password");
          return;
        }

        setIsOpen(false);
        onSuccess?.();
      } else {
        if (formData.password !== formData.confirmPassword) {
          setError("Passwords do not match");
          return;
        }

        const response = await fetch("https://gdg-cfw.prathameshdesai679.workers.dev/cr-acc", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: formData.name,
            surname: formData.surname,
            email: formData.email,
            password: formData.password,
          }),
        });

        const { result} = await response.json();
        if (!result.success) {
          setError("Failed to create account");
          return;
        }

        // Auto switch to signin mode after successful signup
        resetForm();
        setMode('signin');
        setError(null);
        // Show success message
        const successMessage = "Account created successfully! Please sign in.";
        setError(successMessage);
      }
    } catch (err: unknown) {
      console.error(err);
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  const toggleMode = () => {
    resetForm();
    setMode(prev => prev === 'signin' ? 'signup' : 'signin');
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
      <Dialog.Trigger asChild>
        {children}
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-[#0D0D14]/90 backdrop-blur-sm z-50 transition-opacity duration-200" />
        <Dialog.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-md z-50">
          <div className="relative">
            <div className="p-6">
              <div className="rounded-xl border border bg-n-8/90 backdrop-blur-sm font-bold p-6 shadow-[0_0_25px_rgba(82,82,229,0.1)] transition-all duration-200">
                <div className="flex items-center justify-between mb-6 border-b border-[#2A2A3C] pb-5">
                  <div className="bg-white bg-clip-text text-transparent font-code text-md tracking-wider">
                    {mode === 'signin' ? '// SIGN IN' : '// CREATE ACCOUNT'}
                  </div>
                  <Dialog.Close asChild>
                    <button 
                      className="text-[#6E6E8F] hover:text-[#8E8EA9] transition-colors disabled:opacity-50"
                      disabled={isLoading}
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </Dialog.Close>
                </div>

                {error && (
                  <div className={`mb-4 text-md text-center font-code ${
                    error.includes("successfully") 
                      ? "text-green-400" 
                      : "text-[#FF4D4D]"
                  }`}>
                    {error}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                  {mode === 'signup' && (
                    <div className="space-y-2">
                      <label className="block text-sm text-[#6E6E8F] font-code">
                        NAME
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full h-10 rounded-lg bg-[#1A1A27] px-4 text-md text-white border border-[#2A2A3C] focus:border-[#5252E5] focus:outline-none transition-colors font-code disabled:opacity-50"
                        required
                        disabled={isLoading}
                      />
                    </div>
                  )}
                  {mode === 'signup' && (
                    <div className="space-y-2">
                      <label className="block text-sm text-[#6E6E8F] font-code">
                        SURNAME
                      </label>
                      <input
                        type="text"
                        name="surname"
                        value={formData.surname}
                        onChange={handleInputChange}
                        className="w-full h-10 rounded-lg bg-[#1A1A27] px-4 text-md text-white border border-[#2A2A3C] focus:border-[#5252E5] focus:outline-none transition-colors font-code disabled:opacity-50"
                        required
                        disabled={isLoading}
                      />
                    </div>
                  )}
                  
                  <div className="space-y-2">
                    <label className="block text-sm text-[#6E6E8F] font-code">
                      EMAIL ADDRESS
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full h-10 rounded-lg bg-[#1A1A27] px-4 text-md text-white border border-[#2A2A3C] focus:border-[#5252E5] focus:outline-none transition-colors font-code disabled:opacity-50"
                      required
                      disabled={isLoading}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm text-[#6E6E8F] font-code">
                      PASSWORD
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        className="w-full h-10 rounded-lg bg-[#1A1A27] px-4 text-md text-white border border-[#2A2A3C] focus:border-[#5252E5] focus:outline-none transition-colors font-code disabled:opacity-50"
                        required
                        disabled={isLoading}
                      />
                      <button 
                        type="button" 
                        onClick={() => setShowPassword(prev => !prev)} 
                        className="absolute right-3 top-1/2 transform -translate-y-1/2"
                      >
                        {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                      </button>
                    </div>
                  </div>

                  {mode === 'signup' && (
                    <div className="space-y-2">
                      <label className="block text-sm text-[#6E6E8F] font-code">
                        CONFIRM PASSWORD
                      </label>
                      <div className="relative">
                        <input
                          type={showConfirmPassword ? "text" : "password"}
                          name="confirmPassword"
                          value={formData.confirmPassword}
                          onChange={handleInputChange}
                          className="w-full h-10 rounded-lg bg-[#1A1A27] px-4 text-md text-white border border-[#2A2A3C] focus:border-[#5252E5] focus:outline-none transition-colors font-code disabled:opacity-50"
                          required={mode === 'signup'}
                          disabled={isLoading}
                        />
                        <button 
                          type="button" 
                          onClick={() => setShowConfirmPassword(prev => !prev)} 
                          className="absolute right-3 top-1/2 transform -translate-y-1/2"
                        >
                          {showConfirmPassword ? <EyeOffIcon /> : <EyeIcon />}
                        </button>
                      </div>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full h-10 rounded-lg bg-gradient-to-r from-[#5252E5] to-[#7D3AEA] text-white text-md font-code hover:opacity-90 transition-all duration-200 mt-6 border-0 disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
                    {isLoading
                      ? (mode === 'signin' ? 'SIGNING IN...' : 'CREATING ACCOUNT...')
                      : (mode === 'signin' ? 'CONTINUE →' : 'CREATE ACCOUNT →')
                    }
                  </button>
                </form>

                <div className="mt-4 text-center text-sm font-code">
                  <span className="text-[#6E6E8F]">
                    {mode === 'signin' ? "Don't have an account? " : "Already have an account? "}
                  </span>
                  <button
                    onClick={toggleMode}
                    disabled={isLoading}
                    className="text-[#5252E5] hover:text-[#7D3AEA] transition-colors disabled:opacity-50"
                  >
                    {mode === 'signin' ? 'Create one' : 'Sign in'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}