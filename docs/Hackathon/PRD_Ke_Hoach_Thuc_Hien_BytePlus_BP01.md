# PRODUCT REQUIREMENTS DOCUMENT (PRD) & KẾ HOẠCH TRIỂN KHAI
## ĐỀ BÀI BYTEPLUS (BP-01): COMMERCE CAMPAIGN LAUNCH COPILOT
*Dự án: Romedia Commerce Copilot · HN AI Hackathon 2026*

---

## 1. TỔNG QUAN SẢN PHẨM & TẦM NHÌN (PRODUCT VISION)

### 1.1. Tên sản phẩm
**Romedia Commerce Launch Copilot** (Powered by BytePlus AI Ecosystem: Seedance 2.5, Seedream 5.0 Pro, Seed 2.1, Audio 1.0).

### 1.2. Sứ mệnh sản phẩm (Product Mission)
Chuyển hóa toàn bộ quy trình ra mắt chiến dịch E-commerce từ **7–14 ngày rời rạc** xuống còn **dưới 2 phút thao tác AI**:
- **Đầu vào (Input):** Product Brief + Brand Kit + Claims Constraint + Market Signals/Trends + (Tùy chọn) Past Campaign CSV.
- **Đầu ra (Output):** Trọn bộ tài nguyên chiến dịch sẵn sàng chạy quảng cáo & đăng sàn (Launch-Ready Campaign Pack):
  1. Bản định vị sản phẩm (Positioning & Benefit Hierarchy).
  2. 2 Tuyến ý tưởng quảng cáo đối lập cho A/B Testing (Creative Routes A & B).
  3. $\ge 1$ Video quảng cáo ngắn 9:16 (Seedance 2.5 + Audio 1.0).
  4. $\ge 4$ Ảnh sản phẩm chuẩn sàn e-commerce (Seedream 5.0 Pro).
  5. Trọn bộ Commerce Copy (SEO Title, Bullet points, Ad captions, Short hooks).
  6. Kế hoạch thử nghiệm A/B chi tiết (A/B Testing Plan).
  7. Mô-đun phân tích dữ liệu hiệu suất cũ (Performance Learning: Keep / Change / Stop / Test Next).

---

## 2. PHÂN TÍCH HIỆN TRẠNG CODEBASE & CHIẾN LƯỢC ADD-ON

### 2.1. Đánh giá tài nguyên sẵn có của Romedia
| Thành phần Codebase | Hiện trạng trong Repo | Khả năng tái sử dụng / Kế thừa |
| :--- | :--- | :--- |
| **Framework & UI** | Next.js 14 App Router, TailwindCSS, Radix UI, Lucide Icons, Shadcn components. | Tái sử dụng 100% layout hiện đại, responsive, thẩm mỹ cao. |
| **Graphic Canvas Studio** | Fabric.js Editor (`/editor/[projectId]`) với đầy đủ công cụ vẽ, text, filter, layer, export ảnh. | Dùng làm công cụ hậu kỳ chỉnh sửa trực tiếp ảnh sau khi AI sinh. |
| **Workspace Sub-tabs** | `overview-tab`, `content-ai-tab`, `image-ai-tab`, `video-ai-tab`, `ads-preview-tab`. | Nâng cấp và mở rộng thành 6–7 tab chuyên dụng chuẩn theo đúng yêu cầu đề bài BytePlus BP-01. |
| **Backend & API** | Hono API Server (`/api/[[...route]]`), Zod validator, Drizzle ORM kết nối Postgres. | Xây dựng API route mới `/api/campaign` chuyên biệt xử lý Orchestration. |
| **Database Schema** | `users`, `projects`, `accounts`, `sessions`, `subscriptions`. | Bổ sung các bảng lưu trữ Campaign, Creative Routes, Generated Assets, A/B Testing Plans. |

