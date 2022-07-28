import Block from "../../utils/block";

const template = `
<button class="{{buttonClass}}">
    {{buttonText}}
</button>
`;

type ButtonType = {
  buttonText: string;
  buttonClass: string;
  events?: { [key: string]: (e: Event) => void };
};

export default class Button extends Block {
  constructor(props: ButtonType) {
    super(props);
  }

  render() {
    return this.compile(template, this.props);
  }
}
