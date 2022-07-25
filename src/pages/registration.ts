import Block from "../utils/block";
import Button from "../components/Button/button";
import Input from "../components/Input/input";
import Link from "../components/Link/link";
import validator from "../utils/validator";

import { getLocation } from "../app";

const template = `
<form action="#" class="registration-form">
  <div class="registration-form__fields">
    <h3 class="registration-form__title">{{formTitle}}</h3>
    <div>
      {{{emailInput}}}
      <span class="error-m"></span>
    </div>
    <div>
      {{{loginInput}}}
      <span class="error-m"></span>
    </div>
    <div>
      {{{firstNameInput}}}
      <span class="error-m"></span>
    </div>
    <div>
      {{{secondNameInput}}}
      <span class="error-m"></span>
    </div>
    <div>
      {{{phoneInput}}}
      <span class="error-m"></span>
    </div>
    <div>
      {{{passwordInput}}}
      <span class="error-m"></span>
    </div>
    <div>
      {{{repeatPasswordInput}}}
      <span class="error-m"></span>
    </div>
  </div>
  <div class="registration-form__buttons">
    {{{submitButton}}}
    {{{loginLink}}}
  </div>
</form>
`;

class Registration extends Block {
  constructor(props) {
    super(props);
  }

  render() {
    return this.compile(template, this.props);
  }

  show() {
    this.getContent()!.style.display = "flex";
  }
}
let pass1 = "";

function onBlur() {
  const [isValid, message] = validator.validate(this.name, this.value);
  if (!isValid) {
    this.nextElementSibling.textContent = message;
    this.focus();
    return false;
  } else {
    if (this.name === "password") {
      pass1 = this.value;
    }
    if (this.name === "password2") {
      const [isValid, message] = [this.value === pass1, "no equal"];
      if (!isValid) {
        this.nextElementSibling.textContent = message;
        this.focus();
        return false;
      }
    }
  }
}
//123123123J
function onInput() {
  this.nextElementSibling.textContent = "";
}

export const registration = new Registration({
  formTitle: "Регистрация",
  emailInput: new Input({
    inputPlaceholder: "Почта",
    inputName: "email",
    inputClass: "text-input registration-form__username-input",
    events: {
      blur: onBlur,
      // focus: onFocus,
      input: onInput,
    },
  }),
  loginInput: new Input({
    inputPlaceholder: "Логин",
    inputName: "login",
    inputClass: "text-input registration-form__username-input",
    events: {
      blur: onBlur,
      // focus: onFocus,
      input: onInput,
    },
  }),
  firstNameInput: new Input({
    inputPlaceholder: "Имя",
    inputName: "first_name",
    inputClass: "text-input registration-form__username-input",
    events: {
      blur: onBlur,
      // focus: onFocus,
      input: onInput,
    },
  }),
  secondNameInput: new Input({
    inputPlaceholder: "Фамилия",
    inputName: "second_name",
    inputType: "text",
    inputClass: "text-input registration-form__username-input",
    events: {
      blur: onBlur,
      // focus: onFocus,
      input: onInput,
    },
  }),
  phoneInput: new Input({
    inputPlaceholder: "Телефон",
    inputName: "phone",
    inputType: "text",
    inputClass: "text-input registration-form__username-input",
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
    inputClass: "text-input registration-form__username-input",
    events: {
      blur: onBlur,
      // focus: onFocus,
      input: onInput,
    },
  }),
  repeatPasswordInput: new Input({
    inputPlaceholder: "Пароль(еще раз)",
    inputName: "password2",
    inputType: "password",
    inputClass: "text-input registration-form__username-input",
    events: {
      blur: onBlur,
      // focus: onFocus,
      input: onInput,
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
    submit: function (e) {
      e.preventDefault();
      const loginFormData = {};
      const arr = [];
      this.querySelectorAll("input").forEach((input) => {
        const [isValid, message] = validator.validate(input.name, input.value);
        onBlur.apply(input);
      });
      if (arr.every((item) => item === true)) {
        this.querySelectorAll("input").forEach((input) => {
          loginFormData[input.name] = input.value;
          input.value = "";
        });
      }

      console.log(loginFormData);
    },
  },
});
