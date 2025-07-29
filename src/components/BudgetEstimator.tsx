import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import type { CampaignPlan } from '../types'

interface BudgetEstimatorProps {
  campaignPlan: CampaignPlan
  updateCampaignPlan: (updates: Partial<CampaignPlan>) => void
  onNext: () => void
  onPrev: () => void
  currentStep: number
  totalSteps: number
}

// Bảng giá cơ bản (VND)
const basePricing = {
  newspaper: { banner: 500000, 'pr-article': 800000 },
  'digital-news': { banner: 300000, 'pr-article': 500000 },
  tv: { video: 2000000, tvc: 5000000 },
  radio: { audio: 800000 },
  'social-media': { 'social-post': 400000, video: 1200000 }
}

export default function BudgetEstimator({
  campaignPlan,
  updateCampaignPlan,
  onNext,
  onPrev,
  currentStep,
  totalSteps
}: BudgetEstimatorProps) {
  const [estimatedCost, setEstimatedCost] = useState(0)
  const [budget, setBudget] = useState(campaignPlan.budget || 0)

  // Tính toán chi phí ước tính
  useEffect(() => {
    let totalCost = 0
    const selectedPlatforms = campaignPlan.platforms.filter(p => p.isSelected)
    const selectedAdTypes = campaignPlan.adTypes.filter(a => a.isSelected)

    selectedPlatforms.forEach(platform => {
      selectedAdTypes.forEach(adType => {
        const platformPricing = basePricing[platform.id as keyof typeof basePricing]
        if (platformPricing && platformPricing[adType.id as keyof typeof platformPricing]) {
          const basePrice = platformPricing[adType.id as keyof typeof platformPricing]
          const durationMultiplier = campaignPlan.duration / 30 // Chuẩn hóa theo tháng
          const frequencyMultiplier = campaignPlan.frequency
          totalCost += basePrice * durationMultiplier * frequencyMultiplier
        }
      })
    })

    setEstimatedCost(totalCost)
    updateCampaignPlan({ estimatedCost: totalCost })
  }, [campaignPlan.platforms, campaignPlan.adTypes, campaignPlan.duration, campaignPlan.frequency])

  const handleBudgetChange = (value: number) => {
    setBudget(value)
    updateCampaignPlan({ budget: value })
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount)
  }

  const canProceed = estimatedCost > 0

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Ước tính ngân sách
        </h2>
        <p className="text-lg text-gray-600">
          Xem chi phí ước tính dựa trên các lựa chọn của bạn
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Cost Breakdown */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-xl p-6 shadow-lg border"
        >
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            📊 Chi tiết chi phí
          </h3>
          
          {campaignPlan.platforms.filter(p => p.isSelected).length > 0 ? (
            <div className="space-y-4">
              {campaignPlan.platforms
                .filter(platform => platform.isSelected)
                .map(platform => (
                  <div key={platform.id} className="border-b pb-3">
                    <h4 className="font-medium text-gray-900 mb-2">
                      {platform.icon} {platform.name}
                    </h4>
                    {campaignPlan.adTypes
                      .filter(adType => adType.isSelected)
                      .map(adType => {
                        const platformPricing = basePricing[platform.id as keyof typeof basePricing]
                        const price = platformPricing?.[adType.id as keyof typeof platformPricing] || 0
                        const total = price * (campaignPlan.duration / 30) * campaignPlan.frequency
                        
                        return (
                          <div key={adType.id} className="ml-4 text-sm text-gray-600">
                            <div className="flex justify-between">
                              <span>• {adType.name}</span>
                              <span>{formatCurrency(total)}</span>
                            </div>
                          </div>
                        )
                      })}
                  </div>
                ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-8">
              Vui lòng chọn nền tảng và loại quảng cáo để xem chi phí
            </p>
          )}
        </motion.div>

        {/* Budget Summary */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-gradient-to-br from-green-50 to-blue-50 rounded-xl p-6 shadow-lg border"
        >
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            💰 Tổng chi phí ước tính
          </h3>
          
          <div className="text-center mb-6">
            <div className="text-4xl font-bold text-green-600 mb-2">
              {formatCurrency(estimatedCost)}
            </div>
            <p className="text-sm text-gray-600">
              Cho {campaignPlan.duration} ngày × {campaignPlan.frequency} lần/ngày
            </p>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span>Chi phí trung bình/ngày:</span>
              <span className="font-medium">
                {formatCurrency(estimatedCost / campaignPlan.duration)}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Chi phí trung bình/tuần:</span>
              <span className="font-medium">
                {formatCurrency((estimatedCost / campaignPlan.duration) * 7)}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Chi phí trung bình/tháng:</span>
              <span className="font-medium">
                {formatCurrency((estimatedCost / campaignPlan.duration) * 30)}
              </span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Budget Input */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl p-6 shadow-lg border mb-8"
      >
        <h3 className="text-xl font-semibold text-gray-900 mb-4">
          💡 Ngân sách dự kiến
        </h3>
        <div className="max-w-md mx-auto">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Ngân sách tối đa (VND)
          </label>
          <input
            type="number"
            value={budget}
            onChange={(e) => handleBudgetChange(parseInt(e.target.value) || 0)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Nhập ngân sách dự kiến"
          />
          {budget > 0 && (
            <div className="mt-2 text-sm">
              {budget >= estimatedCost ? (
                <span className="text-green-600">✅ Ngân sách đủ cho chiến dịch</span>
              ) : (
                <span className="text-orange-600">⚠️ Ngân sách thấp hơn chi phí ước tính</span>
              )}
            </div>
          )}
        </div>
      </motion.div>

      {/* Tips */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-blue-50 rounded-lg p-6 mb-8"
      >
        <h3 className="text-lg font-semibold text-blue-900 mb-3">
          💡 Lời khuyên về ngân sách
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-blue-800">
          <div>
            <strong>• Ngân sách nhỏ (dưới 5 triệu):</strong> Tập trung vào 1-2 nền tảng
          </div>
          <div>
            <strong>• Ngân sách trung bình (5-20 triệu):</strong> Kết hợp nhiều nền tảng
          </div>
          <div>
            <strong>• Ngân sách lớn (trên 20 triệu):</strong> Chiến dịch toàn diện
          </div>
          <div>
            <strong>• Tiết kiệm chi phí:</strong> Chọn thời gian dài, tần suất thấp
          </div>
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
          onClick={onNext}
          disabled={!canProceed}
          className={`px-8 py-3 rounded-lg font-medium transition-colors ${
            canProceed
              ? 'bg-green-600 text-white hover:bg-green-700'
              : 'bg-gray-100 text-gray-400 cursor-not-allowed'
          }`}
        >
          Tiếp tục
        </button>
      </div>
    </div>
  )
} 