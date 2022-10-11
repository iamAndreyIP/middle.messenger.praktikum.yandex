import BaseApi from './baseApi';

export type ProfileData = {
  first_name: string;
  second_name: string;
  login: string;
  email: string;
  phone: string;
};

export class UserApi extends BaseApi {
  endpoint: string;
  constructor(path: string) {
    super();
    this.endpoint = BaseApi.API_URL + path;
  }

  changeProfile(data: ProfileData) {
    return this.http.put(`${this.endpoint}/profile`, {
      data: JSON.stringify(data),
      headers: { 'Content-type': 'application/json' },
    });
  }

  changePassword(passwordData: { oldPassword: string; newPassword: string }) {
    return this.http.put(`${this.endpoint}/password`, {
      data: JSON.stringify(passwordData),
      headers: { 'Content-type': 'application/json' },
    });
  }

  changeUserAvatar(form: FormData) {
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
