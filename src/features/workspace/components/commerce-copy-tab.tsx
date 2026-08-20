"use client";

import { useState } from "react";
import {
  FileCode2,
  Copy,
  Check,
  Sparkles,
  Share2,
  CheckCircle2,
  ShoppingBag,
} from "lucide-react";
import { toast } from "sonner";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface CommerceCopyTabProps {
  commerceCopy: {
    seoTitle: string;
    productDescription: string;
    bulletPoints: string[];
    shortHookLines: string[];
    adCaptions: {
      facebook: string;
      tiktok: string;
    };
  };
  productName: string;
}

export const CommerceCopyTab = ({ commerceCopy, productName }: CommerceCopyTabProps) => {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleCopy = (key: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    toast.success("Copied to clipboard.");
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div className="space-y-4">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-900 text-white p-4 rounded-lg shadow-2xs">
        <div className="space-y-0.5">
          <div className="flex items-center gap-2">
            <Badge className="bg-blue-500/20 text-blue-300 border-blue-400/30 text-[10px] font-bold">
              Multi-Channel E-Commerce Copywriting
            </Badge>
            <Badge className="bg-yellow-500/20 text-yellow-300 border-yellow-400/30 text-[10px] font-bold">
              BytePlus Seed 2.1 Generated
            </Badge>
          </div>
          <h2 className="text-base font-bold tracking-tight">
            High-Conversion Commerce Copy &amp; Social Ads
          </h2>
          <p className="text-xs text-slate-400">
            SEO-optimized marketplace listing titles, feature bullet points, product descriptions, and multi-channel ad captions.
          </p>
        </div>

        <Button
          size="sm"
          onClick={() =>
            handleCopy(
              "all",
              `${commerceCopy.seoTitle}\n\n${commerceCopy.bulletPoints.join("\n")}\n\n${commerceCopy.productDescription}`
            )
          }
          className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold h-8 px-3 shadow-2xs shrink-0"
        >
          <Copy className="mr-1.5 size-3.5" /> Copy Entire Listing Pack
        </Button>
      </div>

      {/* Main 2-Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Left Column: Marketplace Listing Copy (7 Cols) */}
        <div className="lg:col-span-7 space-y-4">
          {/* 1. SEO Product Title */}
          <Card className="border-slate-300 shadow-2xs rounded-lg bg-white">
            <CardHeader className="py-2.5 px-4 border-b bg-slate-50 flex flex-row items-center justify-between">
              <div className="flex items-center gap-2">
                <ShoppingBag className="size-3.5 text-blue-600" />
                <CardTitle className="text-xs font-bold text-slate-900">
                  SEO-Optimized Product Title (Marketplace Standard)
                </CardTitle>
              </div>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => handleCopy("title", commerceCopy.seoTitle)}
                className="h-6 text-[11px] text-blue-600 hover:bg-blue-50 p-1"
              >
                {copiedKey === "title" ? <Check className="mr-1 size-3 text-green-600" /> : <Copy className="mr-1 size-3" />}
                Copy
              </Button>
            </CardHeader>
            <CardContent className="p-4">
              <p className="text-xs font-bold text-slate-900 leading-relaxed bg-slate-50 p-3 rounded border border-slate-200">
                {commerceCopy.seoTitle}
              </p>
            </CardContent>
          </Card>

          {/* 2. 5 Key Feature Bullet Points */}
          <Card className="border-slate-300 shadow-2xs rounded-lg bg-white">
            <CardHeader className="py-2.5 px-4 border-b bg-slate-50 flex flex-row items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="size-3.5 text-yellow-500" />
                <CardTitle className="text-xs font-bold text-slate-900">
                  5 Core Selling Bullet Points
                </CardTitle>
              </div>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => handleCopy("bullets", commerceCopy.bulletPoints.join("\n"))}
                className="h-6 text-[11px] text-blue-600 hover:bg-blue-50 p-1"
              >
                {copiedKey === "bullets" ? <Check className="mr-1 size-3 text-green-600" /> : <Copy className="mr-1 size-3" />}
                Copy Bullets
              </Button>
            </CardHeader>
            <CardContent className="p-4 space-y-2 text-xs">
              {commerceCopy.bulletPoints.map((bullet, idx) => (
                <div key={idx} className="flex items-start gap-2 bg-slate-50 p-2.5 rounded border border-slate-200">
                  <CheckCircle2 className="size-3.5 text-blue-600 shrink-0 mt-0.5" />
                  <p className="text-slate-800 leading-relaxed font-medium">{bullet}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* 3. Detailed Product Description */}
          <Card className="border-slate-300 shadow-2xs rounded-lg bg-white">
            <CardHeader className="py-2.5 px-4 border-b bg-slate-50 flex flex-row items-center justify-between">
              <div className="flex items-center gap-2">
                <FileCode2 className="size-3.5 text-slate-700" />
                <CardTitle className="text-xs font-bold text-slate-900">
                  Detailed Product Description (Markdown / HTML Ready)
                </CardTitle>
              </div>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => handleCopy("desc", commerceCopy.productDescription)}
                className="h-6 text-[11px] text-blue-600 hover:bg-blue-50 p-1"
              >
                {copiedKey === "desc" ? <Check className="mr-1 size-3 text-green-600" /> : <Copy className="mr-1 size-3" />}
                Copy Description
              </Button>
            </CardHeader>
            <CardContent className="p-4">
              <div className="bg-slate-50 p-3.5 rounded border border-slate-200 text-xs text-slate-700 leading-relaxed whitespace-pre-line font-mono text-[11px]">
                {commerceCopy.productDescription}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Social Ad Captions & Short Hooks (5 Cols) */}
        <div className="lg:col-span-5 space-y-4">
          {/* Social Ad Captions */}
          <Card className="border-slate-300 shadow-2xs rounded-lg bg-white">
            <CardHeader className="py-2.5 px-4 border-b bg-slate-50">
              <CardTitle className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                <Share2 className="size-3.5 text-blue-600" />
                Paid Social Ad Captions
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 space-y-3.5 text-xs">
              {/* Facebook / Meta Ad */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <Badge className="bg-blue-600 text-white text-[10px] font-bold">
                    Facebook / Instagram Feed Ad
                  </Badge>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleCopy("fb", commerceCopy.adCaptions.facebook)}
                    className="h-5 text-[10px] text-blue-600 p-0"
                  >
                    {copiedKey === "fb" ? "Copied" : "Copy"}
                  </Button>
                </div>
                <div className="bg-slate-50 p-3 rounded border border-slate-200 text-slate-800 whitespace-pre-line text-xs font-medium leading-relaxed">
                  {commerceCopy.adCaptions.facebook}
                </div>
              </div>

              {/* TikTok Shop Caption */}
              <div className="space-y-1.5 pt-2 border-t border-slate-100">
                <div className="flex items-center justify-between">
                  <Badge className="bg-slate-900 text-white text-[10px] font-bold">
                    TikTok Shop Video Caption
                  </Badge>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleCopy("tt", commerceCopy.adCaptions.tiktok)}
                    className="h-5 text-[10px] text-blue-600 p-0"
                  >
                    {copiedKey === "tt" ? "Copied" : "Copy"}
                  </Button>
                </div>
                <div className="bg-slate-50 p-3 rounded border border-slate-200 text-slate-800 whitespace-pre-line text-xs font-medium leading-relaxed">
                  {commerceCopy.adCaptions.tiktok}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Viral Hooks */}
          <Card className="border-slate-300 shadow-2xs rounded-lg bg-white">
            <CardHeader className="py-2.5 px-4 border-b bg-slate-50">
              <CardTitle className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                <Sparkles className="size-3.5 text-yellow-500" />
                Short Punchy Hooks (Thumb-Stop Lines)
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 space-y-2 text-xs">
              {commerceCopy.shortHookLines.map((hook, idx) => (
                <div
                  key={idx}
                  onClick={() => handleCopy(`hook-${idx}`, hook)}
                  className="bg-yellow-50/50 hover:bg-yellow-50 p-2.5 rounded border border-yellow-200 cursor-pointer transition-colors flex items-center justify-between"
                >
                  <span className="font-bold text-slate-900 text-xs">{hook}</span>
                  <Copy className="size-3 text-slate-400 shrink-0 ml-2" />
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
