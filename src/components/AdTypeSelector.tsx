import { useState } from 'react'
import { motion } from 'framer-motion'
import type { AdType, CampaignPlan } from '../types'

interface AdTypeSelectorProps {
  campaignPlan: CampaignPlan
  updateCampaignPlan: (updates: Partial<CampaignPlan>) => void
  onNext: () => void
  onPrev: () => void
  currentStep: number
  totalSteps: number
}

const adTypes: AdType[] = [
  {
    id: 'banner',
    name: 'Banner quảng cáo',
    description: 'Quảng cáo dạng banner, poster, bảng hiệu',
    icon: '🖼️',
    isSelected: false
  },
  {
    id: 'pr-article',
    name: 'Bài PR',
    description: 'Bài viết giới thiệu, quảng bá sản phẩm/dịch vụ',
    icon: '📝',
    isSelected: false
  },
  {
    id: 'video',
    name: 'Video quảng cáo',
    description: 'Video clip quảng cáo ngắn (15-60 giây)',
    icon: '🎬',
    isSelected: false
  },
  {
    id: 'audio',
    name: 'Audio quảng cáo',
    description: 'Quảng cáo dạng âm thanh cho radio',
    icon: '🎵',
    isSelected: false
  },
  {
    id: 'tvc',
    name: 'TVC (TV Commercial)',
    description: 'Quảng cáo truyền hình chuyên nghiệp',
    icon: '📺',
    isSelected: false
  },
  {
    id: 'social-post',
    name: 'Bài đăng mạng xã hội',
    description: 'Nội dung quảng cáo trên Facebook, Instagram, Youtube',
    icon: '📱',
    isSelected: false
  }
]

export default function AdTypeSelector({
  campaignPlan,
  updateCampaignPlan,
  onNext,
  onPrev,
  currentStep,
  totalSteps
}: AdTypeSelectorProps) {
  const [selectedAdTypes, setSelectedAdTypes] = useState<AdType[]>(
    campaignPlan.adTypes.length > 0 ? campaignPlan.adTypes : adTypes
  )

  const handleAdTypeToggle = (adTypeId: string) => {
    const updatedAdTypes = selectedAdTypes.map(adType =>
      adType.id === adTypeId
        ? { ...adType, isSelected: !adType.isSelected }
        : adType
    )
    setSelectedAdTypes(updatedAdTypes)
    updateCampaignPlan({ adTypes: updatedAdTypes })
  }

  const canProceed = selectedAdTypes.some(adType => adType.isSelected)

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Chọn loại hình quảng cáo
        </h2>
        <p className="text-lg text-gray-600">
          Chọn một hoặc nhiều loại hình quảng cáo phù hợp với chiến dịch của bạn
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {adTypes.map((adType) => (
          <motion.div
            key={adType.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`relative cursor-pointer rounded-xl border-2 p-6 transition-all duration-200 ${
              adType.isSelected
                ? 'border-green-500 bg-green-50 shadow-lg'
                : 'border-gray-200 bg-white hover:border-gray-300'
            }`}
            onClick={() => handleAdTypeToggle(adType.id)}
          >
            <div className="flex items-center space-x-4">
              <div className="text-3xl">{adType.icon}</div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {adType.name}
                </h3>
                <p className="text-sm text-gray-600">
                  {adType.description}
                </p>
              </div>
              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                adType.isSelected
                  ? 'bg-green-500 border-green-500'
                  : 'border-gray-300'
              }`}>
                {adType.isSelected && (
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Selected Ad Types Summary */}
      {selectedAdTypes.some(at => at.isSelected) && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-green-50 rounded-lg p-6 mb-8"
        >
          <h3 className="text-lg font-semibold text-green-900 mb-3">
            Loại hình quảng cáo đã chọn:
          </h3>
          <div className="flex flex-wrap gap-2">
            {selectedAdTypes
              .filter(adType => adType.isSelected)
              .map(adType => (
                <span
                  key={adType.id}
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800"
                >
                  {adType.icon} {adType.name}
                </span>
              ))}
          </div>
        </motion.div>
      )}

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