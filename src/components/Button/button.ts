import Block from "../../utils/block";

const template = `
<button class="{{buttonClass}}">
    {{buttonText}}
</button>
`;

type buttonType = {
  buttonClass: string;
  buttonText: string;
  events?: { [key: string]: (e: Event) => void };
};

export default class Button extends Block {
  constructor(props: buttonType) {
    super(props);
  }

  protected render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}