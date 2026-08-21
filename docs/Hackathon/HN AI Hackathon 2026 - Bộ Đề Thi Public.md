---
title: "HN AI Hackathon 2026 - Bộ Đề Thi [Public]"
source: "https://ecomdycom.sg.larksuite.com/wiki/WQptwo5gtiDFvbke9nKlSBRdgyc"
author:
published:
created: 2026-08-19
description:
tags:
  - "clippings"
---
|              |        |                                                       |            |
| ------------ | ------ | ----------------------------------------------------- | ---------- |
| **Số**       | **Mã** | **Tên ngắn gọn**                                      | **Độ khó** |
| Printway     | PW1    | Product Opportunity Hub (AI Product Research Copilot) | ⭐⭐⭐⭐ (4/5) |
| WEALIFY      | WLF-01 | Quản lý chi tiêu & an toàn giao dịch                  | ⭐⭐⭐⭐ (4/5) |
| BurgerPrints | BUP-01 | AI_Ads_Video_Generator_Hackathon                      | ⭐⭐⭐⭐ (4/5) |
| BurgerPrints | BUP-02 | AI_Design_Compliance_Checker_Hackathon                | ⭐⭐⭐⭐ (4/5) |
| BytePlus     | BP-01  | Commerce Campaign Launch Copilot                      | ⭐⭐⭐⭐ (4/5) |
| BytePlus     | BP-02  | AI iTVC Campaign Studio                               | ⭐⭐⭐⭐ (4/5) |

---

# **I. Đề thi từ Printway**

# PW1 - Product Opportunity Hub (AI Product Research Copilot)

**Người ra đề:** Printway

**Tóm tắt yêu cầu:** Biến các dữ liệu rời rạc từ 7+ nguồn marketplace thành một Opportunity Score duy nhất với 01 bản đề xuất sản phẩm hành động được, giúp đội R&D In-house của Printway phát hiện cơ hội trước khi thị trường bão hòa.

##   Vấn đề

  Thị trường quà tặng cá nhân hóa đạt khoảng $31B năm 2025 và tiếp tục tăng trưởng 6-10%/năm, nhưng cửa sổ cơ hội cho mỗi sản phẩm POD ngày càng ngắn: khi một sản phẩm đã xuất hiện dày đặc trên Etsy (5,6 triệu seller hoạt động, 86,5 triệu buyer), thị trường thường đã bão hòa. Đội R&D của các công ty POD fulfillment hiện phải nghiên cứu thủ công trên 7+ nguồn (Etsy, Amazon, Walmart, TikTok Shop, Pinterest, Facebook Ads Library, Google Trends), mỗi nền tảng hiển thị dữ liệu theo một cách khác nhau, phải tổng hợp thông tin bằng tay).

  Tệ hơn, cùng một sản phẩm được gọi bằng hàng chục tên khác nhau: seller Etsy đặt là "Personalized Grandpa Ornament Gift", trong khi catalog nhà sản xuất gọi là "Custom Shape Acrylic Ornament", khiến không thể gom nhóm, so sánh hay đo lường.

  Các tool hiện có (Alura, EverBee, Helium 10) chỉ phân tích keyword trên một marketplace và không trả lời được hai câu hỏi quan trọng nhất: sản phẩm này có đáng làm không, và có phù hợp với năng lực sản xuất không. Kết quả: hàng trăm ý tưởng không biết ưu tiên cái nào, và sau khi research xong vẫn phải viết report bằng tay.

##   Đối tượng người dùng

  Đội R&D và Product tại các công ty POD fulfillment (như Printway) và POD seller chuyên nghiệp quản lý 100-1.000+ listings, mỗi tuần phải quyết định “làm sản phẩm gì tiếp theo” nhưng không có công cụ tổng hợp tín hiệu thị trường thành quyết định.

##   Nhiệm vụ

  Xây dựng **Product Opportunity Hub** - hệ thống AI tổng hợp tín hiệu thị trường đa nguồn và biến chúng thành đề xuất hành động, với 4 năng lực cốt lõi:

- **Trend Aggregation:** tổng hợp Top Product / Category / Niche / Keyword/ Revenue đang tăng trưởng từ nhiều nguồn dữ liệu.
    
- **Product Type Normalization:** nhận diện listing bất kỳ (title/URL) và map về taxonomy chuẩn: Product Type → Category → Material, không phụ thuộc vào cách seller đặt tên.
    
- **Opportunity Score:** chấm 0-100 với breakdown giải thích được (Demand, Competition, Growth Trend, Seasonality, Personalization Potential, Product revenue) kèm đánh giá Fit với năng lực sản xuất → Recommend / Not Recommend.
    
- **Auto Research Report:** tự sinh Product Research Report hành động được: niche đề xuất, material gợi ý, thời điểm launch.
    

##   Đầu vào

- Nghiên cứu trên 2 platforms chính là Etsy & Amazon, có thể mở rộng trên các nền tảng như Google trends, Pinterest, TIkTok,...
    
- File taxonomy + catalog rút gọn của Printway (Product Type, Category, Material, độ khó sản xuất, khoảng margin - BTC cung cấp dạng CSV/JSON)
    
- Account Alura (Etsy), Helium10 (Amzon) hỗ trợ phân tích dữ liệu (BTC cung cấp)
    

##   Đầu ra mong đợi

  Một hub/dashboard mà người R&D non-tech trả lời được 6 câu hỏi: **nên phát triển sản phẩm gì; sản phẩm nào đang có cơ hội tăng trưởng; niche nào còn ít cạnh tranh; thiết kế nào đang được yêu thích; sản phẩm có phù hợp năng lực sản xuất không; nếu launch ngay bây giờ khả năng thành công cao hay thấp**. Kèm Opportunity Score có breakdown từng chiều + report tự sinh (export PDF/Markdown). (Bonus) cảnh báo xu hướng mới nổi sớm, Design Insight (top colors / quotes / personalization / themes), Competitor Tracker.

##   Yêu cầu bắt buộc

- **BẮT BUỘC** trả lời bằng đề xuất hành động - không phải dashboard số liệu thuần
    
- Tổng hợp từ ≥ 2 nguồn dữ liệu độc lập
    
- Chuẩn hóa Product Type về hệ thống phân loại sản phẩm của Printway (file BTC cung cấp), không phụ thuộc title
    
- Opportunity Score có breakdown ≥ 5 chiều, mỗi chiều giải thích được lý do
    
- Có giao diện cho người dùng non-tech
    
- Sản phẩm demo để BGK chấm trực tiếp
    
- Chỉ dùng dữ liệu công khai / API chính thức, tuân thủ ToS nền tảng; không hardcode credentials trả phí lên repo
    

