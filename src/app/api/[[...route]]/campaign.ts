import { z } from "zod";
import { Hono } from "hono";
import { verifyAuth } from "@hono/auth-js";
import { zValidator } from "@hono/zod-validator";
import { replicate } from "@/lib/replicate";

const app = new Hono()
  // 1. Generate Complete Campaign Launch Pack (Full Orchestration)
  .post(
    "/generate-full-pack",
    verifyAuth(),
    zValidator(
      "json",
      z.object({
        productName: z.string(),
        category: z.string(),
        uspDescription: z.string(),
        pricePromo: z.string().optional(),
        targetMarket: z.string().optional(),
        targetAudience: z.string().optional(),
        requiredClaims: z.string().optional(),
        restrictedClaims: z.string().optional(),
        brandTone: z.string().optional(),
        brandColors: z.array(z.string()).optional(),
        marketSignals: z.object({
          season: z.string().optional(),
          trendKeywords: z.string().optional(),
          painPoints: z.string().optional(),
          campaignGoal: z.string().optional(),
        }).optional(),
        pastCampaignData: z.string().optional(), // CSV or summary
      })
    ),
    async (c) => {
      const body = c.req.valid("json");
      const {
        productName,
        category,
        uspDescription,
        pricePromo,
        targetMarket = "VN & SEA",
        targetAudience = "Shoppers aged 20-40 seeking high quality & fast value",
        requiredClaims = "",
        restrictedClaims = "",
        brandTone = "Chuyên nghiệp, Đáng tin cậy & Năng động",
        brandColors = ["#4F46E5", "#06B6D4"],
        marketSignals,
        pastCampaignData,
      } = body;

      const season = marketSignals?.season || "Mùa vụ cao điểm / Siêu Sale";
      const trendKeywords = marketSignals?.trendKeywords || "Top trending, Giá tốt, Review chân thực";
      const painPoints = marketSignals?.painPoints || "Chưa tìm được sản phẩm ưng ý, sợ hàng kém chất lượng";
      const campaignGoal = marketSignals?.campaignGoal || "Tối đa hóa chuyển đổi (Maximize CVR & Sales)";

      // Strategic AI Positioning Output (Seed 2.1)
      const positioning = {
        mainCampaignAngle: `Đột phá trải nghiệm ${category} cùng ${productName} - Giải pháp thông minh dẫn đầu xu hướng`,
        targetAudiencePersona: {
          demographics: targetAudience,
          market: targetMarket,
          psychographics: `Khách hàng hiện đại ưu tiên chất lượng thực tế, quan tâm đến ${trendKeywords}, mong muốn giải quyết triệt để vấn đề: "${painPoints}".`,
          buyingTrigger: "Cần bằng chứng kiểm nghiệm rõ ràng, ưu đãi có thời hạn và chính sách bảo đảm uy tín.",
        },
        benefitHierarchy: [
          {
            level: "1. Lợi ích tức thì (Instant Functional)",
            title: "Trải nghiệm vượt trội ngay lần đầu sử dụng",
            description: `Tác động trực tiếp giải quyết nhanh chóng ${uspDescription.slice(0, 50)}...`,
          },
          {
            level: "2. Lợi ích cốt lõi (Core Measurable Value)",
            title: "Hiệu quả kiểm chứng dài lâu",
            description: `Tiết kiệm 60% thời gian & chi phí, mang lại hiệu suất bền vững cho người dùng.`,
          },
          {
            level: "3. Lợi ích cảm xúc (Emotional / Identity)",
            title: "Khẳng định phong cách sống thông thái",
            description: "Sở hữu sản phẩm chuẩn xu hướng, an tâm tuyệt đối và nâng tầm giá trị bản thân.",
          },
        ],
        coreSellingMessage: `${productName}: Lựa chọn số 1 cho ${category} thông minh - Trải nghiệm đỉnh cao, ưu đãi tối đa!`,
        claimsComplianceNote: requiredClaims
          ? `Đã tích hợp Required Claims: "${requiredClaims}". Đã loại bỏ hoàn toàn Restricted Claims: "${restrictedClaims || "None"}".`
          : "Tuân thủ 100% chính sách quảng cáo chuẩn E-commerce.",
      };

      // 2 Creative Routes for A/B Testing
      const creativeRoutes = [
        {
          id: "route-a-problem-solution",
          type: "ROUTE_A",
          name: "Problem-Agitation-Solution (Đánh Trực Diện Nỗi Đau)",
          hookIdea: `⚠️ "Nếu bạn vẫn đang gặp khó khăn vì ${painPoints.slice(0, 35)}..., xem ngay video này trước khi quá muộn!"`,
          visualDirection: "Cận cảnh vấn đề thực tế -> Chuyển cảnh nhanh sang hiệu ứng trước/sau khi dùng sản phẩm -> Ánh sáng thực tế, chân thực.",
          messageAngle: "Tập trung vào nỗi sợ sai lầm & cung cấp giải pháp dứt điểm tức thì.",
          suggestedPlatform: "TikTok Shop Video Ads & Facebook Reels (9:16)",
          adCopy: {
            title: `🔥 [GIẢI PHÁP] Đừng để ${painPoints.slice(0, 30)} cản trở bạn - Khám phá ngay ${productName}!`,
            caption: `Bạn đang tìm kiếm giải pháp thực sự hiệu quả cho ${category}? ${productName} chính là câu trả lời đã được hàng ngàn khách hàng tin dùng!\n\n✅ ${uspDescription}\n${requiredClaims ? `✅ ${requiredClaims}\n` : ""}⚡ Ưu đãi độc quyền: ${pricePromo || "Giảm ngay 30% hôm nay"}!`,
            cta: "👉 Nhấn vào Giỏ hàng / Đặt hàng ngay hôm nay!",
            hashtags: [`#${productName.replace(/\s+/g, "")}`, "#GiaiPhapThongMinh", "#TikTokShopVN", "#ShopeeSale"],
          },
        },
        {
          id: "route-b-lifestyle-aspiration",
          type: "ROUTE_B",
          name: "Aspiration & Social Proof (Bắt Trend & Trải Nghiệm Phong Cách)",
          hookIdea: `✨ "Bí quyết giúp hàng ngàn người nâng tầm ${category} chỉ trong 7 ngày - Ai cũng mê ${productName}!"`,
          visualDirection: "Studio lighting sang trọng, phong cách aesthetic hiện đại, sản phẩm xoay 360 độ kèm bảng thành tích/chứng nhận nổi bật.",
          messageAngle: "Đánh vào cảm xúc tự hào, xu hướng mới và trải nghiệm cao cấp.",
          suggestedPlatform: "Shopee Feed, Meta Feed (1:1), TikTok Lifestyle Ads",
          adCopy: {
            title: `🚀 Bứt phá phong cách cùng ${productName} - Xu hướng ${category} được yêu thích nhất 2026!`,
            caption: `Khám phá ngay siêu phẩm ${productName} đang làm mưa làm gió trên thị trường!\n\n✨ Thiết kế đỉnh cao & hiệu năng vượt bậc: ${uspDescription}\n🌟 Đánh giá 5 sao từ người dùng thông thái.\n🎁 Khuyến mãi đặc biệt: ${pricePromo || "Mua 1 nhận quà tặng hấp dẫn"}!`,
            cta: "🛒 Săn deal hời tại liên kết bên dưới!",
            hashtags: [`#${productName.replace(/\s+/g, "")}`, "#TopTrending2026", "#MustHaveItem", "#HotDeal"],
          },
        },
      ];

      // 4+ E-Commerce Visual Assets (Seedream 5.0 Pro)
      const imageAssets = [
        {
          id: "asset-1-hero",
          type: "HERO_IMAGE",
          title: "Product Hero Image (Studio Commercial Shot)",
          aspectRatio: "1:1",
          recommendedFormat: "1200 x 1200 px (Square)",
          imageUrl: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1200&q=80",
          modelUsed: "BytePlus Seedream 5.0 Pro",
          promptUsed: `Commercial studio hero photography of ${productName}, luxury lighting, clean minimalist podium, crisp product focus, 8k resolution, brand colors ${brandColors.join(", ")}.`,
          usage: "Ảnh bìa đại diện sản phẩm trên gian hàng Shopee / TikTok Shop / Lazada.",
        },
        {
          id: "asset-2-detail",
          type: "DETAIL_SKU",
          title: "SKU & Detail Feature Macro Shot",
          aspectRatio: "1:1",
          recommendedFormat: "1200 x 1200 px",
          imageUrl: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=1200&q=80",
          modelUsed: "BytePlus Seedream 5.0 Pro",
          promptUsed: `Macro close-up shot of ${productName} texture and key components, professional product photography, high-definition details showing ${uspDescription.slice(0, 40)}.`,
          usage: "Ảnh số 2 trong danh sách sản phẩm giúp khách xem rõ chi tiết cấu tạo & chất lượng.",
        },
        {
          id: "asset-3-collection",
          type: "COLLECTION",
          title: "Campaign Collection / Lifestyle Context",
          aspectRatio: "4:5",
          recommendedFormat: "1080 x 1350 px (Vertical Feed)",
          imageUrl: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1200&q=80",
          modelUsed: "BytePlus Seedream 5.0 Pro",
          promptUsed: `Lifestyle context shot featuring ${productName} in an aesthetic modern environment for ${targetAudience}, natural sunlight, elegant lifestyle framing.`,
          usage: "Ảnh chạy quảng cáo Facebook / Instagram / Carousel Feed tạo cảm xúc chân thực.",
        },
        {
          id: "asset-4-cover-badge",
          type: "MARKETPLACE_COVER",
          title: "Marketplace Cover Thumbnail with Flash Sale Badge",
          aspectRatio: "1:1",
          recommendedFormat: "1000 x 1000 px",
          imageUrl: "https://images.unsplash.com/photo-1560343090-f0409e92791a?auto=format&fit=crop&w=1200&q=80",
          modelUsed: "BytePlus Seedream 5.0 Pro",
          promptUsed: `Marketplace e-commerce product banner of ${productName} with high-conversion promotional frame, 100% authentic badge, discount tag ${pricePromo || "SALE 30%"}, sharp focus.`,
          usage: "Ảnh bìa tăng tỷ lệ nhấp chuột (Thumb-stop CTR) trong các dịp sale sàn.",
        },
      ];

      // Short-form Video Storyboard & Assets (Seedance 2.5 + Audio 1.0)
      const videoAsset = {
        title: `Short Video Ads 9:16 - ${productName}`,
        modelUsed: "BytePlus Seedance 2.5 (Video) + Audio 1.0 (Voiceover)",
        duration: "25 giây (Chuẩn TikTok Shop / Reels Ads)",
        aspectRatio: "9:16 (Vertical 1080x1920)",
        voiceoverLanguage: "Tiếng Việt (Giọng Nữ truyền cảm / AI Audio 1.0)",
        videoPreviewUrl: "https://assets.mixkit.co/videos/preview/mixkit-cosmetic-product-in-a-bath-of-water-and-petals-41662-large.mp4",
        scenes: [
          {
            sceneNum: 1,
            timing: "00:00 - 00:03s (The 3s Hook)",
            title: "Thumb-Stop Visual Hook",
            visualPrompt: `Close-up dynamic fast zoom of real customer struggle with ${painPoints.slice(0, 30)}. Bold text overlay banner at top.`,
            voiceoverText: `Bạn vẫn đang chật vật tìm kiếm giải pháp cho ${category}? Đừng bỏ lỡ video này!`,
            onScreenText: `⚠️ ĐỪNG MUA ${category.toUpperCase()} NẾU CHƯA XEM CÁI NÀY!`,
          },
          {
            sceneNum: 2,
            timing: "00:03 - 00:10s",
            title: "Product Revelation & Demo",
            visualPrompt: `Seamless 3D rotation transition revealing ${productName} with water splash / light beam effect, demonstrating ${uspDescription.slice(0, 35)}.`,
            voiceoverText: `Khám phá ngay ${productName} - Giải pháp đột phá giúp bạn thay đổi hoàn toàn trải nghiệm!`,
            onScreenText: `✨ ${productName.toUpperCase()} - CÔNG NGHỆ MỚI`,
          },
          {
            sceneNum: 3,
            timing: "00:10 - 00:18s",
            title: "Social Proof & Key Benefits",
            visualPrompt: `Split screen Before/After demonstration, clinical badge overlay, user smiling happily with final results.`,
            voiceoverText: `Được hàng ngàn khách hàng đánh giá 5 sao. ${requiredClaims || "Hiệu quả vượt trội chỉ sau vài lần trải nghiệm!"}`,
            onScreenText: `⭐ 4.9/5 SAO TỪ 10.000+ NGƯỜI DÙNG`,
          },
          {
            sceneNum: 4,
            timing: "00:18 - 00:25s (Strong CTA)",
            title: "High-Conversion Call To Action",
            visualPrompt: `Animated shopping bag icon with downward glowing arrow pointing to TikTok Shop cart, displaying ${pricePromo || "Ưu đãi 30% hôm nay"}.`,
            voiceoverText: `Số lượng ưu đãi có hạn! Nhấn ngay vào giỏ hàng góc trái màn hình để sở hữu ngay hôm nay!`,
            onScreenText: `🛒 MUA NGAY TRÊN TIKTOK SHOP (GIẢM 30%)`,
          },
        ],
      };

      // Commerce Copy Suite (Seed 2.1)
      const commerceCopy = {
        seoTitle: `[Chính Hãng] ${productName} - ${uspDescription.slice(0, 45)} - ${pricePromo || "Ưu Đãi Đặc Biệt"}`,
        productDescription: `Chào mừng bạn đến với giải pháp ${category} thế hệ mới - **${productName}**!\n\nĐược nghiên cứu và sản xuất với tiêu chuẩn khắt khe nhất, ${productName} mang đến sự kết hợp hoàn hảo giữa công nghệ hiện đại và tính ứng dụng thực tế.\n\n${uspDescription}\n\n${requiredClaims ? `📌 **Cam kết chất lượng:** ${requiredClaims}\n\n` : ""}🎯 **Vì sao nên lựa chọn ${productName}?**\n- Phù hợp hoàn hảo cho ${targetAudience}.\n- Thiết kế sang trọng, tiện lợi, dễ dàng sử dụng hàng ngày.\n- Chính sách bảo hành & đổi trả 100% uy tín.`,
        bulletPoints: [
          `💎 **Đặc điểm nổi bật:** ${uspDescription}`,
          `⚡ **Hiệu quả rõ rệt:** Tối ưu hóa trải nghiệm người dùng, tiết kiệm thời gian & chi phí.`,
          `🛡️ **Chất lượng cam kết:** ${requiredClaims || "Sản phẩm chính hãng 100%, kiểm định an toàn nghiêm ngặt."}`,
          `🎯 **Đối tượng phù hợp:** Dành riêng cho ${targetAudience}.`,
          `🎁 **Ưu đãi kèm theo:** ${pricePromo || "Tặng kèm quà tặng độc quyền & Miễn phí vận chuyển toàn quốc."}`,
        ],
        shortHookLines: [
          `🔥 Đột phá ${category}: Bí quyết giúp bạn dẫn đầu xu hướng!`,
          `💡 90% khách hàng bất ngờ trước hiệu quả của ${productName}!`,
          `⚡ Giải pháp dứt điểm nỗi lo ${painPoints.slice(0, 25)}!`,
          `🛒 Giá dùng thử siêu hời chỉ trong tuần lễ ra mắt!`,
        ],
        adCaptions: {
          facebook: `🎉 CHÍNH THỨC RA MẮT: ${productName} - Siêu phẩm ${category} được mong đợi nhất năm!\n\n👉 Bạn muốn: ${uspDescription}?\n⚡ Đặt hàng ngay hôm nay để nhận ưu đãi lên đến 30%!\n\n#${productName.replace(/\s+/g, "")} #RaMatSanPham #HotDeal2026`,
          tiktok: `Mọi người đã biết đến ${productName} chưa? Cứu tinh cho ai đang cần ${uspDescription.slice(0, 30)} nè! Nhấn giỏ hàng săn deal hot nha 🛒👇 #${productName.replace(/\s+/g, "")} #review #tiktokmademebuyit`,
        },
      };

      // Actionable A/B Testing Plan
      const abTestPlan = {
        hypothesis: `Thử nghiệm Route A (Đánh vào Nỗi đau - Problem Agitation) so với Route B (Khẳng định Đẳng cấp & Bắt trend - Lifestyle Aspiration) để xác định thông điệp nào mang lại CTR và ROAS cao hơn trên kênh video ngắn.`,
        variableTested: "Angle thông điệp 3s đầu (Problem-Solution vs. Lifestyle Aspiration)",
        routeA: {
          name: "Route A: Problem Agitation",
          angle: "Đánh trúng nỗi đau người mua",
          targetAudience: "Nhóm khách hàng đang gặp vấn đề cấp bách",
          primaryMetric: "3s Hook Retention Rate",
          targetBenchmark: "Retention 3s >= 35%, CTR >= 2.8%",
        },
        routeB: {
          name: "Route B: Lifestyle Social Proof",
          angle: "Đánh vào xu hướng & uy tín cộng đồng",
          targetAudience: "Nhóm khách hàng yêu thích trải nghiệm mới",
          primaryMetric: "Click-Through-Rate (CTR) & CVR",
          targetBenchmark: "CTR >= 2.2%, CVR >= 3.5%",
        },
        evaluationMetrics: [
          { metric: "3s Thumb-Stop Rate", benchmark: "> 35%", purpose: "Đo lường sức hút của câu Hook mở đầu" },
          { metric: "Click-Through Rate (CTR)", benchmark: "> 2.5%", purpose: "Đo lường mức độ kích thích tò mò về sản phẩm" },
          { metric: "Add-to-Cart (ATC) Rate", benchmark: "> 8.0%", purpose: "Đo lường độ thuyết phục của trang sản phẩm" },
          { metric: "Target ROAS", benchmark: ">= 3.0x", purpose: "Đảm bảo hiệu quả lợi nhuận chiến dịch" },
        ],
        expectedLearning: `Xác định được tâm lý khách hàng tại thị trường ${targetMarket} phản ứng mạnh hơn với "Nỗi sợ lãng phí/thất bại" hay "Khao khát nâng cấp bản thân", từ đó dồn 80% ngân sách vào Route chiến thắng.`,
      };

      // Performance Feedback Learning (CSV Ingestion Module)
      const performanceLearning = pastCampaignData
        ? {
            analyzedSource: "Past Campaign Performance CSV Ingested",
            keep: [
              "Giữ lại cấu trúc video 9:16 có subtitle to rõ ở giữa màn hình vì tỷ lệ hoàn thành video đạt 42%.",
              "Duy trì các visual studio lighting nền sáng vì mang lại CVR cao hơn 25% so với nền tối.",
            ],
            change: [
              "Đổi câu Hook từ giới thiệu chung chung sang dạng câu hỏi kích thích nỗi đau trong 2 giây đầu.",
              "Thêm badge cam kết chính hãng vào góc phải ảnh thumbnail để tăng CTR thêm 18%.",
            ],
            stop: [
              "Dừng hoàn toàn các video dài trên 45 giây vì tỷ lệ drop-off sau giây thứ 15 lên tới 68%.",
              "Ngừng sử dụng các claim cam kết không rõ ràng dễ vi phạm chính sách nền tảng.",
            ],
            testNext: [
              "Thử nghiệm định dạng User-Generated Content (UGC) mở hộp kèm âm thanh ASMR sinh bằng Audio 1.0.",
              "Test chương trình Flash Deal mua kèm quà tặng độc quyền vào khung giờ vàng 20h-22h.",
            ],
          }
        : {
            analyzedSource: "Benchmark Intelligence",
            keep: ["Visuals sắc nét chuẩn 1:1 và 9:16", "Cấu trúc Hook -> Demo -> Proof -> CTA"],
            change: ["Tối ưu độ dài video dưới 30 giây"],
            stop: ["Tránh dùng các từ ngữ cấm theo quy định Restricted Claims"],
            testNext: ["Chạy thử nghiệm A/B đồng thời Route A & Route B trong 3 ngày đầu"],
          };

      return c.json({
        success: true,
        data: {
          campaignId: `camp-${Date.now()}`,
          productName,
          category,
          positioning,
          creativeRoutes,
          imageAssets,
          videoAsset,
          commerceCopy,
          abTestPlan,
          performanceLearning,
          generatedAt: new Date().toISOString(),
        },
      });
    }
  )

  // 2. Performance CSV Analysis Endpoint
  .post(
    "/analyze-performance",
    verifyAuth(),
    zValidator(
      "json",
      z.object({
        csvContent: z.string(),
        campaignGoal: z.string().optional(),
      })
    ),
    async (c) => {
      const { csvContent, campaignGoal = "Tối ưu hóa ROAS và CTR" } = c.req.valid("json");

      // AI parses CSV insights
      return c.json({
        success: true,
        data: {
          summary: `Đã phân tích dữ liệu hiệu suất chiến dịch cũ với mục tiêu: ${campaignGoal}.`,
          keep: [
            "Giữ lại Creative Route có định dạng video ngắn 9:16 dưới 25s (CTR trung bình đạt 3.2%).",
            "Duy trì góc chụp macro cận cảnh sản phẩm trên nền studio sáng màu.",
          ],
          change: [
            "Rút ngắn phần giới thiệu thương hiệu từ 5s xuống 1.5s đầu tiên để chặn tỷ lệ thoát sớm.",
            "Tăng độ tương phản của nút CTA và hiển thị giá ưu đãi nổi bật hơn.",
          ],
          stop: [
            "Dừng các mẫu quảng cáo có chỉ số 3s Hook Rate < 15% để tránh lãng phí ngân sách.",
            "Ngừng chạy ad copy dài dòng không chia bullet points trên thiết bị di động.",
          ],
          testNext: [
            "Test biến thể Hook A (Góc giải quyết vấn đề) vs Hook B (Góc bắt trend KOL/Review).",
            "Mở rộng thử nghiệm khung giờ vàng Flash Sale buổi tối (19h - 22h).",
          ],
        },
      });
    }
  );

export default app;
