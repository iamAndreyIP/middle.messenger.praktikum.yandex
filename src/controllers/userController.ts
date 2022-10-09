import Api from '../api/userApi';
import store from '../utils/store';
import AuthController from './authcontroller';

class UserController {
  readonly api: any;

  constructor() {
    this.api = Api;
  }

  async changeProfile(profileData) {
    try {
      const nData = await this.api.changeProfile(profileData);

      if (!nData.response.includes('reason')) {
        store.set('currentUser', JSON.parse(nData.response));
      }
    } catch (error) {
      console.log(error);
    }
  }

  async changePassword(passwordData) {
    try {
      const nData = await this.api.changePassword(passwordData);

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

  async changeUserAvatar(form: any) {
    try {
      const nData = await this.api.changeUserAvatar(form);

      if (!nData.response.includes('reason')) {
        store.set('currentUser', JSON.parse(nData.response));
      }
    } catch (error) {
      console.log(error);
    }
  }
}

export default new UserController();
