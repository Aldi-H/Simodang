import { create } from "zustand";
import { PricingPlan } from "../../domain/entities/PricingPlan";
import { PricingPlanRepositoryImpl } from "../../data/networking/repositories/PricingPlanRepositoryImpl";

type PricingPlanAction = {
  getPricingPlans: () => Promise<void>;
  setActivePricingPlan: (pricingPlan: PricingPlan) => void;
}

export default create<PricingPlanViewModel & PricingPlanAction>((set) => ({
  pricingPlans: [],
  activePricingPlan: null,

  getPricingPlans: async () => {
    const PricingPlanRepository = new PricingPlanRepositoryImpl();
    const pricingPlans: PricingPlan[] = await PricingPlanRepository.getPricingPlans();

    set({ pricingPlans });
  },

  setActivePricingPlan: (pricingPlan: PricingPlan) => {
    set({ activePricingPlan: pricingPlan });
  }
}));

type PricingPlanViewModel = {
  pricingPlans: PricingPlan[];
  activePricingPlan: PricingPlan | null;
}