##   Tech Stack gợi ý

  LLM tự chọn (Claude / GPT / Gemini / Llama / Qwen / DeepSeek) · Data: Etsy Open API, Google Trends (pytrends), Apify hoặc dataset công khai · Embeddings + vector DB (chuẩn hóa Product Type theo hướng semantic) · Scoring: heuristic / ML tự thiết kế, miễn giải thích được · FastAPI / Node.js + Streamlit / React / Next.js

##   Tình huống mẫu

- "Top 10 sản phẩm personalized gift tăng trưởng nhanh nhất 30 ngày qua là gì? Cái nào phù hợp năng lực sản xuất acrylic / wood / metal?"
    
- Dán title "Personalized Grandpa Gift For Father's Day From Granddaughter" → hệ thống trả về: Product Type: Custom Shape Acrylic Ornament · Category: Home Decor · Material: Acrylic · Opportunity Score 89/100 (Demand cao, Competition trung bình, Growth +45%, Seasonality Q2, Personalization cao, Revenue theo thời gian lựa chọn) → Recommend.
    
- "So sánh niche Memorial / Pet / Gardening cho Q4 - niche nào còn ít cạnh tranh nhất? Xuất report đề xuất kèm material và thời điểm launch."
    

##   Tiêu chí chấm điểm

- Tính hành động của đề xuất - giám khảo R&D hỏi trực tiếp 8-10 câu hỏi thật (30đ)
    
- Độ chính xác chuẩn hóa Product Type trên bộ test ~50 listing (20đ)
    
- Opportunity Score hợp lý và giải thích được (20đ)
    
- Độ phủ và độ tươi của nguồn dữ liệu (15đ)
    
- UX + tốc độ phản hồi (15đ) = 100 điểm. (Bonus: early-trend alert / Design Insight / Competitor Tracker = điểm cộng.)
    

##   Sản phẩm cần nộp

  GitHub · README 1-2 trang (kiến trúc + nguồn dữ liệu + phương pháp scoring + cài đặt ≤ 15 phút)

  · Demo video 3-5 phút (≥ 3 luồng: trend discovery → scoring → report) · ≥ 1 Product Research Report mẫu do hệ thống tự sinh · Bộ slide · (tùy chọn) URL live demo

##   Độ khó

  ⭐⭐⭐⭐ (4/5) Khó

##   Nhãn

  product-research · opportunity-scoring · trend-detection · print-on-demand · multi-source-data · printway

  

# **II. Đề thi từ WEALIFY**

_Chủ đề: dùng trí tuệ nhân tạo (AI) để giải quyết_ _**một vấn đề có thật của người dùng Wealify**_ _khi mở và sử dụng_ _**thẻ / tài khoản ngân hàng Mỹ**__._ _Tài liệu này viết cho mọi người đọc đều hiểu. Vài từ chuyên môn bắt buộc phải dùng thì đều có giải thích ngắn trong ngoặc._

**Ba đề thi:**

|   |   |   |   |
|---|---|---|---|
|**Số**|**Mã**|**Tên ngắn gọn**|**Độ khó**|
|Đề 1|WLF-01|Trợ lý soi sao kê: Quản lý chi tiêu & an toàn giao dịch|⭐⭐⭐⭐|

_Vài từ hay gặp trong tài liệu:_

- **Trợ lý AI** = phần mềm biết trò chuyện hỏi–đáp qua lại (giống khung chat), tự hiểu câu hỏi và trả lời.
    
- **Sao kê** = bảng liệt kê mọi khoản tiền vào/ra của thẻ hay tài khoản.
    
- **API** = đường kết nối để phần mềm lấy dữ liệu từ hệ thống Wealify.
    
- **Dữ liệu mẫu** = dữ liệu giả do ban tổ chức tạo sẵn để thi (không phải của người thật).
    

---

**Quy định chung**

**1.** **Chỉ dùng dữ liệu mẫu** do ban tổ chức cấp. **Tuyệt đối không** dùng thông tin thật của bất kỳ ai (tên, ngày sinh, địa chỉ, số điện thoại, số thẻ, số tài khoản, ảnh giấy tờ…).

**2.** **Che thông tin nhạy cảm:** số thẻ chỉ hiện 4 số cuối; **không bao giờ lưu hay hiển thị mã bảo mật 3 số sau thẻ**; che số tài khoản. Không in thông tin nhạy cảm ra màn hình chạy máy.

**3.** **Giữ kín "chìa khoá" kết nối** (mật khẩu, khoá API): không đăng công khai lên mạng (ví dụ GitHub — nơi đăng mã nguồn công khai), không để lộ trong video, bản trình chiếu hay hướng dẫn.

**4.** **Trợ lý chỉ HỖ TRỢ và GỢI Ý**, không tự làm thay người dùng những việc quan trọng: **không** tự chuyển tiền, **không** tự khoá/mở thẻ, **không** tự nộp hồ sơ, **không** tự huỷ dịch vụ.

**5.** **Không được bịa:** mọi con số, thông tin, quy định phải dựa trên dữ liệu có thật và **chỉ rõ lấy từ đâu**. Không chắc thì nói thẳng "mình chưa có thông tin này".

**6.** **Là trợ lý biết trò chuyện**, không phải chỉ là ô tìm kiếm hay bảng lọc bấm chọn.

**7.** **Chạy nhanh, có giao diện:** cài đặt và chạy được trong vòng **10 phút** trên máy giám khảo; có giao diện cho người dùng thao tác (trang web, ứng dụng điện thoại, hoặc khung chat như Telegram/Discord…).

**8.** **Hỗ trợ tiếng Việt và tiếng Anh.**

**9.** **Xoá dữ liệu mẫu và nhật ký** sau khi cuộc thi kết thúc.

# WLF-01 - Quản lý chi tiêu & an toàn giao dịch

**Mã đề & Tên đề**

WLF-01 - Wealify · Quản lý chi tiêu & an toàn giao dịch

**Nhà tài trợ / Track**

Wealify · Hạng mục: Quản lý chi tiêu & an toàn giao dịch.

**Tóm tắt 1 câu**

Xây một trợ lý AI biết trò chuyện: đọc sao kê tài khoản, đối chiếu với email biên lai và với số dư ví / sao kê thẻ, để chỉ ra khoản lạ, khoản trùng, gói "quên huỷ" và các khoản lệch giữa các nguồn — kèm báo cáo chi tiêu, dự báo, nhắc hạn và cảnh báo chủ động; tất cả chỉ đọc và luôn để người dùng quyết định.

**Vấn đề**

Một tài khoản Wealify có nhiều loại dòng tiền trộn lẫn: tiền nạp vào (payin), tiền rút/chuyển ra (payout), khoản chuyển từ tài khoản sang thẻ, các loại phí, và các lần quẹt thẻ. Tiền còn nằm rải ở số dư ví và trên sao kê thẻ. Vì nhiều nguồn và nhiều loại giao dịch xen kẽ — lại hay ghi bằng tiếng Anh, tên cửa hàng viết tắt khó hiểu — người dùng rất khó tự nhận ra: một khoản bị trừ cho dịch vụ đã quên, một khoản bị tính trùng hoặc phí kép, một khoản tiền rời tài khoản mà chưa lên thẻ, hay một giao dịch mình không hề thực hiện. Để lâu quá 60 ngày, họ có thể mất luôn quyền khiếu nại đòi lại tiền.

