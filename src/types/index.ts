export interface Platform {
  id: string;
  name: string;
  description: string;
  icon: string;
  isSelected: boolean;
}

export interface AdType {
  id: string;
  name: string;
  description: string;
  icon: string;
  isSelected: boolean;
}

export interface TimeSlot {
  id: string;
  name: string;
  startTime: string;
  endTime: string;
  isSelected: boolean;
}

export interface TargetAudience {
  id: string;
  name: string;
  description: string;
  isSelected: boolean;
}

export interface CampaignPlan {
  platforms: Platform[];
  adTypes: AdType[];
  duration: number;
  frequency: number;
  timeSlots: TimeSlot[];
  targetAudience: TargetAudience[];
  budget: number;
  estimatedCost: number;
}

export interface PricingData {
  platform: string;
  adType: string;
  basePrice: number;
  duration: number;
  frequency: number;
} 