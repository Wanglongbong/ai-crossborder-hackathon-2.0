"use client";

import { ChangeEvent, useMemo, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Check,
  FileImage,
  Grid2X2,
  Image as ImageIcon,
  List,
  Plus,
  Search,
  Trash2,
  UploadCloud,
  X,
} from "lucide-react";
import { toast } from "sonner";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { mockProducts } from "@/features/campaign/mock-data";
import { cn } from "@/lib/utils";

type MediaItem = {
  id: string;
  name: string;
  url: string;
  type: "image" | "video";
  mime: string;
  size: string;
  uploaded: string;
  source: string;
  alt: string;
  attachedTo?: string;
};

const extraMedia: MediaItem[] = [
  {
    id: "campaign-cover",
    name: "campaign-collection-cover.jpg",
    url: "https://images.unsplash.com/photo-1612817288484-6f916006741a?auto=format&fit=crop&w=1200&q=85",
    type: "image",
    mime: "image/jpeg",
    size: "428 KB",
    uploaded: "Today",
    source: "Campaign collection",
    alt: "Skincare campaign collection on a clean studio surface",
    attachedTo: "Q3 Barrier Recovery Launch",
  },
  {
    id: "marketplace-cover",
    name: "marketplace-square-cover.jpg",
    url: "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?auto=format&fit=crop&w=1200&q=85",
    type: "image",
    mime: "image/jpeg",
    size: "512 KB",
    uploaded: "Yesterday",
    source: "Seedream output",
    alt: "Marketplace product cover",
    attachedTo: "SkinGlow Pro 10% Niacinamide Serum",
  },
  {
    id: "lifestyle-shot",
    name: "morning-routine-lifestyle.jpg",
    url: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=1200&q=85",
    type: "image",
    mime: "image/jpeg",
    size: "386 KB",
    uploaded: "2 days ago",
    source: "Product source",
    alt: "Morning skincare routine",
  },
];

const productMedia: MediaItem[] = mockProducts.flatMap((product) =>
  product.assets.map((asset) => ({
    id: `${product.id}-${asset.id}`,
    name: `${product.sku.toLowerCase()}-${asset.name.toLowerCase().replace(/\s+/g, "-")}.jpg`,
    url: asset.url,
    type: "image" as const,
    mime: "image/jpeg",
    size: "320 KB",
    uploaded: "This week",
    source: asset.role,
    alt: asset.name,
    attachedTo: product.name,
  })),
);

const initialMedia = [...productMedia, ...extraMedia];