### 2.2. Khoảng trống cần phát triển (Gap Analysis & Addon Scope)
1. **Input Gap:** Form hiện tại chỉ có 3 trường cơ bản (tên, mô tả, tệp khách). Cần bổ sung: Brand Kit (Logo, Colors), Claims Rules (Required/Restricted Claims), Market Signals & Seasonal Moments, File Uploader cho Past Campaign CSV.
2. **Model Integration Gap:** Tích hợp trực tiếp các API / Prompts chuẩn của **BytePlus Seedance 2.5**, **Seedream 5.0 Pro**, **Seed 2.1**, **Audio 1.0**.
3. **Multi-Asset Coordination Gap:** Tạo luồng điều phối (Orchestrator) để đảm bảo hình ảnh, video, copy và định vị của Route A và Route B ăn khớp 100% với nhau và giữ vững nhận diện thương hiệu (Brand Consistency).
4. **Export & Delivery Gap:** Tính năng 1-Click Export toàn bộ gói tài nguyên (ZIP / Markdown / JSON / Assets folder).

---

## 3. THIẾT KẾ CƠ SỞ DỮ LIỆU & SCHEMA ADDON

Mở rộng `src/db/schema.ts` với các thực thể phục vụ chiến dịch:

```typescript
// Addon schemas in src/db/schema.ts

export const campaigns = pgTable("campaign", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  projectId: text("projectId").notNull().references(() => projects.id, { onDelete: "cascade" }),
  userId: text("userId").notNull().references(() => users.id, { onDelete: "cascade" }),
  productName: text("productName").notNull(),
  category: text("category").notNull(),
  pricePromo: text("pricePromo"),
  targetMarket: text("targetMarket").default("VN"), // VN, US, SEA...
  requiredClaims: text("requiredClaims"),
  restrictedClaims: text("restrictedClaims"),
  brandKitJson: text("brandKitJson"), // { logoUrl, colors: [], tone, productPhotos: [] }
  marketSignalJson: text("marketSignalJson"), // { trend, season, painPoint, keyword, objective }
  positioningJson: text("positioningJson"), // { mainAngle, targetPersona, coreMessage, benefitHierarchy: [] }
  status: text("status").default("draft"), // draft, generating, ready
  createdAt: timestamp("createdAt", { mode: "date" }).notNull(),
  updatedAt: timestamp("updatedAt", { mode: "date" }).notNull(),
});

export const creativeRoutes = pgTable("creative_route", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  campaignId: text("campaignId").notNull().references(() => campaigns.id, { onDelete: "cascade" }),
  routeType: text("routeType").notNull(), // "ROUTE_A" | "ROUTE_B"
  routeName: text("routeName").notNull(), // e.g. "Problem-Solution Focus", "Lifestyle Social Proof"
  hookIdea: text("hookIdea").notNull(),
  visualDirection: text("visualDirection").notNull(),
  messageAngle: text("messageAngle").notNull(),
  suggestedPlatform: text("suggestedPlatform").notNull(),
  adCopyJson: text("adCopyJson"), // { title, seoDescription, bullets: [], caption, shortHooks: [], cta }
  videoAssetUrl: text("videoAssetUrl"),
  videoStoryboardJson: text("videoStoryboardJson"),
  createdAt: timestamp("createdAt", { mode: "date" }).notNull(),
});

export const campaignAssets = pgTable("campaign_asset", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  campaignId: text("campaignId").notNull().references(() => campaigns.id, { onDelete: "cascade" }),
  routeId: text("routeId").references(() => creativeRoutes.id, { onDelete: "cascade" }),
  assetType: text("assetType").notNull(), // "HERO_IMAGE" | "DETAIL_SKU" | "COLLECTION" | "MARKETPLACE_COVER" | "PROMO_BANNER"
  imageUrl: text("imageUrl").notNull(),
  aspectRatio: text("aspectRatio").default("1:1"), // "1:1" | "3:4" | "16:9" | "9:16"
  promptUsed: text("promptUsed"),
  modelUsed: text("modelUsed").default("Seedream 5.0 Pro"),
  createdAt: timestamp("createdAt", { mode: "date" }).notNull(),
});

export const abTestPlans = pgTable("ab_test_plan", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  campaignId: text("campaignId").notNull().references(() => campaigns.id, { onDelete: "cascade" }),
  hypothesis: text("hypothesis").notNull(),
  routeAOverview: text("routeAOverview").notNull(),
  routeBOverview: text("routeBOverview").notNull(),
  testVariable: text("testVariable").notNull(), // "Hook Style", "Visual Tone", "Value Prop"
  targetMetricsJson: text("targetMetricsJson").notNull(), // { primaryMetric, targetCTR, targetCVR, targetROAS }
  expectedLearning: text("expectedLearning").notNull(),
  performanceAdviceJson: text("performanceAdviceJson"), // { keep: [], change: [], stop: [], testNext: [] }
  createdAt: timestamp("createdAt", { mode: "date" }).notNull(),
});
```

