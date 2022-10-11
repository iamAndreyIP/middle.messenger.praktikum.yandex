import Api, { UserApi } from '../api/userApi';
import store from '../utils/store';
import AuthController from './authcontroller';
import { ProfileData } from '../api/userApi';

class UserController {
  readonly api: UserApi;

  constructor() {
    this.api = Api;
  }

  async changeProfile(profileData: ProfileData) {
    try {
      const nData: any = await this.api.changeProfile(profileData);

      if (!nData.response.includes('reason')) {
        store.set('currentUser', JSON.parse(nData.response));
      }
    } catch (error) {
      console.log(error);
    }
  }

  async changePassword(passwordData: {
    oldPassword: string;
    newPassword: string;
  }) {
    try {
      const nData: any = await this.api.changePassword(passwordData);

      if (!nData.response.includes('reason')) {
        if (nData.response !== 'OK')
          store.set('currentUser', JSON.parse(nData.response));
        else {
          AuthController.logout();
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  async changeUserAvatar(form: FormData) {
    try {
      const nData: any = await this.api.changeUserAvatar(form);

      if (!nData.response.includes('reason')) {
        store.set('currentUser', JSON.parse(nData.response));
      }
    } catch (error) {
      console.log(error);
    }
  }
}

export default new UserController();