export default function MediaLibraryPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const inputRef = useRef<HTMLInputElement>(null);
  const [items, setItems] = useState<MediaItem[]>(initialMedia);
  const [query, setQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [view, setView] = useState<"grid" | "list">("grid");
  const [selectedId, setSelectedId] = useState<string | null>(initialMedia[0]?.id ?? null);
  const showUploader = searchParams.get("action") === "upload";

  const selected = items.find((item) => item.id === selectedId) ?? null;
  const filtered = useMemo(
    () =>
      items.filter((item) => {
        const matchesType = typeFilter === "all" || item.type === typeFilter;
        const haystack = `${item.name} ${item.alt} ${item.source} ${item.attachedTo ?? ""}`.toLowerCase();
        return matchesType && haystack.includes(query.toLowerCase());
      }),
    [items, query, typeFilter],
  );

  const onFiles = (event: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files ?? []);
    if (!files.length) return;

    const additions = files.map<MediaItem>((file, index) => ({
      id: `local-${Date.now()}-${index}`,
      name: file.name,
      url: URL.createObjectURL(file),
      type: file.type.startsWith("video/") ? "video" : "image",
      mime: file.type || "application/octet-stream",
      size: formatBytes(file.size),
      uploaded: "Just now",
      source: "Local upload",
      alt: file.name.replace(/\.[^.]+$/, "").replace(/[-_]+/g, " "),
    }));

    setItems((current) => [...additions, ...current]);
    setSelectedId(additions[0].id);
    router.push("/media");
    toast.success(`${files.length} media file${files.length > 1 ? "s" : ""} added to this demo session.`);
    event.target.value = "";
  };

  const removeSelected = () => {
    if (!selected) return;
    setItems((current) => current.filter((item) => item.id !== selected.id));
    setSelectedId(null);
    toast.success("Media item removed from this demo session.");
  };

  const updateSelected = (patch: Partial<MediaItem>) => {
    if (!selected) return;
    setItems((current) => current.map((item) => (item.id === selected.id ? { ...item, ...patch } : item)));
  };

  return (
    <div className="mx-auto max-w-7xl space-y-5 pb-12">
      <div className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-gradient-to-r from-slate-950 to-slate-800 p-6 text-white md:flex-row md:items-center md:justify-between">
        <div>
          <Badge className="bg-white/15 text-white hover:bg-white/15">Commerce asset library</Badge>
          <h1 className="mt-3 text-2xl font-bold">Media Library</h1>
          <p className="mt-2 max-w-2xl text-sm text-slate-300">
            Keep product sources, generated campaign assets and marketplace exports in one reusable library.
          </p>
        </div>
        <Button className="bg-white text-slate-950 hover:bg-slate-100" onClick={() => router.push("/media?action=upload")}>
          <Plus className="mr-2 size-4" /> Add Media File
        </Button>
      </div>

      {showUploader && (
        <Card className="border-dashed border-indigo-300 bg-indigo-50/40">
          <CardContent className="relative flex min-h-56 flex-col items-center justify-center p-8 text-center">
            <Button className="absolute right-3 top-3" variant="ghost" size="icon" onClick={() => router.push("/media")}>
              <X className="size-4" />
            </Button>
            <div className="rounded-full bg-white p-4 shadow-sm">
              <UploadCloud className="size-8 text-indigo-600" />
            </div>
            <h2 className="mt-4 font-bold">Drop files to upload</h2>
            <p className="mt-1 text-sm text-slate-500">Images and videos are added locally for this prototype session.</p>
            <Button className="mt-5" onClick={() => inputRef.current?.click()}>Select Files</Button>
          </CardContent>
        </Card>
      )}

      <input ref={inputRef} type="file" className="hidden" accept="image/*,video/*" multiple onChange={onFiles} />

      <div className="flex flex-wrap items-center gap-3 rounded-xl border bg-white p-3">
        <select value={typeFilter} onChange={(event) => setTypeFilter(event.target.value)} className="h-10 rounded-md border bg-white px-3 text-sm">
          <option value="all">All media items</option>
          <option value="image">Images</option>
          <option value="video">Videos</option>
        </select>
        <div className="relative min-w-[240px] flex-1">
          <Search className="absolute left-3 top-2.5 size-4 text-slate-400" />
          <Input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search media" className="pl-9" />
        </div>
        <div className="flex rounded-md border p-1">
          <Button variant={view === "grid" ? "secondary" : "ghost"} size="icon" className="size-8" onClick={() => setView("grid")} aria-label="Grid view"><Grid2X2 className="size-4" /></Button>
          <Button variant={view === "list" ? "secondary" : "ghost"} size="icon" className="size-8" onClick={() => setView("list")} aria-label="List view"><List className="size-4" /></Button>
        </div>
        <span className="text-xs text-slate-500">{filtered.length} items</span>
      </div>

      <div className={cn("grid gap-5", selected && "xl:grid-cols-[1fr_320px]")}>
        {view === "grid" ? (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5">
            {filtered.map((item) => (
              <button key={item.id} type="button" onClick={() => setSelectedId(item.id)} className={cn("group relative overflow-hidden rounded-lg border bg-white text-left transition hover:border-indigo-300 hover:shadow-sm", selectedId === item.id && "border-indigo-500 ring-2 ring-indigo-100")}>
                {item.type === "image" ? <img src={item.url} alt={item.alt} className="aspect-square w-full object-cover" /> : <div className="flex aspect-square items-center justify-center bg-slate-100"><FileImage className="size-8 text-slate-400" /></div>}
                {selectedId === item.id && <span className="absolute right-2 top-2 rounded-full bg-indigo-600 p-1 text-white"><Check className="size-3" /></span>}
                <div className="p-2.5"><p className="truncate text-xs font-semibold">{item.name}</p><p className="mt-1 truncate text-[11px] text-slate-500">{item.source}</p></div>
              </button>
            ))}
          </div>
        ) : (
          <Card><CardContent className="p-0"><div className="divide-y">{filtered.map((item) => <button key={item.id} onClick={() => setSelectedId(item.id)} className={cn("flex w-full items-center gap-3 p-3 text-left hover:bg-slate-50", selectedId === item.id && "bg-indigo-50")}><img src={item.url} alt={item.alt} className="size-12 rounded object-cover" /><div className="min-w-0 flex-1"><p className="truncate text-sm font-semibold">{item.name}</p><p className="text-xs text-slate-500">{item.mime} · {item.size}</p></div><span className="hidden text-xs text-slate-500 md:block">{item.attachedTo ?? "Unattached"}</span></button>)}</div></CardContent></Card>
        )}

        {selected && (
          <aside className="h-fit overflow-hidden rounded-xl border bg-white xl:sticky xl:top-4">
            <div className="flex items-center justify-between border-b bg-slate-50 px-4 py-3"><p className="text-sm font-bold">Attachment details</p><Button variant="ghost" size="icon" className="size-7" onClick={() => setSelectedId(null)}><X className="size-4" /></Button></div>
            {selected.type === "image" ? <img src={selected.url} alt={selected.alt} className="aspect-video w-full object-cover" /> : <div className="flex aspect-video items-center justify-center bg-slate-100"><ImageIcon className="size-10 text-slate-400" /></div>}
            <div className="space-y-4 p-4">
              <div><p className="break-all text-sm font-semibold">{selected.name}</p><p className="mt-1 text-xs text-slate-500">{selected.uploaded} · {selected.size} · {selected.mime}</p></div>
              <div className="space-y-1.5"><Label className="text-xs">Alternative Text</Label><Textarea value={selected.alt} onChange={(event) => updateSelected({ alt: event.target.value })} rows={3} /></div>
              <div className="space-y-1.5"><Label className="text-xs">File name</Label><Input value={selected.name} onChange={(event) => updateSelected({ name: event.target.value })} /></div>
              <div className="rounded-lg bg-slate-50 p-3 text-xs text-slate-600"><b>Attached to</b><br />{selected.attachedTo ?? "Unattached"}<br /><span className="text-slate-400">Source: {selected.source}</span></div>
              <Button variant="outline" className="w-full text-rose-600 hover:text-rose-700" onClick={removeSelected}><Trash2 className="mr-2 size-4" />Delete permanently</Button>
            </div>
          </aside>
        )}
      </div>
    </div>
  );
}

function formatBytes(bytes: number) {
  if (bytes === 0) return "0 B";
  const units = ["B", "KB", "MB", "GB"];
  const index = Math.min(Math.floor(Math.log(bytes) / Math.log(1024)), units.length - 1);
  return `${(bytes / 1024 ** index).toFixed(index === 0 ? 0 : 1)} ${units[index]}`;
}
