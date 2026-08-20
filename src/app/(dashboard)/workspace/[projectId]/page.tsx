"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  Package,
  Compass,
  SplitSquareVertical,
  Image as ImageIcon,
  Video,
  FileCode2,
  TrendingUp,
  ChevronLeft,
  Loader2,
  Edit,
  Wand2,
} from "lucide-react";
import { toast } from "sonner";

import { useGetProject } from "@/features/projects/api/use-get-project";
import { useGenerateCampaignPack } from "@/features/campaign/api/use-generate-campaign-pack";

import { BriefSignalsTab, CampaignDataState } from "@/features/workspace/components/brief-signals-tab";
import { StrategyPositioningTab } from "@/features/workspace/components/strategy-positioning-tab";
import { CreativeRoutesTab } from "@/features/workspace/components/creative-routes-tab";
import { ImageAssetsTab } from "@/features/workspace/components/image-assets-tab";
import { VideoStudioTab } from "@/features/workspace/components/video-studio-tab";
import { CommerceCopyTab } from "@/features/workspace/components/commerce-copy-tab";
import { AbTestLaunchTab } from "@/features/workspace/components/ab-test-launch-tab";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

// Default Initial Campaign Pack in English
const DEFAULT_INITIAL_CAMPAIGN = {
  productName: "SkinGlow Pro 10% Pure Niacinamide Serum",
  category: "Dermocosmetics & Skincare",
  positioning: {
    mainCampaignAngle: "Breakthrough 14-day skin barrier restoration and visible dark spot correction with SkinGlow Pro",
    targetAudiencePersona: {
      demographics: "Women & working professionals aged 22-42 in US & SEA markets.",
      market: "US & Global E-Commerce (TikTok Shop, Amazon, Shopee)",
      psychographics: "Scientific skincare enthusiasts prioritizing clinical validation and clean formulations.",
      buyingTrigger: "Visible 14-day dark spot reduction proof, bundle gift offers, and 100% money-back guarantee.",
    },
    benefitHierarchy: [
      {
        level: "1. Instant Functional Proof",
        title: "Deep hydration & radiant glow in 60 seconds",
        description: "Instant cellular penetration with zero sticky residue or pore-clogging heavy oils.",
      },
      {
        level: "2. Core Measurable Value",
        title: "Fades dark spots & calms redness in 14 days",
        description: "10% pharmaceutical Niacinamide combined with multi-depth Hyaluronic Acid restores skin barrier.",
      },
      {
        level: "3. Emotional & Identity",
        title: "Unshakable bare-skin confidence",
        description: "Wake up to naturally glowing, healthy skin with clean, dermatologist-approved peace of mind.",
      },
    ],
    coreSellingMessage: "SkinGlow Pro: 14 Days to Bare-Skin Radiance — Clinical Strength, Zero Compromise!",
    claimsComplianceNote: "Required Claims verified (Reduces redness in 7 days, fades dark spots in 14 days). Restricted claims filtered.",
  },
  creativeRoutes: [
    {
      id: "route-a-problem-solution",
      type: "ROUTE_A",
      name: "Problem-Agitation-Solution (Direct Pain Point)",
      hookIdea: "⚠️ 'If you are exhausted from stubborn post-acne dark spots that nothing seems to fix, stop scrolling!'",
      visualDirection: "Macro close-up of textured skin -> Fast wipe to crystal serum dropper -> Radiant skin after 14 days.",
      messageAngle: "Directly addresses the frustration of ineffective skincare and provides an authoritative solution.",
      suggestedPlatform: "TikTok Shop Video Ads & Reels (9:16)",
      adCopy: {
        title: "🔥 [SOLUTION] Don't let post-acne marks hold you back — Experience SkinGlow Pro 10% Niacinamide!",
        caption: "Still struggling to find a dark spot serum that actually works without irritating your skin?\n\n✨ SkinGlow Pro combines 10% pure Niacinamide with multi-depth Hyaluronic Acid for visible results in 14 days!\n✅ 0% Alcohol, 0% Parabens, Dermatologist Tested.\n🎁 Special Launch Offer: Buy 1 Serum, Get 1 Cleanser FREE!",
        cta: "👉 Tap the Shopping Bag below to claim your bundle now!",
        hashtags: ["#SkinGlowPro", "#NiacinamideSerum", "#DarkSpotCorrector", "#TikTokMadeMeBuyIt"],
      },
    },
    {
      id: "route-b-lifestyle-aspiration",
      type: "ROUTE_B",
      name: "Aspiration & Social Proof (Clean Beauty Lifestyle)",
      hookIdea: "✨ 'The secret over 10,000 women swear by for effortless, dewy glass skin with just 3 drops every morning!'",
      visualDirection: "Warm aesthetic studio lighting, minimal vanity staging, silky glowing serum texture dispersion.",
      messageAngle: "Taps into positive self-care, the Clean Beauty movement, and effortless daily beauty rituals.",
      suggestedPlatform: "Instagram Feed (1:1), Meta Carousels, TikTok Lifestyle Ads",
      adCopy: {
        title: "🚀 Unlock effortless glass skin with SkinGlow Pro Clean Beauty Serum!",
        caption: "Meet the daily skincare holy grail that everyone is raving about!\n\n🌟 10% Pure Niacinamide + Multi-depth HA.\n💧 48-Hour deep cellular hydration for radiant bare-skin glow.\n🔥 Order today to receive an exclusive 30% OFF discount voucher!",
        cta: "🛒 Shop now via the link below!",
        hashtags: ["#SkinGlowPro", "#GlassSkinRoutine", "#CleanBeauty", "#MustHaveSkincare"],
      },
    },
  ],
  imageAssets: [
    {
      id: "asset-1-hero",
      type: "HERO_IMAGE",
      title: "Product Hero Image (Studio Commercial Shot)",
      aspectRatio: "1:1",
      recommendedFormat: "1200 x 1200 px (Square)",
      imageUrl: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=1200&q=80",
      modelUsed: "BytePlus Seedream 5.0 Pro",
      promptUsed: "Commercial studio hero photography of SkinGlow Pro serum, luxury water ripple podium, clean crisp cosmetic lighting, 8k resolution, indigo and cyan brand accents.",
      usage: "Primary featured product image on marketplace listings.",
    },
    {
      id: "asset-2-detail",
      type: "DETAIL_SKU",
      title: "SKU & Dropper Macro Shot",
      aspectRatio: "1:1",
      recommendedFormat: "1200 x 1200 px",
      imageUrl: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1200&q=80",
      modelUsed: "BytePlus Seedream 5.0 Pro",
      promptUsed: "Macro close-up shot of serum dropper releasing clear glowing droplet, high-definition texture, clinical clarity, professional cosmetic photography.",
      usage: "Secondary gallery image highlighting formula texture and premium packaging.",
    },
    {
      id: "asset-3-collection",
      type: "COLLECTION",
      title: "Lifestyle Context & Vanity Staging",
      aspectRatio: "4:5",
      recommendedFormat: "1080 x 1350 px (Vertical Feed)",
      imageUrl: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1200&q=80",
      modelUsed: "BytePlus Seedream 5.0 Pro",
      promptUsed: "Lifestyle context shot featuring SkinGlow Pro on modern marble vanity, warm morning sunlight, aesthetic lifestyle framing for young women.",
      usage: "Facebook & Instagram Carousel ad creative building relatable lifestyle context.",
    },
    {
      id: "asset-4-cover-badge",
      type: "MARKETPLACE_COVER",
      title: "Marketplace Promotional Cover with Offer Frame",
      aspectRatio: "1:1",
      recommendedFormat: "1000 x 1000 px",
      imageUrl: "https://images.unsplash.com/photo-1560343090-f0409e92791a?auto=format&fit=crop&w=1200&q=80",
      modelUsed: "BytePlus Seedream 5.0 Pro",
      promptUsed: "Marketplace e-commerce product banner with high-conversion promotional frame, 100% authentic badge, discount tag Buy 1 Get 1, sharp focus.",
      usage: "High CTR promotional cover image for seasonal sales campaigns.",
    },
  ],
  videoAsset: {
    title: "Short Video Ads 9:16 - SkinGlow Pro",
    modelUsed: "BytePlus Seedance 2.5 (Video) + Audio 1.0 (Voiceover)",
    duration: "25 Seconds (TikTok Shop / Reels Standard)",
    aspectRatio: "9:16 (Vertical 1080x1920)",
    voiceoverLanguage: "English (US Female Commercial Narration)",
    videoPreviewUrl: "https://assets.mixkit.co/videos/preview/mixkit-cosmetic-product-in-a-bath-of-water-and-petals-41662-large.mp4",
    scenes: [
      {
        sceneNum: 1,
        timing: "00:00 - 00:03s (3s Thumb-Stop Hook)",
        title: "Thumb-Stop Visual Hook",
        visualPrompt: "Close-up dynamic fast zoom of woman troubled by dark acne spots. Bold text overlay banner at top.",
        voiceoverText: "Still struggling with stubborn dark spots that refuse to fade? Stop scrolling right now!",
        onScreenText: "⚠️ STUBBORN DARK SPOTS? WATCH THIS!",
      },
      {
        sceneNum: 2,
        timing: "00:03 - 00:10s",
        title: "Product Reveal & Formula Demo",
        visualPrompt: "Seamless 3D rotation transition revealing SkinGlow Pro with water splash effect, showing 10% Niacinamide formula.",
        voiceoverText: "Meet SkinGlow Pro 10% Niacinamide — the clinical solution for barrier repair in just 14 days!",
        onScreenText: "✨ SKINGLOW PRO - 10% PURE NIACINAMIDE",
      },
      {
        sceneNum: 3,
        timing: "00:10 - 00:18s",
        title: "Clinical Proof & Benefits",
        visualPrompt: "Split screen Before/After demonstration, clinical badge overlay, user smiling happily with radiant skin finish.",
        voiceoverText: "Over 10,000 women have tested and verified visible redness reduction and brighter skin within two weeks.",
        onScreenText: "⭐ VISIBLE REDNESS REDUCTION IN 7 DAYS - DARK SPOTS IN 14 DAYS",
      },
      {
        sceneNum: 4,
        timing: "00:18 - 00:25s (Strong CTA)",
        title: "Conversion Call-to-Action",
        visualPrompt: "Animated shopping bag icon with downward glowing arrow pointing to TikTok Shop cart, displaying Buy 1 Get 1.",
        voiceoverText: "Exclusive launch bundle: Buy 1 Get 1 FREE today only! Tap the shopping cart below now!",
        onScreenText: "🛒 BUY 1 GET 1 FREE - TAP CART BELOW",
      },
    ],
  },
  commerceCopy: {
    seoTitle: "[Official] SkinGlow Pro 10% Pure Niacinamide Serum - Fades Dark Spots in 14 Days, 48H Hydration - Buy 1 Get 1 Free",
    productDescription: "Welcome to the next generation of scientific skincare: **SkinGlow Pro 10% Pure Niacinamide Serum**!\n\nEngineered by dermatological experts, SkinGlow Pro combines 10% pharmaceutical-grade Niacinamide with triple-molecular Hyaluronic Acid to visibly fade stubborn dark spots in 14 days while maintaining deep cellular hydration for up to 48 hours.\n\n📌 **Clinical Guarantees:** Calms visible redness in 7 days, visibly fades post-acne marks in 14 days, alcohol-free, paraben-free.\n\n🎯 **Why Choose SkinGlow Pro?**\n- Suitable for all skin types, including sensitive and blemish-prone skin.\n- Ultra-lightweight formula, fast-absorbing with zero sticky residue.\n- 100% satisfaction guarantee with hassle-free 30-day returns.",
    bulletPoints: [
      "💎 **10% Pure Niacinamide:** Visibly fades dark spots, refines skin texture, and minimizes the look of enlarged pores.",
      "💧 **Multi-Depth Hyaluronic Acid:** Delivers 48-hour deep hydration and strengthens the natural skin moisture barrier.",
      "🛡️ **Clean & Dermatologist Tested:** 0% Alcohol, 0% Parabens, 0% Synthetic Fragrances. Hypoallergenic.",
      "🎯 **Clinically Proven Results:** Reduces redness in 7 days and accelerates cellular renewal in 14 days.",
      "🎁 **Exclusive Launch Offer:** Buy 1 Serum (30ml), Get 1 Hydrating Cleanser (50ml) FREE + Free Worldwide Shipping.",
    ],
    shortHookLines: [
      "🔥 Fades dark spots in 14 days: The clean beauty secret everyone is talking about!",
      "💡 94% of users saw brighter, smoother skin within 2 weeks of SkinGlow Pro!",
      "⚡ 3 drops every morning — Glass skin confidence without heavy makeup!",
      "🛒 Limited launch bundle: Buy 1 Get 1 FREE ends tonight!",
    ],
    adCaptions: {
      facebook: "🎉 THE 14-DAY DARK SPOT RECOVERY SECRET IS FINALLY HERE!\n\n👉 Looking for a gentle yet powerful serum that actually delivers visible results? Discover SkinGlow Pro 10% Niacinamide!\n⚡ Special Launch Deal Today: Buy 1 Serum, Get 1 Cleanser FREE + Free Shipping!\n\n#SkinGlowPro #NiacinamideSerum #CleanSkincare #DarkSpotCorrector #LaunchDeal",
      tiktok: "The holy grail serum for post-acne marks and dull skin! 10% Niacinamide fades dark spots in 14 days 💧 Tap the shopping cart below to claim the Buy 1 Get 1 deal now 🛒👇 #SkinGlowPro #SkincareReview #GlassSkin #TikTokMadeMeBuyIt",
    },
  },
  abTestPlan: {
    hypothesis: "Testing Route A (Problem Agitation: post-acne dark spot frustration) against Route B (Lifestyle Aspiration: effortless dewy glass skin) to determine which creative angle drives higher 3-second hook retention and superior ROAS on TikTok Shop Ads.",
    variableTested: "3-Second Opening Hook Angle (Problem-Solution vs. Lifestyle Aspiration)",
    routeA: {
      name: "Route A: Problem Agitation",
      angle: "Directly targets post-acne pigmentation frustration",
      targetAudience: "Users self-conscious about stubborn blemishes",
      primaryMetric: "3-Second Hook Retention Rate",
      targetBenchmark: "3s Retention >= 35%, CTR >= 2.8%",
    },
    routeB: {
      name: "Route B: Lifestyle Social Proof",
      angle: "Emphasizes effortless Clean Beauty aesthetic",
      targetAudience: "Skincare enthusiasts looking for dewy glass skin",
      primaryMetric: "Click-Through Rate (CTR) & CVR",
      targetBenchmark: "CTR >= 2.2%, CVR >= 3.5%",
    },
    evaluationMetrics: [
      { metric: "3s Thumb-Stop Rate", benchmark: "> 35%", purpose: "Measures opening visual hook effectiveness" },
      { metric: "Click-Through Rate (CTR)", benchmark: "> 2.5%", purpose: "Measures ad intrigue and click intent" },
      { metric: "Add-to-Cart (ATC) Rate", benchmark: "> 8.0%", purpose: "Measures listing page persuasion" },
      { metric: "Target ROAS", benchmark: ">= 3.0x", purpose: "Ensures campaign profitability" },
    ],
    expectedLearning: "Identify whether target customers in the market respond more strongly to pain-point urgency or lifestyle aspiration, enabling media buyers to allocate 80% of budget to the winning creative route.",
  },
  performanceLearning: {
    analyzedSource: "Historical E-Commerce Benchmarks & Skincare Campaign Data",
    keep: [
      "Keep 9:16 vertical video format with bold high-contrast subtitles centered on screen (completed video rate 42%).",
      "Maintain bright studio cosmetic lighting which delivered 25% higher CVR than dark moody setups.",
    ],
    change: [
      "Shift opening video hook from generic brand intro to an urgent question within the first 2 seconds.",
      "Add authentic guarantee badge to the top right of the hero thumbnail to boost CTR by 18%.",
    ],
    stop: [
      "Discontinue long-form video ads over 45 seconds due to a 68% drop-off rate after second 15.",
      "Stop unverified absolute claims to ensure 100% platform ad policy compliance.",
    ],
    testNext: [
      "Test User-Generated Content (UGC) unboxing format paired with ASMR audio generated by Audio 1.0.",
      "Test limited-time flash bundle discount during peak evening shopping hours (8PM-10PM).",
    ],
  },
};