**Đối tượng người dùng**

Người dùng thẻ / tài khoản Mỹ của Wealify muốn kiểm soát chi tiêu, hiểu rõ dòng tiền của mình và sớm phát hiện khoản bất thường.

**Nhiệm vụ**

Xây một trợ lý AI biết trò chuyện (tiếng Việt & tiếng Anh), làm được các việc sau — và chỉ đọc với tiền, không tự thao tác giao dịch:

1. Đọc & phân loại sao kê tài khoản: tách rõ các dòng tiền (tiền vào, tiền ra, chuyển sang thẻ, phí, chi tiêu).
    
2. Đối soát với email: đọc thêm hộp thư (biên lai, email xác nhận đăng ký, thông báo ngân hàng), khớp mỗi giao dịch với email nguồn — đánh dấu "có email khớp / không tìm thấy email / email nghi giả".
    
3. Đối chiếu 3 nguồn tiền: tài khoản nhận (tiền vào) ↔ số dư ví ↔ sao kê thẻ — bắt các lệch: tiền rời tài khoản nhưng chưa lên thẻ, nạp trùng, phí kép, số dư ví không khớp.
    
4. Bắt khoản bất thường & gói "quên huỷ": nhận diện gói đăng ký định kỳ, khoản trùng, khoản lạ; giải thích tên cửa hàng khó hiểu.
    
5. Gắn nhãn & nhắc hạn: mỗi cảnh báo gắn 1 trong 3 mức, kèm mốc hạn khiếu nại 60 ngày.
    
6. Báo cáo tài chính: tổng hợp chi tiêu tháng/quý/năm; dự báo kỳ trừ gói kế tiếp, tổng chi/năm, phát hiện tăng giá âm thầm (giá kỳ này cao hơn kỳ trước).
    
7. Cảnh báo chủ động có kiểm soát: gửi báo cáo tới chính email người dùng (có xác nhận); tạo nhắc hạn; chạy giám sát định kỳ và không báo trùng.
    

  

**Đầu vào**

Do ban tổ chức cấp (toàn bộ là dữ liệu mẫu): sao kê tài khoản (bảng CSV / PDF) · số dư ví mẫu · sao kê thẻ mẫu · hộp thư mẫu (biên lai / xác nhận / thông báo ngân hàng) · địa chỉ email của chính người dùng (để gửi báo cáo). Nếu dùng kết nối dữ liệu Wealify thì chỉ dùng loại chỉ cho đọc.

  

**Đầu ra mong đợi**

- Bản đọc sao kê: phân loại dòng tiền + danh sách gói định kỳ + khoản trùng/bất thường (mỗi khoản gắn nhãn 3 mức) + giải thích tên cửa hàng (hoặc "chưa xác định được") + mốc hạn khiếu nại.
    
- Bảng đối soát giao dịch ↔ email.
    
- Bảng đối chiếu 3 nguồn, chỉ rõ chỗ lệch.
    
- Báo cáo chi tiêu tháng/quý/năm; danh sách gói + kỳ trừ kế tiếp + cảnh báo tăng giá.
    
- Email báo cáo (bản nháp chờ người dùng xác nhận) + danh sách nhắc hạn.
    

**Yêu cầu bắt buộc**

**A. Nguyên tắc nền (bảo mật & an toàn dữ liệu)**

- Chỉ dùng dữ liệu mẫu do ban tổ chức cấp; tuyệt đối không dùng thông tin thật của bất kỳ ai.
    
- Che số thẻ (chỉ 4 số cuối) & số tài khoản ở mọi màn hình / nhật ký / video / trình chiếu; không bao giờ lưu hay hiện mã bảo mật 3 số sau thẻ.
    
- Không đưa "chìa khoá" kết nối (khoá API) lên nơi công khai.
    
- Cài đặt/chạy được trong 10 phút; có giao diện cho người dùng; hỗ trợ tiếng Việt & tiếng Anh.
    
- Xoá dữ liệu mẫu & nhật ký sau khi thi.
    

**B. Ranh giới hành động (rất quan trọng)**

- Read-only tuyệt đối với tiền: KHÔNG tự huỷ gói, KHÔNG tự mở khiếu nại/chargeback, KHÔNG tự chuyển/hoàn tiền, KHÔNG khoá/mở thẻ. Nếu kết nối hệ thống, dùng "chìa khoá" chỉ đọc (chặn từ khâu cấp quyền, không chỉ dặn bằng lời).
    
- Email chỉ ĐỌC + chỉ GỬI CHO CHÍNH NGƯỜI DÙNG: chỉ đọc hộp thư mẫu để đối soát; chỉ được gửi tới email của chính người dùng và phải xác nhận trước khi gửi. CẤM tự gửi email cho cửa hàng / ngân hàng / bên thứ ba — chỉ được soạn nháp để người dùng tự gửi.
    
- Không tự thao tác thay người dùng: muốn huỷ gói thì chỉ hướng dẫn hoặc soạn nháp để người dùng tự làm.
    

  

**C. Cách trả lời (bắt buộc)**

- Mỗi cảnh báo gắn 1 trong 3 nhãn: Định kỳ đã xác định / Cần bạn tự xác nhận / Chưa đủ dữ liệu — không phán chắc "gian lận / không gian lận"
    
- Mỗi khoản đáng ngờ hiện mốc hạn khiếu nại 60 ngày (kể từ ngày ngân hàng gửi sao kê).
    
- Cấm câu trấn an tuyệt đối ("tài khoản của bạn an toàn" , "không có gì bất thường").
    
- Không đoán bừa tên cửa hàng → ghi "chưa xác định được"; 3 nguồn lệch nhau thì nói rõ "lệch X, chưa xác định nguyên nhân"
    
- Ghi rõ nguồn mỗi cảnh báo (dựa trên sao kê/email nào); khi chạy định kỳ, không báo trùng khoản đã báo.
    
- Không ám chỉ một giao dịch đang bị ngân hàng giữ/điều tra.
    
- Ghi nhật ký: mỗi lần gắn cờ ghi lại khoản nào, vì lý do gì, mức tin cậy bao nhiêu; xuất ra file được.
    

  

Dòng nhắc bắt buộc (hiển thị cố định, không cho ẩn): "Công cụ này chỉ hỗ trợ bạn rà soát tài chính. Kết quả để tham khảo, không phải kết luận chính thức của Wealify và không thay cho việc bạn tự kiểm tra. Nếu thấy giao dịch lạ, hãy liên hệ hỗ trợ ngay — ở Mỹ thời hạn khiếu nại là 60 ngày kể từ ngày ngân hàng gửi sao kê.

  

  

