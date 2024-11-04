import { Subscription } from "./Subscription";

export type Transaction = {
  id: string;
  status: number;
  amount: number;
  expiredAt: string;
  createdAt: string;
  userId: string;
  paymentLink: string;
  subscriptionId: string;
  subscription?: Subscription;
}
