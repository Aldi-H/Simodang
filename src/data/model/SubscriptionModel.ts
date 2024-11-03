import { Subscription } from "../../domain/entities/Subscription"
import { PricingPlanModel } from "./PricingPlanModel";

export class SubscriptionModel {
  static fromJson(json: any): Subscription {
    const subscription: Subscription = {
      id: json.id,
      status: json.status,
      expiredAt: json.expiredAt,
      createdAt: json.createdAt,
      isPaid: json.isPaid,
      userId: json.userId,
      pricingPlanId: json.pricingPlanId,
      pricingPlan: PricingPlanModel.fromJson(json.pricingPlan)
    }

    return subscription;
  }
}
