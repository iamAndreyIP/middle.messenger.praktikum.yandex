import { getLocation } from "../../app";
import Link from "../../components/Link/link";
import Block from "../../utils/block";
import { template } from "./menuTemplate";

export default class Menu extends Block {
  constructor(props: {} | undefined) {
    super(props);
  }

  protected render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}

export function pushHref(href: string) {
  window.history.pushState(null, "", `${href}`);
  getLocation();
}

export const mainMenu = new Menu({
  loginLink: new Link({
    linkHref: "login",
    linkText: "Авторизация",
    linkClass: "menu-item__link link",
    events: {
      click: (e: { preventDefault: () => void }) => {
        e.preventDefault();
        pushHref("login");
      },
    },
  }),
  regLink: new Link({
    linkHref: "reg",
    linkText: "Регистрация",
    linkClass: "menu-item__link link",
    events: {
      click: (e: { preventDefault: () => void }) => {
        e.preventDefault();
        pushHref("reg");
      },
    },
  }),
  profileLink: new Link({
    linkHref: "profile",
    linkText: "Профиль",
    linkClass: "menu-item__link link",
    events: {
      click: (e: { preventDefault: () => void }) => {
        e.preventDefault();
        pushHref("profile");
      },
    },
  }),
  fixLink: new Link({
    linkHref: "500",
    linkText: "500",
    linkClass: "menu-item__link link",
    events: {
      click: (e: { preventDefault: () => void }) => {
        e.preventDefault();
        pushHref("500");
      },
    },
  }),
  notFoundLink: new Link({
    linkHref: "404",
    linkText: "404",
    linkClass: "menu-item__link link",
    events: {
      click: (e: { preventDefault: () => void }) => {
        e.preventDefault();
        pushHref("404");
      },
    },
  }),
  chatsLink: new Link({
    linkHref: "chats",
    linkText: "Список чатов",
    linkClass: "menu-item__link link",
    events: {
      click: (e: { preventDefault: () => void }) => {
        e.preventDefault();
        pushHref("chats");
      },
    },
  }),
});
