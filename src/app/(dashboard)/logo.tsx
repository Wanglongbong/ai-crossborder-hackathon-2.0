"use client";

import Link from "next/link";
import Image from "next/image";
import { Space_Grotesk } from "next/font/google";

import { cn } from "@/lib/utils";
import { useSidebar } from "@/hooks/use-sidebar";

const font = Space_Grotesk({
  weight: ["700"],
  subsets: ["latin"],
});

export const Logo = () => {
  const { isCollapsed } = useSidebar();

  return (
    <Link href="/">
      <div
        className={cn(
          "flex items-center gap-x-2 hover:opacity-75 transition h-[68px] px-4",
          isCollapsed && "justify-center px-2"
        )}
      >
        <div className="size-8 relative shrink-0">
          <Image src="/logo.svg" alt="The Canvas" fill />
        </div>
        {!isCollapsed && (
          <h1 className={cn(font.className, "text-xl font-bold truncate")}>
            The Canvas
          </h1>
        )}
      </div>
    </Link>
  );
};
