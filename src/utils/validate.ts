enum ValidatorType {
  Email = "email",
  Name = "first_name",
  Second = "second_name",
  Login = "login",
  Password = "password",
  Password2 = "password2",
  Phone = "phone",
}

class Validator {
  pass1: string | null = null;
  email(value: string): [boolean, string] {
    const result =
      /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/.test(
        value
      );

    return [result, "Некорректный адрес почты"];
  }

  name(value: string): [boolean, string] {
    return [
      /[A-ZА-Я][a-zа-я\-]*/.test(value),
      "Первая буква большая допустимы символы латиницы и кириллицы, а также дефис",
    ];
  }

  login(value: string): [boolean, string] {
    return [
      /(?!^\d+$)[A-Za-z0-9_\-]{3,20}/.test(value),
      "Логин должен состояить из латинских букв и цифр, также допустимы символы _ и -",
    ];
  }

  password(value: string): [boolean, string] {
    const isValid =
      /[A-Za-z0-9]{8,40}/.test(value) &&
      /[A-Z]/.test(value) &&
      /[0-9]/.test(value);
    this.pass1 = isValid ? value : null;
    return [
      isValid,
      "Пароль должен содержать одну заглавную букву и одну цифру длинна от 8 до 40 символов",
    ];
  }

  phone(value: string): [boolean, string] {
    return [/\+?[0-9]{10,15}/.test(value), "Некорректный номер телефона"];
  }
  checkEqualPassword(value: string) {
    return [this.pass1 === value, "Пароли не совпадают"];
  }
  validate(name: string, value: string): (boolean | string)[] {
    switch (name) {
      case ValidatorType.Email:
        if (value) {
          return this.email(value);
        }
      case ValidatorType.Login:
        if (value) {
          return this.login(value);
        }
      case ValidatorType.Name:
        if (value) {
          return this.name(value);
        }
      case ValidatorType.Password:
        if (value) {
          return this.password(value);
        }
      case ValidatorType.Password2:
        if (value) {
          return this.checkEqualPassword(value);
        }
      default:
        return [!!value.length, "Значение не должно быть пустым"];
    }
  }
}

export default new Validator();
