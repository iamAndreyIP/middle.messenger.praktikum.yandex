import Block from "../../utils/block";

const template = `
<input type="{{inputType}}" placeholder="{{inputPlaceholder}}" name="{{inputName}}" class="{{inputClass}}"/>
`;

type InputType = {
  inputType: string;
  inputPlaceholder: string;
  inputName: string;
  inputClass: string;
  events?: { [key: string]: (e: Event) => void };
};

export default class Input extends Block {
  constructor(props: InputType) {
    super(props);
  }

  render() {
    return this.compile(template, this.props);
  }
}
