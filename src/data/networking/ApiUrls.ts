export const ApiUrls = {
  pricingPlan: '/pricing-plan',
  transaction: '/transactions',
  buySubscription(pricingPlanId: string) {
		return `/subscription/buy/${pricingPlanId}`;
	},
};
