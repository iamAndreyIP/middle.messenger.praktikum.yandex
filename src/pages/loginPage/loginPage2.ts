import Block from '../../utils/block';
import { template } from './loginPage2Template';
import { router } from '../../..';
import Button from '../../components/Button/button';
import Form from '../../components/Form/form';
import Input from '../../components/Input/input';
import Link from '../../components/Link/link';
import validator from '../../utils/validate';

import AuthController from '../../controllers/authcontroller';

export function checkInputBlur(this: any): void {
  const [isValid, message] = validator.validate(this.name, this.value);
  if (!isValid) {
    this.nextElementSibling.textContent = message;
  }
}

export function checkInputFocus(this: any): void {
  this.nextElementSibling.textContent = '';
}

function checkCorrectInput(
  isValidAll: any[],
  loginFormData: { [key: string]: string }
) {
  if (isValidAll.every((isValid) => isValid === true)) {
    console.log(loginFormData);

    return [true, loginFormData];
  } else {
    console.log({});

    return [false, {}];
  }
}

export function submitFormHandler(event: { preventDefault: () => void }) {
  event.preventDefault();

  const isValidAll: any[] = [];
  const loginFormData: { [key: string]: string } = {};

  this.querySelectorAll('input').forEach((input: HTMLInputElement) => {
    const [isValid] = validator.validate(input.name, input.value);
    checkInputBlur.apply(input);
    isValidAll.push(isValid);

    if (isValid) {
      loginFormData[input.name] = input.value;
    }
  });

  return checkCorrectInput(isValidAll, loginFormData);
}

export default class LoginPageNew extends Block {
  constructor(props: {} | undefined) {
    super(props);
  }

  protected addChild(): void {
    this.children.loginForm = new Form({
      formClass: 'login-form',

      formTitle: 'Авторизация',
      formFields: [
        new Input({
          inputType: 'text',
          inputPlaceholder: 'Логин',
          inputName: 'login',
          inputClass: 'text-input login-form__username-input',
          events: {
            blur: checkInputBlur,
            focus: checkInputFocus,
          },
        }),
        new Input({
          inputPlaceholder: 'Пароль',
          inputName: 'password',
          inputType: 'password',
          inputClass: 'text-input login-form__userpassword-input',
          events: {
            blur: checkInputBlur,
            focus: checkInputFocus,
          },
        }),
      ],

      formActions: [
        new Button({
          buttonClass: 'login-form__submit btn',
          buttonText: 'Вход',
        }),
        new Link({
          linkHref: '/signup',
          linkText: 'Создать аккаунт',
          linkClass: 'login-from__link link',
          events: {
            click: (event) => {
              event.preventDefault();
              router.go('/sign-up');
            },
          },
        }),
      ],

      events: {
        submit: (event: any) => {
          const self = this.getContent();
          const [check, formData] = submitFormHandler.apply(self, [event]);

          if (check) {
            AuthController.signin(formData);

            self?.querySelectorAll('input').forEach((input) => {
              input.value = '';
            });
          }
        },
      },
    });
  }

  protected render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}