---

## 4. CHI TIẾT YÊU CẦU CHỨC NĂNG (FUNCTIONAL REQUIREMENTS)

Hệ thống được tổ chức thành **7 Tab điều khiển chuyên sâu** bên trong màn hình Workspace (`/workspace/[projectId]`):

```
┌────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│                                ROMEDIA COMMERCE COPILOT WORKSPACE                                      │
├─────────────┬─────────────┬─────────────┬─────────────┬─────────────┬──────────────────┬───────────────┤
│ [1] Brief & │ [2] Strategy│ [3] Creative│ [4] Product │ [5] Video   │ [6] Copy &       │ [7] A/B Plan  │
│ Signals In  │ Positioning │ Routes (A/B)│ Visuals (4+)│ Ads Studio  │ Listing SEO      │ & Launch Pack │
└─────────────┴─────────────┴─────────────┴─────────────┴─────────────┴──────────────────┴───────────────┘
```

---

### 4.1. Module 1: Comprehensive Input & Signal Ingestion (Tab 1)
- **Mục tiêu:** Tiếp nhận toàn bộ 5 khối dữ liệu đầu vào theo chuẩn đề bài.
- **Tính năng chi tiết:**
  1. **Product Brief Section:**
     - Tên sản phẩm, Ngành hàng (F&B, Mỹ phẩm/Skincare, Thời trang, Gia dụng, Công nghệ...).
     - USP & Tính năng chính (Key Selling Points).
     - Giá bán & Khuyến mãi (Price / Promo deal).
     - Thị trường mục tiêu (Việt Nam, Thái Lan, Indonesia, US, Toàn cầu).
     - **Claims Compliance:** Trường nhập *Required Claims* (Bắt buộc phải có) & *Restricted Claims* (Tuyệt đối cấm nói sai sự thật / cấm từ vi phạm chính sách nền tảng).
  2. **Brand Kit Section:**
     - Upload Logo sản phẩm (PNG trong suốt).
     - Chọn bảng màu thương hiệu (Primary & Secondary Hex Colors).
     - Lựa chọn Tone of Voice (Sang trọng, Chuyên gia, Trẻ trung/GenZ, Gần gũi, Hài hước).
     - Upload ảnh chụp sản phẩm thực tế (Làm cơ sở để giữ nguyên dạng sản phẩm).
  3. **Market Signal & Trend Section:**
     - Thời điểm mùa vụ (Dịp 9.9, 11.11, Tết Nguyên Đán, Mùa hè, Tựu trường...).
     - Xu hướng người dùng & Từ khóa tìm kiếm đang hot (Trending keywords).
     - Nỗi đau lớn nhất của khách hàng (Customer Pain Points).
     - Mục tiêu chiến dịch (Tăng tỷ lệ chuyển đổi, Thu hút khách mới, Xả kho).
  4. **Past Performance CSV Ingestion (Tùy chọn):**
     - Kéo thả file CSV kết quả quảng cáo cũ (Cột: CTR, CVR, ROAS, 3s Hook Rate, Chi phí).

---

