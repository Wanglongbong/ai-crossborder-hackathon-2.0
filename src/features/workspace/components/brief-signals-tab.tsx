"use client";

import { useState } from "react";
import {
  Wand2,
  Save,
  Check,
  ShieldCheck,
  Palette,
  Compass,
  FileSpreadsheet,
  Layers,
  Image as ImageIcon,
  Tag as TagIcon,
  FolderTree,
  DollarSign,
  FileText,
  Loader2,
  Sparkles,
  Upload,
  Plus,
  X,
  Trash2,
} from "lucide-react";
import { toast } from "sonner";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useUpdateProject } from "@/features/projects/api/use-update-project";

export interface CampaignDataState {
  productName: string;
  category: string;
  shortDescription: string;
  uspDescription: string;
  regularPrice: string;
  salePrice: string;
  sku: string;
  targetMarket: string;
  targetAudience: string;
  requiredClaims: string;
  restrictedClaims: string;
  brandName: string;
  brandTone: string;
  brandColors: string[];
  productImage: string;
  galleryImages: string[];
  tags: string[];
  marketSignals: {
    season: string;
    trendKeywords: string;
    painPoints: string;
    campaignGoal: string;
  };
  pastCampaignData: string;
}

interface BriefSignalsTabProps {
  project: {
    id: string;
    name: string;
    json: string;
  };
  campaignData: CampaignDataState;
  setCampaignData: React.Dispatch<React.SetStateAction<CampaignDataState>>;
  onGenerateFullPack: () => void;
  isGenerating: boolean;
}

