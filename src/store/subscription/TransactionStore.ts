import { create } from "zustand";
import { SubscriptionRepositoryImpl } from "../../data/networking/repositories/SubscriptionRepositoryImpl";
import { Transaction } from "../../domain/entities/Transaction";
import { TransactionRepositoryImpl } from "../../data/networking/repositories/TransactionRepositoryImpl";
import { Alert } from "react-native";

type TransactionAction = {
  getTransactions: () => Promise<void>;
  buySubscription: (pricingPlanId: string) => Promise<void>;
}

export default create<TransactionAction & TransactionViewModel>((set) => ({
  transaction: null,
  transactions: [],

  buySubscription: async (pricingPlanId: string) => {
    const SubscriptionRepository = new SubscriptionRepositoryImpl();
    const [transaction, error] = await SubscriptionRepository.buySubscription(pricingPlanId);
    if (error) {
      Alert.alert('Error', error.response?.data?.message ?? 'An error occurred');
      return;
    }
    console.log(transaction?.paymentLink ?? '');
  },

  getTransactions: async () => {
    const TransactionRepository = new TransactionRepositoryImpl();
    const transactions: Transaction[] = await TransactionRepository.getTransactions();

    set({ transactions });
  },
}));

type TransactionViewModel = {
  transaction: Transaction | null;
  transactions: Transaction[];
}
