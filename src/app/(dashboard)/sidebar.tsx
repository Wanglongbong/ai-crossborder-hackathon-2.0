"use client";

import { Logo } from "./logo";
import { SidebarRoutes } from "./sidebar-routes";
import { useSidebar } from "@/hooks/use-sidebar";
import { cn } from "@/lib/utils";

export const Sidebar = () => {
  const { isCollapsed } = useSidebar();

  return (
    <aside
      className={cn(
        "hidden lg:flex fixed flex-col left-0 shrink-0 h-full border-r bg-muted/40 transition-all duration-300 z-40",
        isCollapsed ? "w-[72px]" : "w-[300px]"
      )}
    >
      <Logo />
      <SidebarRoutes />
    </aside>
  );
};
