import { useState } from 'react'
import { motion } from 'framer-motion'
import type { Platform, CampaignPlan } from '../types'

interface PlatformSelectorProps {
  campaignPlan: CampaignPlan
  updateCampaignPlan: (updates: Partial<CampaignPlan>) => void
  onNext: () => void
  onPrev: () => void
  currentStep: number
  totalSteps: number
}

const platforms: Platform[] = [
  {
    id: 'newspaper',
    name: 'Báo in',
    description: 'Quảng cáo trên các ấn phẩm báo in truyền thống',
    icon: '📰',
    isSelected: false
  },
  {
    id: 'digital-news',
    name: 'Báo điện tử',
    description: 'Quảng cáo trên các trang báo điện tử và website tin tức',
    icon: '💻',
    isSelected: false
  },
  {
    id: 'tv',
    name: 'Truyền hình Cần Thơ',
    description: 'TV Spot trên kênh Truyền hình Cần Thơ',
    icon: '📺',
    isSelected: false
  },
  {
    id: 'radio',
    name: 'Phát thanh FM',
    description: 'Quảng cáo trên các đài phát thanh FM địa phương',
    icon: '📻',
    isSelected: false
  },
  {
    id: 'social-media',
    name: 'Fanpage/Youtube',
    description: 'Quảng cáo trên mạng xã hội và nền tảng video',
    icon: '📱',
    isSelected: false
  }
]

export default function PlatformSelector({
  campaignPlan,
  updateCampaignPlan,
  onNext,
  onPrev,
  currentStep,
  totalSteps
}: PlatformSelectorProps) {
  const [selectedPlatforms, setSelectedPlatforms] = useState<Platform[]>(
    campaignPlan.platforms.length > 0 ? campaignPlan.platforms : platforms
  )

  const handlePlatformToggle = (platformId: string) => {
    const updatedPlatforms = selectedPlatforms.map(platform =>
      platform.id === platformId
        ? { ...platform, isSelected: !platform.isSelected }
        : platform
    )
    setSelectedPlatforms(updatedPlatforms)
    updateCampaignPlan({ platforms: updatedPlatforms })
  }

  const canProceed = selectedPlatforms.some(platform => platform.isSelected)

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Chọn nền tảng quảng cáo
        </h2>
        <p className="text-lg text-gray-600">
          Chọn một hoặc nhiều nền tảng mà bạn muốn đặt quảng cáo
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {platforms.map((platform) => (
          <motion.div
            key={platform.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`relative cursor-pointer rounded-xl border-2 p-6 transition-all duration-200 ${
              platform.isSelected
                ? 'border-blue-500 bg-blue-50 shadow-lg'
                : 'border-gray-200 bg-white hover:border-gray-300'
            }`}
            onClick={() => handlePlatformToggle(platform.id)}
          >
            <div className="flex items-center space-x-4">
              <div className="text-3xl">{platform.icon}</div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {platform.name}
                </h3>
                <p className="text-sm text-gray-600">
                  {platform.description}
                </p>
              </div>
              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                platform.isSelected
                  ? 'bg-blue-500 border-blue-500'
                  : 'border-gray-300'
              }`}>
                {platform.isSelected && (
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Selected Platforms Summary */}
      {selectedPlatforms.some(p => p.isSelected) && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-blue-50 rounded-lg p-6 mb-8"
        >
          <h3 className="text-lg font-semibold text-blue-900 mb-3">
            Nền tảng đã chọn:
          </h3>
          <div className="flex flex-wrap gap-2">
            {selectedPlatforms
              .filter(platform => platform.isSelected)
              .map(platform => (
                <span
                  key={platform.id}
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800"
                >
                  {platform.icon} {platform.name}
                </span>
              ))}
          </div>
        </motion.div>
      )}

      {/* Navigation Buttons */}
      <div className="flex justify-between items-center">
        <button
          onClick={onPrev}
          disabled={currentStep === 1}
          className={`px-6 py-3 rounded-lg font-medium transition-colors ${
            currentStep === 1
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Quay lại
        </button>

        <button
          onClick={onNext}
          disabled={!canProceed}
          className={`px-8 py-3 rounded-lg font-medium transition-colors ${
            canProceed
              ? 'bg-blue-600 text-white hover:bg-blue-700'
              : 'bg-gray-100 text-gray-400 cursor-not-allowed'
          }`}
        >
          Tiếp tục
        </button>
      </div>
    </div>
  )
} 