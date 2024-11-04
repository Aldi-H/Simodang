import { Transaction } from "../../../domain/entities/Transaction";
import { TransactionModel } from "../../model/TransactionModel";
import { ApiUrls } from "../ApiUrls";
import { RemoteDataSource } from "../RemoteDataSource";

export class TransactionRepositoryImpl {
  async getTransactions() {
    const remoteDataSource = new RemoteDataSource();
    const response = await remoteDataSource.get(ApiUrls.transaction);

    const data: any[] = response?.data || [];

    const transactions: Transaction[] = data.map((transactionData: any) => {
      return TransactionModel.fromJson(transactionData);
    });

    return transactions;
  }
}
