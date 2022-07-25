import Block from "../utils/block";
import Button from "../components/Button/button";
import Input from "../components/Input/input";
import Link from "../components/Link/link";
import validator from "../utils/validator";

import { getLocation } from "../app";

const template = `
<form action="#" class="login-form">
  <div class="login-form__fields">
    <h3 class="login-form__title">{{formTitle}}</h3>
    <div>
      {{{loginInput}}}
      <span class="error-m"></span>
    </div>
    <div>
      {{{passwordInput}}}
      <span class="error-m"></span>
    </div>
  </div>
  <div class="login-form__buttons">
    {{{submitButton}}}
    {{{loginLink}}}
  </div>
</form>
`;

class Login extends Block {
  constructor(props: any) {
    super(props);
  }

  render() {
    return this.compile(template, this.props);
  }

  show() {
    this.getContent()!.style.display = "flex";
  }
}

function onBlur(e) {
  const isValid = validator.validate(e.target.name, e.target.value);
  if (!isValid[0]) {
    this.nextElementSibling.textContent = isValid[1];
    this.focus();
  }
}

function onInput() {
  this.nextElementSibling.textContent = "";
}

// function onFocus(e) {
//   if (e.target.value) {
//     this.parentNode.querySelector(".error-m").textContent = "";
//   }
// }

export const login = new Login({
  formTitle: "Авторизация",
  loginInput: new Input({
    inputPlaceholder: "Логин",
    inputName: "login",
    inputClass: "text-input login-form__username-input",
    events: {
      blur: onBlur,
      // focus: onFocus,
      input: onInput,
    },
  }),
  passwordInput: new Input({
    inputPlaceholder: "Пароль",
    inputName: "password",
    inputType: "password",
    inputClass: "text-input login-form__userpassword-input",
    events: {
      blur: onBlur,
      // focus: onFocus,
      input: onInput,
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
    submit: function (e: Event) {
      e.preventDefault();
      const loginFormData = {};
      const arr: [] = [];
      this.querySelectorAll("input").forEach((input: HTMLInputElement) => {
        //@ts-ignore
        arr.push(validator.validate(input.name, input.value)[0]);
      });
      if (arr.every((item) => item === true)) {
        this.querySelectorAll("input").forEach((input: HTMLInputElement) => {
          //@ts-ignore
          loginFormData[input.name] = input.value;
          input.value = "";
        });
      }

      console.log(loginFormData);
    },
  },
});
