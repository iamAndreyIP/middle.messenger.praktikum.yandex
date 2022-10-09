import NotfoundPage from './src/pages/404Page/notFoundPage';
import ServerErrorPage from './src/pages/500Page/serverErrorPage';
import { ChatPage } from './src/pages/chatPage/chatPage';
import LoginPageNew from './src/pages/loginPage/loginPage2';
import RegistrationPageNew from './src/pages/registrationPage/registrationPage2';
import ProfilePage from './src/pages/profilePage/profilePage';
import Router from './src/utils/Router';
import AuthController from './src/controllers/authcontroller';

export const router = new Router();

document.addEventListener('DOMContentLoaded', () => {
  router
    .use('/', LoginPageNew)
    .use('/sign-up', RegistrationPageNew)
    .use('/messanger', ChatPage)
    .use('/profile', ProfilePage)
    .use('/500', ServerErrorPage)
    .use('*', NotfoundPage);

  let login = localStorage.getItem('login');
  let isProtected = true;

  switch (window.location.pathname) {
    case '/':
    case '/sign-up':
      isProtected = false;
      break;
  }

  if (login) {
    AuthController.fetchUser();

    router.start();
    if (!isProtected) {
      router.go('/messanger');
    }
  } else {
    router.start();

    router.go('/');
  }
});