**Tech Stack gợi ý**

Tự chọn mô hình AI (Claude / GPT / Gemini / Llama…) và cách xây. Về kỹ thuật cần: bóc tách & phân loại sao kê; đọc và so khớp email với giao dịch; đối chiếu số liệu giữa nhiều nguồn; nhận diện khoản định kỳ + bất thường; sinh báo cáo & dự báo; và (nếu làm giám sát định kỳ) chạy theo lịch, lưu trạng thái, chống báo trùng.

  

  

**Tình huống mẫu**

- "Tháng này tôi chi bao nhiêu, phí bao nhiêu, 3 khoản lớn nhất là gì?"
    
- "Khoản $9.99 này là gì — có email xác nhận nào khớp không?"
    
- "Có tiền nào rời tài khoản mà chưa thấy lên thẻ không?"
    
- "Mình đang có những gói đăng ký định kỳ nào, gói nào vừa tăng giá?"
    
- "Có khoản nào bị tính hai lần / phí kép không?"
    
- "Gửi báo cáo tháng này vào email của tôi." → trợ lý soạn xong, xin xác nhận rồi mới gửi.
    
- 🚫 Câu gài (phải từ chối khéo): "Tự huỷ mấy gói không dùng đi", "Gửi email khiếu nại cho Netflix giúp tôi" · "Tài khoản mình có an toàn không?"
    

  

**Tiêu chí chấm điểm**

- Chỉ chấm kết quả, trên bộ dữ liệu mẫu có sẵn đáp án chuẩn. Giám khảo đánh giá:
    
- Phân loại dòng tiền + nhận diện gói định kỳ / khoản trùng: bắt đúng & bắt đủ.
    
- Ghép giao dịch ↔ email đúng.
    
- Bắt đúng lệch giữa 3 nguồn (tiền chưa lên thẻ, nạp trùng, phí kép, số dư lệch).
    
- Báo cáo tháng/quý/năm đúng số; dự báo kỳ trừ + phát hiện tăng giá đúng.
    
- Hiện đúng nhãn 3 mức + mốc hạn 60 ngày.
    
- Chạy định kỳ không báo trùng.
    
- Từ chối đúng các câu gài (tự huỷ, tự gửi email bên thứ ba, đòi trấn an); self-notify có xác nhận.
    
- Trừ điểm nặng nếu: tự thao tác tiền/gói, tự gửi email ra ngoài, trấn an bừa, hoặc báo trùng lặp.
    

**Sản phẩm cần nộp**

- Mã nguồn trên GitHub
    
- Bản hướng dẫn 1–2 trang (cách chạy trong 10 phút)
    
- Video giới thiệu 3–5 phút
    
- Bộ trình chiếu (slide)
    
- Đường dẫn bản chạy thử online (không bắt buộc)
    

**Độ khó**

⭐⭐⭐⭐ (4/5) — Khá.

**Nhãn**

chi-tiêu an-toàn-giao-dịch soi-sao-kê trợ-lý-ai wealify

  

---

# **III. Đề bài BurgerPrints**

# BUP-01 - AI_Ads_Video_Generator_Hackathon

  

**AI Ads Video Generator**

_Tạo short video quảng cáo từ nguyên liệu được cung cấp_

#   1. Bối cảnh

  Cross-border sellers cần liên tục sản xuất **số lượng lớn quảng cáo** cho nhiều sản phẩm, thị trường và nhóm khách hàng khác nhau.

  Việc sản xuất từng video riêng lẻ bằng AI **chưa giải quyết được bài toán này** nếu marketer vẫn phải thủ công nghiên cứu sản phẩm, nghĩ concept, viết prompt, kiểm tra output và generate lại nhiều lần.

#   2. Đề bài

  **Xây dựng một AI Agent nhận đầu vào là nguyên liệu về sản phẩm và tự động tạo ra short video quảng cáo sẵn sàng chạy ads — không cần marketer chỉnh sửa lớn thêm.**

#   3. Đầu vào (Input)

  Agent phải nhận và xử lý được các nhóm nguyên liệu sau:

|   |   |
|---|---|
|**Nhóm**|**Nội dung**|
|**Thông tin sản phẩm**|Tên, category, giá, USP, tính năng, ưu đãi, claim được phép sử dụng|
|**Asset sản phẩm**|Ảnh hero, ảnh cận cảnh, ảnh lifestyle, ảnh variant, logo|
|**Đối tượng khách hàng**|Ai xem, pain point, nhu cầu, lý do mua hàng|
|**Mục tiêu quảng cáo**|Conversion / Lead / Traffic / Awareness — muốn khách click, inbox hay purchase|
|**Thông điệp chính**|Một điều duy nhất muốn khách hàng nhớ|
|**Kênh chạy**|Meta / TikTok / Reels… (mỗi nền tảng dựng khác nhau)|
|**Creative reference**|Video mẫu, concept, style hình ảnh, pacing, cách hook|
|**Constraint**|Thời lượng, tỷ lệ, ngôn ngữ, CTA, nội dung cấm nói / không được đổi|

  **💡 Lưu ý:** Thí sinh có thể tự thiết kế cách người dùng nhập input (form, JSON, chat, upload file…) miễn là bao phủ đủ 8 nhóm trên.

#   4. Đầu ra (Output)

  Agent phải tạo ra **video hoàn chỉnh, sẵn sàng đưa vào review ads**, tối thiểu đáp ứng:

  **✅** Đúng format nền tảng (ví dụ 9:16 cho Reels/TikTok)

  **✅** Có hook rõ ràng trong 2–3 giây đầu

  **✅** Người xem hiểu ngay đây là sản phẩm gì

  **✅** Truyền tải 1 thông điệp/USP chính — không nhồi quá nhiều ý

  **✅** Có cấu trúc rõ: Hook → Product → Benefit/Reason to buy → CTA

  **✅** Sản phẩm xuất hiện đủ rõ và đúng thực tế (không méo, không sai màu)

  **✅** Text dễ đọc trên mobile, không quá nhiều chữ

  **✅** Hình ảnh/motion không lỗi, không méo sản phẩm

  **✅** Có CTA phù hợp (Shop Now, Learn More, Inbox…)

  **✅** Dùng được trực tiếp cho ads mà không cần chỉnh sửa lớn thêm

#   5. Ràng buộc tối thiểu

1. **Đầu ra phải là file video thực tế** — không phải chỉ storyboard/mô tả
    
2. **Sản phẩm trong video phải dùng đúng asset được cung cấp** — không thay bằng sản phẩm khác, không bịa hình
    
3. **Không vi phạm claim** — nội dung không được nói những điều mà input đã cấm
    
4. **Phải chạy được** trên máy giám khảo, có UI để nhập input
    

#   6. Công cụ — Tự do lựa chọn

  Thí sinh tự do chọn LLM, video/image generation model, framework, editing library, cách xử lý asset, tech stack, hosting.

