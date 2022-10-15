import { User } from '../../api/authApi';
import Block from '../../utils/block';
import { template } from './changeProfileDataTemplate';
import Button from '../../components/Button/button';

type ChangeProfileDataType = {
  saveBtn: Button;
  currentUser: User;
  changeDataFlag?: boolean;
  events?: { click: (e: any) => void };
};

export class ChangeProfileData extends Block {
  constructor(props: ChangeProfileDataType) {
    super(props);
  }

  protected render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}
