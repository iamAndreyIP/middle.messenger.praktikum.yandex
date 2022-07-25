import Block from "../../utils/block";

const template = `
<button class="{{buttonClass}}">
    {{buttonText}}
</button>
`;

export default class Button extends Block {
  constructor(props?) {
    super(props);
  }

  render() {
    return this.compile(template, this.props);
  }
}
