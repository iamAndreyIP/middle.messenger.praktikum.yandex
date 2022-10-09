import API, { AuthApi, SigninData, SignupData } from '../api/authApi';
import { router } from '../../index';
import store from '../utils/store';
import MessageController from '../controllers/messageController';

export class AuthController {
  private readonly api: AuthApi;

  constructor() {
    this.api = API;
  }

  async signin(data: SigninData) {
    try {
      const response: any = await this.api.signIn(data);

      if (response.response.includes('reason')) {
        console.log(response.response);
      }

      if (response.response === 'OK') {
        localStorage.setItem('login', data.login);

        await this.fetchUser();

        router.go('/messanger');

        return 'ok';
      }
    } catch (error: any) {
      console.error(error);
    }
  }

  async signup(data: SignupData) {
    try {
      const res: any = await this.api.signUp(data);

      if (!res.response.includes('reason')) {
        const login = JSON.parse(res.response).login;

        await this.fetchUser();

        localStorage.setItem('login', login);

        router.go('/messanger');
      }
    } catch (error) {
      console.error(error.message);
    }
  }

  async fetchUser() {
    try {
      const response: any = await this.api.read();

      if (!response.response.includes('reason')) {
        const user = JSON.parse(response.response);

        store.set('currentUser', user);
      } else {
        router.go('/');
      }
    } catch (error) {
      console.error(error.message);
    }
  }

  async logout() {
    try {
      await this.api.logout();

      localStorage.removeItem('login');

      MessageController.allClose();

      router.go('/');
    } catch (error) {
      console.error(error.message);
    }
  }
}

export default new AuthController();
