import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  // You can add any props you want to support in the future
  placeholder?: string; // Example placeholder property
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, placeholder, ...props }, ref) => {
    return (
      <input
        type={type}
        placeholder={placeholder} // Use the placeholder if needed
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
