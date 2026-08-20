"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Sparkles, Loader2 } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useCreateProject } from "@/features/projects/api/use-create-project";

interface CreateProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CreateProjectModal = ({
  isOpen,
  onClose,
}: CreateProjectModalProps) => {
  const router = useRouter();
  const createMutation = useCreateProject();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    createMutation.mutate(
      {
        name: name.trim(),
        width: 1200,
        height: 1200,
        json: JSON.stringify({
          version: "5.3.0",
          objects: [],
          description: description.trim() || "Premium AI-driven product campaign with key selling points and multi-channel asset assets.",
          targetAudience: "Tech-savvy professionals aged 22-45 looking for premium efficiency solutions.",
          goal: "Drive high-converting sales and boost social brand awareness.",
        }),
      },
      {
        onSuccess: ({ data }) => {
          onClose();
          setName("");
          setDescription("");
          router.push(`/workspace/${data.id}`);
        },
      }
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <form onSubmit={onSubmit}>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-x-2 text-xl font-bold">
              <Sparkles className="size-5 text-indigo-500" />
              Create New Product Project
            </DialogTitle>
            <DialogDescription>
              Initialize a new product workspace to let AI generate multi-asset content, ad images, and video scripts.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name" className="font-semibold">
                Product / Project Name <span className="text-red-500">*</span>
              </Label>
              <Input
                id="name"
                placeholder="e.g. SkinGlow Pro Radiant Serum..."
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={createMutation.isPending}
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="description" className="font-semibold">
                Product Description & Key Selling Points (USP)
              </Label>
              <Textarea
                id="description"
                placeholder="e.g. 10% Niacinamide formula, visible glow in 14 days, clinically tested for sensitive skin..."
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                disabled={createMutation.isPending}
              />
            </div>
          </div>

          <DialogFooter className="gap-2 sm:gap-0">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={createMutation.isPending}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={createMutation.isPending || !name.trim()}
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold"
            >
              {createMutation.isPending ? (
                <>
                  <Loader2 className="mr-2 size-4 animate-spin" />
                  Creating...
                </>
              ) : (
                "Create & Enter Workspace"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
