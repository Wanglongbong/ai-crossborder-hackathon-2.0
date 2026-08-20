"use client";

import { useState } from "react";
import {
  Sparkles,
  Loader2,
  Copy,
  Check,
  Eye,
  Wand2,
  RefreshCw,
} from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGenerateContent } from "@/features/ai/api/use-generate-content";
import { RichText, cleanPlainText } from "@/components/rich-text";

interface ContentAiTabProps {
  project: {
    id: string;
    name: string;
    json: string;
  };
  onOpenPreview: (content: { title: string; body: string; cta: string; hashtags: string[] }) => void;
}

const CONTENT_STYLES = [
  { id: "PAS", label: "PAS (Problem - Agitate - Solution)", desc: "Focuses on customer pain points & provides the ideal solution" },
  { id: "AIDA", label: "AIDA (Attention - Interest - Desire - Action)", desc: "Grabs attention, sparks desire & drives conversions" },
  { id: "Storytelling", label: "Storytelling (Brand Emotional Story)", desc: "Connects deeply with audiences through emotional narratives" },
  { id: "Short & Punchy", label: "Short & Punchy (High Conversion)", desc: "Direct, high-impact headline with urgency" },
  { id: "Educational", label: "Educational / Tips & Value", desc: "Shares actionable insights, value, and product tips" },
];

