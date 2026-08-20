"use client";

import * as React from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export interface CheckboxProps {
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  disabled?: boolean;
  className?: string;
  id?: string;
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ checked = false, onCheckedChange, disabled = false, className, id }, ref) => {
    return (
      <button
        type="button"
        id={id}
        role="checkbox"
        aria-checked={checked}
        disabled={disabled}
        onClick={() => onCheckedChange?.(!checked)}
        className={cn(
          "peer size-4 shrink-0 rounded-sm border border-slate-300 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-indigo-600 data-[state=checked]:border-indigo-600 data-[state=checked]:text-white flex items-center justify-center transition-colors",
          checked ? "bg-indigo-600 border-indigo-600 text-white" : "bg-white",
          className
        )}
      >
        {checked && <Check className="size-3 stroke-[3]" />}
      </button>
    );
  }
);
Checkbox.displayName = "Checkbox";
