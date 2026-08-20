import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export interface GenerateCampaignPackRequest {
  productName: string;
  category: string;
  uspDescription: string;
  pricePromo?: string;
  targetMarket?: string;
  targetAudience?: string;
  requiredClaims?: string;
  restrictedClaims?: string;
  brandTone?: string;
  brandColors?: string[];
  marketSignals?: {
    season?: string;
    trendKeywords?: string;
    painPoints?: string;
    campaignGoal?: string;
  };
  pastCampaignData?: string;
}

export const useGenerateCampaignPack = () => {
  const mutation = useMutation<any, Error, GenerateCampaignPackRequest>({
    mutationFn: async (json) => {
      const response = await fetch("/api/campaign/generate-full-pack", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(json),
      });

      if (!response.ok) {
        throw new Error("Failed to generate campaign pack");
      }

      return await response.json();
    },
    onSuccess: () => {
      toast.success("AI đã tạo trọn bộ chiến dịch ra mắt sản phẩm (Full Campaign Pack) thành công!");
    },
    onError: () => {
      toast.error("Có lỗi xảy ra khi tạo chiến dịch AI");
    },
  });

  return mutation;
};
