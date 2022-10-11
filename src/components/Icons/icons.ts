import Block from '../../utils/block';
import { Add } from './iconsTemplates';

const template = Add;

type IconType = {
  cls?: string;
  events?: { [key: string]: (e: Event) => void };
};

export default class Icon extends Block {
  temp: string;
  constructor(props: IconType | {}, temp?: string) {
    super({ ...props, template: temp });
  }

  protected render(): DocumentFragment {
    return this.compile(this.props.template || template, this.props);
  }
}
