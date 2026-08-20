# PHÂN TÍCH CHUYÊN SÂU ĐỀ THI SỐ 5: BYTEPLUS (BP-01)
## COMMERCE CAMPAIGN LAUNCH COPILOT
*Hà Nội AI Hackathon 2026*

---

## 1. TỔNG QUAN ĐỀ BÀI (EXECUTIVE SUMMARY)

- **Mã đề:** BP-01
- **Đơn vị ra đề:** BytePlus (Tập đoàn công nghệ đứng sau hệ sinh thái AI & Video toàn cầu của ByteDance)
- **Tên đề:** **Commerce Campaign Launch Copilot**
- **Thông điệp cốt lõi (One-liner):**  
  > *Product brief + market signal in → launch-ready e-commerce campaign pack out, bao gồm ad concepts, product visuals, marketplace assets, copy, và A/B testing plan.*
- **Độ khó:** ⭐⭐⭐⭐ (4/5)
- **Bản chất bài toán:** Không đơn thuần là một công cụ sinh nội dung (Content Generator) riêng lẻ, mà là một **"AI Campaign Operator"** — Hệ thống điều phối toàn diện từ chiến lược định vị, sản xuất tài nguyên sáng tạo đa phương tiện (ảnh sàn, video quảng cáo ngắn, copy chuẩn chuyển đổi) đến kế hoạch thử nghiệm A/B và tối ưu hiệu suất kinh doanh thực tế.

---

## 2. BỐI CẢNH & NỖI ĐAU THỊ TRƯỜNG (PAIN POINTS & OPPORTUNITY)

### 2.1. Nỗi đau thực tế của Sellers & Brands (Thị trường SEA & E-commerce)
1. **Quy trình rời rạc, tốn thời gian (Workflow Fragmentation):**
   - Để ra mắt một chiến dịch sản phẩm trên TikTok Shop, Shopee, Lazada hay Meta Ads, một brand/seller phải qua 7-8 khâu tách biệt: Nghiên cứu insight → Lên concept ads → Chụp ảnh studio/Mockup → Viết mô tả listing → Dựng video ngắn → Soạn ad copy → Lên kế hoạch test ads.
   - Quy trình này thường mất từ **3 đến 14 ngày**, khiến seller bỏ lỡ "thời điểm vàng" khi một xu hướng (trend) hoặc dịp lễ hội (seasonal sale: 9.9, 11.11, Black Friday, Tết) đang bùng nổ.
2. **Thiếu tính nhất quán về định vị thương hiệu (Brand & Message Inconsistency):**
   - Đội video làm một kiểu, đội thiết kế ảnh listing làm một kiểu, đội viết content viết một nẻo. Khách hàng bấm vào ads video nhưng khi sang gian hàng lại thấy hình ảnh và thông điệp không khớp, làm sụt giảm tỷ lệ chuyển đổi (CVR).
3. **Bài toán "Dám test và biết cách test" (A/B Testing Gap):**
   - Hầu hết các công cụ AI hiện nay chỉ tạo ra 1 kết quả ngẫu nhiên. Marketer không biết phải test góc độ nào (ví dụ: góc Khoa học/Thành phần vs. góc Trải nghiệm/Cảm xúc), dẫn đến lãng phí ngân sách chạy ads mà không rút ra được insight tăng trưởng.

### 2.2. Mục tiêu của BytePlus với đề bài này
BytePlus muốn tìm kiếm giải pháp:
- Thể hiện được sức mạnh công nghệ thị giác và sinh video thế hệ mới của hãng (**Seedream 5.0 Pro** và **Seedance 2.5**).
- Tạo ra một công cụ có giá trị thương mại cao (Commercial Readiness), biến AI thành công cụ thúc đẩy doanh số thực chiến (Commerce Growth) cho hàng triệu seller khu vực Đông Nam Á.

---

## 3. GIẢI MÃ MA TRẬN YÊU CẦU & ĐẦU RA (INPUT / OUTPUT MATRIX)

### 3.1. Đầu vào yêu cầu (Input Specs)

