import { useState } from 'react'
import { motion } from 'framer-motion'
import PlatformSelector from './components/PlatformSelector'
import AdTypeSelector from './components/AdTypeSelector'
import DurationSelector from './components/DurationSelector'
import TargetAudienceSelector from './components/TargetAudienceSelector'
import BudgetEstimator from './components/BudgetEstimator'
import CampaignPreview from './components/CampaignPreview'
import type { CampaignPlan } from './types'

function App() {
  const [currentStep, setCurrentStep] = useState(1)
  const [campaignPlan, setCampaignPlan] = useState<CampaignPlan>({
    platforms: [],
    adTypes: [],
    duration: 30,
    frequency: 1,
    timeSlots: [],
    targetAudience: [],
    budget: 0,
    estimatedCost: 0
  })

  const steps = [
    { id: 1, name: 'Chọn nền tảng', component: PlatformSelector },
    { id: 2, name: 'Chọn loại quảng cáo', component: AdTypeSelector },
    { id: 3, name: 'Thời lượng & Tần suất', component: DurationSelector },
    { id: 4, name: 'Đối tượng mục tiêu', component: TargetAudienceSelector },
    { id: 5, name: 'Ước tính ngân sách', component: BudgetEstimator },
    { id: 6, name: 'Xem trước kế hoạch', component: CampaignPreview }
  ]

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const updateCampaignPlan = (updates: Partial<CampaignPlan>) => {
    setCampaignPlan(prev => ({ ...prev, ...updates }))
  }

  const CurrentStepComponent = steps[currentStep - 1].component

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <h1 className="text-2xl font-bold text-gray-900">
                  Cần Thơ Media Ads Builder
                </h1>
                <p className="text-sm text-gray-500">
                  Tạo kế hoạch quảng cáo chuyên nghiệp
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-500">
                Bước {currentStep} / {steps.length}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-4">
            <div className="flex items-center justify-between">
              {steps.map((step, index) => (
                <div key={step.id} className="flex items-center">
                  <div className={`flex items-center justify-center w-8 h-8 rounded-full border-2 ${
                    step.id <= currentStep 
                      ? 'bg-blue-600 border-blue-600 text-white' 
                      : 'bg-white border-gray-300 text-gray-500'
                  }`}>
                    {step.id < currentStep ? (
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    ) : (
                      step.id
                    )}
                  </div>
                  <span className={`ml-2 text-sm font-medium ${
                    step.id <= currentStep ? 'text-blue-600' : 'text-gray-500'
                  }`}>
                    {step.name}
                  </span>
                  {index < steps.length - 1 && (
                    <div className={`w-16 h-0.5 mx-4 ${
                      step.id < currentStep ? 'bg-blue-600' : 'bg-gray-300'
                    }`} />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <CurrentStepComponent
            campaignPlan={campaignPlan}
            updateCampaignPlan={updateCampaignPlan}
            onNext={nextStep}
            onPrev={prevStep}
            currentStep={currentStep}
            totalSteps={steps.length}
          />
        </motion.div>
      </main>
    </div>
  )
}

export default App
