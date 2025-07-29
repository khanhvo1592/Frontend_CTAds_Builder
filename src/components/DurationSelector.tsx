import { useState } from 'react'
import { motion } from 'framer-motion'
import type { CampaignPlan } from '../types'

interface DurationSelectorProps {
  campaignPlan: CampaignPlan
  updateCampaignPlan: (updates: Partial<CampaignPlan>) => void
  onNext: () => void
  onPrev: () => void
  currentStep: number
  totalSteps: number
}

export default function DurationSelector({
  campaignPlan,
  updateCampaignPlan,
  onNext,
  onPrev,
  currentStep,
  totalSteps
}: DurationSelectorProps) {
  const [duration, setDuration] = useState(campaignPlan.duration)
  const [frequency, setFrequency] = useState(campaignPlan.frequency)

  const handleDurationChange = (value: number) => {
    setDuration(value)
    updateCampaignPlan({ duration: value })
  }

  const handleFrequencyChange = (value: number) => {
    setFrequency(value)
    updateCampaignPlan({ frequency: value })
  }

  const canProceed = duration > 0 && frequency > 0

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Thời lượng & Tần suất
        </h2>
        <p className="text-lg text-gray-600">
          Thiết lập thời gian chạy chiến dịch và tần suất xuất hiện quảng cáo
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Duration Section */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-xl p-6 shadow-lg border"
        >
          <div className="flex items-center mb-4">
            <div className="text-2xl mr-3">📅</div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900">
                Thời lượng chiến dịch
              </h3>
              <p className="text-sm text-gray-600">
                Số ngày chạy quảng cáo
              </p>
            </div>
          </div>

          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-700">
                {duration} ngày
              </span>
              <span className="text-sm text-gray-500">
                Tối đa: 365 ngày
              </span>
            </div>
            <input
              type="range"
              min="1"
              max="365"
              value={duration}
              onChange={(e) => handleDurationChange(parseInt(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>1 ngày</span>
              <span>30 ngày</span>
              <span>90 ngày</span>
              <span>365 ngày</span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2">
            {[7, 30, 90].map((days) => (
              <button
                key={days}
                onClick={() => handleDurationChange(days)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  duration === days
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {days} ngày
              </button>
            ))}
          </div>
        </motion.div>

        {/* Frequency Section */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-xl p-6 shadow-lg border"
        >
          <div className="flex items-center mb-4">
            <div className="text-2xl mr-3">🔄</div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900">
                Tần suất quảng cáo
              </h3>
              <p className="text-sm text-gray-600">
                Số lần xuất hiện mỗi ngày
              </p>
            </div>
          </div>

          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-700">
                {frequency} lần/ngày
              </span>
              <span className="text-sm text-gray-500">
                Tối đa: 10 lần/ngày
              </span>
            </div>
            <input
              type="range"
              min="1"
              max="10"
              value={frequency}
              onChange={(e) => handleFrequencyChange(parseInt(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>1 lần</span>
              <span>3 lần</span>
              <span>5 lần</span>
              <span>10 lần</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            {[1, 2, 3, 5].map((times) => (
              <button
                key={times}
                onClick={() => handleFrequencyChange(times)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  frequency === times
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {times} lần/ngày
              </button>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Summary Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-blue-50 to-green-50 rounded-xl p-6 mb-8 border border-blue-200"
      >
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Tóm tắt thời gian
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">{duration}</div>
            <div className="text-sm text-gray-600">Ngày chạy</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">{frequency}</div>
            <div className="text-sm text-gray-600">Lần/ngày</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">{duration * frequency}</div>
            <div className="text-sm text-gray-600">Tổng lần xuất hiện</div>
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
              ? 'bg-purple-600 text-white hover:bg-purple-700'
              : 'bg-gray-100 text-gray-400 cursor-not-allowed'
          }`}
        >
          Tiếp tục
        </button>
      </div>
    </div>
  )
} 