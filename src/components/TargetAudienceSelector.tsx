import { useState } from 'react'
import { motion } from 'framer-motion'
import type { TargetAudience, CampaignPlan } from '../types'

interface TargetAudienceSelectorProps {
  campaignPlan: CampaignPlan
  updateCampaignPlan: (updates: Partial<CampaignPlan>) => void
  onNext: () => void
  onPrev: () => void
  currentStep: number
  totalSteps: number
}

const targetAudiences: TargetAudience[] = [
  {
    id: 'local-residents',
    name: 'Cư dân địa phương',
    description: 'Người dân sinh sống tại Cần Thơ và các tỉnh lân cận',
    isSelected: false
  },
  {
    id: 'business-owners',
    name: 'Chủ doanh nghiệp',
    description: 'Các chủ doanh nghiệp, nhà quản lý tại Cần Thơ',
    isSelected: false
  },
  {
    id: 'young-professionals',
    name: 'Chuyên gia trẻ',
    description: 'Người trẻ tuổi (25-40) có thu nhập ổn định',
    isSelected: false
  },
  {
    id: 'students',
    name: 'Sinh viên',
    description: 'Sinh viên các trường đại học, cao đẳng tại Cần Thơ',
    isSelected: false
  },
  {
    id: 'families',
    name: 'Gia đình',
    description: 'Các gia đình có con nhỏ, quan tâm đến giáo dục và giải trí',
    isSelected: false
  },
  {
    id: 'seniors',
    name: 'Người cao tuổi',
    description: 'Người từ 50 tuổi trở lên, quan tâm đến sức khỏe và an sinh',
    isSelected: false
  },
  {
    id: 'tech-savvy',
    name: 'Người dùng công nghệ',
    description: 'Người thường xuyên sử dụng internet và mạng xã hội',
    isSelected: false
  },
  {
    id: 'traditional-media',
    name: 'Người dùng truyền thông truyền thống',
    description: 'Người thường xem TV, nghe radio, đọc báo in',
    isSelected: false
  }
]

export default function TargetAudienceSelector({
  campaignPlan,
  updateCampaignPlan,
  onNext,
  onPrev,
  currentStep,
  totalSteps
}: TargetAudienceSelectorProps) {
  const [selectedAudiences, setSelectedAudiences] = useState<TargetAudience[]>(
    campaignPlan.targetAudience.length > 0 ? campaignPlan.targetAudience : targetAudiences
  )

  const handleAudienceToggle = (audienceId: string) => {
    const updatedAudiences = selectedAudiences.map(audience =>
      audience.id === audienceId
        ? { ...audience, isSelected: !audience.isSelected }
        : audience
    )
    setSelectedAudiences(updatedAudiences)
    updateCampaignPlan({ targetAudience: updatedAudiences })
  }

  const canProceed = selectedAudiences.some(audience => audience.isSelected)

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Đối tượng mục tiêu
        </h2>
        <p className="text-lg text-gray-600">
          Chọn đối tượng khách hàng mà bạn muốn tiếp cận
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {targetAudiences.map((audience) => (
          <motion.div
            key={audience.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`relative cursor-pointer rounded-xl border-2 p-6 transition-all duration-200 ${
              audience.isSelected
                ? 'border-orange-500 bg-orange-50 shadow-lg'
                : 'border-gray-200 bg-white hover:border-gray-300'
            }`}
            onClick={() => handleAudienceToggle(audience.id)}
          >
            <div className="flex items-start space-x-4">
              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-1 ${
                audience.isSelected
                  ? 'bg-orange-500 border-orange-500'
                  : 'border-gray-300'
              }`}>
                {audience.isSelected && (
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                )}
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {audience.name}
                </h3>
                <p className="text-sm text-gray-600">
                  {audience.description}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Selected Audiences Summary */}
      {selectedAudiences.some(a => a.isSelected) && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-orange-50 rounded-lg p-6 mb-8"
        >
          <h3 className="text-lg font-semibold text-orange-900 mb-3">
            Đối tượng mục tiêu đã chọn:
          </h3>
          <div className="flex flex-wrap gap-2">
            {selectedAudiences
              .filter(audience => audience.isSelected)
              .map(audience => (
                <span
                  key={audience.id}
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-orange-100 text-orange-800"
                >
                  {audience.name}
                </span>
              ))}
          </div>
        </motion.div>
      )}

      {/* Tips Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-blue-50 rounded-lg p-6 mb-8"
      >
        <h3 className="text-lg font-semibold text-blue-900 mb-3">
          💡 Gợi ý chọn đối tượng
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-blue-800">
          <div>
            <strong>• Cư dân địa phương:</strong> Phù hợp cho các dịch vụ địa phương
          </div>
          <div>
            <strong>• Chủ doanh nghiệp:</strong> Tốt cho B2B và dịch vụ thương mại
          </div>
          <div>
            <strong>• Sinh viên:</strong> Lý tưởng cho giáo dục và giải trí
          </div>
          <div>
            <strong>• Gia đình:</strong> Phù hợp cho sản phẩm tiêu dùng
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
              ? 'bg-orange-600 text-white hover:bg-orange-700'
              : 'bg-gray-100 text-gray-400 cursor-not-allowed'
          }`}
        >
          Tiếp tục
        </button>
      </div>
    </div>
  )
} 