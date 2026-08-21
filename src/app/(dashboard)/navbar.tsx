"use client";

import { Images, MessageSquare, PanelLeftOpen, PanelLeftClose, Plus, RefreshCw, Search } from "lucide-react";
import { useRouter } from "next/navigation";
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
  const router = useRouter();
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

      <div className="ml-3 hidden items-center gap-1 lg:flex">
        <span className="mr-2 rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-[11px] font-bold text-emerald-700">Live</span>
        <Button variant="ghost" size="sm" className="text-xs text-slate-600" onClick={() => window.location.reload()}><RefreshCw className="mr-1.5 size-3.5" />Sync</Button>
        <Button variant="ghost" size="sm" className="text-xs text-slate-600" onClick={() => router.push("/media")}><Images className="mr-1.5 size-3.5" />Media</Button>
        <Button variant="ghost" size="sm" className="text-xs text-slate-600" onClick={() => router.push("/content-ai?tab=products&action=new")}><Plus className="mr-1.5 size-3.5" />New</Button>
      </div>

      <div className="mx-auto hidden max-w-md flex-1 px-8 xl:block">
        <div className="relative"><Search className="absolute left-3 top-2.5 size-4 text-slate-400" /><input className="h-9 w-full rounded-lg border border-slate-200 bg-white pl-9 pr-3 text-sm outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100" placeholder="Search products, campaigns and media" /></div>
      </div>

      <div className="ml-auto flex items-center gap-2">
        <Button variant="ghost" size="icon" className="relative size-9 text-slate-500"><MessageSquare className="size-4" /><span className="absolute right-1 top-1 size-2 rounded-full bg-indigo-500" /></Button>
        <UserButton />
      </div>
    </nav>
  );
};
