import { PricingPlan } from "./PricingPlan";

export type Subscription = {
  id: string;
  status: number;
  expiredAt: string;
  createdAt: string;
  isPaid: boolean;
  userId: string;
  pricingPlanId: string;
  pricingPlan: PricingPlan;
}