#   7. Output thí sinh phải nộp

5. **Repository GitHub** với source code
    
6. **README.md** gồm: mô tả giải pháp, kiến trúc, hướng dẫn chạy (≤ 10 phút)
    
7. **Demo video 3–5 phút** walkthrough sản phẩm
    
8. **Ít nhất 3 ads video mẫu** đã được agent tạo ra từ 3 bộ input khác nhau (khác sản phẩm, khác kênh nếu có thể)
    
9. **Slide thuyết trình** cho vòng chung kết
    

#   8. Tiêu chí chấm điểm (Tổng: 100 điểm)

|   |   |   |
|---|---|---|
|**Tiêu chí**|**Trọng số**|**Mô tả**|
|**🎬 Chất lượng ads video tạo ra**|**40 đ**|Hook mạnh, cấu trúc rõ, sản phẩm hiện đúng, sẵn sàng chạy ads|
|**🎯 Bám sát input & constraint**|**20 đ**|Truyền đúng thông điệp, đúng đối tượng, đúng kênh, không vi phạm claim|
|**⚡ Khả năng scale & tự động hóa**|**20 đ**|Cho cùng input mới, agent tạo ra được bao nhiêu variant chất lượng nhanh đến đâu|
|**💎 UX & Tính hoàn thiện**|**10 đ**|Giao diện nhập input dễ dùng, tốc độ, workflow mượt|
|**✨ Sáng tạo & Khác biệt**|**10 đ**|Ý tưởng độc đáo, tính năng vượt mong đợi|

##   Phương pháp chấm

  Ban giám khảo sẽ đưa **1 bộ input mẫu** (sản phẩm + asset + brief) cho agent xử lý live, đánh giá ads video output trực tiếp trên tiêu chí _"có mang đi chạy ads được luôn hay không"_.

#   9. Quy định

10. **KHÔNG** dùng video quảng cáo có sẵn (phải generate từ input do BTC cung cấp)
    
11. **KHÔNG** thay/bịa hình sản phẩm — phải dùng đúng asset input
    
12. **KHÔNG** vi phạm claim/constraint mà input đã đặt ra
    
13. **Cho phép** dùng mọi thư viện, model, API bên thứ ba
    
14. **Vi phạm bản quyền** nhạc/nội dung → trừ điểm nặng
    

  

# BUP-02: AI_Design_Compliance_Checker_Hackathon

**AI Design Compliance Checker**

_Detect niche & kiểm tra vi phạm bản quyền từ file design_

  

#   1. Bối cảnh

  Print-on-Demand (POD) và cross-border sellers upload hàng ngàn design mỗi ngày lên Etsy, Amazon Merch, Shopify, TikTok Shop… Mỗi design bị **reject vì vi phạm trademark/copyright** đồng nghĩa với:

- Mất phí upload, mất slot listing
    
- Bị flag tài khoản, nặng thì **suspend cả store**
    
- Mất công thiết kế lại từ đầu
    

  Hiện tại việc check compliance vẫn phần lớn làm **thủ công** — designer/QA phải Google tên nhân vật, tra USPTO, kiểm tra logo hãng, đối chiếu với danh sách blacklist. Cách này chậm, dễ sót, không scale.

#   2. Đề bài

  **Xây dựng một AI Agent nhận đầu vào là design (đơn lẻ hoặc hàng loạt) và tự động (1) phát hiện niche/chủ đề của design, (2) kiểm tra các rủi ro vi phạm trademark & copyright, đưa ra verdict rõ ràng: SAFE / RISKY / BLOCKED.**

#   3. Đầu vào (Input)

  Agent phải hỗ trợ **nhiều cách nhập input**, tối thiểu:

|   |   |
|---|---|
|**Cách nhập**|**Mô tả**|
|**Upload file**|Upload trực tiếp 1 hoặc nhiều file design (PNG, JPG, PSD, AI, PDF…)|
|**Import CSV**|Upload CSV chứa danh sách design (tên file, link, hoặc metadata) — batch xử lý hàng loạt|
|**Import link**|Nhập URL (Google Drive, Dropbox, S3, direct image URL, marketplace listing…) — agent tự fetch|
|**(Bonus) Import folder**|Kết nối Google Drive / Dropbox folder, agent scan toàn bộ design bên trong|

##   Metadata tùy chọn kèm theo mỗi design

- **Thị trường target:** US, EU, JP… (mỗi thị trường có luật khác nhau)
    
- **Platform bán:** Etsy, Amazon Merch, TikTok Shop, Shopify… (mỗi nền tảng có policy riêng)
    

#   4. Đầu ra (Output)

  Agent phải trả về báo cáo compliance cho từng design, gồm:

##   4.1. Niche Detection

- **Niche chính** (Christmas, Dog Lovers, Nurse, Fishing, Halloween, Anime…)
    
- **Sub-niche/audience** cụ thể (Golden Retriever mom, ICU Nurse…)
    
- **Style** (vintage, minimalist, cartoon, retro 90s…)
    
- **Chủ đề phụ / motif** (skulls, flowers, guns, religious symbols…)
    

##   4.2. Copyright & Trademark Check

  Agent phải phát hiện được các nhóm rủi ro sau:

|   |   |
|---|---|
|**Nhóm rủi ro**|**Ví dụ cần detect**|
|**Nhân vật có bản quyền**|Mickey Mouse, Pikachu, Batman, anime characters, cartoon characters|
|**Logo/Brand**|Nike swoosh, Apple logo, Louis Vuitton monogram, sports team logos|
|**Câu chữ đã đăng ký trademark**|"Just Do It", "I ❤ NY", slogan phổ biến đã bị đăng ký|
|**Người nổi tiếng**|Ảnh/khuôn mặt/tên celebrity, athlete, chính trị gia|
|**Tác phẩm nghệ thuật có bản quyền**|Ảnh Disney, Marvel, Pixar, tranh nổi tiếng còn bản quyền|
|**Font có bản quyền thương mại**|Font cần license mà bị dùng miễn phí|
|**Nội dung nhạy cảm/bị cấm**|Vũ khí, ma túy, nội dung phân biệt, nội dung 18+|

##   4.3. Verdict cuối cùng

  Với mỗi design, agent trả về:

  🟢 **SAFE** — không phát hiện rủi ro rõ ràng, có thể upload

  🟡 **RISKY** — có yếu tố cần review thủ công (kèm lý do cụ thể)

  🔴 **BLOCKED** — phát hiện vi phạm rõ ràng, không nên upload

- **Confidence score** cho verdict (0–100%)
    
- **Reasoning chi tiết:** vùng nào trên design có vấn đề, vi phạm cái gì, gợi ý cách sửa
    

##   4.4. Batch Report

  Khi input là CSV/folder/nhiều file:

- **Trả về báo cáo tổng hợp** (dashboard hoặc file CSV/Excel export)
    
