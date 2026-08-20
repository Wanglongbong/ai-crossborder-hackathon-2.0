"use client";

import { useState } from "react";
import {
  SplitSquareVertical,
  Copy,
  Check,
  Sparkles,
  Video,
  Layout,
  Zap,
} from "lucide-react";
import { toast } from "sonner";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface CreativeRoutesTabProps {
  creativeRoutes: Array<{
    id: string;
    type: string;
    name: string;
    hookIdea: string;
    visualDirection: string;
    messageAngle: string;
    suggestedPlatform: string;
    adCopy: {
      title: string;
      caption: string;
      cta: string;
      hashtags: string[];
    };
  }>;
  productName: string;
}

export const CreativeRoutesTab = ({ creativeRoutes, productName }: CreativeRoutesTabProps) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    toast.success("Ad copy copied to clipboard.");
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-4">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-900 text-white p-4 rounded-lg shadow-2xs">
        <div className="space-y-0.5">
          <div className="flex items-center gap-2">
            <Badge className="bg-indigo-500/20 text-indigo-300 border-indigo-400/30 text-[10px] font-bold">
              A/B Testing Creative Routes
            </Badge>
            <Badge className="bg-yellow-500/20 text-yellow-300 border-yellow-400/30 text-[10px] font-bold">
              BytePlus Seed 2.1 Generated
            </Badge>
          </div>
          <h2 className="text-base font-bold tracking-tight">
            Dual Creative Angles for A/B Performance Testing
          </h2>
          <p className="text-xs text-slate-400">
            Compare two distinct creative messaging angles to determine which delivers higher CTR and ROAS for &quot;{productName}&quot;.
          </p>
        </div>

        <div className="flex items-center gap-1.5 text-xs font-semibold bg-white/10 px-3 py-1.5 rounded text-white shrink-0">
          <SplitSquareVertical className="size-3.5 text-yellow-400" />
          <span>Route A vs Route B</span>
        </div>
      </div>

      {/* Side-by-Side Comparison Grid (2 Columns) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {creativeRoutes.map((route, idx) => {
          const isRouteA = route.type === "ROUTE_A";
          return (
            <Card
              key={route.id || idx}
              className="border-slate-300 shadow-2xs rounded-lg flex flex-col justify-between bg-white"
            >
              <div>
                <CardHeader className="py-2.5 px-4 border-b bg-slate-50 flex flex-row items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Badge className={isRouteA ? "bg-indigo-600 text-white text-[10px] font-bold" : "bg-purple-600 text-white text-[10px] font-bold"}>
                      {route.type}
                    </Badge>
                    <CardTitle className="text-xs font-bold text-slate-900">
                      {route.name}
                    </CardTitle>
                  </div>

                  <Badge variant="outline" className="text-[10px] font-semibold bg-white text-slate-700">
                    {route.suggestedPlatform}
                  </Badge>
                </CardHeader>

                <CardContent className="p-4 space-y-3.5 text-xs">
                  {/* 1. Hook Idea */}
                  <div className="space-y-1">
                    <span className="font-bold text-slate-500 uppercase text-[10px] tracking-wider flex items-center gap-1">
                      <Zap className="size-3 text-amber-500" />
                      1. 3-Second Thumb-Stop Hook:
                    </span>
                    <div className="p-2.5 rounded bg-slate-50 border border-slate-200 font-semibold text-xs leading-relaxed text-slate-900">
                      {route.hookIdea}
                    </div>
                  </div>

                  {/* 2. Visual Direction */}
                  <div className="space-y-1">
                    <span className="font-bold text-slate-500 uppercase text-[10px] tracking-wider flex items-center gap-1">
                      <Layout className="size-3 text-indigo-500" />
                      2. Visual Direction & Lighting:
                    </span>
                    <div className="p-2.5 bg-slate-50 border border-slate-200 rounded text-slate-700 font-medium leading-relaxed">
                      {route.visualDirection}
                    </div>
                  </div>

                  {/* 3. Message Angle */}
                  <div className="space-y-1">
                    <span className="font-bold text-slate-500 uppercase text-[10px] tracking-wider flex items-center gap-1">
                      <Sparkles className="size-3 text-purple-500" />
                      3. Strategic Psychological Angle:
                    </span>
                    <p className="text-slate-700 font-medium leading-relaxed">
                      {route.messageAngle}
                    </p>
                  </div>

                  {/* 4. Generated Ad Copy Preview */}
                  <div className="space-y-1.5 pt-2 border-t border-slate-100">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-500 uppercase text-[10px] tracking-wider">
                        4. Complete Ad Copy Package:
                      </span>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() =>
                          handleCopy(
                            route.id,
                            `${route.adCopy.title}\n\n${route.adCopy.caption}\n\n${route.adCopy.cta}\n\n${route.adCopy.hashtags.join(" ")}`
                          )
                        }
                        className="h-6 text-[11px] text-indigo-600 hover:bg-indigo-50 p-1 font-semibold"
                      >
                        {copiedId === route.id ? (
                          <>
                            <Check className="mr-1 size-3 text-green-600" /> Copied
                          </>
                        ) : (
                          <>
                            <Copy className="mr-1 size-3" /> Copy Text
                          </>
                        )}
                      </Button>
                    </div>

                    <div className="bg-slate-900 text-slate-100 p-3 rounded-md space-y-1.5 font-mono text-[11px] leading-relaxed">
                      <p className="font-bold text-yellow-300">{route.adCopy.title}</p>
                      <p className="whitespace-pre-line text-slate-300 text-[10px]">{route.adCopy.caption}</p>
                      <p className="text-emerald-400 font-bold text-[10px]">{route.adCopy.cta}</p>
                      <p className="text-indigo-400 text-[9px]">{route.adCopy.hashtags.join(" ")}</p>
                    </div>
                  </div>
                </CardContent>
              </div>

              <div className="p-3 border-t bg-slate-50 text-[11px] text-slate-500 flex items-center justify-between">
                <span className="flex items-center gap-1 font-medium">
                  <Video className="size-3 text-indigo-600" /> Seedance 2.5 Compatible
                </span>
                <span className="font-semibold text-indigo-600">Priority: High</span>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
