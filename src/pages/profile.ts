import Block from "../utils/block";
import Link from "../components/Link/link";
import LeftPanel from "../components/leftPanel/leftPanel";

const template = `
<main class="profile">
    {{{leftPanel}}}
    <div class="profile__avatar">
        <img class="profile__avatar-img" src="#" alt="avatar"/>
    </div>
    <div class="profile__user-data">
        <div class="profile__user-data-name">
            <h1>Иван</h1>
        </div>
    </div>
    <ul class="profile__list-data">
        <li class="profile__list-data-item ">
            <span class="list-item--bold">
                Почта
            </span>
            <span class="list-item--light">
                pochta@yandex.ru
            </span>
        </li>
        <li class="profile__list-data-item ">
            <span class="list-item--bold">
                Логин
            </span>
            <span class="list-item--light">
                IvanIvanov
            </span>
        </li>
        <li class="profile__list-data-item ">
            <span class="list-item--bold">
                Имя
            </span>
            <span class="list-item--light">
                Иван
            </span>
        </li>
        <li class="profile__list-data-item ">
            <span class="list-item--bold">
                Фамилия
            </span>
            <span class="list-item--light">
                Иванов
            </span>
        </li>
        <li class="profile__list-data-item ">
            <span class="list-item--bold">
                Имя в чате
            </span>
            <span class="list-item--light">
                Иван
            </span>
        </li>
        <li class="profile__list-data-item ">
            <span class="list-item--bold">
                Телефон
            </span>
            <span class="list-item--light">
                +7 (909) 967 30 30
            </span>
        </li>
    </ul>
    <div class="profile__nav">
        {{{changeDataLink}}}
        {{{changePasswordLink}}}
        {{{exitLink}}}
    </div>
</main>
`;

class Profile extends Block {
  constructor(props?) {
    super(props);
  }

  render() {
    return this.compile(template, this.props);
  }

  show() {
    this.getContent()!.style.display = "flex";
  }
}

export const profile = new Profile({
  changeDataLink: new Link({
    linkHref: "#",
    linkClass: "profile__nav-link",
    linkText: "Изменить данные",
  }),
  changePasswordLink: new Link({
    linkHref: "#",
    linkClass: "profile__nav-link",
    linkText: "Изменить Пароль",
  }),
  exitLink: new Link({
    linkHref: "#",
    linkClass: "profile__nav-link",
    linkText: "Выйти",
  }),
  leftPanel: new LeftPanel(),
});
