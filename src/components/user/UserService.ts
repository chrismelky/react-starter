import axios, { AxiosResponse } from "axios";

export class UserService {
  baseUrl = "api/users";

  query(opts?: any): Promise<AxiosResponse<any>> {
    return axios.get(`${this.baseUrl}`, { params: opts });
  }
}
