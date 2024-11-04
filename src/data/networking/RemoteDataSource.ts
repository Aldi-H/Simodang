import axios, { Axios, AxiosError, AxiosResponse } from 'axios';
import { BASE_URL } from '@env';
import auth from '@react-native-firebase/auth';

export class RemoteDataSource {
  async get(url: string) {
    try {
      console.log('RemoteDataSource [GET] URL: ', `${BASE_URL}${url}`);
      const token = await auth().currentUser?.getIdToken();
      
      return await axios.get(`${BASE_URL}${url}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
    } catch (error) {
      console.log('RemoteDataSource Error: ', error);
    }
  }

  async post(url: string, body: any): Promise<[AxiosResponse<any, any> | null, AxiosError<any, any> | null]> {
    try {
      console.log('RemoteDataSource [POST] URL: ', `${BASE_URL}${url}`);
      const token = await auth().currentUser?.getIdToken();

      const result = await axios.post(`${BASE_URL}${url}`, body, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
      return [result, null];
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log('RemoteDataSource Error: ', error.response?.data);
        return [null, error];
      }
      return [null, null];
    }
  }
}