| Nhóm thông tin | Dữ liệu chi tiết cần tiếp nhận |
| :--- | :--- |
| **Product Brief** | Tên sản phẩm, ngành hàng (Category), USP (Key selling points), giá bán, ưu đãi/khuyến mãi, thị trường mục tiêu, Required Claims (câu bắt buộc phải nói), Restricted Claims (từ cấm, cam kết vi phạm chính sách). |
| **Brand Kit** | Logo thương hiệu, bảng màu chủ đạo (Brand colors), Tone & Voice (sang trọng, năng động, hài hước, chuyên gia...), ảnh chụp sản phẩm thực tế (Product photos). |
| **Audience Brief** | Chân dung khách hàng mục tiêu, ngôn ngữ (Tiếng Việt, Tiếng Anh, Thái, Indo...), kênh phân phối (TikTok Shop, Shopee, Facebook Ads, Instagram...), thị trường địa lý. |
| **Market Signals** | Xu hướng thị trường (Trending keywords), thời điểm mùa vụ (Flash sale, 9.9, Giáng sinh), Pain point của người mua, góc tiếp cận của đối thủ, mục tiêu chiến dịch (Conversion, Traffic, Awareness). |
| **Past Data (Optional)** | Dữ liệu lịch sử chiến dịch: CTR, CVR, ROAS, Watch time, Add-to-cart rate, phản hồi của khách hàng. |

---

### 3.2. Đầu ra bắt buộc (Deliverables Output - Launch Pack)

Một chiến dịch hoàn chỉnh xuất xưởng phải bao gồm đầy đủ **6 thành phần cốt lõi** (+ 1 mô-đun nâng cao):

```
                                  ┌──────────────────────────────┐
                                  │   INPUT: BRIEF + SIGNALS     │
                                  └──────────────┬───────────────┘
                                                 │
                                                 ▼
                             ┌───────────────────────────────────────┐
                             │  1. Product Positioning & Hierarchy   │
                             └───────────────────┬───────────────────┘
                                                 │
                   ┌─────────────────────────────┴─────────────────────────────┐
                   ▼                                                           ▼
    ┌─────────────────────────────┐                             ┌─────────────────────────────┐
    │  2. Creative Route A        │                             │  2. Creative Route B        │
    │  (e.g., Problem-Solution)   │                             │  (e.g., Social Proof / Hook)│
    └──────────────┬──────────────┘                             └──────────────┬──────────────┘
                   │                                                           │
                   ├─────────────────────────────┬─────────────────────────────┤
                   ▼                             ▼                             ▼
    ┌─────────────────────────────┐┌───────────────────────────┐┌─────────────────────────────┐
    │ 3. Short-form Video (Ads)   ││ 4. Product Image Set (4+) ││ 5. Commerce Copy & Listing  │
    │ - 15-30s (9:16 Vertical)    ││ - Hero Shot               ││ - Title SEO, Bullet points  │
    │ - Seedance 2.5 + Audio 1.0  ││ - Detail / SKU shot       ││ - Ad Captions & Hook lines  │
    │ - Hook 3s đầu + CTA         ││ - Campaign Collection     ││ - Promotion & CTA Copy      │
    │                             ││ - Marketplace Thumbnail   ││                             │
    │                             ││ (Seedream 5.0 Pro)        ││ (Seed 2.1 / LLM)            │
    └─────────────────────────────┘└───────────────────────────┘└─────────────────────────────┘
                                                 │
                                                 ▼
                             ┌───────────────────────────────────────┐
                             │    6. Actionable A/B Testing Plan     │
                             │ (Hypothesis, Success Metrics, Learn)  │
                             └───────────────────┬───────────────────┘
                                                 │
                                                 ▼ (Optional)
                             ┌───────────────────────────────────────┐
                             │  7. Performance Feedback Engine       │
                             │ (Keep / Change / Stop / Test Next)    │
                             └───────────────────────────────────────┘
```

#### Chi tiết từng đầu ra:
1. **Product Positioning (Định vị sản phẩm):**
   - Angle chính của chiến dịch (Campaign Angle).
   - Chân dung nhóm khách hàng đón nhận tốt nhất.
   - Thông điệp bán hàng chủ chốt (Core message).
   - Cấu trúc thứ bậc lợi ích sản phẩm (Benefit Hierarchy: Lợi ích cảm tính vs. Lợi ích chức năng).
2. **Creative Routes (Tối thiểu 2 tuyến ý tưởng A/B):**
   - Tuyến A vs Tuyến B có góc tiếp cận khác biệt rõ ràng (ví dụ: Tuyến A đánh vào Nỗi đau - Giải pháp; Tuyến B đánh vào Trải nghiệm - Thể hiện phong cách).
   - Mỗi tuyến định hình: Hook idea (câu mở đầu giật tương tác), Hướng hình ảnh (Visual direction), Thông điệp nhấn mạnh, Kênh triển khai tối ưu.