### 4.2. Module 2: Strategy & Positioning Engine (Tab 2)
- **Mô hình AI:** **Seed 2.1 (BytePlus)** / Reasoning Orchestrator.
- **Tính năng chi tiết:**
  1. **Campaign Angle Analysis:** Phân tích góc tiếp cận chiến dịch độc đáo nhất dựa trên kết hợp giữa USP sản phẩm và Market Signal.
  2. **Target Audience Persona Breakdown:** Xây dựng chân dung khách hàng chi tiết (Nhân khẩu học, Hành vi mua sắm trên sàn, Động lực kích hoạt quyết định mua).
  3. **Benefit Hierarchy (Thứ bậc lợi ích):**
     - Lợi ích tức thì (Instant Functional Benefit - VD: Cấp ẩm ngay sau 1 phút).
     - Lợi ích cốt lõi (Core Measurable Benefit - VD: Giảm thâm nám sau 14 ngày).
     - Lợi ích cảm xúc (Emotional/Identity Benefit - VD: Tự tin toả sáng không cần trang điểm đậm).
  4. **Core Selling Message:** Đúc kết 1 câu duy nhất khách hàng cần ghi nhớ.

---

### 4.3. Module 3: Dual Creative Routes Generator (Tab 3 - A/B Concept)
- **Mục tiêu:** Sinh ra tối thiểu **2 tuyến sáng tạo đối lập (Route A vs Route B)** để chuẩn bị cho A/B Testing.
- **Tính năng chi tiết:**
  1. **Route A (Problem-Agitation-Solution Focus):**
     - *Hook Idea:* Đánh trực diện vào nỗi đau hoặc sai lầm thường gặp của khách hàng.
     - *Visual Direction:* Tông màu chân thực, so sánh trực quan Before & After, cận cảnh vấn đề.
     - *Suggested Platform:* TikTok Shop Ads, Facebook Reels Ads.
  2. **Route B (Aspiration & Social Proof / Science-Led):**
     - *Hook Idea:* Khẳng định kết quả đột phá hoặc đánh giá từ chuyên gia / cộng đồng người dùng.
     - *Visual Direction:* Tông màu sang trọng, studio lighting cao cấp, bảng biểu chứng nhận khoa học.
     - *Suggested Platform:* Shopee Feed, Meta Feed, Landing Page Hero.
  3. **Bộ so sánh trực quan Song song (Side-by-Side View):** Marketer có thể chỉnh sửa, tinh chỉnh hoặc hoán đổi ý tưởng giữa 2 Route.

---

### 4.4. Module 4: E-Commerce Product Image Set (Tab 4 - Seedream 5.0 Pro)
- **Mô hình AI:** **Seedream 5.0 Pro (BytePlus)**.
- **Yêu cầu:** Tối thiểu 4 ảnh thương mại chuẩn kích thước và định dạng sàn:
  1. **Ảnh 1 - Product Hero Image (1:1):** Bố cục studio chuyên nghiệp, ánh sáng thương mại, nổi bật sản phẩm chính giữa.
  2. **Ảnh 2 - SKU / Detail Feature Image (1:1 hoặc 3:4):** Chụp cận cảnh chi tiết (texture, thành phần, góc cạnh bao bì, thông số kỹ thuật).
  3. **Ảnh 3 - Campaign Collection / Lifestyle Context (4:5 hoặc 16:9):** Đặt sản phẩm trong bối cảnh sử dụng thực tế (phòng khách hiện đại, bàn làm việc, phòng gym...).
  4. **Ảnh 4 - Marketplace Cover / Thumbnail with Promo Badge (1:1):** Tích hợp khung viền khuyến mãi, nhãn "Hot Deal", badge "Chính Hãng 100%" chuẩn Shopee/TikTok Shop.
- **Tính năng tương tác độc quyền:**
  - Nút **"Open in Graphic Canvas Editor"**: Đưa ngay ảnh sang Fabric.js Canvas của Romedia để thêm chữ, chỉnh sửa layer, đổi logo hoặc chèn sticker giá sốc.
  - Tải về từng ảnh chuẩn HD hoặc tải trọn bộ ảnh Zip.

---

