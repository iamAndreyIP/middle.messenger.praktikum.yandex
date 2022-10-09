import BaseApi from './baseApi';

export class UserApi extends BaseApi {
  endpoint: string;
  constructor(path: string) {
    super();
    this.endpoint = BaseApi.API_URL + path;
  }

  changeProfile(data: any) {
    return this.http.put(`${this.endpoint}/profile`, {
      data: JSON.stringify(data),
      headers: { 'Content-type': 'application/json' },
    });
  }

  changePassword(passwordData: any) {
    return this.http.put(`${this.endpoint}/password`, {
      data: JSON.stringify(passwordData),
      headers: { 'Content-type': 'application/json' },
    });
  }

  changeUserAvatar(form: any) {
    return this.http.put(`${this.endpoint}/profile/avatar`, {
      credentials: 'include',
      data: form,
    });
  }
  read = undefined;
  create = undefined;
  delete = undefined;
  update = undefined;
}

export default new UserApi('/user');