3. **Short-form Video Asset (Bắt buộc dùng Seedance 2.5):**
   - Video hoàn chỉnh chuẩn 9:16 (15–30 giây) tối ưu cho TikTok / Reels / Shorts.
   - Bắt buộc có Hook giữ chân người xem trong 2–3 giây đầu.
   - Sản phẩm xuất hiện rõ nét, trung thực, không bị biến dạng.
   - Có Voiceover/Âm thanh và phụ đề (Subtitles) dẫn dắt đến CTA rõ ràng.
4. **Product Collection Image Set (Bắt buộc dùng Seedream 5.0 Pro - Tối thiểu 4 ảnh chuẩn sàn):**
   - `Ảnh 1: Product Hero Image` (Ảnh đại diện nổi bật, bố cục studio chuẩn thương mại).
   - `Ảnh 2: SKU / Detail Image` (Ảnh cận cảnh tính năng, texture, thông số sản phẩm).
   - `Ảnh 3: Campaign Collection Image` (Ảnh concept theo chủ đề chiến dịch / Lifestyle context).
   - `Ảnh 4: Marketplace Cover / Thumbnail` (Ảnh chuẩn kích thước thumbnail sàn với badge khuyến mãi, tag nổi bật).
5. **Commerce Copy (Bộ nội dung bán hàng):**
   - Tiêu đề sản phẩm chuẩn SEO sàn.
   - Mô tả chi tiết & 5 Bullet points tính năng/lợi ích.
   - Ad Captions ngắn cho video/post chạy ads.
   - Bộ 3-5 Short Hook Lines để test tiêu đề.
6. **A/B Testing Plan (Bản kế hoạch thử nghiệm):**
   - Xác định rõ biến số so sánh giữa Route A và Route B (vd: Hook dạng câu hỏi vs. Hook dạng sốc).
   - Chỉ số đo lường thành công (Target Metrics: CTR > 2%, 3s Hook Retention > 35%, CVR > 3%).
   - Bài học kỳ vọng rút ra sau đợt test.
7. **Performance Learning Module (Mô-đun học hiệu suất - Điểm cộng lớn):**
   - Cho phép nạp file CSV kết quả chiến dịch cũ.
   - AI đưa ra khuyến nghị phân loại: **Keep** (Giữ lại gì), **Change** (Sửa đổi gì), **Stop** (Dừng cái gì), **Test Next** (Test tiếp góc nào).

---

## 4. QUY ĐỊNH VỀ MÔ HÌNH AI CỦA BYTEPLUS

Đề thi có quy định bắt buộc rất rõ ràng về Model Stack:

| Mô hình | Nhà cung cấp | Vai trò trong hệ thống | Bắt buộc / Tùy chọn |
| :--- | :--- | :--- | :--- |
| **Seedance 2.5** | BytePlus | Sinh video ngắn quảng cáo, chuyển động sản phẩm, visual sequence | **BẮT BUỘC (Required)** |
| **Seedream 5.0 Pro** | BytePlus | Sinh bộ ảnh sản phẩm chuẩn sàn, ảnh hero, thumbnail, banner | **BẮT BUỘC (Required)** |
| **Seed 2.1** | BytePlus | Lập luận chiến lược, định vị sản phẩm, viết kịch bản, ad copy, phân tích A/B | **Khuyên dùng (Optional)** |
| **Audio 1.0** | BytePlus | Tạo giọng đọc AI (Voiceover), âm thanh nền, lồng tiếng đa ngôn ngữ | **Khuyên dùng (Optional)** |

> **Lưu ý quy chế từ BGK:** *Chấm điểm dựa trên chất lượng, độ hoàn thiện, tính hữu ích và tính sẵn sàng thương mại của output, KHÔNG chấm dựa trên số lượng model sử dụng.* Cần giải thích rõ lý do chọn từng model và vị trí ứng dụng trong kiến trúc.

---

## 5. PHÂN TÍCH TIÊU CHÍ CHẤM ĐIỂM (100 ĐIỂM) & CHIẾN LƯỢC ĂN ĐIỂM TỐI ĐA

