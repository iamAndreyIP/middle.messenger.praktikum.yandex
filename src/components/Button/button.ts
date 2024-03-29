import Block from '../../utils/block';

const template = `
<button class="{{buttonClass}}" title="{{title}}">
    {{buttonText}}
</button>
`;

export type ButtonType = {
  buttonClass: string;
  buttonText: string;
  events?: { [key: string]: (e: Event) => void };
  title?: string;
};

export default class Button extends Block {
  constructor(props: ButtonType) {
    super(props);
  }

  protected render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}
