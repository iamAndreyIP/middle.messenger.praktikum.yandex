import Block from "../../utils/block";

import { template } from "./logintTemp";
import Input from "../../components/Input/input";
import Button from "../../components/Button/button";
import validator from "../../utils/validate";
import Link from "../../components/Link/link";
import { getLocation } from "../../app";

class Login extends Block {
  constructor(props: {}) {
    super(props);
  }

  protected render(): DocumentFragment {
    return this.compile(template, this.props);
  }

  show() {
    //Переопределение свойства 'block' из родительского класса
    this.getContent()!.style.display = "flex";
  }
}

export function checkInputBlur(this: any): void {
  const [isValid, message] = validator.validate(this.name, this.value);
  if (!isValid) {
    this.nextElementSibling.textContent = message;
  }
}

export function checkInputFocus(this: any): void {
  this.nextElementSibling.textContent = "";
}

export const login = new Login({
  formTitle: "Авторизация",
  loginInput: new Input({
    inputType: "text",
    inputPlaceholder: "Логин",
    inputName: "login",
    inputClass: "text-input login-form__username-input",
    events: {
      blur: checkInputBlur,
      focus: checkInputFocus,
    },
  }),
  passwordInput: new Input({
    inputPlaceholder: "Пароль",
    inputName: "password",
    inputType: "password",
    inputClass: "text-input login-form__userpassword-input",
    events: {
      blur: checkInputBlur,
      focus: checkInputFocus,
    },
  }),
  submitButton: new Button({
    buttonClass: "login-form__submit btn",
    buttonText: "Вход",
  }),
  loginLink: new Link({
    linkHref: "reg",
    linkText: "Создать аккаунт",
    linkClass: "login-from__link link",
    events: {
      click: function (e: Event) {
        e.preventDefault();
        window.history.pushState(null, "", "reg");
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
      }
    },
  },
});