export const ContentAiTab = ({ project, onOpenPreview }: ContentAiTabProps) => {
  const generateMutation = useGenerateContent();

  let initialDesc = "10% Niacinamide & Hyaluronic Acid formula. Reduces dark spots in 14 days and provides 48h deep hydration for all skin types.";
  let initialAudience = "Women & Professionals aged 22-42";
  let initialGoal = "Drive direct online sales conversions";

  try {
    const parsed = JSON.parse(project.json || "{}");
    if (parsed.description) initialDesc = parsed.description;
    if (parsed.targetAudience) initialAudience = parsed.targetAudience;
    if (parsed.goal) initialGoal = parsed.goal;
  } catch {}

  const [selectedStyles, setSelectedStyles] = useState<string[]>(["PAS", "AIDA", "Storytelling"]);
  const [tone, setTone] = useState("Professional & Persuasive");
  const [platform, setPlatform] = useState("Facebook Feed");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Initial Mock Content Items formatted for Rich Text rendering
  const [generatedItems, setGeneratedItems] = useState<
    Array<{
      id: string;
      style: string;
      title: string;
      body: string;
      cta: string;
      hashtags: string[];
    }>
  >([
    {
      id: "mock-pas-1",
      style: "PAS",
      title: `🔥 DON'T LET DULL & TIRED SKIN HOLD YOU BACK!`,
      body: `Struggling with stubborn dark spots, dehydration, and uneven skin tone? Trying multiple products without getting real results can be frustrating and costly.\n\n👉 Upgrade your routine with **${project.name}**! Formulated with **10% Niacinamide** and **Hyaluronic Acid**, it clinically restores skin radiance and delivers **48h deep hydration** within just 14 days.`,
      cta: `👉 Order today & get an exclusive 30% OFF discount!`,
      hashtags: [`#${project.name.replace(/\s+/g, "")}`, "#RadiantSkin", "#SkincareRoutine", "#AIContent"],
    },
    {
      id: "mock-aida-2",
      style: "AIDA",
      title: `🚀 UNLOCK YOUR BEST SKIN EVER WITH ${project.name.toUpperCase()}!`,
      body: `👀 **Attention**: Did you know 92% of users noticed visible radiance in under two weeks?\n💡 **Interest**: **${project.name}** combines dermatological science with lightweight absorption.\n❤️ **Desire**: Say goodbye to dullness, save hours of skincare effort, and enjoy glowing confidence every single day.`,
      cta: `💥 Claim your trial bottle or buy now before stock runs out!`,
      hashtags: [`#${project.name.replace(/\s+/g, "")}`, "#TopProduct", "#GlowUp", "#SkincareGoals"],
    },
    {
      id: "mock-story-3",
      style: "Storytelling",
      title: `✨ THE STORY BEHIND THE CREATION OF ${project.name.toUpperCase()}`,
      body: `We spent over two years researching the perfect balance between high-potency active ingredients and gentle skin tolerance. That mission led to the creation of **${project.name}**!\n\nIt's not just another serum — it's your daily confidence partner designed to empower your natural beauty.`,
      cta: `💬 Send us a message today to get a personalized skincare recommendation!`,
      hashtags: [`#${project.name.replace(/\s+/g, "")}`, "#BrandStory", "#SkincareJourney"],
    },
  ]);

  const toggleStyle = (styleId: string) => {
    setSelectedStyles((prev) =>
      prev.includes(styleId) ? prev.filter((s) => s !== styleId) : [...prev, styleId]
    );
  };

  const onGenerate = () => {
    if (selectedStyles.length === 0) {
      toast.error("Please select at least one copywriting framework!");
      return;
    }

    generateMutation.mutate(
      {
        productName: project.name,
        description: initialDesc,
        targetAudience: initialAudience,
        goal: initialGoal,
        styles: selectedStyles,
        tone,
        platform,
      },
      {
        onSuccess: (res) => {
          setGeneratedItems(res.data || []);
        },
      }
    );
  };

  const onCopyText = (id: string, rawText: string) => {
    const cleanText = cleanPlainText(rawText);
    navigator.clipboard.writeText(cleanText);
    setCopiedId(id);
    toast.success("Clean formatted text copied to clipboard!");
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      {/* Left Configuration Sidebar (4 Cols) */}
      <div className="lg:col-span-4 space-y-6">
        <Card className="border-slate-200 shadow-sm sticky top-6">
          <CardHeader className="bg-slate-50/50 border-b pb-4">
            <CardTitle className="text-lg font-bold flex items-center gap-x-2 text-slate-800">
              <Wand2 className="size-5 text-indigo-600" />
              Batch Content AI Generator
            </CardTitle>
            <CardDescription className="text-xs">
              Select copywriting frameworks & tone of voice to generate batch social ad variations.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-5 pt-4">
            {/* Style Checkboxes */}
            <div className="space-y-3">
              <Label className="font-semibold text-slate-800 text-xs">
                1. Select Frameworks (Multi-Style Batch)
              </Label>
              <div className="space-y-2.5">
                {CONTENT_STYLES.map((st) => (
                  <div
                    key={st.id}
                    onClick={() => toggleStyle(st.id)}
                    className={`flex items-start space-x-3 p-2.5 rounded-lg border cursor-pointer transition-colors ${
                      selectedStyles.includes(st.id)
                        ? "bg-indigo-50/70 border-indigo-300"
                        : "bg-white border-slate-200 hover:bg-slate-50"
                    }`}
                  >
                    <Checkbox
                      checked={selectedStyles.includes(st.id)}
                      onCheckedChange={() => toggleStyle(st.id)}
                      className="mt-0.5"
                    />
                    <div className="grid gap-0.5">
                      <span className="text-xs font-bold text-slate-800">{st.label}</span>
                      <span className="text-[11px] text-slate-500 leading-normal">{st.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Tone of Voice */}
            <div className="space-y-2">
              <Label className="font-semibold text-slate-800 text-xs">2. Tone of Voice</Label>
              <Select value={tone} onValueChange={setTone}>
                <SelectTrigger className="bg-slate-50 border-slate-200 text-xs">
                  <SelectValue placeholder="Select tone..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Professional & Persuasive">Professional & Persuasive</SelectItem>
                  <SelectItem value="Friendly & Engaging">Friendly & Engaging</SelectItem>
                  <SelectItem value="Urgent & High Conversion">Urgent & High Conversion</SelectItem>
                  <SelectItem value="Luxury & Elegant">Luxury & Premium</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Target Platform */}
            <div className="space-y-2">
              <Label className="font-semibold text-slate-800 text-xs">3. Channel / Platform</Label>
              <Select value={platform} onValueChange={setPlatform}>
                <SelectTrigger className="bg-slate-50 border-slate-200 text-xs">
                  <SelectValue placeholder="Select channel..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Facebook Feed">Facebook Post / Feed</SelectItem>
                  <SelectItem value="TikTok Caption">TikTok Short Caption</SelectItem>
                  <SelectItem value="Instagram Caption">Instagram Feed / Story</SelectItem>
                  <SelectItem value="Email Marketing">Email Copywriting</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button
              onClick={onGenerate}
              disabled={generateMutation.isPending}
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold py-5 shadow-md transition-transform active:scale-95 text-xs"
            >
              {generateMutation.isPending ? (
                <>
                  <Loader2 className="mr-2 size-5 animate-spin" />
                  Generating Content...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 size-5 text-yellow-300" />
                  Batch Generate AI Copy ({selectedStyles.length} Styles)
                </>
              )}
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Output Results Area (8 Cols) */}
      <div className="lg:col-span-8 space-y-6">
        <div className="flex items-center justify-between bg-indigo-900 text-white p-4 rounded-xl shadow-md">
          <div className="flex items-center gap-x-2">
            <Sparkles className="size-5 text-yellow-400" />
            <span className="font-bold text-sm">
              Generated {generatedItems.length} Rich Text Copy Variations for &quot;{project.name}&quot;
            </span>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={onGenerate}
            disabled={generateMutation.isPending}
            className="bg-white/10 text-white border-white/20 hover:bg-white/20 text-xs"
          >
            <RefreshCw className="mr-1.5 size-3.5" /> Regenerate All
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {generatedItems.map((item) => {
            const fullCopyText = `${cleanPlainText(item.title)}\n\n${cleanPlainText(item.body)}\n\n${cleanPlainText(item.cta)}\n\n${item.hashtags.join(" ")}`;

            return (
              <Card key={item.id} className="border-slate-200 shadow-sm hover:shadow-md transition-shadow overflow-hidden">
                <CardHeader className="bg-slate-50/70 border-b py-3 px-5 flex flex-row items-center justify-between">
                  <div className="flex items-center gap-x-2">
                    <Badge className="bg-indigo-600 text-white font-bold text-xs">
                      {item.style}
                    </Badge>
                    <span className="text-xs text-slate-500 font-medium">
                      {platform}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => onOpenPreview(item)}
                      className="h-8 text-xs text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 font-semibold"
                    >
                      <Eye className="mr-1.5 size-3.5" /> Ads Preview
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => onCopyText(item.id, fullCopyText)}
                      className="h-8 text-xs border-slate-300 font-medium"
                    >
                      {copiedId === item.id ? (
                        <>
                          <Check className="mr-1.5 size-3.5 text-green-600" /> Copied
                        </>
                      ) : (
                        <>
                          <Copy className="mr-1.5 size-3.5" /> Copy Plain Text
                        </>
                      )}
                    </Button>
                  </div>
                </CardHeader>

                <CardContent className="p-5 space-y-4">
                  {/* Rich Title */}
                  <div>
                    <h4 className="font-extrabold text-base text-slate-900 leading-snug">
                      {cleanPlainText(item.title)}
                    </h4>
                  </div>

                  {/* Rich Body */}
                  <div className="text-xs text-slate-800 bg-slate-50/70 p-4 rounded-lg border border-slate-200/80">
                    <RichText content={item.body} />
                  </div>

                  {/* Rich CTA */}
                  <div className="p-3 bg-amber-50 border border-amber-200/80 rounded-lg text-xs font-semibold text-amber-950">
                    <RichText content={item.cta} />
                  </div>

                  {/* Hashtags */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {item.hashtags.map((tag, idx) => (
                      <span key={idx} className="text-xs text-indigo-600 font-medium bg-indigo-50 px-2 py-0.5 rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                </CardContent>

                <CardFooter className="bg-slate-50/40 border-t py-2.5 px-5 text-xs text-slate-500 flex justify-between items-center">
                  <span>Formatted Rich Text Rendering Active</span>
                  <Button
                    variant="link"
                    size="sm"
                    onClick={() => onCopyText(item.id, fullCopyText)}
                    className="text-indigo-600 text-xs p-0 h-auto font-medium"
                  >
                    Copy Clean Text
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};
