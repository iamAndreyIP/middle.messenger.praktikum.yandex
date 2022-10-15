import BaseApi from './baseApi';

export interface SigninData {
  login: string;
  password: string;
}

export interface SignupData {
  first_name: string;
  second_name: string;
  login: string;
  email: string;
  password: string;
  phone: string;
}

export interface User {
  id: number;
  first_name: string;
  second_name: string;
  login: string;
  email: string;
  password: string;
  phone: string;
  avatar: string;
}

export class AuthApi extends BaseApi {
  endpoint: string;
  constructor(path: string) {
    super();
    this.endpoint = BaseApi.API_URL + path;
  }
  signIn(data: SigninData) {
    return this.http.post(`${this.endpoint}/signin`, {
      data: JSON.stringify(data),
      mode: 'cors',
      headers: { 'Content-type': 'application/json' },
    });
  }

  signUp(data: SignupData) {
    return this.http.post(`${this.endpoint}/signup`, {
      data: JSON.stringify(data),
      mode: 'cors',
      headers: { 'Content-type': 'application/json' },
    });
  }

  logout() {
    return this.http.post(`${this.endpoint}/logout`);
  }

  read() {
    return this.http.get(`${this.endpoint}/user`);
  }

  create = undefined;
  delete = undefined;
  update = undefined;
}

export default new AuthApi('/auth');
