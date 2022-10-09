import Block from '../../utils/block';

const template = `
<input type="{{inputType}}" placeholder="{{inputPlaceholder}}" name="{{inputName}}" class="{{inputClass}}" value="{{inputValue}}" id="{{inputId}}"/>
`;

type InputType = {
  inputType: string;
  inputPlaceholder: string;
  inputName: string;
  inputClass: string;
  inputValue?: string;
  events?: { [key: string]: (e: Event) => void };
  inputId?: string;
};

export default class Input extends Block {
  constructor(props: InputType) {
    super(props);
  }

  protected render() {
    return this.compile(template, this.props);
  }
}