### 4.5. Module 5: Short-form Video Ads Studio (Tab 5 - Seedance 2.5 + Audio 1.0)
- **Mô hình AI:** **Seedance 2.5** (Sinh video quảng cáo) + **Audio 1.0** (Tạo giọng đọc lồng tiếng & Âm thanh).
- **Yêu cầu định dạng:** Video dọc 9:16 (15–30 giây) tối ưu hóa cho TikTok, Reels, Shorts.
- **Cấu trúc 4 Scene tiêu chuẩn:**
  - `Scene 1 (0–3s) - The 3s Thumb-Stop Hook:` Hình ảnh chuyển động bất ngờ, câu mở đầu kích thích tò mò giữ chân người xem không lướt qua.
  - `Scene 2 (3–10s) - Product Reveal & Demo:` Sản phẩm xuất hiện xoay 360 độ hoặc trải nghiệm sử dụng thực tế, không méo hình.
  - `Scene 3 (10–20s) - Reason to Buy & Proof:` Hiển thị lợi ích vượt trội, chứng nhận hoặc đánh giá 5 sao.
  - `Scene 4 (20–30s) - Strong CTA & Promo Offer:` Kêu gọi hành động dứt khoát ("Nhấn giỏ hàng bên dưới nhận ngay ưu đãi 30%!").
- **Giao diện & Trải nghiệm:**
  - Video Player tương tác trực quan với nút Play/Pause, tua cảnh.
  - Khung phụ đề tự động (Subtitles) đồng bộ theo kịch bản lồng tiếng của Audio 1.0.
  - Lựa chọn giọng đọc AI (Giọng Nam/Nữ Bắc - Nam, Tiếng Anh US/UK, Tiếng Thái...).

---

### 4.6. Module 6: Commerce Copy & Listing Suite (Tab 6 - Seed 2.1)
- **Mục tiêu:** Sinh toàn bộ văn bản bán hàng chuẩn SEO sàn thương mại và quảng cáo chuyển đổi cao.
- **Các thành phần xuất xưởng:**
  1. **SEO Optimized Product Title:** Tiêu đề chuẩn công thức sàn: `[Thương hiệu] + [Tên sản phẩm] + [Tính năng/Công dụng chính] + [Quy cách/Dung tích]`.
  2. **Product Description:** Bài mô tả chi tiết hấp dẫn, chia đoạn khoa học.
  3. **5 Bullet Points:** 5 đặc điểm nổi bật nhất tóm tắt nhanh cho người mua đọc lướt trên mobile.
  4. **Short Hook Lines (3–5 câu):** Bộ câu ngắn giật tít dùng làm tiêu đề chạy ads hoặc text đè trên video.
  5. **Ad Captions & Promotional Copy:** Bài viết ngắn kèm Hashtags xu hướng và CTA cho bài post Facebook/TikTok.
  6. **1-Click Copy Formatting:** Nút sao chép văn bản dạng Plain text, Rich text hoặc định dạng Markdown/HTML cho sàn.

---

### 4.7. Module 7: A/B Testing Plan & Performance Learning (Tab 7)
- **Mục tiêu:** Cung cấp kế hoạch đo lường hiệu suất thực chiến và mô-đun phân tích dữ liệu cũ.
- **Các thành phần xuất xưởng:**
  1. **Bản kế hoạch A/B Testing rõ ràng:**
     - **Biến số thử nghiệm (Test Variable):** Route A (Góc Vấn đề) vs Route B (Góc Trải nghiệm).
     - **Chỉ số đo lường thành công (Target Metrics):**
       - Primary Metric: Tỷ lệ click qua (CTR) mục tiêu $\ge 2.5\%$.
       - Hook Retention: Tỷ lệ xem $\ge 3$ giây đầu $\ge 35\%$.
       - Conversion Rate: Tỷ lệ chuyển đổi mua hàng (CVR) $\ge 3.2\%$.
       - ROAS kỳ vọng: $\ge 3.0\times$.
     - **Giả thuyết kiểm chứng (Hypothesis):** Nếu nhấn mạnh vào yếu tố "giảm thâm sau 14 ngày" ở 3s đầu, CTR sẽ tăng 40% so với giới thiệu thành phần khoa học.
  2. **Performance Learning Feedback Hub (Phân tích file CSV cũ):**
     - 🟢 **KEEP (Nên giữ):** Các góc hình ảnh và từ khóa đang mang lại ROAS cao nhất.
     - 🟡 **CHANGE (Cần sửa):** Các đoạn hook có tỷ lệ giữ chân 3s thấp cần thay bằng câu hỏi giật tít.
     - 🔴 **STOP (Dừng lại):** Các thông điệp gây lãng phí ngân sách hoặc có CTR dưới 0.5%.
     - 🚀 **TEST NEXT (Hướng đi tiếp theo):** Đề xuất góc tiếp cận mới dựa trên khoảng trống thị trường.

