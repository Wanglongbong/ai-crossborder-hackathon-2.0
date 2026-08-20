"use client";

import { PanelLeftOpen, PanelLeftClose } from "lucide-react";
import { UserButton } from "@/features/auth/components/user-button";
import { useSidebar } from "@/hooks/use-sidebar";
import { Button } from "@/components/ui/button";
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";

export const Navbar = () => {
  const { isCollapsed, toggle } = useSidebar();

  return (
    <nav className="w-full flex items-center justify-between p-4 h-[68px]">
      <div className="flex items-center gap-x-2">
        <TooltipProvider>
          <Tooltip delayDuration={100}>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={toggle}
                className="size-9 text-slate-600 hover:text-slate-900 border border-slate-200/80 bg-white shadow-sm"
              >
                {isCollapsed ? (
                  <PanelLeftOpen className="size-4 text-indigo-600" />
                ) : (
                  <PanelLeftClose className="size-4 text-slate-500" />
                )}
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right" className="font-semibold text-xs">
              {isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <div className="ml-auto">
        <UserButton />
      </div>
    </nav>
  );
};
