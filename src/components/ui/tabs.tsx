"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface TabsContextValue {
  value?: string;
  onValueChange?: (value: string) => void;
}

const TabsContext = React.createContext<TabsContextValue>({});

export interface TabsProps {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  className?: string;
  children?: React.ReactNode;
}

export const Tabs = ({
  value: controlledValue,
  defaultValue,
  onValueChange,
  className,
  children,
}: TabsProps) => {
  const [value, setValue] = React.useState(controlledValue || defaultValue || "");

  const activeValue = controlledValue !== undefined ? controlledValue : value;

  const handleValueChange = React.useCallback(
    (newValue: string) => {
      setValue(newValue);
      onValueChange?.(newValue);
    },
    [onValueChange]
  );

  return (
    <TabsContext.Provider value={{ value: activeValue, onValueChange: handleValueChange }}>
      <div className={cn("w-full", className)}>{children}</div>
    </TabsContext.Provider>
  );
};

export const TabsList = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "inline-flex h-11 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground",
        className
      )}
    >
      {children}
    </div>
  );
};

export const TabsTrigger = ({
  value,
  className,
  children,
}: {
  value: string;
  className?: string;
  children?: React.ReactNode;
}) => {
  const context = React.useContext(TabsContext);
  const isActive = context.value === value;

  return (
    <button
      type="button"
      onClick={() => context.onValueChange?.(value)}
      className={cn(
        "inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
        isActive
          ? "bg-white text-slate-900 shadow-sm font-bold border border-slate-200"
          : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/60",
        className
      )}
    >
      {children}
    </button>
  );
};

export const TabsContent = ({
  value,
  className,
  children,
}: {
  value: string;
  className?: string;
  children?: React.ReactNode;
}) => {
  const context = React.useContext(TabsContext);
  if (context.value !== value) return null;

  return <div className={cn("ring-offset-background focus-visible:outline-none", className)}>{children}</div>;
};
