"use client";

import { useState } from "react";
import { Save, Sparkles, Check, Info } from "lucide-react";
import { toast } from "sonner";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useUpdateProject } from "@/features/projects/api/use-update-project";

interface OverviewTabProps {
  project: {
    id: string;
    name: string;
    json: string;
  };
}

export const OverviewTab = ({ project }: OverviewTabProps) => {
  const updateMutation = useUpdateProject(project.id);

  let initialDesc = "10% Niacinamide & Hyaluronic Acid formula. Reduces dark spots in 14 days, provides 48h deep hydration, and leaves skin with a radiant, natural glow.";
  let initialAudience = "Tech-savvy professionals & skincare enthusiasts aged 22-42 looking for high-performance radiant skin solutions.";
  let initialGoal = "Drive direct online sales conversions & build long-term brand loyalty.";

  try {
    const parsed = JSON.parse(project.json || "{}");
    if (parsed.description) initialDesc = parsed.description;
    if (parsed.targetAudience) initialAudience = parsed.targetAudience;
    if (parsed.goal) initialGoal = parsed.goal;
  } catch {}

  const [name, setName] = useState(project.name);
  const [description, setDescription] = useState(initialDesc);
  const [targetAudience, setTargetAudience] = useState(initialAudience);
  const [goal, setGoal] = useState(initialGoal);
  const [isSaved, setIsSaved] = useState(false);

  const onSave = () => {
    let existingJsonObj = {};
    try {
      existingJsonObj = JSON.parse(project.json || "{}");
    } catch {}

    const updatedJson = JSON.stringify({
      ...existingJsonObj,
      description,
      targetAudience,
      goal,
    });

    updateMutation.mutate(
      {
        json: updatedJson,
        name,
      },
      {
        onSuccess: () => {
          setIsSaved(true);
          toast.success("Product overview configuration saved successfully!");
          setTimeout(() => setIsSaved(false), 2000);
        },
      }
    );
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Left Input Form (2 Cols) */}
      <div className="lg:col-span-2 space-y-6">
        <Card className="border-slate-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-xl font-bold flex items-center gap-x-2 text-slate-800">
              <Info className="size-5 text-indigo-600" />
              Product Core Overview & AI Inputs
            </CardTitle>
            <CardDescription>
              Providing detailed product details ensures the AI generates highly accurate marketing copy, banner visuals, and video scripts.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="grid gap-2">
              <Label className="font-semibold text-slate-700 text-xs">Product / Project Name</Label>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Product name..."
                className="bg-slate-50 border-slate-200 text-xs font-semibold"
              />
            </div>

            <div className="grid gap-2">
              <Label className="font-semibold text-slate-700 text-xs">
                Product Description & Key Selling Points (USP)
              </Label>
              <Textarea
                rows={5}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe key ingredients, core benefits, performance metrics..."
                className="bg-slate-50 border-slate-200 leading-relaxed text-xs"
              />
            </div>

            <div className="grid gap-2">
              <Label className="font-semibold text-slate-700 text-xs">Target Audience Persona</Label>
              <Input
                value={targetAudience}
                onChange={(e) => setTargetAudience(e.target.value)}
                placeholder="Age range, gender, pain points, lifestyle interests..."
                className="bg-slate-50 border-slate-200 text-xs"
              />
            </div>

            <div className="grid gap-2">
              <Label className="font-semibold text-slate-700 text-xs">Campaign Goal & Objective</Label>
              <Input
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
                placeholder="e.g. Drive online sales, brand awareness, pre-order leads..."
                className="bg-slate-50 border-slate-200 text-xs"
              />
            </div>

            <div className="pt-2 flex justify-end">
              <Button
                onClick={onSave}
                disabled={updateMutation.isPending}
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs"
              >
                {isSaved ? (
                  <>
                    <Check className="mr-2 size-4 text-green-300" />
                    Saved Successfully
                  </>
                ) : (
                  <>
                    <Save className="mr-2 size-4" />
                    Save Product Inputs
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Right Guide Box (1 Col) */}
      <div className="space-y-6">
        <Card className="bg-gradient-to-br from-indigo-50 to-purple-50 border-indigo-100 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-bold text-indigo-900 flex items-center gap-x-2">
              <Sparkles className="size-5 text-indigo-600" />
              AI Prompt Optimization Tips
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-xs text-indigo-900/90 leading-relaxed">
            <p>💡 **Unique Selling Proposition (USP)**: Include at least 2-3 distinct features that set your product apart from competitors.</p>
            <p>🎯 **Customer Pain Points**: Highlight customer challenges so AI frameworks (PAS & AIDA) can agitate the problem effectively.</p>
            <p>⚡ **Workflow**: Once inputs are saved, head over to the **Content AI** tab to batch generate multi-style social ad copy.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
