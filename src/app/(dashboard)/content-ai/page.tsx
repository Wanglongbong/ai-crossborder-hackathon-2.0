"use client";

import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { formatDistanceToNow } from "date-fns";
import {
  Package,
  Plus,
  Search,
  FolderTree,
  Palette,
  Tag as TagIcon,
  Compass,
  BarChart3,
  Edit2,
  Trash2,
  Copy,
  Sparkles,
  Layers,
  FileSpreadsheet,
} from "lucide-react";
import { toast } from "sonner";

import { useGetProjects } from "@/features/projects/api/use-get-projects";
import { useDeleteProject } from "@/features/projects/api/use-delete-project";
import { useDuplicateProject } from "@/features/projects/api/use-duplicate-project";
import { CreateProjectModal } from "@/features/projects/components/create-project-modal";
import { useConfirm } from "@/hooks/use-confirm";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

// Master Reusable Entities in English
const INITIAL_CATEGORIES = [
  { id: "cat-1", name: "Dermocosmetics & Skincare", slug: "skincare-dermocosmetics", count: 4, desc: "Serums, barrier creams, scientific clean skincare products." },
  { id: "cat-2", name: "F&B / Functional Beverage", slug: "functional-beverage", count: 2, desc: "Raw sparkling Kombucha, organic cold-pressed juices." },
  { id: "cat-3", name: "Smart Home & Appliances", slug: "smart-home-appliances", count: 3, desc: "LiDAR robot vacuums, smart air purifiers, home automation." },
  { id: "cat-4", name: "Wearables & Consumer Tech", slug: "wearables-consumer-tech", count: 2, desc: "Titanium smartwatches, GPS sports wearables, audio gear." },
];

