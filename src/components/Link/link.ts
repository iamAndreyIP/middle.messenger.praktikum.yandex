import Block from '../../utils/block';
import Icon from '../Icons/icons';

const template = `
<a href="{{linkHref}}" class="{{linkClass}}">{{linkText}}{{{linkIcon}}}</a>
`;

type LinkType = {
  linkHref: string;
  linkText: string;
  linkClass: string;
  linkIcon?: Icon;
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
