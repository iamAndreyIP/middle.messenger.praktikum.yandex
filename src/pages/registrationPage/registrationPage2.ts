import Block from '../../utils/block';
import { template } from './registrationPage2Template';
import {
  submitFormHandler,
  checkInputBlur,
  checkInputFocus,
} from '../loginPage/loginPage2';
import { router } from '../../..';
import Button from '../../components/Button/button';
import Form from '../../components/Form/form';
import Input from '../../components/Input/input';
import Link from '../../components/Link/link';
import AuthController from '../../controllers/authcontroller';

export default class RegistrationPageNew extends Block {
  constructor(props: {} | undefined) {
    super(props);
  }

  protected addChild(): void {
    this.children.registrationForm = new Form({
      formClass: 'registration-form',
      formTitle: 'Регистрация',
      formFields: [
        new Input({
          inputType: 'text',
          inputPlaceholder: 'Логин',
          inputName: 'login',
          inputClass: 'text-input registration-form__username-input',
          events: {
            blur: checkInputBlur,
            focus: checkInputFocus,
          },
        }),

        new Input({
          inputType: 'text',
          inputPlaceholder: 'Почта',
          inputName: 'email',
          inputClass: 'text-input registration-form__username-input',
          events: {
            blur: checkInputBlur,
            focus: checkInputFocus,
          },
        }),

        new Input({
          inputType: 'text',
          inputPlaceholder: 'Имя',
          inputName: 'first_name',
          inputClass: 'text-input registration-form__username-input',
          events: {
            blur: checkInputBlur,
            focus: checkInputFocus,
          },
        }),

        new Input({
          inputPlaceholder: 'Фамилия',
          inputName: 'second_name',
          inputType: 'text',
          inputClass: 'text-input registration-form__username-input',
          events: {
            blur: checkInputBlur,
            focus: checkInputFocus,
          },
        }),

        new Input({
          inputPlaceholder: 'Телефон',
          inputName: 'phone',
          inputType: 'text',
          inputClass: 'text-input registration-form__username-input',
          events: {
            blur: checkInputBlur,
            focus: checkInputFocus,
          },
        }),

        new Input({
          inputPlaceholder: 'Пароль',
          inputName: 'password',
          inputType: 'password',
          inputClass: 'text-input registration-form__username-input',
          events: {
            blur: checkInputBlur,
            focus: checkInputFocus,
          },
        }),

        new Input({
          inputPlaceholder: 'Пароль(еще раз)',
          inputName: 'password2',
          inputType: 'password',
          inputClass: 'text-input registration-form__username-input',
          events: {
            blur: checkInputBlur,
            focus: checkInputFocus,
          },
        }),
      ],

      formActions: [
        new Button({
          buttonClass: 'registration-form__submit btn',
          buttonText: 'Зарегистрироваться',
        }),
        new Link({
          linkHref: '/',
          linkText: 'Войти',
          linkClass: 'login-from__link link',
          events: {
            click: (event) => {
              event.preventDefault();
              router.go('/');
            },
          },
        }),
      ],

      events: {
        submit: (event) => {
          event.preventDefault();
          const self = this.getContent();
          const [check, regFormData] = submitFormHandler.apply(self, [event]);

          if (check) {
            AuthController.signup(regFormData);

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
