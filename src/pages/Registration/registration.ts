import Block from "../../utils/block";
import Button from "../../components/Button/button";
import Input from "../../components/Input/input";
import Link from "../../components/Link/link";
import validator from "../../utils/validate";
import { template } from "./registrationTemplate";

import { checkInputBlur, checkInputFocus } from "../Login/login";

import { getLocation } from "../../app";

class Registration extends Block {
  constructor(props: {} | undefined) {
    super(props);
  }

  render() {
    return this.compile(template, this.props);
  }

  show() {
    //Переопределение свойства 'block' из родительского класса
    this.getContent()!.style.display = "flex";
  }
}

export const registration = new Registration({
  formTitle: "Регистрация",
  emailInput: new Input({
    inputType: "text",
    inputPlaceholder: "Почта",
    inputName: "email",
    inputClass: "text-input registration-form__username-input",
    events: {
      blur: checkInputBlur,
      focus: checkInputFocus,
    },
  }),
  loginInput: new Input({
    inputType: "text",
    inputPlaceholder: "Логин",
    inputName: "login",
    inputClass: "text-input registration-form__username-input",
    events: {
      blur: checkInputBlur,
      focus: checkInputFocus,
    },
  }),
  firstNameInput: new Input({
    inputType: "text",
    inputPlaceholder: "Имя",
    inputName: "first_name",
    inputClass: "text-input registration-form__username-input",
    events: {
      blur: checkInputBlur,
      focus: checkInputFocus,
    },
  }),
  secondNameInput: new Input({
    inputPlaceholder: "Фамилия",
    inputName: "second_name",
    inputType: "text",
    inputClass: "text-input registration-form__username-input",
    events: {
      blur: checkInputBlur,
      focus: checkInputFocus,
    },
  }),
  phoneInput: new Input({
    inputPlaceholder: "Телефон",
    inputName: "phone",
    inputType: "text",
    inputClass: "text-input registration-form__username-input",
    events: {
      blur: checkInputBlur,
      focus: checkInputFocus,
    },
  }),
  passwordInput: new Input({
    inputPlaceholder: "Пароль",
    inputName: "password",
    inputType: "password",
    inputClass: "text-input registration-form__username-input",
    events: {
      blur: checkInputBlur,
      focus: checkInputFocus,
    },
  }),
  repeatPasswordInput: new Input({
    inputPlaceholder: "Пароль(еще раз)",
    inputName: "password2",
    inputType: "password",
    inputClass: "text-input registration-form__username-input",
    events: {
      blur: checkInputBlur,
      focus: checkInputFocus,
    },
  }),
  submitButton: new Button({
    buttonClass: "registration-form__submit btn",
    buttonText: "Зарегистрироваться",
  }),
  loginLink: new Link({
    linkHref: "/",
    linkText: "Войти",
    linkClass: "registration-from__link link",
    events: {
      click: function (e) {
        e.preventDefault();
        window.history.pushState(null, "", "login");
        getLocation();
      },
    },
  }),
  events: {
    submit: function (e: { preventDefault: () => void }) {
      e.preventDefault();
      const isValidAll: any[] = [];
      const regFormData: { [key: string]: string } = {};
      this.querySelectorAll("input").forEach((input: HTMLInputElement) => {
        const [isValid] = validator.validate(input.name, input.value);
        checkInputBlur.apply(input);
        isValidAll.push(isValid);
        if (isValid) {
          regFormData[input.name] = input.value;
        }
      });
      if (isValidAll.every((isValid) => isValid === true)) {
        console.log(regFormData);
      } else {
        console.log({});
        console.log(regFormData);
      }
    },
  },
});