export default function WorkspaceProjectPage() {
  const params = useParams();
  const router = useRouter();
  const projectId = params.projectId as string;

  const { data: fetchedProject, isLoading } = useGetProject(projectId);
  const generateFullPackMutation = useGenerateCampaignPack();

  const [activeTab, setActiveTab] = useState("brief");

  // Campaign State in English
  const [campaignData, setCampaignData] = useState<CampaignDataState>({
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
  });

  const [fullPackOutput, setFullPackOutput] = useState<any>(DEFAULT_INITIAL_CAMPAIGN);

  // Sync loaded project details if available
  useEffect(() => {
    if (fetchedProject) {
      try {
        const parsed = JSON.parse(fetchedProject.json || "{}");
        setCampaignData((prev) => ({
          ...prev,
          productName: fetchedProject.name || prev.productName,
          uspDescription: parsed.description || prev.uspDescription,
          targetAudience: parsed.targetAudience || prev.targetAudience,
          marketSignals: {
            ...prev.marketSignals,
            campaignGoal: parsed.goal || prev.marketSignals.campaignGoal,
          },
        }));
      } catch {}
    }
  }, [fetchedProject]);

  const handleGenerateFullPack = () => {
    generateFullPackMutation.mutate(
      {
        productName: campaignData.productName,
        category: campaignData.category,
        uspDescription: campaignData.uspDescription,
        pricePromo: `${campaignData.salePrice} (Reg: ${campaignData.regularPrice})`,
        targetMarket: campaignData.targetMarket,
        targetAudience: campaignData.targetAudience,
        requiredClaims: campaignData.requiredClaims,
        restrictedClaims: campaignData.restrictedClaims,
        brandTone: campaignData.brandTone,
        brandColors: campaignData.brandColors,
        marketSignals: campaignData.marketSignals,
        pastCampaignData: campaignData.pastCampaignData,
      },
      {
        onSuccess: (res) => {
          if (res.data) {
            setFullPackOutput(res.data);
            setActiveTab("positioning");
            toast.success("🚀 BytePlus AI Orchestration complete! All 6 tabs updated.");
          }
        },
      }
    );
  };

  const projectTitle = campaignData.productName || fetchedProject?.name || "SkinGlow Pro Campaign";

  if (isLoading && !projectId.startsWith("mock-")) {
    return (
      <div className="flex flex-col items-center justify-center h-96">
        <Loader2 className="size-8 animate-spin text-indigo-600 mb-2" />
        <p className="text-xs text-slate-500 font-medium">Loading Product Workspace...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col space-y-3 max-w-screen-2xl mx-auto pb-10 px-2 sm:px-4">
      {/* ========================================================================= */}
      {/* INDUSTRIAL STANDARD MINIMAL HEADER (100% English) */}
      {/* ========================================================================= */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 bg-white px-4 py-2.5 rounded-lg border border-slate-200 shadow-2xs">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.push("/content-ai?tab=products")}
            className="size-7 rounded-md text-slate-500 hover:text-slate-900 hover:bg-slate-100 shrink-0"
          >
            <ChevronLeft className="size-4" />
          </Button>

          <div className="flex items-center gap-2 text-xs">
            <span
              onClick={() => router.push("/content-ai?tab=products")}
              className="text-slate-500 hover:text-indigo-600 cursor-pointer font-medium"
            >
              Products
            </span>
            <span className="text-slate-300">/</span>
            <span className="font-bold text-slate-900 truncate max-w-xs md:max-w-md">
              {projectTitle}
            </span>
            <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200 text-[10px] font-semibold">
              Published
            </Badge>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 shrink-0">
          <Button
            variant="outline"
            size="sm"
            onClick={() => router.push(`/editor/${projectId}`)}
            className="h-8 border-slate-300 text-slate-700 hover:bg-slate-50 text-xs font-semibold"
          >
            <Edit className="mr-1.5 size-3 text-purple-600" /> Graphic Editor
          </Button>

          <Button
            size="sm"
            onClick={handleGenerateFullPack}
            disabled={generateFullPackMutation.isPending || !campaignData.productName.trim()}
            className="h-8 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs px-3 shadow-2xs"
          >
            {generateFullPackMutation.isPending ? (
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
      </div>

      {/* ========================================================================= */}
      {/* COMPACT TABS BAR (Industrial Minimal) */}
      {/* ========================================================================= */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-3">
        <div className="bg-white p-1 rounded-lg border border-slate-200 shadow-2xs overflow-x-auto">
          <TabsList className="bg-slate-100 p-0.5 w-full justify-start flex-nowrap min-w-max gap-1">
            {/* Tab 1: Product Data */}
            <TabsTrigger value="brief" className="gap-1.5 px-3 py-1.5 text-xs font-bold">
              <Package className="size-3.5 text-slate-600" />
              1. Product Details
            </TabsTrigger>

            {/* Tab 2: Strategy & Positioning */}
            <TabsTrigger value="positioning" className="gap-1.5 px-3 py-1.5 text-xs font-bold">
              <Compass className="size-3.5 text-indigo-600" />
              2. Positioning &amp; Angle
            </TabsTrigger>

            {/* Tab 3: Creative Routes */}
            <TabsTrigger value="routes" className="gap-1.5 px-3 py-1.5 text-xs font-bold">
              <SplitSquareVertical className="size-3.5 text-purple-600" />
              3. Creative Routes (A/B)
            </TabsTrigger>

            {/* Tab 4: Product Visuals */}
            <TabsTrigger value="visuals" className="gap-1.5 px-3 py-1.5 text-xs font-bold">
              <ImageIcon className="size-3.5 text-emerald-600" />
              4. Product Visuals (4+)
            </TabsTrigger>

            {/* Tab 5: Video Studio */}
            <TabsTrigger value="video" className="gap-1.5 px-3 py-1.5 text-xs font-bold">
              <Video className="size-3.5 text-pink-600" />
              5. Video Ads (9:16)
            </TabsTrigger>

            {/* Tab 6: Commerce Copy */}
            <TabsTrigger value="copy" className="gap-1.5 px-3 py-1.5 text-xs font-bold">
              <FileCode2 className="size-3.5 text-blue-600" />
              6. Commerce Copy
            </TabsTrigger>

            {/* Tab 7: A/B Testing & Launch Pack */}
            <TabsTrigger value="abtest" className="gap-1.5 px-3 py-1.5 text-xs font-bold">
              <TrendingUp className="size-3.5 text-teal-600" />
              7. A/B Plan &amp; Export
            </TabsTrigger>
          </TabsList>
        </div>

        {/* Tab 1: Product Details */}
        <TabsContent value="brief" className="mt-0">
          <BriefSignalsTab
            project={{ id: projectId, name: projectTitle, json: "" }}
            campaignData={campaignData}
            setCampaignData={setCampaignData}
            onGenerateFullPack={handleGenerateFullPack}
            isGenerating={generateFullPackMutation.isPending}
          />
        </TabsContent>

        {/* Tab 2: Strategy & Positioning */}
        <TabsContent value="positioning" className="mt-0">
          <StrategyPositioningTab
            positioning={fullPackOutput.positioning}
            productName={campaignData.productName}
            category={campaignData.category}
          />
        </TabsContent>

        {/* Tab 3: Creative Routes */}
        <TabsContent value="routes" className="mt-0">
          <CreativeRoutesTab
            creativeRoutes={fullPackOutput.creativeRoutes}
            productName={campaignData.productName}
          />
        </TabsContent>

        {/* Tab 4: Product Visuals */}
        <TabsContent value="visuals" className="mt-0">
          <ImageAssetsTab
            imageAssets={fullPackOutput.imageAssets}
            projectId={projectId}
            productName={campaignData.productName}
          />
        </TabsContent>

        {/* Tab 5: Video Studio */}
        <TabsContent value="video" className="mt-0">
          <VideoStudioTab
            videoAsset={fullPackOutput.videoAsset}
            productName={campaignData.productName}
          />
        </TabsContent>

        {/* Tab 6: Commerce Copy */}
        <TabsContent value="copy" className="mt-0">
          <CommerceCopyTab
            commerceCopy={fullPackOutput.commerceCopy}
            productName={campaignData.productName}
          />
        </TabsContent>

        {/* Tab 7: A/B Testing & Launch Pack */}
        <TabsContent value="abtest" className="mt-0">
          <AbTestLaunchTab
            abTestPlan={fullPackOutput.abTestPlan}
            performanceLearning={fullPackOutput.performanceLearning}
            fullCampaignData={fullPackOutput}
            productName={campaignData.productName}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
