import { PricingPlan } from '../../../domain/entities/PricingPlan';
import { PricingPlanModel } from '../../model/PricingPlanModel';
import { ApiUrls } from '../ApiUrls';
import { RemoteDataSource } from '../RemoteDataSource';

export class PricingPlanRepositoryImpl {
  async getPricingPlans() {
    const remoteDataSource = new RemoteDataSource();
    const response = await remoteDataSource.get(ApiUrls.pricingPlan);

    const data: any[] = response?.data || [];

    const pricingPlans: PricingPlan[] = data.map((pricingPlanData: any) => {
      return PricingPlanModel.fromJson(pricingPlanData);
    });

    return pricingPlans;
  }
}
