import { PricingPlan } from "../../domain/entities/PricingPlan";

export class PricingPlanModel {
  static fromJson(json: any): PricingPlan {
    const pricingPlan: PricingPlan = {
      id: json.id,
      name: json.name,
      description: json.description,
      pondLimit: json.pondLimit,
      duration: json.duration,
      price: json.price,
      createdAt: json.createdAt,
    }

    return pricingPlan;
  }
}
