import Block from "../../utils/block";

import { template } from "./errorsTemplate";
import Link from "../../components/Link/link";

import { pushHref } from "../Menu/menu";

class ErrorPages extends Block {
  constructor(props: {} | undefined) {
    super(props);
  }

  protected render(): DocumentFragment {
    return this.compile(template, this.props);
  }

  show(): void {
    //Переопределение свойства 'block' из родительского класса
    this.getContent()!.style.display = "flex";
  }
}

export const notFound = new ErrorPages({
  errorTitle: "404",
  errorMessage: "Не туда попали",
  chatsLink: new Link({
    linkHref: "/",
    linkClass: "error__link link",
    linkText: "Назад к чатам",
    events: {
      click: function (e: Event) {
        e.preventDefault();
        pushHref("chats");
      },
    },
  }),
});

export const fixIt = new ErrorPages({
  errorTitle: "500",
  errorMessage: "Мы уже фиксим",
  chatsLink: new Link({
    linkHref: "/",
    linkClass: "error__link link",
    linkText: "Назад к чатам",
    events: {
      click: function (e: Event) {
        e.preventDefault();
        pushHref("chats");
      },
    },
  }),
});
