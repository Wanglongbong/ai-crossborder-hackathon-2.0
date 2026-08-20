"use client";

import { useState } from "react";
import {
  Video,
  Play,
  Pause,
  Copy,
  Check,
  Mic,
  Smartphone,
  Flame,
  ShoppingBag,
  Sparkles,
} from "lucide-react";
import { toast } from "sonner";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface VideoStudioTabProps {
  videoAsset: {
    title: string;
    modelUsed: string;
    duration: string;
    aspectRatio: string;
    voiceoverLanguage: string;
    videoPreviewUrl: string;
    scenes: Array<{
      sceneNum: number;
      timing: string;
      title: string;
      visualPrompt: string;
      voiceoverText: string;
      onScreenText: string;
    }>;
  };
  productName: string;
}

export const VideoStudioTab = ({ videoAsset, productName }: VideoStudioTabProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeSceneIdx, setActiveSceneIdx] = useState(0);
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);
  const [selectedVoice, setSelectedVoice] = useState("English (US Female Commercial Accent - Audio 1.0)");

  const handleTogglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const handleCopyScene = (idx: number, scene: any) => {
    const text = `[Scene ${scene.sceneNum} - ${scene.timing}]\nTitle: ${scene.title}\nVisual Prompt (Seedance 2.5): ${scene.visualPrompt}\nVoiceover (Audio 1.0): ${scene.voiceoverText}\nOn-Screen Text: ${scene.onScreenText}`;
    navigator.clipboard.writeText(text);
    setCopiedIdx(idx);
    toast.success(`Scene ${scene.sceneNum} script copied.`);
    setTimeout(() => setCopiedIdx(null), 2000);
  };

  return (
    <div className="space-y-4">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-900 text-white p-4 rounded-lg shadow-2xs">
        <div className="space-y-0.5">
          <div className="flex items-center gap-2">
            <Badge className="bg-purple-500/20 text-purple-300 border-purple-400/30 text-[10px] font-bold">
              BytePlus Seedance 2.5 Video Engine
            </Badge>
            <Badge className="bg-yellow-500/20 text-yellow-300 border-yellow-400/30 text-[10px] font-bold">
              Audio 1.0 Voiceover
            </Badge>
          </div>
          <h2 className="text-base font-bold tracking-tight">
            Short-Form Video Ad Studio (9:16 Vertical Ads)
          </h2>
          <p className="text-xs text-slate-400">
            TikTok Shop &amp; Reels-ready short commercial video with a 4-scene structural arc: 3s Hook &rarr; Product Demo &rarr; Social Proof &rarr; CTA.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-semibold bg-white/10 px-3 py-1.5 rounded text-white shrink-0">
          <Smartphone className="size-3.5 text-purple-300" />
          <span>{videoAsset.aspectRatio} &middot; {videoAsset.duration}</span>
        </div>
      </div>

      {/* Main 2-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Left: 9:16 Video Player Simulator (5 Cols) */}
        <div className="lg:col-span-5 space-y-3">
          <Card className="border-slate-300 shadow-2xs rounded-lg overflow-hidden bg-slate-950 text-white">
            <CardHeader className="bg-slate-900 border-b border-slate-800 py-2.5 px-4 flex flex-row items-center justify-between">
              <div className="flex items-center gap-1.5 text-xs font-bold text-slate-200">
                <Video className="size-3.5 text-purple-400" />
                <span>TikTok Shop Ads Simulator (9:16)</span>
              </div>
              <Badge className="bg-purple-600 text-white text-[10px]">Review Ready</Badge>
            </CardHeader>

            <CardContent className="p-4 flex flex-col items-center justify-center">
              {/* Phone Frame Simulator */}
              <div className="relative w-full max-w-[260px] aspect-[9/16] bg-black rounded-2xl overflow-hidden border-2 border-slate-700 shadow-2xl flex flex-col justify-between p-3">
                {/* Background Image */}
                <div className="absolute inset-0 bg-slate-900 z-0 flex items-center justify-center">
                  <img
                    src="https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=600&q=80"
                    alt="Video Demo"
                    className="w-full h-full object-cover opacity-80"
                  />
                </div>

                {/* Top Badge */}
                <div className="relative z-10 flex items-center justify-between text-[11px] text-white/90">
                  <div className="flex items-center gap-1 bg-black/50 px-2 py-0.5 rounded-full">
                    <Flame className="size-3 text-red-500" />
                    <span className="font-bold text-[10px]">Trending Ads #1</span>
                  </div>
                  <span className="font-mono text-[10px] text-slate-300">00:14 / 00:25</span>
                </div>

                {/* Center Subtitles & Play Overlay */}
                <div className="relative z-10 text-center space-y-2.5 px-1">
                  <div className="bg-black/80 text-yellow-300 p-2 rounded-lg text-xs font-bold shadow-md border border-yellow-400/30 leading-snug">
                    {videoAsset.scenes[activeSceneIdx]?.onScreenText}
                  </div>
                  <button
                    type="button"
                    onClick={handleTogglePlay}
                    className="size-10 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-xs flex items-center justify-center mx-auto transition-transform hover:scale-105 text-white"
                  >
                    {isPlaying ? <Pause className="size-5" /> : <Play className="size-5 ml-0.5" />}
                  </button>
                </div>

                {/* Bottom Shopping Cart CTA Bar */}
                <div className="relative z-10">
                  <div className="bg-black/80 p-2 rounded-lg border border-white/20 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="size-6 rounded bg-yellow-400 text-slate-950 flex items-center justify-center font-bold">
                        <ShoppingBag className="size-3.5" />
                      </div>
                      <div className="text-left">
                        <p className="text-[10px] font-bold text-white leading-tight truncate max-w-[100px]">
                          {productName}
                        </p>
                        <p className="text-[8px] text-yellow-300 font-semibold">Limited 30% OFF</p>
                      </div>
                    </div>
                    <Button size="sm" className="h-5 bg-red-600 hover:bg-red-700 text-white text-[9px] font-extrabold px-2 rounded">
                      Shop Now
                    </Button>
                  </div>
                </div>
              </div>

              {/* Timeline Scene Navigation */}
              <div className="w-full mt-3.5 space-y-1.5">
                <div className="flex items-center justify-between text-[11px] text-slate-400">
                  <span>Scene Timeline:</span>
                  <span className="text-purple-400 font-bold">
                    Scene {activeSceneIdx + 1}/4: {videoAsset.scenes[activeSceneIdx]?.title}
                  </span>
                </div>
                <div className="grid grid-cols-4 gap-1">
                  {videoAsset.scenes.map((_, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setActiveSceneIdx(idx)}
                      className={`py-1 rounded text-[11px] font-bold transition-all ${
                        activeSceneIdx === idx
                          ? "bg-purple-600 text-white shadow-xs"
                          : "bg-slate-800 text-slate-400 hover:bg-slate-700"
                      }`}
                    >
                      Scene {idx + 1}
                    </button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Voiceover Settings */}
          <Card className="border-slate-300 shadow-2xs rounded-lg bg-white">
            <CardHeader className="py-2 px-3.5 border-b bg-slate-50">
              <CardTitle className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                <Mic className="size-3.5 text-purple-600" />
                AI Voiceover &amp; Narration Engine (Audio 1.0)
              </CardTitle>
            </CardHeader>
            <CardContent className="p-3 text-xs">
              <Select value={selectedVoice} onValueChange={setSelectedVoice}>
                <SelectTrigger className="bg-slate-50 border-slate-300 text-xs h-8">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="English (US Female Commercial Accent - Audio 1.0)">
                    English (US Female Commercial Accent - Audio 1.0)
                  </SelectItem>
                  <SelectItem value="English (UK Male Sophisticated Narration)">
                    English (UK Male Sophisticated Narration)
                  </SelectItem>
                  <SelectItem value="Vietnamese (Female Natural Warm Voice)">
                    Vietnamese (Female Natural Warm Voice)
                  </SelectItem>
                  <SelectItem value="Thai (Bangkok Commercial Style)">
                    Thai (Bangkok Commercial Style)
                  </SelectItem>
                </SelectContent>
              </Select>
            </CardContent>
          </Card>
        </div>

        {/* Right: Scene-by-Scene Storyboard Prompts (7 Cols) */}
        <div className="lg:col-span-7 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
              <Sparkles className="size-3.5 text-purple-600" />
              Scene-by-Scene Video Storyboard (Seedance 2.5)
            </h3>
            <span className="text-[11px] text-slate-500">
              Optimized for high-motion visual sequences
            </span>
          </div>

          <div className="space-y-3">
            {videoAsset.scenes.map((scene, idx) => (
              <Card
                key={idx}
                className={`border transition-all rounded-lg bg-white ${
                  activeSceneIdx === idx
                    ? "border-purple-500 shadow-xs"
                    : "border-slate-300 hover:border-slate-400"
                }`}
              >
                <CardHeader className="bg-slate-50 border-b py-2 px-3.5 flex flex-row items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Badge className="bg-slate-900 text-white font-bold text-[10px]">
                      Scene {scene.sceneNum}
                    </Badge>
                    <span className="text-xs font-bold text-slate-900">{scene.title}</span>
                    <span className="text-[10px] text-slate-500 font-mono">({scene.timing})</span>
                  </div>

                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleCopyScene(idx, scene)}
                    className="h-6 text-[11px] text-purple-600 hover:bg-purple-50 p-1"
                  >
                    {copiedIdx === idx ? (
                      <>
                        <Check className="mr-1 size-3 text-green-600" /> Copied
                      </>
                    ) : (
                      <>
                        <Copy className="mr-1 size-3" /> Copy Prompt
                      </>
                    )}
                  </Button>
                </CardHeader>

                <CardContent className="p-3.5 space-y-2.5 text-xs">
                  {/* Visual Prompt */}
                  <div className="space-y-0.5">
                    <span className="font-bold text-slate-500 uppercase text-[10px] tracking-wider block">
                      Visual Sequence Prompt (Seedance 2.5):
                    </span>
                    <p className="text-slate-800 bg-slate-50 p-2 rounded border border-slate-200 font-medium leading-relaxed">
                      {scene.visualPrompt}
                    </p>
                  </div>

                  {/* Voiceover */}
                  <div className="space-y-0.5">
                    <span className="font-bold text-slate-500 uppercase text-[10px] tracking-wider block">
                      Voiceover Narration (Audio 1.0):
                    </span>
                    <p className="text-slate-900 italic bg-amber-50/50 p-2 rounded border border-amber-200/60 font-medium">
                      &quot;{scene.voiceoverText}&quot;
                    </p>
                  </div>

                  {/* On Screen Subtitle */}
                  <div className="space-y-0.5">
                    <span className="font-bold text-slate-500 uppercase text-[10px] tracking-wider block">
                      On-Screen Subtitle:
                    </span>
                    <p className="text-yellow-900 font-bold bg-yellow-50 p-1.5 rounded border border-yellow-200 text-[11px]">
                      {scene.onScreenText}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
