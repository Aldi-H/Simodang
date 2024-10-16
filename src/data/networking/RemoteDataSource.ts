import axios from 'axios';
import { BASE_URL } from '@env';

export class RemoteDataSource {
  async get(url: string) {
    try {
      console.log('RemoteDataSource [GET] URL: ', `${BASE_URL}${url}`);
      return await axios.get(`${BASE_URL}${url}`);
    } catch (error) {
      console.log('RemoteDataSource Error: ', error);
    }
  }
}
