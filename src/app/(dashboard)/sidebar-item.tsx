"use client";

import Link from "next/link";
import type { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { useSidebar } from "@/hooks/use-sidebar";
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";

interface SidebarItemProps {
  icon: LucideIcon;
  label: string;
  href: string;
  isActive?: boolean;
  onClick?: () => void;
}

export const SidebarItem = ({
  icon: Icon,
  label,
  href,
  isActive,
  onClick,
}: SidebarItemProps) => {
  const { isCollapsed } = useSidebar();

  const content = (
    <Link href={href} onClick={onClick} className="block w-full">
      <div
        className={cn(
          "flex items-center px-3 py-3 rounded-xl bg-transparent hover:bg-white transition-all duration-200",
          isActive && "bg-white shadow-sm font-bold text-indigo-600",
          isCollapsed && "justify-center px-2"
        )}
      >
        <Icon className={cn("size-4 stroke-2 shrink-0", !isCollapsed && "mr-2.5")} />
        {!isCollapsed && (
          <span className="text-sm font-medium truncate leading-none">{label}</span>
        )}
      </div>
    </Link>
  );

  if (isCollapsed) {
    return (
      <TooltipProvider>
        <Tooltip delayDuration={100}>
          <TooltipTrigger asChild>{content}</TooltipTrigger>
          <TooltipContent side="right" className="font-semibold text-xs">
            {label}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  return content;
};
