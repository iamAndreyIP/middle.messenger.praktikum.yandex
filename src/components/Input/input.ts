import Block from "../../utils/block";

const template = `
<input type="{{inputType}}" placeholder="{{inputPlaceholder}}" name="{{inputName}}" class="{{inputClass}}"/>
`;

export default class Input extends Block {
  constructor(props) {
    super(props);
  }

  render() {
    if (!this.props.inputType) {
      this.props.inputType = "text";
    }
    return this.compile(template, this.props);
  }
}
