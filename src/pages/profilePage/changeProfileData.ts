import Block from '../../utils/block';
import { template } from './changeProfileDataTemplate';

export class ChangeProfileData extends Block {
  constructor(props: {} | undefined) {
    super(props);
  }

  protected render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}