---

### 4.8. Module 8: One-Click Full Launch Pack Exporter
- Nút xuất file duy nhất: **"Download Complete Campaign Launch Pack (.ZIP)"** bao gồm:
  - `/positioning_and_brief.pdf` (hoặc `.md`)
  - `/images/hero_image_1x1.png`
  - `/images/detail_sku_1x1.png`
  - `/images/collection_lifestyle_4x5.png`
  - `/images/marketplace_thumbnail_badge.png`
  - `/videos/short_video_ad_9x16.mp4` (kèm file phụ đề `.srt`)
  - `/copywriting/listing_and_ad_copy.txt`
  - `/ab_testing/ab_testing_execution_plan.md`

---

## 5. KIẾN TRÚC API & BACKEND HONO ENDPOINTS

Tất cả các API được triển khai tại `src/app/api/[[...route]]/campaign.ts`:

```typescript
// Proposed API Endpoints in Hono Backend

POST /api/campaign/create-brief
// Nhận Product Brief, Brand Kit, Claims, Market Signals -> Lưu DB & tạo Campaign Record

POST /api/campaign/generate-positioning-and-routes
// Gọi Seed 2.1 sinh Định vị sản phẩm + 2 Tuyến Creative Route A/B

POST /api/campaign/generate-image-assets
// Gọi Seedream 5.0 Pro sinh bộ 4+ ảnh chuẩn sàn (Hero, Detail, Collection, Cover)

POST /api/campaign/generate-video-asset
// Gọi Seedance 2.5 + Audio 1.0 sinh kịch bản, âm thanh và render video 9:16

POST /api/campaign/generate-commerce-copy
// Gọi Seed 2.1 sinh bộ Copy chuẩn SEO, 5 Bullets, Ad Captions, Hook lines

POST /api/campaign/generate-ab-test-plan
// Tổng hợp Kế hoạch A/B Testing & Phân tích Performance CSV

GET /api/campaign/export-full-pack/:campaignId
// Đóng gói và tải về toàn bộ Campaign Launch Pack dạng file ZIP
```

---

## 6. KẾ HOẠCH TRIỂN KHAI CHI TIẾT (SPRINT ROADMAP)

### Giai đoạn 1: Database Schema & Backend Orchestration (Ngày 1)
- [x] Tạo tài liệu phân tích đề bài & PRD chi tiết.
- [ ] Cập nhật file `src/db/schema.ts` với các bảng `campaigns`, `creativeRoutes`, `campaignAssets`, `abTestPlans`.
- [ ] Chạy migration Drizzle ORM (`bunx drizzle-kit generate` & `migrate`).
- [ ] Xây dựng Hono API routes trong `src/app/api/[[...route]]/campaign.ts` với đầy đủ Zod validation và Mock/Live AI fallback logic.

### Giai đoạn 2: Phát triển UI Studio Workspace & 7 Sub-tabs (Ngày 2)
- [ ] Cập nhật `src/app/(dashboard)/workspace/[projectId]/page.tsx` thành giao diện **Romedia Commerce Copilot**.
- [ ] Hoàn thiện 7 Tab giao diện tương tác:
  1. `brief-signals-tab.tsx`: Form nhập Product Brief, Brand Kit, Claims, Market Signal, Past CSV.
  2. `strategy-positioning-tab.tsx`: Hiển thị Định vị, Chân dung khách hàng, Benefit Hierarchy.
  3. `creative-routes-tab.tsx`: Bảng so sánh Route A vs Route B (A/B testing).
  4. `image-assets-tab.tsx`: Grid 4 ảnh thương mại chuẩn sàn (Seedream 5.0 Pro) + Nút mở Canvas Editor.
  5. `video-studio-tab.tsx`: Player video dọc 9:16 có subtitle, voiceover, 4 scenes (Seedance 2.5 + Audio 1.0).
  6. `commerce-copy-tab.tsx`: Trình quản lý Listing SEO, Bullet points, Ad Captions, Hook lines.
  7. `ab-test-launch-tab.tsx`: Bảng kế hoạch A/B Testing, Khuyến nghị Performance cũ, Nút Export 1-Click ZIP.

