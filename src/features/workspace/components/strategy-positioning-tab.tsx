"use client";

import {
  Target,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  TrendingUp,
  HeartHandshake,
  Zap,
  Award,
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface StrategyPositioningTabProps {
  positioning: {
    mainCampaignAngle: string;
    targetAudiencePersona: {
      demographics: string;
      market: string;
      psychographics: string;
      buyingTrigger: string;
    };
    benefitHierarchy: Array<{
      level: string;
      title: string;
      description: string;
    }>;
    coreSellingMessage: string;
    claimsComplianceNote: string;
  };
  productName: string;
  category: string;
}

export const StrategyPositioningTab = ({
  positioning,
  productName,
  category,
}: StrategyPositioningTabProps) => {
  return (
    <div className="space-y-4">
      {/* Top Banner: Main Angle */}
      <Card className="bg-slate-900 text-white border-0 shadow-2xs rounded-lg">
        <CardContent className="p-5 space-y-2.5">
          <div className="flex items-center justify-between">
            <Badge className="bg-indigo-500/20 text-indigo-300 border-indigo-400/30 text-[10px] font-bold">
              BytePlus Seed 2.1 Strategic Reasoning
            </Badge>
            <div className="flex items-center gap-1 text-xs text-emerald-400 font-medium">
              <ShieldCheck className="size-3.5" />
              <span>Claims Compliant</span>
            </div>
          </div>

          <div className="space-y-0.5">
            <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">
              Main Campaign Angle
            </span>
            <h2 className="text-xl font-bold tracking-tight leading-snug text-white">
              &quot;{positioning.mainCampaignAngle}&quot;
            </h2>
          </div>

          <div className="pt-2 border-t border-slate-800 flex flex-wrap items-center gap-3 text-xs text-slate-400">
            <span>Category: <strong className="text-slate-200">{category}</strong></span>
            <span>•</span>
            <span>Product: <strong className="text-slate-200">{productName}</strong></span>
            <span>•</span>
            <span>Market: <strong className="text-slate-200">{positioning.targetAudiencePersona.market}</strong></span>
          </div>
        </CardContent>
      </Card>

      {/* Grid: Target Persona & Core Selling Message (2 Cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Left: Target Audience Persona Breakdown (7 Cols) */}
        <div className="lg:col-span-7 space-y-4">
          <Card className="border-slate-300 shadow-2xs rounded-lg h-full bg-white">
            <CardHeader className="py-2.5 px-4 border-b bg-slate-50">
              <CardTitle className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                <Target className="size-3.5 text-indigo-600" />
                Target Audience Persona Breakdown
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 space-y-3 text-xs">
              <div className="space-y-1 bg-slate-50 p-3 rounded-md border border-slate-200">
                <span className="font-bold text-slate-900 flex items-center gap-1.5">
                  <TrendingUp className="size-3.5 text-indigo-600" />
                  Demographics:
                </span>
                <p className="text-slate-700 leading-relaxed font-medium">
                  {positioning.targetAudiencePersona.demographics}
                </p>
              </div>

              <div className="space-y-1 bg-slate-50 p-3 rounded-md border border-slate-200">
                <span className="font-bold text-slate-900 flex items-center gap-1.5">
                  <HeartHandshake className="size-3.5 text-purple-600" />
                  Psychographics & Lifestyle:
                </span>
                <p className="text-slate-700 leading-relaxed font-medium">
                  {positioning.targetAudiencePersona.psychographics}
                </p>
              </div>

              <div className="space-y-1 bg-slate-50 p-3 rounded-md border border-slate-200">
                <span className="font-bold text-slate-900 flex items-center gap-1.5">
                  <Zap className="size-3.5 text-amber-600" />
                  Conversion Buying Triggers:
                </span>
                <p className="text-slate-700 leading-relaxed font-medium">
                  {positioning.targetAudiencePersona.buyingTrigger}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right: Core Selling Message & Claims Note (5 Cols) */}
        <div className="lg:col-span-5 space-y-4">
          <Card className="border-slate-300 shadow-2xs rounded-lg bg-white h-full flex flex-col justify-between">
            <div>
              <CardHeader className="py-2.5 px-4 border-b bg-slate-50">
                <CardTitle className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                  <Sparkles className="size-3.5 text-yellow-500" />
                  Core Selling Message
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 space-y-3 text-xs">
                <div className="bg-indigo-50/60 p-3.5 rounded-md border border-indigo-100">
                  <p className="text-xs font-bold text-indigo-950 leading-relaxed italic">
                    &quot;{positioning.coreSellingMessage}&quot;
                  </p>
                </div>

                <div className="space-y-1.5 pt-1">
                  <span className="font-semibold text-slate-600 block">Policy & Claims Compliance Status:</span>
                  <div className="p-2.5 bg-emerald-50 text-emerald-900 rounded-md border border-emerald-200 text-xs font-medium flex items-start gap-1.5">
                    <CheckCircle2 className="size-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{positioning.claimsComplianceNote}</span>
                  </div>
                </div>
              </CardContent>
            </div>

            <div className="p-3 border-t bg-slate-50 text-[11px] text-slate-500 flex items-center justify-between">
              <span>Model: BytePlus Seed 2.1</span>
              <span className="text-indigo-600 font-semibold">Verified</span>
            </div>
          </Card>
        </div>
      </div>

      {/* Benefit Hierarchy (3 Levels) */}
      <Card className="border-slate-300 shadow-2xs rounded-lg bg-white">
        <CardHeader className="py-2.5 px-4 border-b bg-slate-50">
          <CardTitle className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
            <Award className="size-3.5 text-indigo-600" />
            Benefit Hierarchy Structure
          </CardTitle>
          <CardDescription className="text-xs text-slate-500">
            Tiered customer value proposition from instant functional proof to emotional identity.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {positioning.benefitHierarchy.map((item, idx) => (
              <div
                key={idx}
                className="bg-white p-3.5 rounded-md border border-slate-200 shadow-2xs space-y-1.5 flex flex-col justify-between"
              >
                <div className="space-y-1">
                  <Badge variant="outline" className="bg-indigo-50 text-indigo-700 border-indigo-200 text-[10px] font-bold">
                    {item.level}
                  </Badge>
                  <h4 className="text-xs font-bold text-slate-900 leading-snug">{item.title}</h4>
                  <p className="text-xs text-slate-600 leading-relaxed font-normal">{item.description}</p>
                </div>
                <div className="pt-2 border-t border-slate-100 flex items-center gap-1 text-[11px] text-emerald-600 font-medium">
                  <CheckCircle2 className="size-3" /> E-commerce Ad Ready
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
