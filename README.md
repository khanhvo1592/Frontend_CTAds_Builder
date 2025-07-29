# Cần Thơ Media Ads Builder

Ứng dụng web giúp khách hàng tạo kế hoạch quảng cáo chuyên nghiệp trên các nền tảng truyền thông tại Cần Thơ.

## 🚀 Tính năng chính

### 1. Chọn nền tảng quảng cáo
- ✅ Báo in
- ✅ Báo điện tử  
- ✅ Truyền hình Cần Thơ (TV Spot)
- ✅ Phát thanh FM
- ✅ Fanpage/Youtube (Media số)

### 2. Chọn loại hình quảng cáo
- Banner, bài PR, video, audio, TVC, bài đăng mạng xã hội

### 3. Tùy chỉnh thời lượng và tần suất
- Thiết lập thời gian chạy chiến dịch (1-365 ngày)
- Cấu hình tần suất xuất hiện quảng cáo (1-10 lần/ngày)

### 4. Định vị đối tượng mục tiêu
- Cư dân địa phương
- Chủ doanh nghiệp
- Chuyên gia trẻ
- Sinh viên
- Gia đình
- Người cao tuổi
- Người dùng công nghệ
- Người dùng truyền thông truyền thống

### 5. Ước tính ngân sách tự động
- Tính toán chi phí dựa trên bảng giá cơ bản
- Hiển thị chi tiết chi phí theo từng nền tảng và loại quảng cáo
- So sánh với ngân sách dự kiến

### 6. Xem trước kế hoạch
- Tóm tắt toàn bộ chiến dịch
- Form liên hệ để nhận báo giá chi tiết

## 🛠️ Công nghệ sử dụng

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Build Tool**: Vite
- **Package Manager**: npm

## 📦 Cài đặt và chạy

### Yêu cầu hệ thống
- Node.js 18+ 
- npm 9+

### Cài đặt dependencies
```bash
npm install
```

### Chạy ứng dụng ở môi trường development
```bash
npm run dev
```

### Build ứng dụng cho production
```bash
npm run build
```

### Preview build production
```bash
npm run preview
```

## 🎨 Giao diện

Ứng dụng có giao diện hiện đại với:
- **Responsive Design**: Tương thích với mọi thiết bị
- **Smooth Animations**: Chuyển động mượt mà với Framer Motion
- **Intuitive UX**: Trải nghiệm người dùng trực quan
- **Vietnamese Language**: Giao diện hoàn toàn bằng tiếng Việt

## 📱 Cấu trúc ứng dụng

```
src/
├── components/          # Các component chính
│   ├── PlatformSelector.tsx      # Chọn nền tảng
│   ├── AdTypeSelector.tsx        # Chọn loại quảng cáo
│   ├── DurationSelector.tsx      # Thời lượng & tần suất
│   ├── TargetAudienceSelector.tsx # Đối tượng mục tiêu
│   ├── BudgetEstimator.tsx       # Ước tính ngân sách
│   └── CampaignPreview.tsx       # Xem trước kế hoạch
├── types/              # TypeScript interfaces
│   └── index.ts
├── App.tsx             # Component chính
├── main.tsx            # Entry point
└── index.css           # Global styles
```

## 💰 Bảng giá tham khảo

| Nền tảng | Loại quảng cáo | Giá cơ bản (VND) |
|----------|----------------|------------------|
| Báo in | Banner | 500,000 |
| Báo in | Bài PR | 800,000 |
| Báo điện tử | Banner | 300,000 |
| Báo điện tử | Bài PR | 500,000 |
| Truyền hình | Video | 2,000,000 |
| Truyền hình | TVC | 5,000,000 |
| Phát thanh | Audio | 800,000 |
| Social Media | Bài đăng | 400,000 |
| Social Media | Video | 1,200,000 |

*Giá có thể thay đổi tùy theo thời lượng và tần suất quảng cáo*

## 🤝 Đóng góp

1. Fork repository
2. Tạo feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Tạo Pull Request

## 📄 License

Dự án này được phát triển cho Cần Thơ Media Ads Builder.

## 📞 Liên hệ

Để biết thêm thông tin về dịch vụ quảng cáo, vui lòng liên hệ:
- Email: info@canthomedia.com
- Phone: 0292-xxx-xxx
- Address: Cần Thơ, Việt Nam
