# BỘ KHUNG THIẾT KẾ GIAO DIỆN (UI DESIGN FRAMEWORK & SPECIFICATION)
## Nền Tảng Quản Lý Sản Phẩm & AI Multi-Asset Campaign Generator

> [!NOTE]
> File tài liệu thiết kế UI gốc được lưu tại: [`docs/UI_DESIGN_FRAMEWORK.md`](file:///d:/Github/robomedia-core-platfrom/docs/UI_DESIGN_FRAMEWORK.md)

---

## 1. TỔNG QUAN HỆ THỐNG GIAO DIỆN (UI/UX ARCHITECTURE PHILOSOPHY)

Hệ thống giao diện được thiết kế theo phong cách **Modern Enterprise Dashboard / SaaS Studio Engine** (lấy cảm hứng từ layout tiêu chuẩn trong ảnh mẫu với thiết kế thẻ bo tròn mềm mại, hệ màu sáng tối giản, khoảng thở tối ưu và thanh điều hướng hai cấp).

### Các nguyên tắc cốt lõi:
1. **Quản lý đa dự án/sản phẩm tập trung (Multi-Project Workspace)**: Trang Workspace chính (`/workspace`) hiển thị danh sách các Dự án / Sản phẩm với 2 chế độ xem: **Dạng List (Mặc định)** hoặc **Dạng Card**, đi kèm tiêu đề, ảnh sản phẩm, mô tả và các chỉ số hoạt động.
2. **Màn hình Chi Tiết Sản Phẩm (Product Detail Studio)**: Khi chọn 1 sản phẩm, người dùng sẽ vào màn hình chi tiết với luồng 5 bước Sub-Tabs (sử dụng icon chuẩn từ thư viện Lucide React, không dùng icon social/emoji):
   - `<FileText /> Overview & Input`
   - `<Sparkles /> Content AI`
   - `<Image /> Image AI`
   - `<Video /> Video AI`
   - `<LayoutGrid /> Ads Preview Đa Kênh`
3. **Cơ chế Tạo Hàng Loạt (Batch Multi-Style Generation)**: Cho phép chọn đồng thời nhiều Phong cách Content, nhiều Template Ảnh & Video cùng lúc để AI sinh ra nhiều phương án chỉ trong 1 click.
4. **Trực quan hóa Ads Preview thời gian thực**: Trải nghiệm xem trước quảng cáo tương tác chuẩn theo giao diện thật của **Facebook Feed, Facebook Video, Facebook Reels, TikTok Feed, Instagram Story/Reels**.