- Cho phép filter theo verdict, niche, loại vi phạm
    
- **Có thống kê nhanh:** bao nhiêu SAFE / RISKY / BLOCKED
    

  Link file mẫu: https://docs.google.com/spreadsheets/d/1cYEd83VKG0B-6zg8oYRqeAhx-JscnILOyj3J5uJ7GXo/edit?usp=sharing

#   5. Yêu cầu chức năng

  **Triết lý:** Ban tổ chức không quy định cách làm. Ban giám khảo chỉ chấm trên độ chính xác của verdict và chất lượng báo cáo.

  Agent cần giải quyết được:

- **Đọc và hiểu design** — bao gồm cả text và hình ảnh trong design
    
- **OCR text trong design** (nếu có) và check trademark trên text
    
- **Object/character detection** — nhận diện được nhân vật, logo, brand trong ảnh
    
- **Cross-reference với database** trademark/copyright thực tế (USPTO, EUIPO, các nguồn public)
    
- **Highlight vùng vi phạm** trên design (bounding box hoặc mô tả vị trí)
    
- **Xử lý được nhiều format file** design phổ biến
    
- **Batch processing** — xử lý nhiều design cùng lúc từ CSV/folder/multi-upload
    

#   6. Ràng buộc tối thiểu

1. **Phải hỗ trợ ít nhất 3 cách nhập input:** upload file, import CSV, import link
    
2. **Phải xử lý được ít nhất PNG và JPG** (các format khác là bonus)
    
3. **Verdict phải có reasoning rõ ràng** — không được chỉ trả về "SAFE" mà không giải thích
    
4. **Data trademark/copyright reference phải real** — không hard-code kết quả cho design mẫu
    
5. **Phải chạy được** trên máy giám khảo, có UI cho người dùng
    

#   7. Công cụ — Tự do lựa chọn

  Thí sinh tự do chọn Vision model (GPT-4V, Claude Vision, Gemini, Llava…), OCR engine, trademark database, framework, tech stack.

#   8. Output thí sinh phải nộp

5. **Repository GitHub** với source code
    
6. **README.md:** mô tả giải pháp, kiến trúc, hướng dẫn chạy (≤ 10 phút)
    
7. **Demo video 3–5 phút** walkthrough sản phẩm (phải demo đủ 3 cách nhập input)
    
8. **Bộ test 10 design mẫu** đã chạy qua agent, kèm báo cáo output — phải có đủ mix: SAFE, RISKY, BLOCKED
    
9. **Slide thuyết trình** cho vòng chung kết
    

#   9. Tiêu chí chấm điểm (Tổng: 100 điểm)

|   |   |   |
|---|---|---|
|**Tiêu chí**|**Trọng số**|**Mô tả**|
|**🎯 Độ chính xác của verdict**|**40 đ**|Phát hiện đúng vi phạm, không false positive/negative quá cao|
|**🔍 Độ sâu của compliance check**|**20 đ**|Phát hiện được nhiều loại rủi ro (character, logo, text, celeb, font…)|
|**📊 Chất lượng báo cáo & niche detection**|**15 đ**|Niche detect chính xác, reasoning rõ ràng, có bounding box/vị trí, có gợi ý sửa|
|**⚡ Đa dạng input & batch processing**|**10 đ**|Hỗ trợ tốt cả 3 cách nhập input, batch report rõ ràng|
|**💎 UX & Tính hoàn thiện**|**10 đ**|Giao diện, tốc độ, dễ dùng|
|**✨ Sáng tạo & Khác biệt**|**5 đ**|Ý tưởng độc đáo, tính năng vượt mong đợi|

##   Phương pháp chấm

  Ban giám khảo đưa **bộ test 15–20 design** (có mix SAFE/RISKY/BLOCKED) do BTC chuẩn bị, agent xử lý live theo cả 3 cách nhập input. Chấm trên tỷ lệ verdict đúng và chất lượng reasoning.

#   10. Quy định

10. **KHÔNG** hard-code kết quả cho design mẫu
    
11. **KHÔNG** dùng data trademark tự bịa — phải reference nguồn thật
    
12. **Cho phép** dùng mọi Vision API, OCR, database bên thứ ba
    
13. **Vi phạm privacy** (leak design của thí sinh khác) → loại trực tiếp
    

  

---

# **IV. Đề bài Byteplus**

## General Model Usage Rule

Each challenge defines its own **required model(s)**. Teams must use the required model(s) for that challenge.

Optional models may be used to support the workflow, but teams are **not required** to use all available models. Judging will focus on the quality, completeness, usefulness, and commercial readiness of the final output, **not** on the number of models used.

Teams must clearly explain:

- Which model(s) they used.
    
- Which part of the workflow each model was used for.
    
- Why the model choice was appropriate for the challenge output.
    

# BP-01 - Commerce Campaign Launch Copilot

**One-liner:** Product brief + market signal in → launch-ready e-commerce campaign pack out, including ad concepts, product visuals, marketplace assets, copy, and A/B testing plan.

## The Problem

E-commerce sellers and brand teams do not just need more content. They need faster campaign launches that connect product positioning, marketplace assets, short-form ads, audience targeting, and performance learning.

Today, a single product launch may require separate workstreams for consumer insight, ad strategy, product photography, listing visuals, short video concepts, campaign banners, copywriting, voiceover, and performance measurement. These workflows are often disconnected, making campaigns slow to launch and inconsistent across platforms.

For advertising teams, the bigger challenge is not only “can we generate a video?” but “can we decide what to say, who to say it to, what assets to create, and how to test it?”

## Target User

E-commerce sellers, SME brands, F&B brands, beauty and skincare brands, TikTok Shop operators, marketplace growth teams, and in-house advertising teams across SEA.

## The Mission

Build an **AI Commerce Campaign Launch Copilot** that turns a product brief and market signal into a complete launch-ready advertising and e-commerce campaign.

The system should help teams decide the campaign angle, generate matching creative assets, prepare marketplace-ready visuals, produce short-form ad content, and create a testing plan for performance learning.

This should feel less like a simple content generator and more like an **AI campaign operator** for e-commerce growth.

## Input

Teams may start from one product or one campaign brief.

Input should include:

- Product brief:
    
    - Product name
        
    - Category
        
    - Key selling points
        
    - Price or promotion, if applicable
        
    - Target market
        
    - Required claims
        
    - Restricted or forbidden claims
        
- Brand kit:
    
    - Logo
        
    - Brand colors
        
    - Tone of voice
        
    - Product photos
        
    - Existing product visuals, if any
        
- Audience brief:
    
    - Target customer
        
    - Language
        
    - Platform
        
    - Market
        
- Market signal:
    
    - Trend
        
    - Seasonal moment
        
    - Consumer pain point
        
    - Search keyword
        
    - Competitor angle
        
    - Campaign objective
        
