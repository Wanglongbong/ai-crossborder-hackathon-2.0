"use client";

import { useState } from "react";
import { LayoutGrid, Heart, MessageCircle, Share2, ThumbsUp, Globe, MoreHorizontal, Bookmark } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RichText, cleanPlainText } from "@/components/rich-text";

interface AdsPreviewTabProps {
  project: {
    name: string;
    json: string;
  };
  selectedContent?: {
    title: string;
    body: string;
    cta: string;
    hashtags: string[];
  } | null;
}

export const AdsPreviewTab = ({ project, selectedContent }: AdsPreviewTabProps) => {
  const [platform, setPlatform] = useState<"facebook" | "instagram" | "tiktok">("facebook");

  let initialDesc = "10% Niacinamide serum with hydration glowing effect.";
  try {
    const parsed = JSON.parse(project.json || "{}");
    if (parsed.description) initialDesc = parsed.description;
  } catch {}

  const title = selectedContent?.title || `🔥 UNLOCK YOUR RADIANT SKIN WITH ${project.name.toUpperCase()}!`;
  const body = selectedContent?.body || `Formulated with **10% Niacinamide** to reduce dark spots in 14 days and deliver **48h deep hydration**.`;
  const cta = selectedContent?.cta || "👉 Click below to claim your exclusive **30% OFF** discount!";
  const hashtags = selectedContent?.hashtags?.join(" ") || `#${project.name.replace(/\s+/g, "")} #SkincareGoals #AIContent`;

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-xl border shadow-sm">
        <div className="flex items-center gap-x-2">
          <LayoutGrid className="size-5 text-indigo-600" />
          <h3 className="font-bold text-slate-800 text-sm">Multi-Channel Ads Live Preview</h3>
        </div>

        <Tabs value={platform} onValueChange={(val: string) => setPlatform(val as any)} className="w-full sm:w-auto">
          <TabsList className="bg-slate-100 p-1">
            <TabsTrigger value="facebook" className="text-xs px-3">Facebook Feed</TabsTrigger>
            <TabsTrigger value="instagram" className="text-xs px-3">Instagram Post</TabsTrigger>
            <TabsTrigger value="tiktok" className="text-xs px-3">TikTok Feed</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Main Container */}
      <div className="flex justify-center py-6 bg-slate-100/70 rounded-2xl border">
        {platform === "facebook" && (
          /* FACEBOOK FEED PREVIEW */
          <div className="w-full max-w-[500px] bg-white rounded-xl shadow-md border overflow-hidden">
            {/* Header */}
            <div className="p-4 flex items-center justify-between border-b">
              <div className="flex items-center gap-3">
                <div className="size-10 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold flex items-center justify-center text-sm shadow">
                  {project.name.slice(0, 2).toUpperCase()}
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h5 className="font-bold text-sm text-slate-900">{project.name}</h5>
                    <span className="text-[10px] bg-blue-50 text-blue-600 font-semibold px-1.5 py-0.2 rounded">Sponsored</span>
                  </div>
                  <div className="flex items-center gap-1 text-[11px] text-slate-400">
                    <span>Just now</span>
                    <span>•</span>
                    <Globe className="size-3" />
                  </div>
                </div>
              </div>
              <MoreHorizontal className="size-5 text-slate-400 cursor-pointer" />
            </div>

            {/* Rich Content Text */}
            <div className="p-4 space-y-2 text-xs text-slate-800 leading-relaxed">
              <h5 className="font-bold text-slate-900 text-sm">{cleanPlainText(title)}</h5>
              <RichText content={body} />
              <div className="pt-1 text-indigo-600 font-semibold">
                <RichText content={cta} />
              </div>
              <p className="text-[11px] text-blue-600 font-medium">{hashtags}</p>
            </div>

            {/* Media Box */}
            <div className="relative aspect-video bg-gradient-to-br from-indigo-900 via-purple-900 to-slate-900 flex flex-col items-center justify-center p-6 text-white text-center">
              <span className="text-[10px] font-semibold tracking-wider text-indigo-300 uppercase mb-1">Official Product Visual</span>
              <h4 className="text-xl font-extrabold max-w-xs">{project.name}</h4>
              <p className="text-xs text-slate-300 mt-2 max-w-xs line-clamp-2">{cleanPlainText(initialDesc)}</p>
            </div>

            {/* Bottom CTA Bar */}
            <div className="p-3 bg-slate-100 border-t border-b flex items-center justify-between">
              <div>
                <span className="text-[10px] text-slate-500 uppercase font-semibold">ROMEDIA.ROBOSOFT.SITE</span>
                <p className="text-xs font-bold text-slate-900 truncate max-w-[280px]">{cleanPlainText(title)}</p>
              </div>
              <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-4">
                Shop Now
              </Button>
            </div>

            {/* Reactions */}
            <div className="p-3 flex items-center justify-between text-xs text-slate-500 border-t">
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" className="h-8 gap-1.5 text-xs text-slate-600">
                  <ThumbsUp className="size-4 text-blue-600" /> Like
                </Button>
                <Button variant="ghost" size="sm" className="h-8 gap-1.5 text-xs text-slate-600">
                  <MessageCircle className="size-4" /> Comment
                </Button>
              </div>
              <Button variant="ghost" size="sm" className="h-8 gap-1.5 text-xs text-slate-600">
                <Share2 className="size-4" /> Share
              </Button>
            </div>
          </div>
        )}

        {platform === "instagram" && (
          /* INSTAGRAM PREVIEW */
          <div className="w-full max-w-[420px] bg-white rounded-2xl shadow-md border overflow-hidden">
            <div className="p-3.5 flex items-center justify-between border-b">
              <div className="flex items-center gap-2.5">
                <div className="size-8 rounded-full bg-gradient-to-tr from-yellow-400 via-rose-500 to-purple-600 p-[2px]">
                  <div className="size-full bg-white rounded-full flex items-center justify-center font-bold text-xs">
                    {project.name.slice(0, 1).toUpperCase()}
                  </div>
                </div>
                <div>
                  <p className="font-bold text-xs text-slate-900">{project.name.toLowerCase().replace(/\s+/g, "")}</p>
                  <p className="text-[10px] text-slate-400">Sponsored</p>
                </div>
              </div>
              <MoreHorizontal className="size-4 text-slate-500" />
            </div>

            <div className="aspect-square bg-slate-950 flex flex-col items-center justify-center p-6 text-white text-center">
              <span className="text-xs text-rose-400 font-bold mb-1">INSTAGRAM ADS</span>
              <h4 className="text-2xl font-bold">{project.name}</h4>
              <p className="text-xs text-slate-300 mt-2 max-w-xs line-clamp-2">{cleanPlainText(initialDesc)}</p>
            </div>

            <div className="p-3 flex items-center justify-between text-slate-700">
              <div className="flex items-center gap-3">
                <Heart className="size-5 cursor-pointer hover:text-rose-500" />
                <MessageCircle className="size-5 cursor-pointer" />
                <Share2 className="size-5 cursor-pointer" />
              </div>
              <Bookmark className="size-5 cursor-pointer" />
            </div>

            <div className="px-3 pb-4 space-y-1 text-xs">
              <p className="font-bold text-slate-900">1,842 likes</p>
              <div className="text-slate-800 leading-relaxed space-y-1">
                <span className="font-bold mr-1.5">{project.name.toLowerCase().replace(/\s+/g, "")}</span>
                <span className="font-bold text-slate-900">{cleanPlainText(title)}</span>
                <RichText content={body} />
              </div>
              <p className="text-indigo-600 font-medium pt-1">{hashtags}</p>
            </div>
          </div>
        )}

        {platform === "tiktok" && (
          /* TIKTOK PREVIEW */
          <div className="w-[340px] h-[600px] bg-slate-950 rounded-3xl shadow-xl border-4 border-slate-800 relative overflow-hidden text-white flex flex-col justify-between p-4">
            <div className="flex justify-between items-center text-xs text-slate-300 pt-2 px-2">
              <span className="font-bold">Following</span>
              <span className="font-bold text-white border-b-2 border-white pb-0.5">For You</span>
              <span className="size-4"></span>
            </div>

            <div className="space-y-2 mb-12">
              <div className="flex items-center gap-2">
                <div className="size-8 rounded-full bg-white text-slate-950 font-extrabold flex items-center justify-center text-xs border border-pink-500">
                  {project.name.slice(0, 1)}
                </div>
                <span className="font-bold text-sm">@{project.name.toLowerCase().replace(/\s+/g, "")}</span>
                <span className="text-[10px] bg-red-600 text-white font-bold px-1.5 py-0.5 rounded">Ad</span>
              </div>

              <div className="text-xs text-slate-100 line-clamp-3 leading-relaxed">
                {cleanPlainText(title)} - {cleanPlainText(body)}
              </div>

              <div className="bg-pink-600 hover:bg-pink-700 text-white text-xs font-bold py-2.5 rounded-lg text-center cursor-pointer shadow-lg">
                Shop Now / Learn More ➔
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
