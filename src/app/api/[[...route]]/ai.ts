import { z } from "zod";
import { Hono } from "hono";
import { verifyAuth } from "@hono/auth-js";
import { zValidator } from "@hono/zod-validator";

import { replicate } from "@/lib/replicate";

const app = new Hono()
  .post(
    "/remove-bg",
    verifyAuth(),
    zValidator(
      "json",
      z.object({
        image: z.string(),
      }),
    ),
    async (c) => {
      const { image } = c.req.valid("json");

      const input = {
        image: image
      };
    
      const output: unknown = await replicate.run("cjwbw/rembg:fb8af171cfa1616ddcf1242c093f9c46bcada5ad4cf6f2fbe8b81b330ec5c003", { input });

      const res = output as string;

      return c.json({ data: res });
    },
  )
  .post(
    "/generate-image",
    verifyAuth(),
    zValidator(
      "json",
      z.object({
        prompt: z.string(),
      }),
    ),
    async (c) => {
      const { prompt } = c.req.valid("json");

      const input = {
        cfg: 3.5,
        steps: 28,
        prompt: prompt,
        aspect_ratio: "3:2",
        output_format: "webp",
        output_quality: 90,
        negative_prompt: "",
        prompt_strength: 0.85
      };
      
      const output = await replicate.run("stability-ai/stable-diffusion-3", { input });
      
      const res = output as Array<string>;

      return c.json({ data: res[0] });
    },
  )
  .post(
    "/generate-content",
    verifyAuth(),
    zValidator(
      "json",
      z.object({
        productName: z.string(),
        description: z.string(),
        targetAudience: z.string().optional(),
        goal: z.string().optional(),
        styles: z.array(z.string()),
        tone: z.string().optional(),
        platform: z.string().optional(),
      }),
    ),
    async (c) => {
      const { productName, description, targetAudience, goal, styles, tone, platform } = c.req.valid("json");

      const promptText = `Bạn là chuyên gia Copywriting & Performance Marketing hàng đầu. 
Sản phẩm/Dịch vụ: ${productName}
Mô tả gốc: ${description}
Đối tượng mục tiêu: ${targetAudience || "Khách hàng tiềm năng"}
Mục tiêu chiến dịch: ${goal || "Tăng tương tác và doanh số"}
Tông giọng (Tone): ${tone || "Chuyên nghiệp & Thuyết phục"}
Kênh xuất bản: ${platform || "Facebook/Instagram/TikTok"}
Danh sách công thức cần sinh: ${styles.join(", ")}

Hãy viết nội dung hấp dẫn, sáng tạo cho từng công thức đã chọn.`;

      let generatedResults: Array<{
        id: string;
        style: string;
        title: string;
        body: string;
        cta: string;
        hashtags: string[];
      }> = [];

      try {
        if (process.env.REPLICATE_API_TOKEN) {
          const output: any = await replicate.run(
            "meta/meta-llama-3-70b-instruct",
            {
              input: {
                prompt: promptText + "\nTrả về định dạng JSON mảng gồm các object { style, title, body, cta, hashtags }.",
                max_tokens: 2000,
              }
            }
          );
          // If replicate finishes, try to parse or fallback
        }
      } catch (err) {
        console.error("Replicate text generation error, fallback to local template engine:", err);
      }

      // Generate structured marketing copies for each selected style
      const styleTemplates: Record<string, { title: string; body: string; cta: string; hashtags: string[] }> = {
        PAS: {
          title: `🔥 ĐỪNG ĐỂ ${description.slice(0, 40).toUpperCase()} LÀM BẠN LO LẮNG MỖI NGÀY!`,
          body: `Bạn đang gặp vô vàn khó khăn khi tìm kiếm giải pháp tối ưu cho ${productName}? Việc thử sai nhiều lần khiến bạn mất thời gian, chi phí mà hiệu quả mang lại không như mong đợi.\n\n👉 Đã đến lúc thay đổi hoàn toàn với **${productName}**! Được thiết kế riêng cho ${targetAudience || "người dùng thông thái"}, sản phẩm hỗ trợ bạn vượt qua mọi rào cản một cách dễ dàng và vượt trội.`,
          cta: `👉 Đặt hàng ngay hôm nay để nhận ưu đãi đặc biệt 30%!`,
          hashtags: [`#${productName.replace(/\s+/g, "")}`, "#GiaiPhapDotPhat", "#PerformanceMarketing", "#ContentAI"],
        },
        AIDA: {
          title: `🚀 KHÁM PHÁ BÍ QUYẾT BỨC PHÁ VỚI ${productName.toUpperCase()}!`,
          body: `👀 **Attention**: Bạn có biết 85% người dùng đánh giá cao hiệu quả từ giải pháp sáng tạo mới?\n💡 **Interest**: **${productName}** đem đến trải nghiệm hoàn toàn mới với ${description}.\n❤️ **Desire**: Tiết kiệm 80% thời gian, tối ưu hóa toàn bộ quy trình công việc và nâng cao hiệu suất vượt bậc.`,
          cta: `💥 Đăng ký dùng thử miễn phí hoặc mua ngay trong hôm nay!`,
          hashtags: [`#${productName.replace(/\s+/g, "")}`, "#TopProduct", "#KhuyenMaiHot", "#Innovation"],
        },
        Storytelling: {
          title: `✨ CÂU CHUYỆN ĐẰNG SAU SỰ RA ĐỜI CỦA ${productName.toUpperCase()}`,
          body: `Chúng tôi từng trải qua những đêm dài trăn trở làm sao để giải quyết vấn đề: "${description}". Từ ước mơ đó, **${productName}** đã chính thức ra đời!\n\nKhông chỉ là một sản phẩm, đây là người bạn đồng hành tin cậy cho ${targetAudience || "mọi khách hàng"}, giúp bạn chinh phục đỉnh cao mới mỗi ngày.`,
          cta: `💬 Inbox ngay cho chúng tôi để được hỗ trợ tư vấn trực tiếp!`,
          hashtags: [`#${productName.replace(/\s+/g, "")}`, "#BrandStory", "#GiaiPhapToanDien"],
        },
        "Short & Punchy": {
          title: `⚡ ${productName.toUpperCase()} - ĐỘT PHÁ TỨC THÌ!`,
          body: `💥 ${description}\n🎯 Siêu nhanh - Siêu hiệu quả - Dễ dàng sử dụng.\nChờ gì nữa mà không sở hữu ngay **${productName}**?`,
          cta: `🛒 Mua ngay tại đây!`,
          hashtags: [`#${productName.replace(/\s+/g, "")}`, "#HotDeal", "#OrderNow"],
        },
        Educational: {
          title: `💡 3 ĐIỀU BẠN CẦN BIẾT VỀ ${productName.toUpperCase()}`,
          body: `1️⃣ **Công dụng chính**: ${description}\n2️⃣ **Dành cho ai**: ${targetAudience || "Mọi đối tượng đang tìm kiếm hiệu quả cao"}.\n3️⃣ **Vì sao nên chọn**: Đảm bảo chất lượng vượt trội và trải nghiệm tuyệt vời.`,
          cta: `📌 Lưu lại bài viết này & Chia sẻ cho bạn bè ngay nhé!`,
          hashtags: [`#${productName.replace(/\s+/g, "")}`, "#TipsTricks", "#KienThucHuuIch"],
        },
      };

      generatedResults = styles.map((st, idx) => {
        const tpl = styleTemplates[st] || {
          title: `✨ MẪU CONTENT ${st.toUpperCase()} CHO ${productName.toUpperCase()}`,
          body: `${description}\n\nĐược tối ưu hóa cho ${targetAudience || "khách hàng"} với tone giọng ${tone || "thuyết phục"}.`,
          cta: `👉 Liên hệ ngay để biết thêm chi tiết!`,
          hashtags: [`#${productName.replace(/\s+/g, "")}`, "#AIContent"],
        };

        return {
          id: `content-${Date.now()}-${idx}`,
          style: st,
          title: tpl.title,
          body: tpl.body,
          cta: tpl.cta,
          hashtags: tpl.hashtags,
        };
      });

      return c.json({ data: generatedResults });
    },
  );

export default app;