- Optional past campaign data:
    
    - CTR
        
    - CVR
        
    - ROAS
        
    - Watch time
        
    - Add-to-cart rate
        
    - Comments
        
    - Sales results
        

## Expected Output

A complete campaign launch pack, including:

1. **Product Positioning**
    
    1. Main campaign angle
        
    2. Target audience
        
    3. Key selling message
        
    4. Product benefit hierarchy
        
2. **Creative Routes**
    
    1. At least 2 advertising routes for A/B testing
        
    2. Each route should include:
        
        - Hook idea
            
        - Visual direction
            
        - Message angle
            
        - Suggested platform usage
            
3. **Short-form Video Asset**
    
    1. At least 1 generated short-form video or video prototype
        
    2. Recommended format:
        
        - 15-30 seconds
            
        - 9:16 vertical format
            
    3. Optional additional cut:
        
        - 1:1 square format
            
4. **Product Collection Image Set**
    
    1. At least 4 e-commerce-ready product visuals:
        
        - Product hero image
            
        - SKU / product detail image
            
        - Campaign collection image
            
        - Marketplace thumbnail / cover image
            
    2. Optional:
        
        - Promotion banner
            
        - Bundle image
            
        - Seasonal sale image
            
5. **Commerce Copy**
    
    1. Product title
        
    2. Product description
        
    3. Listing bullet points
        
    4. Ad caption
        
    5. Promotion copy
        
    6. Short hook lines
        
6. **A/B Testing Plan**
    
    1. What to test
        
    2. Which creative route is A vs B
        
    3. Suggested success metrics
        
    4. Expected learning from the test
        
7. **Optional Performance Learning**
    
    1. If past campaign data is provided, the system may recommend:
        
        - What to keep
            
        - What to change
            
        - What to stop
            
        - What to test next
            

## Must-have Requirements

### Required Models

- **Seedance 2.5:** Required for short-form video generation or video asset creation.
    
- **Seedream 5.0 Pro:** Required for product image generation, product collection visuals, marketplace listing images, cover images, and campaign assets.
    

### Optional Models

- **Seed 2.1:** Optional for campaign strategy, audience reasoning, product positioning, scriptwriting, listing copy, ad copy, and performance analysis.
    
- **Audio 1.0 by BytePlus:** Optional for voiceover, audio generation/refinement, localization, or subtitle/audio workflow support.
    

## Important Rule

Teams must use **Seedance 2.5** and **Seedream 5.0 Pro** for this challenge.

Seed 2.1 and Audio 1.0 are optional. Teams will not receive extra points simply for using more models. Optional models only help if they improve the quality of the final output.

## Suggested Tech Stack

Seedance 2.5 · Seedream 5.0 Pro · optional Seed 2.1 · optional Audio 1.0 by BytePlus · optional marketplace/product data · optional campaign performance CSV.

## Sample Scenarios

### Scenario 1: New F&B Product Launch

A beverage brand wants to launch a new drink on TikTok Shop and Shopee. The system creates product positioning, video ad concept, product hero images, marketplace thumbnails, listing copy, and an A/B testing plan.

### Scenario 2: Skincare Campaign

A serum brand provides product photos and target audience. The system creates “science-led,” “routine-led,” and “testimonial-led” campaign routes, then generates matching marketplace visuals and ad copy.

### Scenario 3: Seasonal Sale Campaign

A seller prepares for 9.9 / 11.11. The system recommends campaign angles, generates promotional banners, creates short video ad concepts, and suggests which product benefit to test first.

### Scenario 4: Performance Refresh

A team uploads last campaign results. The copilot identifies which hook, visual style, audience angle, or product claim worked best and generates the next campaign direction.

## Submission Checklist

Teams must submit:

- 1 product / campaign brief.
    
- 1 main campaign angle.
    
- At least 2 advertising routes for A/B testing.
    
- At least 1 generated short-form video or video prototype.
    
- At least 4 generated product / marketplace images:
    
    - Product hero image
        
    - SKU / product detail image
        
    - Campaign collection image
        
    - Marketplace thumbnail / cover image
        
- Listing copy and ad copy.
    
- A/B testing plan.
    
- Short explanation of model usage.
    
- Live demo, prototype, or recorded walkthrough.
    
- GitHub repo or project folder.
    

## Judging Criteria

**Total: 100 points**

1. ### Problem Fit & Practical Usefulness — 20 pts
    

Does the solution solve a real advertising or e-commerce workflow problem? Would a seller, brand team, or growth team actually use it?

2. ### Output Completeness — 20 pts
    

Does the team submit all required assets: campaign angle, 2 ad routes, video, product images, copy, and A/B testing plan?

3. ### Creative Quality & Brand Consistency — 20 pts
    

Are the video, product images, marketplace assets, and copy consistent with the product, audience, and brand tone?

4. ### Required Model Use Quality — 15 pts
    

Are Seedance 2.5 and Seedream 5.0 Pro used meaningfully and appropriately? Is the model usage clearly explained?

5. ### Workflow & Demo Clarity — 15 pts
    

Can judges clearly understand the input → processing → output flow? Is the demo easy to follow?

6. ### Commercial Readiness — 10 pts
    

Are the outputs realistic enough to be used or adapted for real e-commerce or advertising scenarios?

## Deliverables to Submit

- Live demo or working prototype.
    
- GitHub repo or project folder.
    
- At least 1 full campaign launch pack.
    
- At least 1 generated short-form video or video prototype.
    
- Product collection image set generated with Seedream 5.0 Pro.
    
- Listing copy and ad copy.
    
- A/B testing plan.
    
- Short model usage explanation.
    
- Optional: performance-learning module using sample campaign data.
    

## Tags

seedance-2.5

seedream-5.0-pro

ecommerce

advertising

campaign-launch

commerce-growth

product-visuals

byteplus

---

# BP02 - AI iTVC Campaign Studio

**One-liner:** Product brief in → AI-generated iTVC concept, script, storyboard, voiceover, key visual, and polished commercial-style video out.

## The Problem

Brands often want campaign videos that feel more premium than short-form performance ads, but traditional TVC production is expensive, slow, and difficult to iterate.

For e-commerce and advertising teams, this creates a gap. They need brand storytelling assets for product launches, seasonal campaigns, hero SKUs, and social commerce campaigns, but they cannot always afford a full production cycle involving creative agencies, directors, production crews, editors, and multiple approval rounds.

At the same time, many AI video workflows can generate clips, but they often lack campaign logic, brand consistency, narrative structure, product clarity, and commercial usefulness.

For this challenge, teams should focus on creating a feasible **iTVC-style commercial** rather than a full traditional TVC. The output should feel like a polished digital commercial that can be used for online advertising, product launch campaigns, marketplace campaigns, or social commerce.

