import Block from "../utils/block";
import Link from "../components/Link/link";

import { pushHref } from "./menu";

const template = `
<div class="error">
  <h1 class="error__title">{{errorTitle}}</h1>
  <p class="error__message">{{errorMessage}}</p>
  {{{chatsLink}}}
</div>
`;

class NotFound extends Block {
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

export const notFound = new NotFound({
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
