import { useState } from 'react'
import { motion } from 'framer-motion'
import type { CampaignPlan } from '../types'

interface CampaignPreviewProps {
  campaignPlan: CampaignPlan
  updateCampaignPlan: (updates: Partial<CampaignPlan>) => void
  onNext: () => void
  onPrev: () => void
  currentStep: number
  totalSteps: number
}

export default function CampaignPreview({
  campaignPlan,
  updateCampaignPlan,
  onNext,
  onPrev,
  currentStep,
  totalSteps
}: CampaignPreviewProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount)
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    setIsSubmitting(false)
    setShowSuccess(true)
  }

  const selectedPlatforms = campaignPlan.platforms.filter(p => p.isSelected)
  const selectedAdTypes = campaignPlan.adTypes.filter(a => a.isSelected)
  const selectedAudiences = campaignPlan.targetAudience.filter(a => a.isSelected)

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Xem trước kế hoạch
        </h2>
        <p className="text-lg text-gray-600">
          Kiểm tra lại thông tin trước khi gửi yêu cầu báo giá chi tiết
        </p>
      </div>

      {showSuccess ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-green-50 rounded-xl p-8 text-center"
        >
          <div className="text-6xl mb-4">🎉</div>
          <h3 className="text-2xl font-bold text-green-900 mb-4">
            Yêu cầu đã được gửi thành công!
          </h3>
          <p className="text-green-700 mb-6">
            Chúng tôi sẽ liên hệ với bạn trong vòng 24 giờ để cung cấp báo giá chi tiết.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors"
          >
            Tạo kế hoạch mới
          </button>
        </motion.div>
      ) : (
        <>
          {/* Campaign Summary */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Left Column */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              {/* Platforms */}
              <div className="bg-white rounded-xl p-6 shadow-lg border">
                <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                  📱 Nền tảng quảng cáo
                </h3>
                <div className="space-y-2">
                  {selectedPlatforms.map(platform => (
                    <div key={platform.id} className="flex items-center space-x-3">
                      <span className="text-lg">{platform.icon}</span>
                      <span className="text-gray-700">{platform.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Ad Types */}
              <div className="bg-white rounded-xl p-6 shadow-lg border">
                <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                  🎯 Loại hình quảng cáo
                </h3>
                <div className="space-y-2">
                  {selectedAdTypes.map(adType => (
                    <div key={adType.id} className="flex items-center space-x-3">
                      <span className="text-lg">{adType.icon}</span>
                      <span className="text-gray-700">{adType.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Target Audience */}
              <div className="bg-white rounded-xl p-6 shadow-lg border">
                <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                  👥 Đối tượng mục tiêu
                </h3>
                <div className="space-y-2">
                  {selectedAudiences.map(audience => (
                    <div key={audience.id} className="text-gray-700">
                      • {audience.name}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Right Column */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              {/* Campaign Duration */}
              <div className="bg-white rounded-xl p-6 shadow-lg border">
                <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                  ⏱️ Thời gian chiến dịch
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Thời lượng:</span>
                    <span className="font-medium">{campaignPlan.duration} ngày</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tần suất:</span>
                    <span className="font-medium">{campaignPlan.frequency} lần/ngày</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tổng lần xuất hiện:</span>
                    <span className="font-medium">{campaignPlan.duration * campaignPlan.frequency} lần</span>
                  </div>
                </div>
              </div>

              {/* Budget Summary */}
              <div className="bg-gradient-to-br from-blue-50 to-green-50 rounded-xl p-6 shadow-lg border">
                <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                  💰 Chi phí ước tính
                </h3>
                <div className="text-center mb-4">
                  <div className="text-3xl font-bold text-green-600">
                    {formatCurrency(campaignPlan.estimatedCost)}
                  </div>
                  <p className="text-sm text-gray-600">Tổng chi phí dự kiến</p>
                </div>
                {campaignPlan.budget > 0 && (
                  <div className="text-center">
                    <div className="text-lg font-medium text-gray-700">
                      Ngân sách: {formatCurrency(campaignPlan.budget)}
                    </div>
                    <div className={`text-sm ${campaignPlan.budget >= campaignPlan.estimatedCost ? 'text-green-600' : 'text-orange-600'}`}>
                      {campaignPlan.budget >= campaignPlan.estimatedCost ? '✅ Đủ ngân sách' : '⚠️ Vượt ngân sách'}
                    </div>
                  </div>
                )}
              </div>

              {/* Campaign Highlights */}
              <div className="bg-white rounded-xl p-6 shadow-lg border">
                <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                  ✨ Điểm nổi bật
                </h3>
                <div className="space-y-2 text-sm text-gray-700">
                  <div>• Chiến dịch đa nền tảng</div>
                  <div>• Tiếp cận đối tượng mục tiêu đa dạng</div>
                  <div>• Tần suất phù hợp với ngân sách</div>
                  <div>• Thời gian chạy tối ưu</div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl p-6 shadow-lg border mb-8"
          >
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              📞 Thông tin liên hệ
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Họ và tên
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Nhập họ và tên"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Số điện thoại
                </label>
                <input
                  type="tel"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Nhập số điện thoại"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Nhập email"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tên công ty
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Nhập tên công ty"
                />
              </div>
            </div>
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Ghi chú thêm
              </label>
              <textarea
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Nhập thông tin bổ sung hoặc yêu cầu đặc biệt..."
              />
            </div>
          </motion.div>

          {/* Navigation Buttons */}
          <div className="flex justify-between items-center">
            <button
              onClick={onPrev}
              className="px-6 py-3 rounded-lg font-medium bg-gray-200 text-gray-700 hover:bg-gray-300 transition-colors"
            >
              Quay lại
            </button>

            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className={`px-8 py-3 rounded-lg font-medium transition-colors ${
                isSubmitting
                  ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              {isSubmitting ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Đang gửi...</span>
                </div>
              ) : (
                'Gửi yêu cầu báo giá'
              )}
            </button>
          </div>
        </>
      )}
    </div>
  )
} 