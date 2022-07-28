import { getLocation } from "../../app";
import { pushHref } from "../../pages/Menu/menu";
import Block from "../../utils/block";
import LeftArrowIcon, { leftArrowIcon } from "../LeftArrowIcon/leftArrowIcon";
import Link from "../Link/link";

const template = `
<div class="profile__left">
    <div class="profile__nav-icon">
        {{{leftArrowIcon}}}
    </div>
</div>
`;

export default class LeftPanel extends Block {
  constructor(props: {} | undefined) {
    super(props);
  }

  render() {
    return this.compile(template, this.props);
  }
}

export const leftPanel = new LeftPanel({
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
});
