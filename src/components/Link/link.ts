import Block from "../../utils/block";

const template = `
<a href="{{linkHref}}" class="{{linkClass}}">{{linkText}}</a>
`;

export default class Link extends Block {
  constructor(props) {
    super(props);
  }

  render() {
    return this.compile(template, this.props);
  }
}
