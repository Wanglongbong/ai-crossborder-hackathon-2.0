"use client";

import { Navbar } from "./navbar";
import { Sidebar } from "./sidebar";
import { useSidebar } from "@/hooks/use-sidebar";
import { cn } from "@/lib/utils";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const { isCollapsed } = useSidebar();

  return (
    <div className="bg-muted h-full">
      <Sidebar />
      <div
        className={cn(
          "flex flex-col h-full transition-all duration-300",
          isCollapsed ? "lg:pl-[72px]" : "lg:pl-[300px]"
        )}
      >
        <Navbar />
        <main className="bg-white flex-1 overflow-auto p-8 lg:rounded-tl-2xl">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
