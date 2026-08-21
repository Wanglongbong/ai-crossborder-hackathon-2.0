"use client";

import { ReactNode, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Activity,
  BarChart3,
  BookOpen,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  CirclePause,
  CircleX,
  Clock3,
  ExternalLink,
  FileText,
  Globe2,
  HeartPulse,
  Mail,
  MapPin,
  MessageSquareText,
  Newspaper,
  Package,
  PenLine,
  Search,
  Settings2,
  ShoppingCart,
  Sparkles,
  Star,
  Store,
  TrendingUp,
  X,
} from "lucide-react";
import { toast } from "sonner";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

type ActivityItem = { date: string; title: string };

const reviews = [
  { author: "Lý Mỹ Duyên", text: "[TEST] Kiểm tra đơn hàng thành công, thông tin hiển thị chính xác.", stars: 5 },
  { author: "Đặng Gia Bảo", text: "[TEST] Nội dung sản phẩm rõ ràng, hỗ trợ tốt khi cần.", stars: 5 },
  { author: "Ngô Thanh Mai", text: "[TEST] Giao diện sử dụng dễ hiểu, phù hợp nhu cầu cơ bản.", stars: 4 },
  { author: "Bùi Quốc Huy", text: "[TEST] Đã nhận thông tin đầy đủ, thời gian xử lý nhanh.", stars: 5 },
  { author: "Hoàng Thu Hà", text: "[TEST] Sản phẩm hoạt động ổn định, thao tác kích hoạt đơn giản.", stars: 5 },
];

const initialActivity: ActivityItem[] = [
  { date: "Aug 9th, 12:48", title: "5 cách xây dựng kho tài nguyên số hiệu quả" },
  { date: "Aug 7th, 19:46", title: "Cách chọn khóa học online phù hợp với mục tiêu" },
  { date: "Aug 5th, 19:46", title: "Mua sản phẩm số an tâm: 4 điều cần kiểm tra" },
  { date: "Aug 3rd, 19:46", title: "Tối ưu một ngày làm việc với công cụ AI" },
  { date: "Aug 1st, 19:46", title: "Xây dựng thư viện ebook cá nhân gọn gàng" },
];

const news = [
  "AI Creates Opportunity While Artists Ship at WordCamp US 2026",
  "WordPress 7.1 “Mary Lou”",
  "Matt: Homework from WordCamp",
  "Open Channels FM: AI for the Rest of Us",
  "WordPress.org blog: AI Creates Opportunity While Artists Ship at WordCamp US 2026",
];

