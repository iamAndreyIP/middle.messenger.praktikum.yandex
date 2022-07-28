import Block from "../../utils/block";

const template = `
<a href="{{linkHref}}" class="{{linkClass}}">{{linkText}}{{{linkIcon}}}</a>
`;

type LinkType = {
  linkHref: string;
  linkText: string;
  linkClass: string;
  linkIcon?: any;
  events?: { [key: string]: (e: Event) => void };
};

export default class Link extends Block {
  constructor(props: LinkType) {
    super(props);
  }

  render() {
    return this.compile(template, this.props);
  }
}