// 4 Preloaded Hackathon Demo Presets in English
const DEMO_PRESETS = [
  {
    label: "Scenario 1: Skincare Niacinamide Serum",
    data: {
      productName: "SkinGlow Pro 10% Pure Niacinamide Serum",
      category: "Dermocosmetics & Skincare",
      shortDescription: "Clinically proven 10% pure Niacinamide & multi-depth Hyaluronic Acid serum. Fades dark spots in 14 days and delivers 48-hour deep hydration.",
      uspDescription: "Formulated with 10% pharmaceutical-grade Niacinamide and triple-molecular Hyaluronic Acid. Restores compromised skin barrier, accelerates cellular renewal, and visibly calms redness without alcohol or parabens.",
      regularPrice: "$39.00",
      salePrice: "$26.90",
      sku: "SKG-SRM-10N",
      targetMarket: "United States & Global E-Commerce",
      targetAudience: "Working professionals and skincare enthusiasts aged 20-42 seeking clean, proven radiant skin.",
      requiredClaims: "Reduces visible redness within 7 days, visibly fades dark spots in 14 days, alcohol-free, paraben-free.",
      restrictedClaims: "Do not claim 'overnight miracle cure' or 'replaces prescription acne medications'.",
      brandName: "SkinGlow Laboratories",
      brandTone: "Dermatological, Clinical, Clean, Sophisticated & Evidence-Based",
      brandColors: ["#4F46E5", "#06B6D4"],
      productImage: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=600&q=80",
      galleryImages: [
        "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=400&q=80",
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=400&q=80",
        "https://images.unsplash.com/photo-1560343090-f0409e92791a?auto=format&fit=crop&w=400&q=80",
      ],
      tags: ["Niacinamide", "DarkSpotCorrector", "CleanBeauty", "TikTokShopDeal"],
      marketSignals: {
        season: "Post-Summer Skin Barrier Recovery & Q4 Peak Sale",
        trendKeywords: "Radiant Skin, 10% Niacinamide, Barrier Repair, Clean Skincare Routine",
        painPoints: "Stubborn post-acne pigmentation, uneven texture, irritation from harsh acids.",
        campaignGoal: "Maximize TikTok Shop & Amazon direct sales conversion (Target CVR > 3.5%)",
      },
      pastCampaignData: "Prior test data: 9:16 vertical video with 2-second macro dropper hook yielded 4.2% CVR and 38% 3-second thumb-stop retention.",
    },
  },
  {
    label: "Scenario 2: F&B Organic Sparkling Kombucha",
    data: {
      productName: "ZenFresh Sparkling Organic Kombucha (6-Pack)",
      category: "F&B / Functional Beverage",
      shortDescription: "Raw brewed botanical Kombucha with 1 billion live probiotics, zero added sugar, and natural Vitamin C for instant revitalization.",
      uspDescription: "Naturally fermented for 21 days with organic heirloom tea leaves and living SCOBY cultures. Zero artificial sweeteners, zero preservatives, low calorie, refreshing fruit sparkle.",
      regularPrice: "$24.00",
      salePrice: "$16.50",
      sku: "ZEN-KMB-06P",
      targetMarket: "SEA & Global",
      targetAudience: "Active lifestyle seekers, athletes, and urban workers looking for a healthy soda replacement.",
      requiredClaims: "100% Live probiotic cultures, 0g added sugar, USDA Organic certified.",
      restrictedClaims: "Do not claim 'cures gut diseases' or 'medical detox prescription'.",
      brandName: "ZenFresh Beverages",
      brandTone: "Crisp, Vibrant, Refreshing, Athletic & Wholesome",
      brandColors: ["#10B981", "#F59E0B"],
      productImage: "https://images.unsplash.com/photo-1556881286-fc6915169721?auto=format&fit=crop&w=600&q=80",
      galleryImages: [
        "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=400&q=80",
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=400&q=80",
      ],
      tags: ["Kombucha", "ZeroSugar", "Probiotics", "HealthyDrink"],
      marketSignals: {
        season: "Summer Refresh & Fitness Season",
        trendKeywords: "Healthy Soda, Gut Health, Zero Sugar Detox, Guilt-free Sparkle",
        painPoints: "Craving carbonated drinks but worried about sugar spikes and artificial additives.",
        campaignGoal: "Drive rapid impulse purchases and multi-pack subscriptions.",
      },
      pastCampaignData: "Prior campaign: Short punchy comparison video vs traditional soda gave CTR 3.1%.",
    },
  },
  {
    label: "Scenario 3: Smart Home Robot Vacuum X1 Pro",
    data: {
      productName: "EcoClean Robotic Vacuum X1 Pro Auto-Empty",
      category: "Smart Home & Appliances",
      shortDescription: "Next-gen LiDAR 4.0 navigation robot vacuum with 6000Pa suction and 60-day hands-free self-emptying station.",
      uspDescription: "Dual-laser obstacle avoidance, 6000Pa industrial-grade motor, automated mop washing & hot air drying base station. Whisper-quiet pet hair removal with zero entanglement.",
      regularPrice: "$799.00",
      salePrice: "$499.00",
      sku: "ECO-VAC-X1P",
      targetMarket: "US, EU & SEA",
      targetAudience: "Busy homeowners, dual-income households, and pet parents seeking effortless automated cleaning.",
      requiredClaims: "Removes 99.9% of pet hair & PM2.5 allergens, 24-month comprehensive warranty.",
      restrictedClaims: "Do not claim '100% zero maintenance forever under all conditions'.",
      brandName: "EcoClean Tech",
      brandTone: "Pioneering, Sleek, Futuristic, High-Tech & Reliable",
      brandColors: ["#1E293B", "#38BDF8"],
      productImage: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80",
      galleryImages: [
        "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=400&q=80",
        "https://images.unsplash.com/photo-1560343090-f0409e92791a?auto=format&fit=crop&w=400&q=80",
      ],
      tags: ["RobotVacuum", "SmartHome", "PetFriendly", "FlashSale1111"],
      marketSignals: {
        season: "Black Friday & 11.11 Mega Shopping Festival",
        trendKeywords: "Self-Emptying Robot, Auto-Mop Washing, Pet Hair Solution, Home Automation",
        painPoints: "Exhausting daily chores, pet hair everywhere, old robot getting stuck on cables.",
        campaignGoal: "Drive high-ticket conversion and holiday pre-orders.",
      },
      pastCampaignData: "Prior data: Video showing live mop self-cleaning sequence increased ROAS to 3.8x.",
    },
  },
  {
    label: "Scenario 4: Titanium GPS Smartwatch Ultra 2",
    data: {
      productName: "CyberWatch Ultra 2 Titanium GPS Sports",
      category: "Wearables & Consumer Tech",
      shortDescription: "Aerospace-grade titanium smartwatch with 14-day battery life, precision dual-frequency GPS, and ECG heart monitor.",
      uspDescription: "Grade 5 Titanium casing, sapphire crystal display, 5ATM water resistance, dual-frequency GNSS positioning, 14-day battery endurance in standard mode.",
      regularPrice: "$349.00",
      salePrice: "$249.00",
      sku: "CYB-WCH-U2T",
      targetMarket: "Global Markets",
      targetAudience: "Athletes, runners, outdoor adventurers, and tech-driven professionals aged 22-48.",
      requiredClaims: "50m water resistant (5ATM), GPS accuracy 99.5%, 14-day standard battery life.",
      restrictedClaims: "Do not claim 'replaces hospital-grade clinical diagnostics'.",
      brandName: "CyberWatch Pro",
      brandTone: "Rugged, Powerful, Athletic, High-Performance & Bold",
      brandColors: ["#EA580C", "#0F172A"],
      productImage: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80",
      galleryImages: [
        "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=400&q=80",
      ],
      tags: ["Smartwatch", "Titanium", "GPSWatch", "RunningGear"],
      marketSignals: {
        season: "Marathon Season & Holiday Outdoor Gifting",
        trendKeywords: "GPS Running Watch, 14-Day Battery Smartwatch, Fitness Tracker, Titanium Wearable",
        painPoints: "Smartwatch battery dying after 24 hours, inaccurate GPS in tall-building urban areas.",
        campaignGoal: "Acquire high-intent sports customers with ROAS > 3.2x.",
      },
      pastCampaignData: "Prior data: Direct comparison vs standard battery life delivered CTR 2.9%.",
    },
  },
];

