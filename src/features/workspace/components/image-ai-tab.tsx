"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Image as ImageIcon, Sparkles, Loader2, Edit2, Download, Wand2 } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useGenerateImage } from "@/features/ai/api/use-generate-image";

interface ImageAiTabProps {
  project: {
    id: string;
    name: string;
    json: string;
  };
}

export const ImageAiTab = ({ project }: ImageAiTabProps) => {
  const router = useRouter();
  const generateImageMutation = useGenerateImage();

  let initialDesc = "10% Niacinamide serum with hydration glowing effect.";
  try {
    const parsed = JSON.parse(project.json || "{}");
    if (parsed.description) initialDesc = parsed.description;
  } catch {}

  const [prompt, setPrompt] = useState(
    `Luxury commercial ad banner for ${project.name}, studio lighting, elegant cosmetic display, water splash background, 8k resolution`
  );
  // Default rich mock banner image for instant UI preview
  const [imageUrl, setImageUrl] = useState<string | null>(
    "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=1200&q=80"
  );

  const onGenerate = () => {
    if (!prompt.trim()) return;

    generateImageMutation.mutate(
      { prompt },
      {
        onSuccess: (res) => {
          setImageUrl(res.data);
          toast.success("AI Image generated successfully!");
        },
        onError: () => {
          toast.error("Failed to generate image from AI");
        },
      }
    );
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      {/* Left Prompt Form (5 Cols) */}
      <div className="lg:col-span-5 space-y-6">
        <Card className="border-slate-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-bold flex items-center gap-x-2 text-slate-800">
              <Wand2 className="size-5 text-indigo-600" />
              AI Banner & Graphic Ad Generator
            </CardTitle>
            <CardDescription className="text-xs">
              Describe the visual scene and lighting style for AI to generate commercial ad assets for &quot;{project.name}&quot;.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-2">
              <Label className="font-semibold text-slate-700 text-xs">AI Image Generation Prompt</Label>
              <textarea
                rows={4}
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Describe lighting, background setting, composition, product placement..."
                className="w-full rounded-md border border-slate-200 bg-slate-50 p-3 text-xs leading-relaxed focus:outline-none focus:ring-2 focus:ring-indigo-500 font-normal"
              />
            </div>

            <Button
              onClick={onGenerate}
              disabled={generateImageMutation.isPending || !prompt.trim()}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-5 text-xs"
            >
              {generateImageMutation.isPending ? (
                <>
                  <Loader2 className="mr-2 size-5 animate-spin" />
                  Generating AI Visual...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 size-5 text-yellow-300" />
                  Generate Ad Banner Image
                </>
              )}
            </Button>

            <div className="pt-4 border-t">
              <Button
                variant="outline"
                onClick={() => router.push(`/editor/${project.id}`)}
                className="w-full border-slate-300 text-slate-700 hover:bg-slate-50 text-xs font-semibold"
              >
                <Edit2 className="mr-2 size-4 text-indigo-600" />
                Open Graphic Editor Studio (Canvas)
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Right Visual Output Preview (7 Cols) */}
      <div className="lg:col-span-7">
        <Card className="border-slate-200 shadow-sm h-full flex flex-col justify-between overflow-hidden">
          <CardHeader className="bg-slate-50/50 border-b py-3">
            <CardTitle className="text-xs font-bold text-slate-800 flex items-center justify-between">
              <span className="flex items-center gap-x-2">
                <ImageIcon className="size-4 text-indigo-600" />
                Generated AI Ad Asset Preview
              </span>
              <span className="text-[11px] text-slate-500 font-normal">1200 x 1200 px (Square Ad)</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 flex-1 flex items-center justify-center">
            {generateImageMutation.isPending ? (
              <div className="flex flex-col items-center justify-center py-12">
                <Loader2 className="size-10 animate-spin text-indigo-600 mb-3" />
                <p className="text-sm text-slate-500 font-medium">Generating high-definition commercial visual...</p>
              </div>
            ) : imageUrl ? (
              <div className="space-y-4 w-full text-center">
                <img
                  src={imageUrl}
                  alt="AI Generated Commercial Ad Visual"
                  className="rounded-xl shadow-lg border max-h-[420px] mx-auto object-cover"
                />
                <div className="flex justify-center gap-3 pt-2">
                  <a href={imageUrl} target="_blank" rel="noreferrer" download>
                    <Button size="sm" variant="outline" className="text-xs">
                      <Download className="mr-1.5 size-4" /> Download HD Image
                    </Button>
                  </a>
                  <Button
                    size="sm"
                    className="bg-indigo-600 hover:bg-indigo-700 text-xs font-semibold"
                    onClick={() => router.push(`/editor/${project.id}`)}
                  >
                    <Edit2 className="mr-1.5 size-4" /> Edit in Graphic Canvas
                  </Button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-16 text-center text-slate-400">
                <ImageIcon className="size-16 stroke-1 mb-3 text-slate-300" />
                <p className="text-sm font-medium text-slate-600">No Image Generated Yet</p>
                <p className="text-xs text-slate-400 max-w-xs mt-1">
                  Enter your prompt on the left and click **Generate Ad Banner Image** to produce visuals.
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
