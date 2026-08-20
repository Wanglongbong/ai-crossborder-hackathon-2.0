"use client";

import * as React from "react";
import { ChevronDown, Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface SelectContextType {
  value?: string;
  onValueChange?: (value: string) => void;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  itemsMap: Record<string, React.ReactNode>;
  registerItem: (value: string, label: React.ReactNode) => void;
  placeholder?: string;
  setPlaceholder: React.Dispatch<React.SetStateAction<string | undefined>>;
}

const SelectContext = React.createContext<SelectContextType | null>(null);

export interface SelectProps {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  children?: React.ReactNode;
}

export const Select = ({
  value: controlledValue,
  defaultValue,
  onValueChange,
  children,
}: SelectProps) => {
  const [uncontrolledValue, setUncontrolledValue] = React.useState(defaultValue || "");
  const [isOpen, setIsOpen] = React.useState(false);
  const [itemsMap, setItemsMap] = React.useState<Record<string, React.ReactNode>>({});
  const [placeholder, setPlaceholder] = React.useState<string | undefined>(undefined);

  const containerRef = React.useRef<HTMLDivElement>(null);

  const isControlled = controlledValue !== undefined;
  const currentValue = isControlled ? controlledValue : uncontrolledValue;

  const handleValueChange = (newVal: string) => {
    if (!isControlled) {
      setUncontrolledValue(newVal);
    }
    onValueChange?.(newVal);
    setIsOpen(false);
  };

  const registerItem = React.useCallback((val: string, label: React.ReactNode) => {
    setItemsMap((prev) => {
      if (prev[val] === label) return prev;
      return { ...prev, [val]: label };
    });
  }, []);

  // Handle outside click
  React.useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    }
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isOpen]);

  return (
    <SelectContext.Provider
      value={{
        value: currentValue,
        onValueChange: handleValueChange,
        isOpen,
        setIsOpen,
        itemsMap,
        registerItem,
        placeholder,
        setPlaceholder,
      }}
    >
      <div ref={containerRef} className="relative inline-block w-full">
        {children}
      </div>
    </SelectContext.Provider>
  );
};

export const SelectTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & { className?: string }
>(({ className, children, ...props }, ref) => {
  const context = React.useContext(SelectContext);
  if (!context) return null;

  const currentLabel = context.value ? context.itemsMap[context.value] : null;

  return (
    <button
      type="button"
      ref={ref}
      onClick={() => context.setIsOpen((prev) => !prev)}
      className={cn(
        "flex h-9 w-full items-center justify-between rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-900 shadow-xs ring-offset-background placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 transition-all",
        className
      )}
      {...props}
    >
      <div className="flex-1 text-left truncate">
        {currentLabel || children || (
          <span className="text-slate-400 font-normal">
            {context.placeholder || "Select an option..."}
          </span>
        )}
      </div>
      <ChevronDown
        className={cn(
          "size-4 shrink-0 opacity-60 transition-transform duration-200",
          context.isOpen && "rotate-180"
        )}
      />
    </button>
  );
});
SelectTrigger.displayName = "SelectTrigger";

export const SelectValue = ({ placeholder }: { placeholder?: string }) => {
  const context = React.useContext(SelectContext);

  React.useEffect(() => {
    if (placeholder && context) {
      context.setPlaceholder(placeholder);
    }
  }, [placeholder, context]);

  if (!context) return null;

  if (context.value && context.itemsMap[context.value]) {
    return <span>{context.itemsMap[context.value]}</span>;
  }

  return (
    <span className="text-slate-400 font-normal">
      {placeholder || "Select an option..."}
    </span>
  );
};

export const SelectContent = ({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) => {
  const context = React.useContext(SelectContext);
  if (!context || !context.isOpen) return null;

  return (
    <div
      className={cn(
        "absolute left-0 top-full z-50 mt-1.5 w-full min-w-[8rem] max-h-60 overflow-y-auto rounded-xl border border-slate-200 bg-white p-1 text-slate-900 shadow-xl animate-in fade-in-0 zoom-in-95",
        className
      )}
    >
      {children}
    </div>
  );
};

export const SelectItem = ({
  value,
  children,
  className,
}: {
  value: string;
  children?: React.ReactNode;
  className?: string;
}) => {
  const context = React.useContext(SelectContext);

  React.useEffect(() => {
    if (context && value) {
      context.registerItem(value, children);
    }
  }, [context, value, children]);

  if (!context) return null;

  const isSelected = context.value === value;

  return (
    <div
      onClick={() => context.onValueChange?.(value)}
      className={cn(
        "relative flex w-full cursor-pointer select-none items-center justify-between rounded-lg py-2 px-3 text-xs font-medium outline-none transition-colors hover:bg-indigo-50 hover:text-indigo-900",
        isSelected && "bg-indigo-50 text-indigo-700 font-semibold",
        className
      )}
    >
      <span className="truncate">{children}</span>
      {isSelected && <Check className="size-3.5 text-indigo-600 shrink-0 ml-2" />}
    </div>
  );
};