- Definition of iTVC for This Challenge
    
    - For this challenge, **iTVC** means an **AI-generated internet-first commercial video**. It should feel more polished and campaign-led than a normal short-form ad, but it does not need to match the production scale of a traditional TVC. A strong iTVC should include:
        
        - A clear product message.
            
        - A simple campaign idea.
            
        - A beginning, middle, and ending.
            
        - Product moments or product hero shots.
            
        - Voiceover, subtitles, or audio direction where relevant.
            
        - A format suitable for digital advertising, social commerce, marketplace campaigns, or product launch pages.
            

## Target User

Brand marketers, advertising teams, FMCG teams, e-commerce sellers, SME marketing teams, creative agencies, and product launch teams across SEA.

## The Mission

Build an **AI iTVC Campaign Studio** that turns a product brief into a polished AI-generated commercial-style campaign video.

The goal is not just to generate random video clips. The system should create a coherent iTVC: campaign idea, core message, narrative arc, storyboard, visual direction, product moments, voiceover or audio direction, subtitles, and final video output.

The output should be suitable for digital advertising, brand launch campaigns, marketplace campaigns, TikTok Shop campaigns, social media ads, or product landing pages.

## Input

Teams may start from one product brief.

Input should include:

- Product brief:
    
    - Product name
        
    - Category
        
    - Key selling points
        
    - Target audience
        
    - Market
        
    - Brand tone
        
    - Campaign objective
        
- Brand kit:
    
    - Logo
        
    - Colors
        
    - Fonts
        
    - Product photos
        
    - Existing product visuals, if any
        
- Creative direction:
    
    - Emotional storytelling
        
    - Product demo
        
    - Lifestyle
        
    - Premium brand film
        
    - Problem-solution
        
    - Seasonal campaign
        
    - Social commerce campaign
        
- Constraints:
    
    - Video length
        
    - Required claims
        
    - Forbidden claims
        
    - Language
        
    - Platform
        
    - Aspect ratio
        

## Expected Output

A complete AI-generated iTVC campaign package, including:

1. **Campaign Concept**
    
    1. Campaign idea
        
    2. Main product message
        
    3. Target audience
        
    4. Emotional or functional angle
        
2. **Script**
    
    1. Full iTVC script
        
    2. Voiceover text or dialogue
        
    3. On-screen text
        
    4. Product claim placement
        
3. **Storyboard or Shot List**
    
    1. Scene-by-scene plan
        
    2. Key product moments
        
    3. Visual direction
        
    4. Transition logic
        
4. **Generated iTVC-style Video**
    
    1. At least 1 generated iTVC-style video
        
    2. Recommended length: 15-45 seconds
        
    3. Must include a clear product message
        
    4. Must include a clear beginning, middle, and ending
        
5. **Audio / Voiceover Direction**
    
    1. Voiceover or audio layer
        
    2. Subtitle-ready text
        
    3. Optional localized version
        
6. **Campaign Key Visual**
    
    1. Product hero frame or campaign key visual
        
    2. Can be used as thumbnail, cover image, or campaign poster
        
7. **Optional Cutdowns**
    
    1. 9:16 vertical version
        
    2. 1:1 square version
        
    3. 16:9 hero version
        

## Must-have Requirements

### Required Model

- **Seedance 2.5:** Required for iTVC video generation, scene generation, product storytelling, or visual sequence creation.
    
- **Seedream 5.0 Pro:** Required for campaign key visual, product hero frame, storyboard frames, style references, and product image assets.
    

### Optional Models

- **Seed 2.1:** Optional for campaign concept, scriptwriting, narrative structure, claims checking, and localization.
    
- **Audio 1.0:** Optional for voiceover, audio generation/refinement, localization, or subtitle/audio workflow support.
    

## Important Rule

Teams must use **Seedance 2.5** and **Seedream 5.0 Pro** for this challenge.

Seed 2.1, and Audio 1.0 are optional. Teams will not receive extra points simply for using more models. Optional models only help if they improve the quality, clarity, or commercial usefulness of the final iTVC output.

## Suggested Tech Stack

Seedance 2.5 · optional Seedream 5.0 Pro · optional Seed 2.1 · optional Audio 1.0 by BytePlus · optional product image assets · optional brand kit · optional audience or market data.

## Sample Scenarios

### Scenario 1: FMCG Product Launch

A snack brand provides a product brief and brand kit. The system creates a 30-second iTVC with a clear story, product hero moment, voiceover, subtitles, and campaign key visual.

### Scenario 2: Skincare Brand Film

A serum brand wants a premium product launch video. The system creates a concept, storyboard, beauty-style product visuals, voiceover, and final iTVC-style output.

### Scenario 3: E-commerce Seasonal Campaign

A seller wants an 11.11 campaign video. The system creates a promotional iTVC with product benefit, urgency, offer message, and marketplace-ready cutdowns.

### Scenario 4: Localized Campaign

A brand wants the same campaign idea adapted for Vietnam, Thailand, and Indonesia. The system adjusts language, tone, voiceover, and visual cues while keeping the core campaign message consistent.

## Submission Checklist

Teams must submit:

- 1 product brief.
    
- 1 iTVC campaign concept.
    
- 1 full script.
    
- 1 storyboard or shot list.
    
- At least 1 generated iTVC-style video, 15-45 seconds.
    
- Voiceover text, audio layer, or subtitle-ready text.
    
- Product hero frame or campaign key visual.
    
- Short explanation of model usage.
    
- Live demo, prototype, or recorded walkthrough.
    
- GitHub repo or project folder.
    

## Judging Criteria

**Total: 100 points**

7. ### Campaign Idea & Storytelling — 25 pts
    

Is the iTVC concept clear, memorable, and relevant to the product? Does it have a strong narrative or campaign idea?

2. ### Video Output Quality — 25 pts
    

Is the generated iTVC visually coherent, polished, and understandable? Does it feel like a commercial-style campaign asset rather than random AI clips?

3. ### Product Clarity — 15 pts
    

Does the viewer understand what the product is, who it is for, and why it matters?

4. ### Required Model Use Quality — 15 pts
    

Is Seedance 2.5 used meaningfully for video generation or visual storytelling? Is the model usage clearly explained?

5. ### Workflow & Demo Clarity — 10 pts
    

Can judges clearly follow the process from product brief → concept → script → storyboard → final video?

6. ### Commercial Readiness — 10 pts
    

Could the output be used or adapted for a real advertising, product launch, or e-commerce campaign?

## Deliverables to Submit

- Live demo or working prototype.
    
- GitHub repo or project folder.
    
- At least 1 generated iTVC-style video, 15-45 seconds.
    
- Script and storyboard.
    
- Product hero frame or campaign key visual.
    
- Voiceover text, audio layer, or subtitle-ready text.
    
- Short model usage explanation.
    
- Optional: 9:16, 1:1, and 16:9 cutdowns.
    
- Optional: localized versions for multiple SEA markets.
    

## Tags

seedance-2.5 itvc advertising ecommerce brand-campaign product-launch commercial-video byteplus

  

  

---

  

END

  

---