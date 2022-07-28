import Block from "../../utils/block";
import { template } from "./profileTemplate";
import Link from "../../components/Link/link";
import LeftPanel from "../../components/LeftPanel/leftPanel";
import LeftArrowIcon from "../../components/LeftArrowIcon/leftArrowIcon";
import { pushHref } from "../Menu/menu";
import { getLocation } from "../../app";

class Profile extends Block {
  constructor(props: {} | undefined) {
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
  leftPanel: new LeftPanel({
    leftArrowIcon: new Link({
      linkHref: "/",
      linkClass: "class",
      linkText: "",
      linkIcon: new LeftArrowIcon(),
      events: {
        click: function (e) {
          e.preventDefault();
          pushHref("/");
          getLocation();
        },
      },
    }),
  }),
});
