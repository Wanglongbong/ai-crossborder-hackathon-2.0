"use client";

import { useState } from "react";
import {
  CreditCard,
  Crown,
  Home,
  MessageCircleQuestion,
  Store,
  Megaphone,
  Package,
  FolderTree,
  Palette,
  Tag,
  Compass,
  BarChart3,
  ChevronDown,
  Images,
  FilePlus2,
} from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { usePaywall } from "@/features/subscriptions/hooks/use-paywall";
import { useCheckout } from "@/features/subscriptions/api/use-checkout";
import { useBilling } from "@/features/subscriptions/api/use-billing";
import { useSidebar } from "@/hooks/use-sidebar";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

import { SidebarItem } from "./sidebar-item";

export const SidebarRoutes = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentTab = searchParams.get("tab") || "products";

  const mutation = useCheckout();
  const billingMutation = useBilling();
  const { shouldBlock, isLoading, triggerPaywall } = usePaywall();
  const { isCollapsed } = useSidebar();

  const isStoreActive = pathname.startsWith("/content-ai") || pathname.startsWith("/product");
  const isMediaActive = pathname.startsWith("/media");
  const [isStoreMenuOpen, setIsStoreMenuOpen] = useState(true);
  const [isMediaMenuOpen, setIsMediaMenuOpen] = useState(true);

  const onClickBilling = () => {
    if (shouldBlock) {
      triggerPaywall();
      return;
    }
    billingMutation.mutate();
  };

  const storeSubItems = [
    { label: "All Products", tab: "products", icon: Package },
    { label: "Add New Product", tab: "products", action: "new", icon: FilePlus2 },
    { label: "Categories", tab: "categories", icon: FolderTree },
    { label: "Brands", tab: "brands", icon: Palette },
    { label: "Tags", tab: "tags", icon: Tag },
    { label: "Insights", tab: "insights", icon: Compass },
    { label: "Metrics", tab: "metrics", icon: BarChart3 },
  ];

  return (
    <div className="flex flex-col gap-y-4 flex-1">
      {shouldBlock && !isLoading && (
        <>
          <div className="px-3">
            {isCollapsed ? (
              <TooltipProvider>
                <Tooltip delayDuration={100}>
                  <TooltipTrigger asChild>
                    <Button
                      onClick={() => mutation.mutate()}
                      disabled={mutation.isPending}
                      className="w-full h-10 rounded-xl border-none hover:bg-white hover:opacity-75 transition p-0 flex items-center justify-center"
                      variant="outline"
                    >
                      <Crown className="size-5 fill-yellow-500 text-yellow-500" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="right" className="font-semibold text-xs">
                    Upgrade to Pro
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ) : (
              <Button
                onClick={() => mutation.mutate()}
                disabled={mutation.isPending}
                className="w-full rounded-xl border-none hover:bg-white hover:opacity-75 transition font-semibold"
                variant="outline"
                size="lg"
              >
                <Crown className="mr-2 size-4 fill-yellow-500 text-yellow-500" />
                Upgrade to Pro
              </Button>
            )}
          </div>
          <div className="px-3">
            <Separator />
          </div>
        </>
      )}

      {/* Main Navigation */}
      <div className="px-3 space-y-1">
        <SidebarItem href="/" icon={Home} label="Dashboard" isActive={pathname === "/"} />

        <SidebarItem href="/campaigns" icon={Megaphone} label="Campaigns" isActive={pathname.startsWith("/campaigns") || pathname.startsWith("/workspace")} />

        {/* WordPress-style Media Library */}
        <div>
          <div
            onClick={() => {
              if (isCollapsed) {
                router.push("/media");
              } else {
                setIsMediaMenuOpen(!isMediaMenuOpen);
              }
            }}
            className={cn(
              "flex items-center justify-between px-3 py-2.5 rounded-xl cursor-pointer transition-all text-xs font-semibold select-none",
              isMediaActive
                ? "bg-white shadow-xs text-indigo-700 font-bold border border-slate-200/60"
                : "text-slate-700 hover:bg-slate-200/60",
              isCollapsed && "justify-center px-2"
            )}
          >
            <div className="flex items-center gap-2.5">
              <Images className="size-4 text-indigo-600 shrink-0" />
              {!isCollapsed && <span>Media</span>}
            </div>
            {!isCollapsed && (
              <ChevronDown className={cn("size-3.5 text-slate-400 transition-transform duration-200", isMediaMenuOpen && "rotate-180")} />
            )}
          </div>
          {!isCollapsed && isMediaMenuOpen && (
            <div className="pl-4 pr-1 pt-1 space-y-0.5 border-l-2 border-indigo-100 ml-5 mt-1">
              {[
                { label: "Library", href: "/media", icon: Images },
                { label: "Add Media File", href: "/media?action=upload", icon: FilePlus2 },
              ].map((item) => {
                const ItemIcon = item.icon;
                const isItemActive = isMediaActive && (item.href.includes("action=upload") ? searchParams.get("action") === "upload" : !searchParams.get("action"));
                return (
                  <button key={item.href} type="button" onClick={() => router.push(item.href)} className={cn("flex items-center w-full px-2.5 py-1.5 rounded-lg text-xs transition-colors text-left", isItemActive ? "bg-indigo-50 text-indigo-700 font-bold" : "text-slate-600 hover:bg-slate-100 hover:text-slate-900 font-medium")}>
                    <ItemIcon className={cn("size-3.5 mr-2 shrink-0", isItemActive ? "text-indigo-600" : "text-slate-400")} />
                    <span className="truncate">{item.label}</span>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Products Parent Item */}
        <div>
          <div
            onClick={() => {
              if (isCollapsed) {
                router.push("/content-ai?tab=products");
              } else {
                setIsStoreMenuOpen(!isStoreMenuOpen);
              }
            }}
            className={cn(
              "flex items-center justify-between px-3 py-2.5 rounded-xl cursor-pointer transition-all text-xs font-semibold select-none",
              isStoreActive
                ? "bg-white shadow-xs text-indigo-700 font-bold border border-slate-200/60"
                : "text-slate-700 hover:bg-slate-200/60",
              isCollapsed && "justify-center px-2"
            )}
          >
            <div className="flex items-center gap-2.5">
              <Store className="size-4 text-indigo-600 shrink-0" />
              {!isCollapsed && <span>Products</span>}
            </div>
            {!isCollapsed && (
              <ChevronDown
                className={cn(
                  "size-3.5 text-slate-400 transition-transform duration-200",
                  isStoreMenuOpen && "rotate-180"
                )}
              />
            )}
          </div>

          {/* Sub-menu (WooCommerce style sub-items) */}
          {!isCollapsed && isStoreMenuOpen && (
            <div className="pl-4 pr-1 pt-1 space-y-0.5 border-l-2 border-indigo-100 ml-5 mt-1">
              {storeSubItems.map((sub) => {
                const SubIcon = sub.icon;
                const isSubActive =
                  pathname.startsWith("/content-ai") && currentTab === sub.tab &&
                  ("action" in sub ? searchParams.get("action") === sub.action : !searchParams.get("action"));

                return (
                  <button
                    key={`${sub.tab}-${"action" in sub ? sub.action : "list"}`}
                    type="button"
                    onClick={() => router.push(`/content-ai?tab=${sub.tab}${"action" in sub ? `&action=${sub.action}` : ""}`)}
                    className={cn(
                      "flex items-center w-full px-2.5 py-1.5 rounded-lg text-xs transition-colors text-left",
                      isSubActive
                        ? "bg-indigo-50 text-indigo-700 font-bold"
                        : "text-slate-600 hover:bg-slate-100 hover:text-slate-900 font-medium"
                    )}
                  >
                    <SubIcon className={cn("size-3.5 mr-2 shrink-0", isSubActive ? "text-indigo-600" : "text-slate-400")} />
                    <span className="truncate">{sub.label}</span>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>

      <div className="px-3">
        <Separator />
      </div>

      {/* System Settings */}
      <ul className="flex flex-col gap-y-1 px-3">
        <SidebarItem href={pathname} icon={CreditCard} label="Billing" onClick={onClickBilling} />
        <SidebarItem
          href="mailto:support@example.com"
          icon={MessageCircleQuestion}
          label="Help & Docs"
        />
      </ul>
    </div>
  );
};
