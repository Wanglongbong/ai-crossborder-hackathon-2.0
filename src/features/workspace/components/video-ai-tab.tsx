"use client";

import { useState } from "react";
import { Video, Sparkles, Wand2, Copy, Check, PlayCircle } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RichText, cleanPlainText } from "@/components/rich-text";

interface VideoAiTabProps {
  project: {
    id: string;
    name: string;
    json: string;
  };
}

export const VideoAiTab = ({ project }: VideoAiTabProps) => {
  let initialDesc = "10% Niacinamide serum with hydration glowing effect.";
  try {
    const parsed = JSON.parse(project.json || "{}");
    if (parsed.description) initialDesc = parsed.description;
  } catch {}

  const [videoType, setVideoType] = useState("TikTok / Reels (15s - 30s)");
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);

  const scriptScenes = [
    {
      scene: "Scene 1 (0-3s): Attention Hook",
      visual: `Close-up shot of dull, dehydrated skin problems before using **${project.name}**. Bold overlay text banner at the top of the screen.`,
      voiceover: `Tired of spending money on skincare products that take months without visible results?`,
    },
    {
      scene: "Scene 2 (3-10s): Product Revelation",
      visual: `Fast dynamic transition to 360-degree sleek product hero shot of **${project.name}** with water splash effect.`,
      voiceover: `Say hello to **${project.name}**! Your daily 14-day skin radiance accelerator.`,
    },
    {
      scene: "Scene 3 (10-20s): Live Demo & Social Proof",
      visual: `User applying serum onto cheek, instant glowing finish transition with **Before & After** split screen comparison.`,
      voiceover: `Lightweight, non-greasy, and clinically proven to boost hydration by 85%. Over 10,000 users agree!`,
    },
    {
      scene: "Scene 4 (20-30s): High-Impact CTA",
      visual: `Display **30% OFF** promotion badge with animated arrow pointing down to the shopping cart icon.`,
      voiceover: `Click the link below to grab your exclusive bottle before stock runs out!`,
    },
  ];

  const onCopyScript = (idx: number, rawText: string) => {
    const cleanText = cleanPlainText(rawText);
    navigator.clipboard.writeText(cleanText);
    setCopiedIdx(idx);
    toast.success("Scene script copied as plain text!");
    setTimeout(() => setCopiedIdx(null), 2000);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      {/* Left Config (4 Cols) */}
      <div className="lg:col-span-4 space-y-6">
        <Card className="border-slate-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-bold flex items-center gap-x-2 text-slate-800">
              <Video className="size-5 text-indigo-600" />
              Short Video AI Script Generator
            </CardTitle>
            <CardDescription className="text-xs">
              AI analyzes product key features for &quot;{project.name}&quot; and outputs scene-by-scene video prompts for TikTok, Reels &amp; Shorts.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label className="font-semibold text-slate-700 text-xs">Video Format & Platform</Label>
              <Select value={videoType} onValueChange={setVideoType}>
                <SelectTrigger className="bg-slate-50 border-slate-200 text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="TikTok / Reels (15s - 30s)">TikTok / Reels (15s - 30s)</SelectItem>
                  <SelectItem value="Facebook Short Video Ad">Facebook Short Video Ad (30s-60s)</SelectItem>
                  <SelectItem value="YouTube Shorts Review">YouTube Shorts Product Review (60s)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold py-5 text-xs">
              <Wand2 className="mr-2 size-4 text-yellow-300" />
              Regenerate Video Script
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Right Script Scene Flow (8 Cols) */}
      <div className="lg:col-span-8 space-y-4">
        <div className="flex items-center justify-between bg-purple-900 text-white p-4 rounded-xl shadow-sm">
          <div className="flex items-center gap-2">
            <PlayCircle className="size-5 text-yellow-400" />
            <span className="font-bold text-sm">
              Storyboard Scene Script ({videoType})
            </span>
          </div>
          <Badge className="bg-purple-700 text-purple-100 font-semibold text-xs">4 Standard Scenes</Badge>
        </div>

        <div className="space-y-4">
          {scriptScenes.map((item, idx) => (
            <Card key={idx} className="border-slate-200 shadow-sm hover:border-purple-300 transition-colors">
              <CardHeader className="bg-slate-50/70 border-b py-3 px-5 flex flex-row items-center justify-between">
                <span className="font-bold text-xs text-purple-900">{item.scene}</span>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() =>
                    onCopyScript(
                      idx,
                      `${item.scene}\nVisual Prompt: ${item.visual}\nVoiceover: ${item.voiceover}`
                    )
                  }
                  className="h-7 text-xs border-slate-300"
                >
                  {copiedIdx === idx ? <Check className="mr-1 size-3 text-green-600" /> : <Copy className="mr-1 size-3" />}
                  Copy Scene
                </Button>
              </CardHeader>
              <CardContent className="p-5 space-y-3 text-xs">
                <div>
                  <span className="font-semibold text-slate-500 block mb-1">🎬 Camera Angle & Visual Prompt:</span>
                  <div className="text-slate-800 bg-purple-50/50 p-3 rounded-lg border border-purple-100/70 font-medium">
                    <RichText content={item.visual} />
                  </div>
                </div>
                <div>
                  <span className="font-semibold text-slate-500 block mb-1">🗣️ Voiceover & Audio Dialogue:</span>
                  <div className="text-slate-900 font-medium italic bg-amber-50/60 p-3 rounded-lg border border-amber-100">
                    &quot;<RichText content={item.voiceover} />&quot;
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};
