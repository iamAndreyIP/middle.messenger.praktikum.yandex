import Block from '../../utils/block';
import store from '../../utils/store';
import { template } from './modalTemplate';
import Input from '../Input/input';
import Button from '../Button/button';

type ModalType = {
  modalTitle: string;
  modalInput: Input;
  modalButton?: Button;
  classForList?: string;
  listOfModal?: typeof Block[];
  events?: { click: (e: any) => void };
  modalList?: any;
  modalClass?: string;
};

export default class Modal extends Block {
  template: string | undefined;
  constructor(props: ModalType, template?: string | undefined) {
    super(props);
    this.template = template;

    this.props.events = {
      click: (e: { target: Element }) => {
        const modal = document.querySelector('.modal');

        if (modal && e.target === modal) {
          store.set('changeAvatarModalFlag', false);
          store.set('deleteUserToChatFlag', false);
          store.set('addUserToChatFlag', false);
          store.set('addChatFlag', false);
        }
      },
    };
  }

  protected render() {
    return this.compile(this.template || template, this.props);
  }
}
