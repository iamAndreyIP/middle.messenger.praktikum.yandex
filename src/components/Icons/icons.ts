import Block from '../../utils/block';
import { Add } from './iconsTemplates';

const template = Add;

export default class Icon extends Block {
  temp: string;
  constructor(props: {} | undefined, temp?: string) {
    super({ ...props, template: temp });
  }

  protected render(): DocumentFragment {
    return this.compile(this.props.template || template, this.props);
  }
}