| Tiêu chí | Điểm | Kỳ vọng của Giám khảo | Chiến lược bứt phá của Đội thi |
| :--- | :---: | :--- | :--- |
| **1. Problem Fit & Practical Usefulness** | **20đ** | Giải quyết trúng nỗi đau của Seller/Marketer thực tế. Có thể dùng ngay được không? | Xây dựng luồng thao tác "1-Click Campaign Pack" giải quyết bài toán ra mắt chiến dịch từ 7 ngày xuống còn **2 phút**. |
| **2. Output Completeness** | **20đ** | Có đầy đủ 100% các thành phần yêu cầu: Định vị, 2 route A/B, 1 video ads, 4 ảnh sàn, bộ copy, testing plan. | Đảm bảo Dashboard xuất ra toàn bộ file dạng trọn gói (Zip download / Workspace Asset Board) không thiếu bất kỳ hạng mục nào. |
| **3. Creative Quality & Brand Consistency** | **20đ** | Tính nhất quán thương hiệu giữa ảnh, video và lời văn; chất lượng thẩm mỹ cao, không bị lỗi AI méo hình. | Sử dụng cơ chế **Brand Consistency Anchor** (khóa mã màu hex, logo overlay, product shape preservation) để sản phẩm thật không bị AI làm sai lệch. |
| **4. Required Model Use Quality** | **15đ** | Sử dụng Seedance 2.5 & Seedream 5.0 Pro đúng kỹ thuật, prompt tối ưu, giải thích rõ ràng. | Có trang "AI Model Transparency & Pipeline Architecture" minh họa chính xác luồng gọi API và tối ưu prompt cho từng model BytePlus. |
| **5. Workflow & Demo Clarity** | **15đ** | Ban giám khảo hiểu ngay luồng đi từ Input → Xử lý AI → Output; Demo mượt mà, không chết chốt. | Tận dụng giao diện UI hiện đại (dựa trên nền tảng Canvas & Workspace hiện có của Romedia), hiển thị dạng Studio Workspace tương tác trực quan. |
| **6. Commercial Readiness** | **10đ** | File xuất ra sẵn sàng bấm nút chạy quảng cáo hoặc đăng lên TikTok Shop / Shopee. | Format ảnh đúng tỷ lệ chuẩn sàn (1:1, 3:4), video đúng 9:16 có subtitle, copy có nút Copy 1-click chuẩn Markdown/HTML listing. |

---

## 6. THIẾT KẾ KIẾN TRÚC GIẢI PHÁP ĐỀ XUẤT CHO ROMEDIA

Nhằm tận dụng tối đa codebase hiện có của Romedia (Next.js 14, Tailwind, Fabric.js, Hono API, Drizzle ORM, Radix UI), ta định hình kiến trúc **"Romedia Commerce Launch Studio"**:

```
                       ┌─────────────────────────────────────────────────────────┐
                       │               ROMEDIA COPILOT FRONTEND                  │
                       │     (Next.js 14 + TailwindCSS + Fabric Canvas UI)       │
                       └────────────────────────────┬────────────────────────────┘
                                                    │
                   ┌────────────────────────────────┴────────────────────────────────┐
                   ▼                                                                 ▼
      ┌─────────────────────────┐                                       ┌─────────────────────────┐
      │  Step 1: Campaign Brief │                                       │  Step 2: Studio Canvas  │
      │  - Product / SKU info   │                                       │  - 2 Routes Side-by-Side│
      │  - Brand Kit & Assets   │                                       │  - Video Preview & Cut  │
      │  - Market Signal / Goal │                                       │  - Image Matrix Grid    │
      └────────────┬────────────┘                                       │  - Copy & Testing Tab   │
                   │                                                    └────────────▲────────────┘
                   │ HTTP / Stream                                                   │
                   ▼                                                                 │
      ┌──────────────────────────────────────────────────────────────────────────────┴────────────┐
      │                               HONO API & AGENT ORCHESTRATOR                               │
      ├───────────────────────────────────────────────────────────────────────────────────────────┤
      │ 1. Strategy & Positioning Agent (Seed 2.1 / Reasoning LLM)                                │
      │    - Generates Angles, Personas, Benefit Hierarchy, 2 Route Concepts, Testing Plan        │
      ├───────────────────────────────────────────────────────────────────────────────────────────┤
      │ 2. Visual Generation Pipeline (BytePlus Seedream 5.0 Pro)                                 │
      │    - Prompt Engineering + Negative Prompts + Consistency Embedding                        │
      │    - Outputs: Hero (1:1), Detail (1:1/3:4), Collection (16:9/4:5), Cover Badge (1:1)       │
      ├───────────────────────────────────────────────────────────────────────────────────────────┤
      │ 3. Short Video Generation Pipeline (BytePlus Seedance 2.5 + Audio 1.0)                    │
      │    - Scene-by-scene Prompts (Hook -> Product Demo -> Social Proof -> CTA)                 │
      │    - Seedance 2.5 generates high-motion 9:16 clips                                        │
      │    - Audio 1.0 generates Voiceover narration + Auto Subtitle timestamps                   │
      ├───────────────────────────────────────────────────────────────────────────────────────────┤
      │ 4. Performance Optimizer (Optional Learning Module)                                       │
      │    - Ingests CSV Metrics (CTR, ROAS) -> Outputs Keep/Change/Stop/Next recommendations     │
      └───────────────────────────────────────────────────────────────────────────────────────────┘
```

