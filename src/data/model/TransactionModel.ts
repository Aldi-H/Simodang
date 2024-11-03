import { PricingPlan } from "../../domain/entities/PricingPlan";
import { Subscription } from "../../domain/entities/Subscription";
import { Transaction } from "../../domain/entities/Transaction";
import { SubscriptionModel } from "./SubscriptionModel";

export class TransactionModel {
  static fromJson(json: any): Transaction {
    const transaction: Transaction = {
      id: json.id,
      status: json.status,
      amount: json.amount,
      expiredAt: json.expiredAt,
      createdAt: json.createdAt,
      userId: json.userId,
      paymentLink: json.paymentLink,
      subscriptionId: json.subscriptionId,
      subscription: SubscriptionModel.fromJson(json.subscription)
    }

    return transaction;
  }
}
