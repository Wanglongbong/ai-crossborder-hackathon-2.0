import { useMutation } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { toast } from "sonner";

import { client } from "@/lib/hono";

type ResponseType = InferResponseType<typeof client.api.ai["generate-content"]["$post"]>;
type RequestType = InferRequestType<typeof client.api.ai["generate-content"]["$post"]>["json"];

export const useGenerateContent = () => {
  const mutation = useMutation<
    ResponseType,
    Error,
    RequestType
  >({
    mutationFn: async (json) => {
      const response = await client.api.ai["generate-content"].$post({ json });
      if (!response.ok) {
        throw new Error("Failed to generate content");
      }
      return await response.json();
    },
    onSuccess: () => {
      toast.success("AI đã tạo nội dung bài viết thành công!");
    },
    onError: () => {
      toast.error("Có lỗi xảy ra khi tạo nội dung AI");
    },
  });

  return mutation;
};
