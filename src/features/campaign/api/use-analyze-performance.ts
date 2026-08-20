import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export interface AnalyzePerformanceRequest {
  csvContent: string;
  campaignGoal?: string;
}

export const useAnalyzePerformance = () => {
  const mutation = useMutation<any, Error, AnalyzePerformanceRequest>({
    mutationFn: async (json) => {
      const response = await fetch("/api/campaign/analyze-performance", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(json),
      });

      if (!response.ok) {
        throw new Error("Failed to analyze performance CSV");
      }

      return await response.json();
    },
    onSuccess: () => {
      toast.success("AI đã phân tích dữ liệu hiệu suất chiến dịch cũ thành công!");
    },
    onError: () => {
      toast.error("Có lỗi xảy ra khi phân tích dữ liệu hiệu suất");
    },
  });

  return mutation;
};
