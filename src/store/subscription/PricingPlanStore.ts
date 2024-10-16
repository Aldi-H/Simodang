import { create } from "zustand";
import { PricingPlan } from "../../domain/entities/PricingPlan";
import { PricingPlanRepositoryImpl } from "../../data/networking/repositories/PricingPlanRepositoryImpl";

type PricingPlanAction = {
  getPricingPlans: () => Promise<void>;
}

export default create<PricingPlanViewModel & PricingPlanAction>((set) => ({
  pricingPlans: [],

  getPricingPlans: async () => {
    const PricingPlanRepository = new PricingPlanRepositoryImpl();
    const pricingPlans: PricingPlan[] = await PricingPlanRepository.getPricingPlans();

    set({ pricingPlans });
  },
}));

type PricingPlanViewModel = {
  pricingPlans: PricingPlan[];
}