export const BriefSignalsTab = ({
  project,
  campaignData,
  setCampaignData,
  onGenerateFullPack,
  isGenerating,
}: BriefSignalsTabProps) => {
  const updateProjectMutation = useUpdateProject(project.id);
  const [activeVerticalTab, setActiveVerticalTab] = useState("general");
  const [isSaved, setIsSaved] = useState(false);

  // Dynamic Categories State
  const [categoriesList, setCategoriesList] = useState([
    "Dermocosmetics & Skincare",
    "F&B / Functional Beverage",
    "Smart Home & Appliances",
    "Wearables & Consumer Tech",
    "Fashion & Apparel",
  ]);
  const [newCatInput, setNewCatInput] = useState("");
  const [showAddCat, setShowAddCat] = useState(false);

  // Dynamic Brands State
  const [brandsList, setBrandsList] = useState([
    "SkinGlow Laboratories",
    "ZenFresh Beverages",
    "EcoClean Tech",
    "CyberWatch Pro",
  ]);
  const [newBrandInput, setNewBrandInput] = useState("");
  const [showAddBrand, setShowAddBrand] = useState(false);

  // Dynamic Tags State
  const [tagInput, setTagInput] = useState("");

  const handleApplyPreset = (presetIndex: number) => {
    const preset = DEMO_PRESETS[presetIndex];
    if (preset) {
      setCampaignData(preset.data);
      toast.success(`Loaded preset: ${preset.label}`);
    }
  };

  const handleAddCategory = () => {
    if (!newCatInput.trim()) return;
    if (!categoriesList.includes(newCatInput.trim())) {
      setCategoriesList([...categoriesList, newCatInput.trim()]);
      setCampaignData({ ...campaignData, category: newCatInput.trim() });
    }
    setNewCatInput("");
    setShowAddCat(false);
    toast.success("Category added successfully.");
  };

  const handleAddBrand = () => {
    if (!newBrandInput.trim()) return;
    if (!brandsList.includes(newBrandInput.trim())) {
      setBrandsList([...brandsList, newBrandInput.trim()]);
      setCampaignData({ ...campaignData, brandName: newBrandInput.trim() });
    }
    setNewBrandInput("");
    setShowAddBrand(false);
    toast.success("Brand added successfully.");
  };

  const handleAddTag = () => {
    if (!tagInput.trim()) return;
    const cleanTag = tagInput.trim().replace(/^#/, "");
    if (!campaignData.tags.includes(cleanTag)) {
      setCampaignData({ ...campaignData, tags: [...campaignData.tags, cleanTag] });
    }
    setTagInput("");
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setCampaignData({
      ...campaignData,
      tags: campaignData.tags.filter((t) => t !== tagToRemove),
    });
  };

  const handleAddGalleryImage = () => {
    const defaultUrls = [
      "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1560343090-f0409e92791a?auto=format&fit=crop&w=400&q=80",
    ];
    const nextImg = defaultUrls[campaignData.galleryImages.length % defaultUrls.length];
    setCampaignData({
      ...campaignData,
      galleryImages: [...campaignData.galleryImages, nextImg],
    });
    toast.success("Added image to product gallery.");
  };

  const handleRemoveGalleryImage = (index: number) => {
    const updated = [...campaignData.galleryImages];
    updated.splice(index, 1);
    setCampaignData({ ...campaignData, galleryImages: updated });
  };

  const handleSaveDraft = () => {
    const updatedJson = JSON.stringify({
      ...campaignData,
      description: campaignData.uspDescription,
      targetAudience: campaignData.targetAudience,
      goal: campaignData.marketSignals.campaignGoal,
    });

    updateProjectMutation.mutate(
      {
        id: project.id,
        name: campaignData.productName || project.name,
        json: updatedJson,
      },
      {
        onSuccess: () => {
          setIsSaved(true);
          toast.success("Product draft saved successfully.");
          setTimeout(() => setIsSaved(false), 2000);
        },
      }
    );
  };

  const verticalTabs = [
    { id: "general", label: "General & Pricing", icon: DollarSign },
    { id: "usp", label: "Product USP & Details", icon: FileText },
    { id: "claims", label: "Claims & Compliance", icon: ShieldCheck },
    { id: "brand", label: "Brand Identity & Tone", icon: Palette },
    { id: "signals", label: "Market Signals & Trends", icon: Compass },
    { id: "pastData", label: "Performance Data (CSV)", icon: FileSpreadsheet },
  ];

  return (
    <div className="space-y-4">
      {/* Top Demo Scenario Preset Loader */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-100/90 p-2.5 rounded-lg border border-slate-200 text-xs">
        <div className="flex items-center gap-2">
          <Sparkles className="size-4 text-indigo-600 shrink-0" />
          <span className="font-bold text-slate-800">
            BytePlus BP-01 Benchmark Presets:
          </span>
          <span className="text-slate-500 hidden md:inline">
            Load pre-configured campaign briefs for live evaluation.
          </span>
        </div>

        <div className="w-full sm:w-[320px]">
          <Select onValueChange={(val) => handleApplyPreset(Number(val))}>
            <SelectTrigger className="bg-white border-slate-300 text-xs h-8">
              <SelectValue placeholder="Load demo preset..." />
            </SelectTrigger>
            <SelectContent>
              {DEMO_PRESETS.map((preset, idx) => (
                <SelectItem key={idx} value={String(idx)}>
                  {preset.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Main 2-Column Product Editor Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* ========================================================================= */}
        {/* LEFT COLUMN: TITLE, PRODUCT DATA META BOX, SHORT DESCRIPTION (8 COLS) */}
        {/* ========================================================================= */}
        <div className="lg:col-span-8 space-y-4">
          {/* 1. Product Title Input */}
          <div className="space-y-1">
            <Label className="text-xs font-bold text-slate-700">Product Title *</Label>
            <Input
              value={campaignData.productName}
              onChange={(e) => setCampaignData({ ...campaignData, productName: e.target.value })}
              placeholder="Enter product title..."
              className="text-base font-bold h-10 px-3 bg-white border-slate-300 rounded-md shadow-2xs focus:ring-1 focus:ring-indigo-500"
            />
          </div>

          {/* 2. Full Product Description */}
          <div className="space-y-1">
            <Label className="text-xs font-bold text-slate-700">Product Description</Label>
            <Textarea
              rows={4}
              value={campaignData.uspDescription}
              onChange={(e) => setCampaignData({ ...campaignData, uspDescription: e.target.value })}
              placeholder="Detailed product specifications, key active ingredients, clinical evidence, and core features..."
              className="bg-white border-slate-300 text-xs leading-relaxed font-normal rounded-md"
            />
          </div>

          {/* 3. Product Data Meta Box (Vertical Tabs) */}
          <Card className="border-slate-300 shadow-2xs rounded-md overflow-hidden bg-white">
            {/* Meta Box Header */}
            <div className="flex items-center justify-between bg-slate-100 border-b border-slate-200 px-3.5 py-2">
              <div className="flex items-center gap-2">
                <span className="font-bold text-xs text-slate-800">Product Data</span>
                <span className="text-slate-400">—</span>
                <Badge variant="outline" className="bg-white text-slate-700 border-slate-300 text-[11px] font-semibold">
                  Simple Product (E-Commerce)
                </Badge>
              </div>
              <span className="text-[11px] text-slate-500 font-medium">Virtual / Multi-Asset Pipeline</span>
            </div>

            {/* Meta Box Body: Left Vertical Tabs + Right Form Area */}
            <div className="grid grid-cols-1 md:grid-cols-12 min-h-[340px]">
              {/* Left Vertical Tab Navigation (4 Cols) */}
              <div className="md:col-span-4 bg-slate-50 border-r border-slate-200 p-1 space-y-0.5">
                {verticalTabs.map((tab) => {
                  const TabIcon = tab.icon;
                  const isActive = activeVerticalTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setActiveVerticalTab(tab.id)}
                      className={`flex items-center gap-2 w-full px-2.5 py-1.5 rounded text-xs font-semibold text-left transition-all ${
                        isActive
                          ? "bg-white text-indigo-700 border border-slate-200 shadow-2xs font-bold"
                          : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                      }`}
                    >
                      <TabIcon className={`size-3.5 ${isActive ? "text-indigo-600" : "text-slate-400"}`} />
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Right Tab Content Panel (8 Cols) */}
              <div className="md:col-span-8 p-4 text-xs">
                {/* General & Pricing */}
                {activeVerticalTab === "general" && (
                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <Label className="font-semibold text-slate-700">Regular Price ($ / Currency)</Label>
                        <Input
                          value={campaignData.regularPrice}
                          onChange={(e) => setCampaignData({ ...campaignData, regularPrice: e.target.value })}
                          placeholder="$39.00"
                          className="bg-slate-50 border-slate-200 text-xs font-medium"
                        />
                      </div>
                      <div className="space-y-1">
                        <Label className="font-semibold text-slate-700">Sale Price ($ / Offer)</Label>
                        <Input
                          value={campaignData.salePrice}
                          onChange={(e) => setCampaignData({ ...campaignData, salePrice: e.target.value })}
                          placeholder="$26.90"
                          className="bg-slate-50 border-slate-200 text-xs font-bold text-indigo-700"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <Label className="font-semibold text-slate-700">SKU</Label>
                        <Input
                          value={campaignData.sku}
                          onChange={(e) => setCampaignData({ ...campaignData, sku: e.target.value })}
                          placeholder="SKU-1001"
                          className="bg-slate-50 border-slate-200 text-xs font-mono"
                        />
                      </div>
                      <div className="space-y-1">
                        <Label className="font-semibold text-slate-700">Target Market</Label>
                        <Input
                          value={campaignData.targetMarket}
                          onChange={(e) => setCampaignData({ ...campaignData, targetMarket: e.target.value })}
                          placeholder="US, UK, SEA..."
                          className="bg-slate-50 border-slate-200 text-xs"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <Label className="font-semibold text-slate-700">Target Audience Persona</Label>
                      <Input
                        value={campaignData.targetAudience}
                        onChange={(e) => setCampaignData({ ...campaignData, targetAudience: e.target.value })}
                        placeholder="e.g. Working professionals aged 22-40 seeking radiant skin..."
                        className="bg-slate-50 border-slate-200 text-xs"
                      />
                    </div>
                  </div>
                )}

                {/* Product USP & Details */}
                {activeVerticalTab === "usp" && (
                  <div className="space-y-3">
                    <div className="space-y-1">
                      <Label className="font-semibold text-slate-700">
                        Key Selling Points & Functional Benefits *
                      </Label>
                      <Textarea
                        rows={6}
                        value={campaignData.uspDescription}
                        onChange={(e) => setCampaignData({ ...campaignData, uspDescription: e.target.value })}
                        placeholder="Niacinamide 10%, Hyaluronic acid multi-depth, barrier repair, 48h hydration..."
                        className="bg-slate-50 border-slate-200 text-xs leading-relaxed"
                      />
                    </div>
                  </div>
                )}

                {/* Claims & Compliance */}
                {activeVerticalTab === "claims" && (
                  <div className="space-y-3">
                    <div className="space-y-1">
                      <Label className="font-semibold text-emerald-800 flex items-center gap-1.5">
                        <span className="size-2 rounded-full bg-emerald-500 inline-block"></span>
                        Required Claims (MUST be emphasized in copy and video)
                      </Label>
                      <Input
                        value={campaignData.requiredClaims}
                        onChange={(e) => setCampaignData({ ...campaignData, requiredClaims: e.target.value })}
                        placeholder="e.g. Fades dark spots in 14 days, reduces redness in 7 days..."
                        className="bg-emerald-50/40 border-emerald-200 text-emerald-950 text-xs font-medium"
                      />
                    </div>

                    <div className="space-y-1">
                      <Label className="font-semibold text-rose-800 flex items-center gap-1.5">
                        <span className="size-2 rounded-full bg-rose-500 inline-block"></span>
                        Restricted Claims (FORBIDDEN claims under advertising policy)
                      </Label>
                      <Input
                        value={campaignData.restrictedClaims}
                        onChange={(e) => setCampaignData({ ...campaignData, restrictedClaims: e.target.value })}
                        placeholder="e.g. No overnight medical cures, no guaranteed 24h whitening..."
                        className="bg-rose-50/40 border-rose-200 text-rose-950 text-xs font-medium"
                      />
                    </div>
                  </div>
                )}

                {/* Brand Identity & Tone */}
                {activeVerticalTab === "brand" && (
                  <div className="space-y-3">
                    <div className="space-y-1">
                      <Label className="font-semibold text-slate-700">Tone of Voice</Label>
                      <Input
                        value={campaignData.brandTone}
                        onChange={(e) => setCampaignData({ ...campaignData, brandTone: e.target.value })}
                        placeholder="Clinical, Sophisticated, Evidence-Based..."
                        className="bg-slate-50 border-slate-200 text-xs"
                      />
                    </div>

                    <div className="space-y-1">
                      <Label className="font-semibold text-slate-700">Brand Color Palette</Label>
                      <div className="flex items-center gap-2">
                        {campaignData.brandColors.map((color, idx) => (
                          <div key={idx} className="flex items-center gap-1 bg-slate-100 px-2 py-0.5 rounded border text-[11px] font-mono font-semibold">
                            <div className="size-3 rounded-full border" style={{ backgroundColor: color }} />
                            <span>{color}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Market Signals & Trends */}
                {activeVerticalTab === "signals" && (
                  <div className="space-y-2.5">
                    <div className="space-y-1">
                      <Label className="font-semibold text-slate-700">Season / Commercial Moment</Label>
                      <Input
                        value={campaignData.marketSignals.season}
                        onChange={(e) =>
                          setCampaignData({
                            ...campaignData,
                            marketSignals: { ...campaignData.marketSignals, season: e.target.value },
                          })
                        }
                        placeholder="Black Friday, Q4 Mega Sale, Post-Summer..."
                        className="bg-slate-50 border-slate-200 text-xs"
                      />
                    </div>

                    <div className="space-y-1">
                      <Label className="font-semibold text-slate-700">Trending Search Keywords</Label>
                      <Input
                        value={campaignData.marketSignals.trendKeywords}
                        onChange={(e) =>
                          setCampaignData({
                            ...campaignData,
                            marketSignals: { ...campaignData.marketSignals, trendKeywords: e.target.value },
                          })
                        }
                        placeholder="Radiant Skin, Niacinamide 10%, Barrier Repair..."
                        className="bg-slate-50 border-slate-200 text-xs"
                      />
                    </div>

                    <div className="space-y-1">
                      <Label className="font-semibold text-slate-700">Customer Pain Points</Label>
                      <Input
                        value={campaignData.marketSignals.painPoints}
                        onChange={(e) =>
                          setCampaignData({
                            ...campaignData,
                            marketSignals: { ...campaignData.marketSignals, painPoints: e.target.value },
                          })
                        }
                        placeholder="Stubborn dark spots, irritation from harsh acids..."
                        className="bg-slate-50 border-slate-200 text-xs"
                      />
                    </div>

                    <div className="space-y-1">
                      <Label className="font-semibold text-slate-700">Campaign Objective</Label>
                      <Input
                        value={campaignData.marketSignals.campaignGoal}
                        onChange={(e) =>
                          setCampaignData({
                            ...campaignData,
                            marketSignals: { ...campaignData.marketSignals, campaignGoal: e.target.value },
                          })
                        }
                        placeholder="Maximize direct e-commerce sales conversion..."
                        className="bg-slate-50 border-slate-200 text-xs"
                      />
                    </div>
                  </div>
                )}

                {/* Past Performance Data */}
                {activeVerticalTab === "pastData" && (
                  <div className="space-y-2">
                    <Label className="font-semibold text-slate-700">
                      Past Performance Data (CSV Ingestion / Metrics)
                    </Label>
                    <Textarea
                      rows={5}
                      value={campaignData.pastCampaignData}
                      onChange={(e) => setCampaignData({ ...campaignData, pastCampaignData: e.target.value })}
                      placeholder="Paste CSV rows (CTR, CVR, ROAS, 3s Hook Drop-off) or historical campaign notes..."
                      className="bg-slate-50 border-slate-200 text-xs font-mono"
                    />
                  </div>
                )}
              </div>
            </div>
          </Card>

          {/* 4. Product Short Description (Mobile Excerpt) */}
          <div className="space-y-1">
            <Label className="text-xs font-bold text-slate-700">Product Short Description (Mobile Excerpt)</Label>
            <Textarea
              rows={2}
              value={campaignData.shortDescription}
              onChange={(e) => setCampaignData({ ...campaignData, shortDescription: e.target.value })}
              placeholder="Brief 2-sentence summary displayed next to the product image on marketplace listings..."
              className="bg-white border-slate-300 text-xs leading-relaxed font-normal rounded-md"
            />
          </div>
        </div>

        {/* ========================================================================= */}
        {/* RIGHT COLUMN: PUBLISH, FEATURED IMAGE, GALLERY, CATEGORY, BRAND, TAGS (4 COLS) */}
        {/* ========================================================================= */}
        <div className="lg:col-span-4 space-y-3.5">
          {/* Box 1: Publish & AI Action */}
          <Card className="border-slate-300 shadow-2xs rounded-md overflow-hidden bg-white">
            <CardHeader className="py-2 px-3.5 bg-slate-100 border-b border-slate-200">
              <CardTitle className="text-xs font-bold text-slate-800">Publish & Launch</CardTitle>
            </CardHeader>
            <CardContent className="p-3.5 space-y-2.5 text-xs">
              <div className="flex items-center justify-between text-slate-600">
                <span>Status:</span>
                <span className="font-bold text-slate-900">Published</span>
              </div>
              <div className="flex items-center justify-between text-slate-600">
                <span>Visibility:</span>
                <span className="font-bold text-slate-900">Public</span>
              </div>
              <div className="flex items-center justify-between text-slate-600">
                <span>AI Engine:</span>
                <span className="font-bold text-indigo-600">BytePlus 4-Model Suite</span>
              </div>

              <div className="pt-2 border-t flex items-center justify-between gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleSaveDraft}
                  disabled={updateProjectMutation.isPending}
                  className="h-8 text-xs border-slate-300 font-semibold"
                >
                  {isSaved ? <Check className="mr-1 size-3 text-green-600" /> : <Save className="mr-1 size-3" />}
                  {isSaved ? "Saved" : "Save Draft"}
                </Button>

                <Button
                  size="sm"
                  onClick={onGenerateFullPack}
                  disabled={isGenerating || !campaignData.productName.trim()}
                  className="h-8 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs px-3 shadow-2xs"
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="mr-1.5 size-3.5 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Wand2 className="mr-1.5 size-3.5 text-yellow-300" />
                      1-Click Launch AI
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Box 2: Product Featured Image */}
          <Card className="border-slate-300 shadow-2xs rounded-md overflow-hidden bg-white">
            <CardHeader className="py-2 px-3.5 bg-slate-100 border-b border-slate-200">
              <CardTitle className="text-xs font-bold text-slate-800">Product Image (Featured)</CardTitle>
            </CardHeader>
            <CardContent className="p-3.5 flex flex-col items-center justify-center space-y-2">
              <img
                src={campaignData.productImage}
                alt="Product Featured"
                className="size-32 rounded-md object-cover border border-slate-200 shadow-2xs"
              />
              <span className="text-[11px] text-indigo-600 hover:underline cursor-pointer font-semibold">
                Set product image
              </span>
            </CardContent>
          </Card>

          {/* Box 3: Product Gallery (Additional Images) */}
          <Card className="border-slate-300 shadow-2xs rounded-md overflow-hidden bg-white">
            <CardHeader className="py-2 px-3.5 bg-slate-100 border-b border-slate-200 flex flex-row items-center justify-between">
              <CardTitle className="text-xs font-bold text-slate-800">Product Gallery</CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleAddGalleryImage}
                className="h-6 text-[11px] text-indigo-600 hover:bg-indigo-50 p-1"
              >
                <Plus className="size-3 mr-0.5" /> Add
              </Button>
            </CardHeader>
            <CardContent className="p-3">
              <div className="grid grid-cols-3 gap-2">
                {campaignData.galleryImages.map((imgUrl, idx) => (
                  <div key={idx} className="relative group rounded border overflow-hidden aspect-square bg-slate-50">
                    <img src={imgUrl} alt={`Gallery ${idx + 1}`} className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => handleRemoveGalleryImage(idx)}
                      className="absolute top-1 right-1 size-5 bg-black/70 text-white rounded flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="size-3" />
                    </button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Box 4: Product Categories (Dynamic with Add New) */}
          <Card className="border-slate-300 shadow-2xs rounded-md overflow-hidden bg-white">
            <CardHeader className="py-2 px-3.5 bg-slate-100 border-b border-slate-200">
              <CardTitle className="text-xs font-bold text-slate-800">Product Categories</CardTitle>
            </CardHeader>
            <CardContent className="p-3.5 space-y-2 text-xs">
              <div className="max-h-36 overflow-y-auto space-y-1.5 pr-1">
                {categoriesList.map((cat, idx) => (
                  <label key={idx} className="flex items-center gap-2 cursor-pointer text-slate-700 hover:text-slate-900">
                    <input
                      type="radio"
                      name="productCategoryRadio"
                      checked={campaignData.category === cat}
                      onChange={() => setCampaignData({ ...campaignData, category: cat })}
                      className="accent-indigo-600 size-3.5"
                    />
                    <span className="truncate">{cat}</span>
                  </label>
                ))}
              </div>

              {showAddCat ? (
                <div className="pt-2 border-t space-y-1.5">
                  <Input
                    value={newCatInput}
                    onChange={(e) => setNewCatInput(e.target.value)}
                    placeholder="New category name..."
                    className="h-7 text-xs bg-slate-50"
                  />
                  <div className="flex items-center gap-1">
                    <Button size="sm" onClick={handleAddCategory} className="h-6 text-[10px] px-2 bg-indigo-600 text-white">
                      Add
                    </Button>
                    <Button size="sm" variant="ghost" onClick={() => setShowAddCat(false)} className="h-6 text-[10px] px-2">
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => setShowAddCat(true)}
                  className="text-[11px] text-indigo-600 hover:underline font-semibold flex items-center gap-1 pt-1"
                >
                  <Plus className="size-3" /> Add new category
                </button>
              )}
            </CardContent>
          </Card>

          {/* Box 5: Product Brand (Dynamic with Add New) */}
          <Card className="border-slate-300 shadow-2xs rounded-md overflow-hidden bg-white">
            <CardHeader className="py-2 px-3.5 bg-slate-100 border-b border-slate-200">
              <CardTitle className="text-xs font-bold text-slate-800">Brand Kit</CardTitle>
            </CardHeader>
            <CardContent className="p-3.5 space-y-2 text-xs">
              <Select
                value={campaignData.brandName}
                onValueChange={(val) => setCampaignData({ ...campaignData, brandName: val })}
              >
                <SelectTrigger className="bg-slate-50 border-slate-300 text-xs h-8">
                  <SelectValue placeholder="Select Brand..." />
                </SelectTrigger>
                <SelectContent>
                  {brandsList.map((b, idx) => (
                    <SelectItem key={idx} value={b}>
                      {b}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {showAddBrand ? (
                <div className="pt-2 border-t space-y-1.5">
                  <Input
                    value={newBrandInput}
                    onChange={(e) => setNewBrandInput(e.target.value)}
                    placeholder="New brand name..."
                    className="h-7 text-xs bg-slate-50"
                  />
                  <div className="flex items-center gap-1">
                    <Button size="sm" onClick={handleAddBrand} className="h-6 text-[10px] px-2 bg-indigo-600 text-white">
                      Add Brand
                    </Button>
                    <Button size="sm" variant="ghost" onClick={() => setShowAddBrand(false)} className="h-6 text-[10px] px-2">
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => setShowAddBrand(true)}
                  className="text-[11px] text-indigo-600 hover:underline font-semibold flex items-center gap-1 pt-0.5"
                >
                  <Plus className="size-3" /> Add new brand
                </button>
              )}
            </CardContent>
          </Card>

          {/* Box 6: Product Tags (Dynamic with Add & Remove) */}
          <Card className="border-slate-300 shadow-2xs rounded-md overflow-hidden bg-white">
            <CardHeader className="py-2 px-3.5 bg-slate-100 border-b border-slate-200">
              <CardTitle className="text-xs font-bold text-slate-800">Product Tags</CardTitle>
            </CardHeader>
            <CardContent className="p-3.5 space-y-2 text-xs">
              <div className="flex items-center gap-1.5">
                <Input
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), handleAddTag())}
                  placeholder="Add tag..."
                  className="h-7 text-xs bg-slate-50"
                />
                <Button size="sm" onClick={handleAddTag} className="h-7 text-xs px-2 bg-slate-800 text-white">
                  Add
                </Button>
              </div>

              <div className="flex flex-wrap gap-1.5 pt-1">
                {campaignData.tags.map((tag, idx) => (
                  <Badge key={idx} variant="outline" className="bg-slate-50 text-slate-700 text-[10px] flex items-center gap-1 pl-2 pr-1 py-0.5">
                    <span>#{tag}</span>
                    <button type="button" onClick={() => handleRemoveTag(tag)} className="hover:text-rose-600">
                      <X className="size-2.5" />
                    </button>
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
