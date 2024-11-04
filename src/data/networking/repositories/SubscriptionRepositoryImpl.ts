import { AxiosError } from "axios";
import { Transaction } from "../../../domain/entities/Transaction";
import { TransactionModel } from "../../model/TransactionModel";
import { ApiUrls } from "../ApiUrls";
import { RemoteDataSource } from "../RemoteDataSource";

export class SubscriptionRepositoryImpl {
  async buySubscription(pricingPlanId: string): Promise<[Transaction | null, AxiosError<any, any> | null]> {
    const remoteDataSource = new RemoteDataSource();
    const [result, error] = await remoteDataSource.post(ApiUrls.buySubscription(pricingPlanId), {});

    if (error) {
      return [null, error];
    }

    const data = result?.data || {};

    const transaction: Transaction = TransactionModel.fromJson(data);

    return [transaction, null];
  }
}