### Các tính năng cốt lõi độc đáo (Killer Features):
1. **Interactive Multi-Asset Campaign Board:** Không trả về văn bản suông; hiển thị dạng bảng điều khiển trực quan gồm:
   - Cột A: Creative Route A (Góc giải quyết vấn đề).
   - Cột B: Creative Route B (Góc bắt trend / Trải nghiệm).
   - Người dùng có thể click chỉnh sửa trực tiếp ảnh trên Canvas hoặc đổi text ngay lập tức.
2. **True-to-Product Consistency Guard:**
   - Đảm bảo hình dạng bao bì sản phẩm thật được giữ nguyên vẹn khi sinh bối cảnh (Hero Lifestyle / Studio Lighting).
3. **1-Click Export Multi-Platform Package:**
   - Xuất trọn bộ: Thư mục ảnh chuẩn Shopee/Lazada, Video chuẩn TikTok Shop ads kèm file SRT phụ đề, File text copy sẵn sàng dán vào trình quản lý quảng cáo.
4. **Interactive A/B Testing Simulator:**
   - Trực quan hóa giả thuyết test và dự đoán kịch bản tối ưu chi phí Ads (Estimated CAC reduction).

---

## 7. KỊCH BẢN DEMO THỰC CHIẾN TẠI HACKATHON (SHOWCASE SCENARIOS)

Để chinh phục Ban giám khảo trong phần thi live demo (3–5 phút), đội thi chuẩn bị sẵn 3 kịch bản mẫu tương thích hoàn hảo với 4 sample scenarios trong đề bài:

### Kịch bản 1: F&B / Đồ uống đóng chai (New Beverage Launch)
- **Sản phẩm:** "Trà Kombucha Trái Cây Lên Men Tự Nhiên - Zero Sugar".
- **Market Signal:** Xu hướng Healthy Drink mùa hè, từ khóa tìm kiếm "detox thanh lọc", cạnh tranh với nước ngọt có ga.
- **Route A (Khoa học & Lợi ích):** Hook "Sự thật về lượng đường trong nước giải khát thông thường" → Video demo vi khuẩn có lợi & thành phần tự nhiên → Bộ ảnh Hero chuẩn studio thanh khiết.
- **Route B (Lifestyle & Năng lượng):** Hook "Bí quyết nạp năng lượng sau 3h chiều không lo tăng cân" → Video năng động tại văn phòng/phòng gym → Bộ ảnh bối cảnh dã ngoại hiện đại.
- **Testing Plan:** So sánh CTR giữa góc "Zero Sugar Detox" vs "Office Energy Boost".

### Kịch bản 2: Skincare & Beauty (Dược mỹ phẩm)
- **Sản phẩm:** "Serum Niacinamide 10% Phục Hồi Hàng Rào Bảo Vệ Da".
- **Required Claims:** "Giảm mẩn đỏ sau 7 ngày", "Không cồn, không hương liệu nhân tạo".
- **Restricted Claims:** Không được cam kết "trị dứt điểm mụn trong 24h", "thay thế thuốc chữa bệnh".
- **Hệ thống xử lý:** Tuân thủ 100% claim constraint, sinh 4 ảnh listing có macro shot kết cấu serum sóng sánh mịn màng do **Seedream 5.0 Pro** tạo ra.