const INITIAL_BRANDS = [
  { id: "brand-1", name: "SkinGlow Laboratories", logo: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=120&q=80", colors: ["#4F46E5", "#06B6D4"], tone: "Clinical, Evidence-Based, Sophisticated & Pure", count: 3 },
  { id: "brand-2", name: "ZenFresh Beverages", logo: "https://images.unsplash.com/photo-1556881286-fc6915169721?auto=format&fit=crop&w=120&q=80", colors: ["#10B981", "#F59E0B"], tone: "Vibrant, Refreshing, Athletic & Natural", count: 1 },
  { id: "brand-3", name: "EcoClean Tech", logo: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=120&q=80", colors: ["#1E293B", "#38BDF8"], tone: "Pioneering, Futuristic, Premium & Reliable", count: 2 },
  { id: "brand-4", name: "CyberWatch Pro", logo: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=120&q=80", colors: ["#EA580C", "#0F172A"], tone: "Rugged, Powerful, High-Performance & Bold", count: 1 },
];

const INITIAL_TAGS = [
  { id: "tag-1", name: "Niacinamide10", slug: "niacinamide-10", count: 3 },
  { id: "tag-2", name: "DarkSpotCorrector", slug: "dark-spot-corrector", count: 4 },
  { id: "tag-3", name: "ZeroSugar", slug: "zero-sugar", count: 2 },
  { id: "tag-4", name: "LiDAR4Navigation", slug: "lidar-4", count: 2 },
  { id: "tag-5", name: "TikTokShopDeal", slug: "tiktok-shop-deal", count: 5 },
  { id: "tag-6", name: "FlashSale1111", slug: "flash-sale-11-11", count: 4 },
];

const INITIAL_INSIGHTS = [
  { id: "ins-1", season: "Mega Holiday Shopping & Black Friday Sale", trendKeywords: "Flash Sale, 40% Off Bundle, Free Shipping, Real Customer Testimonials", painPoints: "Worry of counterfeit products, high prices, needing official warranty.", goal: "Maximize high-volume retail conversions & rapid stock turnover." },
  { id: "ins-2", season: "Post-Summer Barrier Recovery / Seasonal Shift", trendKeywords: "Radiant Serum, Barrier Recovery, Clean Skincare Routine, Hyaluronic Hydration", painPoints: "Stubborn dark spots, uneven complexion, fear of sticky residue or irritation.", goal: "Boost conversion rate (CVR) and establish long-term customer retention." },
  { id: "ins-3", season: "Summer Fitness & Active Wellness Season", trendKeywords: "Healthy Soda, Gut Health, Zero Sugar Detox, Guilt-Free Sparkle", painPoints: "Craving soda but worried about sugar spikes, bloating, and artificial chemicals.", goal: "Ignite impulse purchases on TikTok Shop and repeat multi-pack orders." },
];

// Rich Product Inventory
const MOCK_PRODUCTS = [
  {
    id: "mock-skinglow-pro",
    name: "SkinGlow Pro 10% Pure Niacinamide Serum",
    sku: "SKG-SRM-10N",
    image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=150&q=80",
    regularPrice: "$39.00",
    salePrice: "$26.90",
    stockStatus: "In Stock (450)",
    category: "Dermocosmetics & Skincare",
    brand: "SkinGlow Laboratories",
    tags: ["Niacinamide10", "DarkSpotCorrector", "TikTokShopDeal"],
    aiStatus: "Ready (6 Assets)",
    updatedAt: new Date(Date.now() - 3600000 * 2),
  },
  {
    id: "mock-kombucha-zenfresh",
    name: "ZenFresh Sparkling Organic Kombucha (6-Pack)",
    sku: "ZEN-KMB-06P",
    image: "https://images.unsplash.com/photo-1556881286-fc6915169721?auto=format&fit=crop&w=150&q=80",
    regularPrice: "$24.00",
    salePrice: "$16.50",
    stockStatus: "In Stock (1,200)",
    category: "F&B / Functional Beverage",
    brand: "ZenFresh Beverages",
    tags: ["ZeroSugar", "Probiotics", "FlashSale1111"],
    aiStatus: "Ready (6 Assets)",
    updatedAt: new Date(Date.now() - 3600000 * 8),
  },
  {
    id: "mock-ecoclean-home",
    name: "EcoClean Robotic Vacuum X1 Pro Auto-Empty",
    sku: "ECO-VAC-X1P",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=150&q=80",
    regularPrice: "$799.00",
    salePrice: "$499.00",
    stockStatus: "In Stock (85)",
    category: "Smart Home & Appliances",
    brand: "EcoClean Tech",
    tags: ["LiDAR4Navigation", "PetFriendly", "FlashSale1111"],
    aiStatus: "Ready (6 Assets)",
    updatedAt: new Date(Date.now() - 3600000 * 24),
  },
  {
    id: "mock-cyberwatch-ultra",
    name: "CyberWatch Ultra 2 Titanium GPS Sports",
    sku: "CYB-WCH-U2T",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=150&q=80",
    regularPrice: "$349.00",
    salePrice: "$249.00",
    stockStatus: "In Stock (120)",
    category: "Wearables & Consumer Tech",
    brand: "CyberWatch Pro",
    tags: ["Titanium", "GPSWatch", "RunningGear"],
    aiStatus: "Ready (6 Assets)",
    updatedAt: new Date(Date.now() - 3600000 * 48),
  },
];

export default function CampaignDashboardPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeTab = searchParams.get("tab") || "products";

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState("all");
  const [selectedBrandFilter, setSelectedBrandFilter] = useState("all");
  const [selectedRows, setSelectedRows] = useState<string[]>([]);

  // Local state for reusable entities
  const [categories, setCategories] = useState(INITIAL_CATEGORIES);
  const [brands, setBrands] = useState(INITIAL_BRANDS);
  const [tags, setTags] = useState(INITIAL_TAGS);
  const [insights, setInsights] = useState(INITIAL_INSIGHTS);

  // New Category Form State
  const [newCatName, setNewCatName] = useState("");
  const [newCatSlug, setNewCatSlug] = useState("");
  const [newCatDesc, setNewCatDesc] = useState("");

  // New Brand Form State
  const [newBrandName, setNewBrandName] = useState("");
  const [newBrandTone, setNewBrandTone] = useState("");
  const [newBrandColor1, setNewBrandColor1] = useState("#4F46E5");
  const [newBrandColor2, setNewBrandColor2] = useState("#06B6D4");

  const [ConfirmDialog, confirm] = useConfirm(
    "Confirm Product Deletion",
    "This action will remove the product from the campaign manager. Are you sure you want to proceed?"
  );

  // Filter products
  const products = MOCK_PRODUCTS.filter((p) => {
    const matchSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.sku.toLowerCase().includes(searchQuery.toLowerCase());
    const matchCat = selectedCategoryFilter === "all" || p.category === selectedCategoryFilter;
    const matchBrand = selectedBrandFilter === "all" || p.brand === selectedBrandFilter;
    return matchSearch && matchCat && matchBrand;
  });

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedRows(products.map((p) => p.id));
    } else {
      setSelectedRows([]);
    }
  };

  const handleSelectRow = (id: string) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleAddCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCatName.trim()) return;
    const newCat = {
      id: `cat-${Date.now()}`,
      name: newCatName,
      slug: newCatSlug || newCatName.toLowerCase().replace(/\s+/g, "-"),
      count: 0,
      desc: newCatDesc,
    };
    setCategories([...categories, newCat]);
    setNewCatName("");
    setNewCatSlug("");
    setNewCatDesc("");
    toast.success(`Category added: ${newCat.name}`);
  };

  const handleAddBrand = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBrandName.trim()) return;
    const newBrand = {
      id: `brand-${Date.now()}`,
      name: newBrandName,
      logo: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=120&q=80",
      colors: [newBrandColor1, newBrandColor2],
      tone: newBrandTone || "Clinical, Modern & Evidence-Based",
      count: 0,
    };
    setBrands([...brands, newBrand]);
    setNewBrandName("");
    setNewBrandTone("");
    toast.success(`Brand Kit created: ${newBrand.name}`);
  };

  const navTabs = [
    { label: "Products", tab: "products", icon: Package, count: products.length },
    { label: "Categories", tab: "categories", icon: FolderTree, count: categories.length },
    { label: "Brands", tab: "brands", icon: Palette, count: brands.length },
    { label: "Tags", tab: "tags", icon: TagIcon, count: tags.length },
    { label: "Insights", tab: "insights", icon: Compass, count: insights.length },
    { label: "Metrics", tab: "metrics", icon: BarChart3, count: "CSV" },
  ];

  return (
    <div className="flex flex-col space-y-4 max-w-screen-2xl mx-auto pb-10 px-2 sm:px-4">
      <ConfirmDialog />
      <CreateProjectModal isOpen={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)} />

      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-3.5 rounded-lg border border-slate-200 shadow-2xs">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-slate-100 rounded-md text-slate-700">
            <Layers className="size-5 text-indigo-600" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-bold text-slate-900 tracking-tight">Campaign Manager</h1>
              <Badge variant="outline" className="text-[10px] font-semibold bg-slate-50 text-slate-600">
                E-Commerce Multi-Asset Engine
              </Badge>
            </div>
            <p className="text-xs text-slate-500">
              Manage product catalogs, brand identities, categories, and orchestrate AI campaign packs.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            size="sm"
            onClick={() => setIsCreateModalOpen(true)}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs h-8 px-3.5 shadow-2xs"
          >
            <Plus className="mr-1.5 size-3.5" /> Add Product
          </Button>
        </div>
      </div>

      {/* Navigation Sub-Tabs Bar */}
      <div className="flex items-center gap-1 bg-white p-1 rounded-lg border border-slate-200 shadow-2xs overflow-x-auto">
        {navTabs.map((item) => {
          const ItemIcon = item.icon;
          const isActive = activeTab === item.tab;
          return (
            <button
              key={item.tab}
              onClick={() => router.push(`/content-ai?tab=${item.tab}`)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-semibold transition-all shrink-0 ${
                isActive
                  ? "bg-indigo-50 text-indigo-700 border border-indigo-200/80 shadow-2xs font-bold"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              }`}
            >
              <ItemIcon className={`size-3.5 ${isActive ? "text-indigo-600" : "text-slate-400"}`} />
              <span>{item.label}</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${isActive ? "bg-indigo-200/60 text-indigo-900 font-bold" : "bg-slate-100 text-slate-500"}`}>
                {item.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* ========================================================================= */}
      {/* 1. PRODUCTS VIEW */}
      {/* ========================================================================= */}
      {activeTab === "products" && (
        <div className="space-y-3">
          {/* Status Links */}
          <div className="flex items-center justify-between text-xs text-slate-600 px-1">
            <div className="flex items-center gap-2">
              <span className="font-bold text-indigo-600 cursor-pointer">All ({products.length})</span>
              <span>|</span>
              <span className="hover:text-indigo-600 cursor-pointer">Published ({products.length})</span>
              <span>|</span>
              <span className="hover:text-indigo-600 cursor-pointer">Drafts (0)</span>
              <span>|</span>
              <span className="hover:text-rose-600 cursor-pointer">Trash (0)</span>
            </div>

            <span className="text-[11px] text-slate-400 font-medium">
              Showing {products.length} products
            </span>
          </div>

          {/* Filter & Action Toolbar */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-2.5 bg-white p-3 rounded-lg border border-slate-200 shadow-2xs">
            <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
              <Select>
                <SelectTrigger className="h-8 w-[140px] text-xs bg-slate-50 border-slate-200">
                  <SelectValue placeholder="Bulk actions" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="edit">Edit</SelectItem>
                  <SelectItem value="generate-ai">⚡ Launch AI Pack</SelectItem>
                  <SelectItem value="trash">Move to Trash</SelectItem>
                </SelectContent>
              </Select>
              <Button size="sm" variant="outline" className="h-8 text-xs font-semibold px-2.5">
                Apply
              </Button>

              <Select value={selectedCategoryFilter} onValueChange={setSelectedCategoryFilter}>
                <SelectTrigger className="h-8 w-[180px] text-xs bg-slate-50 border-slate-200">
                  <SelectValue placeholder="Filter by category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map((c) => (
                    <SelectItem key={c.id} value={c.name}>
                      {c.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedBrandFilter} onValueChange={setSelectedBrandFilter}>
                <SelectTrigger className="h-8 w-[170px] text-xs bg-slate-50 border-slate-200">
                  <SelectValue placeholder="Filter by brand" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Brands</SelectItem>
                  {brands.map((b) => (
                    <SelectItem key={b.id} value={b.name}>
                      {b.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="relative w-full md:w-64">
              <Input
                placeholder="Search products, SKU..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-8 pl-8 text-xs bg-slate-50 border-slate-200"
              />
              <Search className="absolute left-2.5 top-2 size-3.5 text-slate-400" />
            </div>
          </div>

          {/* Product List Table */}
          <div className="bg-white rounded-lg border border-slate-200 shadow-2xs overflow-hidden">
            <Table>
              <TableHeader className="bg-slate-50 border-b">
                <TableRow className="hover:bg-transparent">
                  <TableHead className="w-[40px] px-3">
                    <input
                      type="checkbox"
                      onChange={handleSelectAll}
                      checked={selectedRows.length === products.length && products.length > 0}
                      className="rounded border-slate-300 size-3.5 cursor-pointer accent-indigo-600"
                    />
                  </TableHead>
                  <TableHead className="w-[56px] text-xs font-bold text-slate-700">Image</TableHead>
                  <TableHead className="text-xs font-bold text-slate-700">Product Name / SKU</TableHead>
                  <TableHead className="w-[120px] text-xs font-bold text-slate-700">Stock</TableHead>
                  <TableHead className="w-[130px] text-xs font-bold text-slate-700">Price</TableHead>
                  <TableHead className="w-[180px] text-xs font-bold text-slate-700">Category</TableHead>
                  <TableHead className="w-[160px] text-xs font-bold text-slate-700">Brand</TableHead>
                  <TableHead className="w-[140px] text-xs font-bold text-slate-700">AI Pack</TableHead>
                  <TableHead className="w-[110px] text-xs font-bold text-slate-700">Date</TableHead>
                  <TableHead className="w-[100px] text-right text-xs font-bold text-slate-700">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {products.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={10} className="text-center py-8 text-xs text-slate-400">
                      No products found matching the filter criteria.
                    </TableCell>
                  </TableRow>
                ) : (
                  products.map((product) => {
                    const isSelected = selectedRows.includes(product.id);
                    return (
                      <TableRow
                        key={product.id}
                        className={`hover:bg-slate-50/80 transition-colors group cursor-pointer ${
                          isSelected ? "bg-indigo-50/40" : ""
                        }`}
                        onClick={() => router.push(`/workspace/${product.id}`)}
                      >
                        <TableCell className="px-3" onClick={(e) => e.stopPropagation()}>
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={() => handleSelectRow(product.id)}
                            className="rounded border-slate-300 size-3.5 cursor-pointer accent-indigo-600"
                          />
                        </TableCell>

                        <TableCell className="p-2">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="size-10 rounded object-cover border border-slate-200 bg-slate-50"
                          />
                        </TableCell>

                        <TableCell className="py-3">
                          <div className="space-y-0.5">
                            <p className="font-bold text-xs text-slate-900 group-hover:text-indigo-600 transition-colors">
                              {product.name}
                            </p>
                            <span className="text-[11px] font-mono text-slate-500">
                              SKU: {product.sku}
                            </span>

                            <div className="flex items-center gap-2 pt-0.5 text-[11px] font-medium text-slate-400 opacity-80 group-hover:opacity-100 transition-opacity">
                              <span
                                onClick={(e) => {
                                  e.stopPropagation();
                                  router.push(`/workspace/${product.id}`);
                                }}
                                className="text-indigo-600 hover:underline cursor-pointer font-bold"
                              >
                                Edit Details
                              </span>
                              <span>|</span>
                              <span
                                onClick={(e) => {
                                  e.stopPropagation();
                                  router.push(`/editor/${product.id}`);
                                }}
                                className="text-purple-600 hover:underline cursor-pointer"
                              >
                                Graphic Studio
                              </span>
                            </div>
                          </div>
                        </TableCell>

                        <TableCell>
                          <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                            {product.stockStatus}
                          </span>
                        </TableCell>

                        <TableCell>
                          <div className="space-y-0.5">
                            <span className="text-xs font-bold text-slate-900 block">
                              {product.salePrice}
                            </span>
                            <span className="text-[10px] text-slate-400 line-through">
                              {product.regularPrice}
                            </span>
                          </div>
                        </TableCell>

                        <TableCell className="text-xs text-slate-700 font-medium">
                          {product.category}
                        </TableCell>

                        <TableCell className="text-xs text-indigo-700 font-semibold">
                          {product.brand}
                        </TableCell>

                        <TableCell>
                          <Badge className="bg-indigo-50 text-indigo-700 border-indigo-200 text-[10px] font-bold">
                            <Sparkles className="mr-1 size-3 text-yellow-500" />
                            {product.aiStatus}
                          </Badge>
                        </TableCell>

                        <TableCell className="text-[11px] text-slate-500 font-medium">
                          {formatDistanceToNow(new Date(product.updatedAt), { addSuffix: true })}
                        </TableCell>

                        <TableCell className="text-right" onClick={(e) => e.stopPropagation()}>
                          <Button
                            size="sm"
                            onClick={() => router.push(`/workspace/${product.id}`)}
                            className="h-7 text-xs bg-indigo-50 text-indigo-700 hover:bg-indigo-600 hover:text-white border border-indigo-200 font-bold px-2.5"
                          >
                            <Edit2 className="mr-1 size-3" /> Edit
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 2. CATEGORIES VIEW */}
      {/* ========================================================================= */}
      {activeTab === "categories" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          <div className="lg:col-span-4">
            <Card className="border-slate-300 shadow-2xs rounded-lg">
              <CardHeader className="py-3 px-4 border-b bg-slate-50">
                <CardTitle className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                  <FolderTree className="size-4 text-indigo-600" />
                  Add New Category
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <form onSubmit={handleAddCategory} className="space-y-3.5 text-xs">
                  <div className="space-y-1">
                    <Label className="font-semibold text-slate-700">Category Name *</Label>
                    <Input
                      value={newCatName}
                      onChange={(e) => setNewCatName(e.target.value)}
                      placeholder="e.g. Dermocosmetics & Skincare"
                      className="bg-slate-50 border-slate-200 text-xs"
                      required
                    />
                  </div>

                  <div className="space-y-1">
                    <Label className="font-semibold text-slate-700">Slug</Label>
                    <Input
                      value={newCatSlug}
                      onChange={(e) => setNewCatSlug(e.target.value)}
                      placeholder="skincare-dermocosmetics"
                      className="bg-slate-50 border-slate-200 font-mono text-[11px]"
                    />
                  </div>

                  <div className="space-y-1">
                    <Label className="font-semibold text-slate-700">Description</Label>
                    <Textarea
                      rows={3}
                      value={newCatDesc}
                      onChange={(e) => setNewCatDesc(e.target.value)}
                      placeholder="Category description..."
                      className="bg-slate-50 border-slate-200 text-xs"
                    />
                  </div>

                  <Button type="submit" size="sm" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold h-8 text-xs">
                    + Add New Category
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-8">
            <Card className="border-slate-300 shadow-2xs rounded-lg overflow-hidden">
              <CardHeader className="py-2.5 px-4 border-b bg-slate-50">
                <CardTitle className="text-xs font-bold text-slate-800">
                  Categories Directory ({categories.length})
                </CardTitle>
              </CardHeader>
              <Table>
                <TableHeader className="bg-slate-50">
                  <TableRow>
                    <TableHead className="text-xs font-bold text-slate-700">Name</TableHead>
                    <TableHead className="text-xs font-bold text-slate-700">Slug</TableHead>
                    <TableHead className="text-xs font-bold text-slate-700">Description</TableHead>
                    <TableHead className="text-right text-xs font-bold text-slate-700">Count</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {categories.map((c) => (
                    <TableRow key={c.id} className="text-xs">
                      <TableCell className="font-bold text-indigo-700">{c.name}</TableCell>
                      <TableCell className="font-mono text-slate-500 text-[11px]">{c.slug}</TableCell>
                      <TableCell className="text-slate-600 max-w-xs truncate">{c.desc}</TableCell>
                      <TableCell className="text-right font-bold text-slate-900">{c.count}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 3. BRANDS VIEW */}
      {/* ========================================================================= */}
      {activeTab === "brands" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          <div className="lg:col-span-4">
            <Card className="border-slate-300 shadow-2xs rounded-lg">
              <CardHeader className="py-3 px-4 border-b bg-slate-50">
                <CardTitle className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                  <Palette className="size-4 text-purple-600" />
                  Create Brand Identity Kit
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <form onSubmit={handleAddBrand} className="space-y-3.5 text-xs">
                  <div className="space-y-1">
                    <Label className="font-semibold text-slate-700">Brand Name *</Label>
                    <Input
                      value={newBrandName}
                      onChange={(e) => setNewBrandName(e.target.value)}
                      placeholder="e.g. SkinGlow Laboratories"
                      className="bg-slate-50 border-slate-200 text-xs"
                      required
                    />
                  </div>

                  <div className="space-y-1">
                    <Label className="font-semibold text-slate-700">Default Tone of Voice</Label>
                    <Input
                      value={newBrandTone}
                      onChange={(e) => setNewBrandTone(e.target.value)}
                      placeholder="Clinical, Evidence-Based, Clean..."
                      className="bg-slate-50 border-slate-200 text-xs"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <Label className="font-semibold text-slate-700">Primary Color</Label>
                      <div className="flex items-center gap-2">
                        <input
                          type="color"
                          value={newBrandColor1}
                          onChange={(e) => setNewBrandColor1(e.target.value)}
                          className="size-7 rounded border cursor-pointer"
                        />
                        <span className="font-mono text-[11px] font-semibold">{newBrandColor1}</span>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <Label className="font-semibold text-slate-700">Secondary Color</Label>
                      <div className="flex items-center gap-2">
                        <input
                          type="color"
                          value={newBrandColor2}
                          onChange={(e) => setNewBrandColor2(e.target.value)}
                          className="size-7 rounded border cursor-pointer"
                        />
                        <span className="font-mono text-[11px] font-semibold">{newBrandColor2}</span>
                      </div>
                    </div>
                  </div>

                  <Button type="submit" size="sm" className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold h-8 text-xs">
                    + Save Brand Kit
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              {brands.map((b) => (
                <Card key={b.id} className="border-slate-300 shadow-2xs rounded-lg">
                  <CardHeader className="p-3.5 border-b bg-slate-50 flex flex-row items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <img src={b.logo} alt={b.name} className="size-8 rounded object-cover border" />
                      <div>
                        <CardTitle className="text-xs font-bold text-slate-900">{b.name}</CardTitle>
                        <span className="text-[10px] text-purple-700 font-semibold">{b.count} linked products</span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-3.5 space-y-2 text-xs">
                    <div>
                      <span className="text-slate-500 text-[10px] uppercase font-bold block">Tone of Voice:</span>
                      <p className="text-slate-800 font-medium">{b.tone}</p>
                    </div>
                    <div>
                      <span className="text-slate-500 text-[10px] uppercase font-bold block">Color Palette:</span>
                      <div className="flex items-center gap-1.5 mt-1">
                        {b.colors.map((c, idx) => (
                          <div key={idx} className="flex items-center gap-1 bg-slate-100 px-2 py-0.5 rounded border text-[11px] font-mono font-semibold">
                            <div className="size-3 rounded-full border" style={{ backgroundColor: c }} />
                            <span>{c}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 4. TAGS VIEW */}
      {/* ========================================================================= */}
      {activeTab === "tags" && (
        <Card className="border-slate-300 shadow-2xs rounded-lg overflow-hidden">
          <CardHeader className="py-2.5 px-4 border-b bg-slate-50">
            <CardTitle className="text-xs font-bold text-slate-800">
              Product Tags Directory
            </CardTitle>
          </CardHeader>
          <Table>
            <TableHeader className="bg-slate-50">
              <TableRow>
                <TableHead className="text-xs font-bold text-slate-700">Tag Name</TableHead>
                <TableHead className="text-xs font-bold text-slate-700">Slug</TableHead>
                <TableHead className="text-right text-xs font-bold text-slate-700">Linked Products</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tags.map((t) => (
                <TableRow key={t.id} className="text-xs">
                  <TableCell className="font-bold text-slate-900">
                    <Badge variant="outline" className="bg-slate-50 text-slate-700">
                      #{t.name}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-mono text-slate-500 text-[11px]">{t.slug}</TableCell>
                  <TableCell className="text-right font-bold text-indigo-600">{t.count}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      )}

      {/* ========================================================================= */}
      {/* 5. INSIGHTS VIEW */}
      {/* ========================================================================= */}
      {activeTab === "insights" && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
          {insights.map((ins) => (
            <Card key={ins.id} className="border-slate-300 shadow-2xs rounded-lg">
              <CardHeader className="p-3.5 border-b bg-cyan-50/40">
                <Badge className="bg-cyan-600 text-white text-[10px] w-fit mb-1 font-bold">
                  {ins.season}
                </Badge>
                <CardTitle className="text-xs font-bold text-slate-900">
                  {ins.goal}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-3.5 space-y-2 text-xs">
                <div>
                  <span className="font-bold text-slate-500 text-[10px] uppercase block">Trend Keywords:</span>
                  <p className="text-slate-800 font-medium">{ins.trendKeywords}</p>
                </div>
                <div>
                  <span className="font-bold text-slate-500 text-[10px] uppercase block">Customer Pain Points:</span>
                  <p className="text-rose-900 bg-rose-50 p-2 rounded border border-rose-100 font-medium">
                    {ins.painPoints}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* ========================================================================= */}
      {/* 6. METRICS VIEW */}
      {/* ========================================================================= */}
      {activeTab === "metrics" && (
        <Card className="border-slate-300 shadow-2xs rounded-lg">
          <CardHeader className="py-3 px-4 border-b bg-slate-50">
            <CardTitle className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
              <FileSpreadsheet className="size-4 text-emerald-600" />
              Campaign Performance CSV Benchmark Library
            </CardTitle>
            <CardDescription className="text-xs">
              Historical CTR, CVR, and ROAS datasets used by the AI Performance Learning engine.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-4 space-y-3 text-xs">
            <div className="bg-emerald-50/60 p-3 rounded-lg border border-emerald-200 space-y-1">
              <span className="font-bold text-emerald-950 block">Standard E-Commerce Benchmark Gateways:</span>
              <p className="text-slate-700 font-mono text-[11px]">
                Target CTR: &gt; 2.5% | 3s Hook Retention: &gt; 35% | Add-to-Cart (ATC): &gt; 8% | Target ROAS: &gt;= 3.0x
              </p>
            </div>
            <p className="text-slate-500">
              💡 To associate specific performance metrics with a product, open the <strong>Product Details</strong> editor and input CSV rows in the <em>Performance Data</em> panel.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