### Giai đoạn 3: Tích hợp Prompt Engine & AI Consistency Anchor (Ngày 3)
- [ ] Xây dựng bộ Prompt Templates chuẩn hóa tối ưu cho mô hình của BytePlus:
  - Prompt Template cho **Seedream 5.0 Pro** (Ánh sáng studio thương mại, giữ nguyên bao bì sản phẩm).
  - Prompt Template cho **Seedance 2.5** (Dynamic visual hook, 9:16 motion sequence).
  - System Prompt cho **Seed 2.1** (Chiến lược gia Performance Marketing & Commerce Growth).
- [ ] Kết nối nút "Edit in Graphic Canvas" giữa Image Tab và `/editor/[projectId]` để người dùng chỉnh sửa thiết kế thời gian thực.

### Giai đoạn 4: Chuẩn bị 4 Kịch bản Demo Mẫu & Đóng gói Deliverables (Ngày 4)
- [ ] Cấu hình sẵn 4 kịch bản dữ liệu hoàn hảo (Pre-loaded Demo Datasets):
  - **Scenario 1:** F&B Beverage Launch ("Trà Kombucha Nhiệt Đới Zero Sugar").
  - **Scenario 2:** Skincare & Beauty ("Serum Niacinamide 10% Phục Hồi Da").
  - **Scenario 3:** Seasonal Sale Campaign (Chiến dịch Siêu Sale 11.11 đồ gia dụng thông minh).
  - **Scenario 4:** Performance Refresh (Tối ưu từ file CSV quảng cáo cũ).
- [ ] Kiểm thử luồng chạy demo mượt mà không quá 3 phút.
- [ ] Viết README.md hướng dẫn cài đặt $\le 10$ phút và slide thuyết trình Chung kết.

---

## 7. BỘ TÀI NGUYÊN NỘP BÀI (SUBMISSION DELIVERABLES CHECKLIST)

| STT | Hạng mục nộp | Định dạng | Trạng thái chuẩn bị |
| :---: | :--- | :--- | :---: |
| 1 | **GitHub Source Code** | Public GitHub Repo | Đầy đủ mã nguồn, clean code, có TypeScript types |
| 2 | **README.md** | Markdown file | Kiến trúc hệ thống, hướng dẫn chạy $\le 10$ phút, giải trình Model BytePlus |
| 3 | **Video Demo Walkthrough** | MP4 (3–5 phút) | Thể hiện từ nhập Brief → Sinh Campaign Pack → Chỉnh sửa Canvas → Xuất ZIP |
| 4 | **Full Campaign Launch Pack mẫu** | ZIP / Folder | Gồm 1 Positioning Brief, 2 Routes, 1 Video 9:16, 4 Ảnh sàn, Bộ Copy, 1 A/B Plan |
| 5 | **Bộ Slide Thuyết Trình** | PDF / PPTX | Nêu bật Problem - Solution - Demo - AI Architecture - Commercial Impact |
| 6 | **Live Demo URL** | Vercel Live Link | Triển khai trực tuyến cho Ban giám khảo trải nghiệm trực tiếp |

---

## 8. KẾT LUẬN & CAM KẾT CHẤT LƯỢNG

Bản PRD này đảm bảo đáp ứng **100% tất cả các tiêu chí chấm điểm khắt khe nhất của Ban giám khảo BytePlus** trong đề thi **BP-01 (Commerce Campaign Launch Copilot)**. 

Bằng việc kết hợp sức mạnh vượt trội của mô hình **Seedance 2.5** & **Seedream 5.0 Pro** với nền tảng đồ họa sẵn có của **Romedia**, giải pháp không chỉ tạo ra một sản phẩm công nghệ ấn tượng trong khuôn khổ Hackathon mà còn sẵn sàng trở thành một **SaaS Platform thương mại hóa thực tế** phục vụ hàng trăm ngàn doanh nghiệp E-commerce tại Đông Nam Á.