### Kịch bản 3: Tối ưu hiệu suất từ dữ liệu cũ (Performance Refresh)
- **Đầu vào:** Upload file CSV dữ liệu chiến dịch tháng trước (CTR 0.8%, ROAS 1.2, tỷ lệ xem 3s thấp 12%).
- **AI Recommendation:**
  - *STOP:* Dừng các hook dài dòng giới thiệu thương hiệu ở 5s đầu.
  - *CHANGE:* Đưa sản phẩm xuất hiện ngay giây thứ 1 (Thumb-stop).
  - *TEST NEXT:* Triển khai Route mới với format "POV: Mở hộp review chân thực".

---

## 8. CHECKLIST SẢN PHẨM CẦN NỘP & KẾ HOẠCH HÀNH ĐỘNG

### 8.1. Danh mục deliverables bắt buộc
- [x] **Mã nguồn GitHub Repository:** Code chuẩn, cấu trúc modular, clean code.
- [x] **Tài liệu README.md:** Kiến trúc hệ thống, hướng dẫn cài đặt chạy thử trong $\le 10$ phút, giải thích rõ vai trò model BytePlus.
- [x] **Video Demo Walkthrough (3-5 phút):** Thể hiện trọn vẹn luồng từ nhập Brief → AI sinh toàn bộ Campaign Pack → Xuất tài nguyên.
- [x] **Trọn bộ Campaign Launch Pack mẫu (Full Export):**
  - 1 Bản định vị sản phẩm & Thông điệp chính.
  - 2 Tuyến ý tưởng quảng cáo A/B.
  - $\ge 1$ Video quảng cáo hoàn chỉnh chuẩn 9:16 (Seedance 2.5 + Audio 1.0).
  - $\ge 4$ Ảnh sản phẩm chất lượng cao (Seedream 5.0 Pro).
  - Trọn bộ Listing copy & Ad copy.
  - Bản kế hoạch A/B Testing chi tiết.
- [x] **Slide thuyết trình Chung kết:** Ngắn gọn, chuyên nghiệp, nêu bật Problem - Solution - Demo - Tech Architecture - Business Value.
- [x] **Live Demo URL:** Triển khai trên Vercel/Cloud để BGK có thể truy cập trải nghiệm trực tiếp.

### 8.2. Lộ trình triển khai (Hackathon Sprint Plan)

| Giai đoạn | Nhiệm vụ chính | Trọng tâm kỹ thuật |
| :--- | :--- | :--- |
| **Pha 1: Data & Prompt Engineering** | Thiết kế cấu trúc JSON Schema cho Campaign Pack, tinh chỉnh Prompts cho Seed 2.1, Seedream 5.0 Pro, Seedance 2.5. | Đảm bảo tính nhất quán của output và tuân thủ chặt chẽ Claims. |
| **Pha 2: Backend Orchestrator** | Xây dựng API Pipeline tích hợp SDK/API BytePlus, quản lý hàng đợi sinh video và sinh ảnh. | Tối ưu thời gian phản hồi, cơ chế streaming/polling trạng thái job. |
| **Pha 3: Frontend Studio UI/UX** | Phát triển giao diện Campaign Dashboard, tích hợp Canvas Preview, Video Player, A/B Comparison Grid. | Trải nghiệm người dùng mượt mà, trực quan, thẩm mỹ chuẩn Pro Tool. |
| **Pha 4: Testing & Demo Preparation** | Chuẩn bị sẵn 3 bộ dữ liệu mẫu (FMCG, Mỹ phẩm, Fashion), quay video demo, hoàn thiện Slide và README. | Kiểm thử kịch bản live demo không độ trễ, tài liệu nộp đầy đủ 100%. |

---

## 9. KẾT LUẬN

Đề bài **BP-01: Commerce Campaign Launch Copilot** của BytePlus là đề bài có tính ứng dụng thực tiễn cao nhất, kết hợp hoàn hảo giữa năng lực chiến lược (Reasoning) và năng lực sáng tạo đa phương tiện (GenAI Image & Video). 

Bằng cách xây dựng giải pháp tập trung vào **"Tính hoàn chỉnh của chiến dịch"**, **"Nhất quán thương hiệu"** và **"Sẵn sàng thương mại hóa ngay lập tức"**, đội thi hoàn toàn có thể chinh phục điểm số tối đa của Ban giám khảo và định vị sản phẩm như một bước đột phá trong tự động hóa vận hành E-commerce năm 2026.