export function CommerceOperationsDashboard() {
  const router = useRouter();
  const [showSmtpNotice, setShowSmtpNotice] = useState(true);
  const [draftTitle, setDraftTitle] = useState("");
  const [draftContent, setDraftContent] = useState("");
  const [activity, setActivity] = useState(initialActivity);

  const saveDraft = () => {
    if (!draftTitle.trim()) {
      toast.error("Draft title is required.");
      return;
    }
    const now = new Intl.DateTimeFormat("en", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" }).format(new Date());
    setActivity((current) => [{ date: now, title: `${draftTitle} (Draft)` }, ...current]);
    setDraftTitle("");
    setDraftContent("");
    toast.success("Draft saved to the activity feed.");
  };

  return (
    <div className="mx-auto max-w-[1500px] space-y-5 pb-16">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-indigo-600"><Store className="size-4" />Commerce operations</div>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-950">Dashboard</h1>
          <p className="mt-1 text-sm text-slate-500">WordPress and WooCommerce operations, adapted to your campaign launch workspace.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" onClick={() => router.push("/media")}><Package className="mr-2 size-4" />Media Library</Button>
          <Button onClick={() => router.push("/content-ai?tab=products&action=new")}><ShoppingCart className="mr-2 size-4" />Add Product</Button>
        </div>
      </div>

      {showSmtpNotice && (
        <div className="relative rounded-xl border border-amber-200 border-l-4 border-l-amber-400 bg-amber-50 p-4 pr-12">
          <p className="font-semibold text-amber-950">FluentSMTP needs to be configured for it to work.</p>
          <p className="mt-1 text-sm text-amber-800">Connect an email provider before sending campaign, order or review notifications.</p>
          <Button size="sm" className="mt-3" onClick={() => toast.info("SMTP settings are a frontend prototype in this build.")}><Settings2 className="mr-2 size-4" />Configure FluentSMTP</Button>
          <Button variant="ghost" size="icon" className="absolute right-2 top-2 size-8 text-amber-900" onClick={() => setShowSmtpNotice(false)} aria-label="Dismiss SMTP notice"><X className="size-4" /></Button>
        </div>
      )}

      <div className="grid items-start gap-5 xl:grid-cols-2">
        <div className="space-y-5">
          <DashboardPanel title="Rank Math Overview" icon={TrendingUp}>
            <p className="mb-3 text-sm font-semibold">Latest Blog Posts from Rank Math</p>
            <LinkList items={["Content AI 2.0: Introducing AI SEO Inside WordPress", "The 5 Best Google Search Console Plugins for WordPress You Should Try", "5 Best Schema Markup Plugins for WordPress to Boost Rich Results"]} />
            <PanelFooter actions={["Blog", "Help", "Go Pro"]} />
          </DashboardPanel>

          <DashboardPanel title="WP Sheet Editor Usage" icon={FileText} defaultCollapsed>
            <div className="grid gap-3 sm:grid-cols-3">
              <MiniStat label="Products edited" value="24" />
              <MiniStat label="Rows imported" value="120" />
              <MiniStat label="Bulk jobs" value="3" />
            </div>
            <Button variant="outline" className="mt-4" onClick={() => router.push("/content-ai?tab=products")}>Open product sheet</Button>
          </DashboardPanel>

          <DashboardPanel title="WooCommerce Status" icon={BarChart3}>
            <div className="space-y-4">
              <StatusRow icon={BarChart3} label="Net sales this month" value="0₫" />
              <StatusRow icon={ShoppingCart} label="Top seller this month" value="Tai Nghe Bluetooth True Wireless Chống Ồn Pin 40H" detail="9 sales" />
              <div className="grid grid-cols-2 overflow-hidden rounded-lg border">
                <StatusCell icon={Clock3} label="Awaiting processing" value="0 orders" />
                <StatusCell icon={CirclePause} label="On-hold" value="13 orders" />
                <StatusCell icon={HeartPulse} label="Low in stock" value="0 products" />
                <StatusCell icon={CircleX} label="Out of stock" value="0 products" />
              </div>
              <StatusRow icon={BarChart3} label="Wallet top-up this month" value="0₫" />
            </div>
          </DashboardPanel>

          <DashboardPanel title="WooCommerce Recent Reviews" icon={MessageSquareText}>
            <div className="divide-y">
              {reviews.map((review) => (
                <div className="flex gap-3 py-3 first:pt-0 last:pb-0" key={review.author}>
                  <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-slate-100 text-xs font-bold text-slate-500">{review.author.split(" ").at(-1)?.[0]}</div>
                  <div className="min-w-0 flex-1"><p className="text-sm"><button className="font-semibold text-indigo-600" onClick={() => router.push("/product/mock-skinglow-pro")}>Tai Nghe Bluetooth True Wireless Chống...</button> reviewed by {review.author}</p><p className="mt-1 text-xs text-slate-600">{review.text}</p></div>
                  <div className="flex shrink-0 pt-1">{Array.from({ length: 5 }, (_, index) => <Star key={index} className={cn("size-3", index < review.stars ? "fill-amber-400 text-amber-400" : "text-slate-300")} />)}</div>
                </div>
              ))}
            </div>
          </DashboardPanel>

          <DashboardPanel title="Site Health Status" icon={HeartPulse}>
            <div className="grid gap-5 sm:grid-cols-[120px_1fr] sm:items-center">
              <div className="text-center"><div className="mx-auto flex size-14 items-center justify-center rounded-full border-4 border-emerald-100"><CheckCircle2 className="size-7 text-emerald-600" /></div><p className="mt-2 text-sm font-bold text-emerald-700">Good</p></div>
              <div><p className="text-sm text-slate-600">Your site’s health is looking good, but there are still some things you can do to improve its performance and security.</p><Button variant="link" className="mt-1 h-auto px-0 text-indigo-600" onClick={() => toast.info("6 site-health recommendations are ready for backend integration.")}>Take a look at the 6 items on the Site Health screen.</Button></div>
            </div>
          </DashboardPanel>

          <DashboardPanel title="At a Glance" icon={Search}>
            <div className="grid gap-3 sm:grid-cols-2"><button className="rounded-lg border p-3 text-left hover:bg-slate-50"><PenLine className="mb-2 size-4 text-indigo-600" /><b className="text-indigo-600">5 Published posts</b></button><button className="rounded-lg border p-3 text-left hover:bg-slate-50"><BookOpen className="mb-2 size-4 text-indigo-600" /><b className="text-indigo-600">7 Published pages</b></button></div>
            <p className="mt-3 text-xs text-slate-500">Next.js 14.2.4 running The Canvas commerce theme.</p>
          </DashboardPanel>

          <DashboardPanel title="Activity" icon={Activity}>
            <p className="mb-3 text-sm font-semibold">Recently Published</p>
            <div className="divide-y rounded-lg border">{activity.map((item, index) => <div className="grid gap-1 px-3 py-2 text-sm sm:grid-cols-[130px_1fr]" key={`${item.date}-${index}`}><span className="text-xs text-slate-500">{item.date}</span><button className="text-left font-medium text-indigo-600 hover:underline">{item.title}</button></div>)}</div>
          </DashboardPanel>

          <DashboardPanel title="Fluent SMTP" icon={Mail}>
            <div className="overflow-hidden rounded-lg border"><table className="w-full text-left text-sm"><thead className="bg-slate-50 text-xs text-slate-500"><tr><th className="p-3">Date</th><th className="p-3">Sent</th><th className="p-3">Failed</th></tr></thead><tbody>{[["Today", "0", "0"], ["Last 7 days", "0", "0"], ["All", "0", "0"]].map((row) => <tr className="border-t" key={row[0]}>{row.map((cell) => <td className="p-3" key={cell}>{cell}</td>)}</tr>)}</tbody></table></div>
            <Button variant="link" className="mt-2 h-auto px-0" onClick={() => toast.info("SMTP report view is ready for API integration.")}>View All</Button>
          </DashboardPanel>
        </div>

        <div className="space-y-5">
          <DashboardPanel title="WooCommerce Setup" icon={Store}>
            <div className="flex items-start justify-between gap-5">
              <div><Badge variant="outline" className="rounded-full"><span className="mr-2 size-2 rounded-full bg-indigo-500" />Step 5 of 5</Badge><h3 className="mt-4 font-bold">Collect sales tax</h3><p className="mt-2 text-sm text-slate-500">Set your store location and configure tax rate settings.</p><Button className="mt-5" onClick={() => router.push("/content-ai?tab=products")}>Let&apos;s go</Button></div>
              <div className="hidden size-28 shrink-0 items-center justify-center rounded-full bg-indigo-50 sm:flex"><Settings2 className="size-12 text-indigo-500" /></div>
            </div>
          </DashboardPanel>

          <DashboardPanel title="WordPress Events and News" icon={Newspaper}>
            <div className="flex items-center gap-2 border-b pb-3 text-sm"><span>Attend an upcoming event near you.</span><Button variant="link" className="h-auto p-0" onClick={() => toast.info("Location selector opened in the WordPress backend.")}><MapPin className="mr-1 size-4" />Select location</Button></div>
            <div className="my-3 rounded-md border-l-4 border-indigo-500 bg-indigo-50 p-3 text-sm">There are no events scheduled near you at the moment. Would you like to <button className="text-indigo-600 underline">organize a WordPress event?</button></div>
            <LinkList items={news} />
            <PanelFooter actions={["Meetups", "WordCamps", "News"]} />
          </DashboardPanel>

          <DashboardPanel title="Quick Draft" icon={PenLine}>
            <div className="space-y-4"><div className="space-y-1.5"><Label htmlFor="draft-title">Title</Label><Input id="draft-title" value={draftTitle} onChange={(event) => setDraftTitle(event.target.value)} /></div><div className="space-y-1.5"><Label htmlFor="draft-content">Content</Label><Textarea id="draft-content" value={draftContent} onChange={(event) => setDraftContent(event.target.value)} placeholder="What’s on your mind?" rows={6} /></div><Button onClick={saveDraft}>Save Draft</Button></div>
          </DashboardPanel>
        </div>
      </div>
    </div>
  );
}

function DashboardPanel({ title, icon: Icon, children, defaultCollapsed = false }: { title: string; icon: typeof Store; children: ReactNode; defaultCollapsed?: boolean }) {
  const [collapsed, setCollapsed] = useState(defaultCollapsed);
  return <Card className="overflow-hidden shadow-sm"><CardHeader className="flex-row items-center justify-between border-b bg-slate-50/70 px-4 py-3"><CardTitle className="flex items-center gap-2 text-sm"><Icon className="size-4 text-slate-600" />{title}</CardTitle><div className="flex"><Button variant="ghost" size="icon" className="size-7" onClick={() => toast.info(`${title} moved up in the original WordPress dashboard.`)} aria-label={`Move ${title} up`}><ChevronUp className="size-3.5" /></Button><Button variant="ghost" size="icon" className="size-7" onClick={() => setCollapsed((value) => !value)} aria-label={`${collapsed ? "Expand" : "Collapse"} ${title}`}><ChevronDown className={cn("size-4 transition-transform", !collapsed && "rotate-180")} /></Button></div></CardHeader>{!collapsed && <CardContent className="p-4">{children}</CardContent>}</Card>;
}

function LinkList({ items }: { items: string[] }) { return <ul className="space-y-2">{items.map((item, index) => <li className="flex items-start gap-2 text-sm" key={item}>{index === 0 && <Badge className="mt-0.5 bg-violet-100 px-1.5 py-0 text-[10px] text-violet-700 hover:bg-violet-100">NEW</Badge>}<button className="text-left font-medium text-indigo-600 hover:underline">{item}</button></li>)}</ul>; }
function PanelFooter({ actions }: { actions: string[] }) { return <div className="-mx-4 -mb-4 mt-4 flex flex-wrap gap-4 border-t bg-slate-50/70 px-4 py-3">{actions.map((action) => <button className="flex items-center text-xs font-semibold text-indigo-600 hover:underline" key={action}>{action}<ExternalLink className="ml-1 size-3" /></button>)}</div>; }
function MiniStat({ label, value }: { label: string; value: string }) { return <div className="rounded-lg border bg-slate-50 p-3"><p className="text-xs text-slate-500">{label}</p><p className="mt-1 text-xl font-bold">{value}</p></div>; }
function StatusRow({ icon: Icon, label, value, detail }: { icon: typeof Store; label: string; value: string; detail?: string }) { return <div className="flex items-start gap-3"><Icon className="mt-1 size-4 shrink-0 text-slate-500" /><div><p className="text-xs text-slate-500">{label}</p><p className="font-semibold">{value}</p>{detail && <p className="text-xs text-slate-500">({detail})</p>}</div></div>; }
function StatusCell({ icon: Icon, label, value }: { icon: typeof Store; label: string; value: string }) { return <button className="flex items-start gap-3 border-b border-r p-3 text-left last:border-r-0 hover:bg-slate-50"><Icon className="mt-0.5 size-4 shrink-0 text-slate-500" /><span><span className="block text-xs text-slate-500">{label}</span><b className="text-sm">{value}</b></span></button>; }
