import Block from '../../utils/block';
import store from '../../utils/store';
import { template } from './modalTemplate';

type ModalType = {
  modalTitle: string;
  modalInput: Block;
  modalButton?: Block;
  classForList?: string;
  listOfModal?: typeof Block[];
  events?: any;
  modalList?: any;
  modalClass?: string;
};

export default class Modal extends Block {
  template: string | undefined;
  constructor(props: ModalType, template?: string | undefined) {
    super(props);
    this.template = template;

    this.props.events = {
      click: (e) => {
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
