import Block from '../../utils/block';
import { template } from './chatPageTemplate';
import Input from '../../components/Input/input';
import { List } from '../../components/List/list';
import Link from '../../components/Link/link';
import { router } from '../../../index';
import Button from '../../components/Button/button';
import Modal from '../../components/Modal/modal';
import Icon from '../../components/Icons/icons';
import { ChevronRight } from '../../components/Icons/iconsTemplates';
import store, { connect } from '../../utils/store';
import PickedChat from '../../components/PickedChat/pickedChat';
import ChatController from '../../controllers/chatController';

import { ModalList } from '../../components/ModalList/modalList';

function mapStateToProps(state: any) {
  return {
    addChatFlag: state.addChatFlag,
    pickedChatFlag: state.pickedChatFlag,
    addUserToChatFlag: state.addUserToChatFlag,
    deleteUserToChatFlag: state.deleteUserToChatFlag,
    modalListFlag: state.modalListFlag,
    usersOflist: state.usersOflist,
    openUsersListFlag: state.openUsersListFlag,
    listOfChat: state.listOfChat,
  };
}

export default class ChatPageBase extends Block {
  constructor(props: {} | undefined) {
    super({ ...props });

    this.props.pickedChatFlag = false;

    this.componentDidMount();
  }

  componentDidMount(oldProps?: any): void {
    ChatController.fetchChats();
  }

  protected addChild(): void {
    this.children.profileLink = new Link({
      linkClass: 'profile__link',
      linkHref: '#',
      linkText: 'Профиль',
      linkIcon: new Icon({}, ChevronRight),
      events: {
        click: (event) => {
          event.preventDefault();

          router.go('/profile');
        },
      },
    });

    this.children.searchInput = new Input({
      inputClass: 'search__input',
      inputName: 'search',
      inputPlaceholder: 'Поиск',
      inputType: 'text',
    });

    this.children.chatList = new List({
      addChatButton: new Button({
        buttonClass: 'btn',
        buttonText: 'Создать чат',
        events: {
          click: () => {
            store.set('addChatFlag', true);
          },
        },
      }),
    });

    this.children.addChatModal = new Modal({
      modalInput: new Input({
        inputClass: 'modal__user',
        inputName: 'user_name',
        inputPlaceholder: 'Название чата',
        inputType: 'text',
      }),
      modalTitle: 'Создать чат',
      modalButton: new Button({
        buttonClass: 'btn',
        buttonText: 'Добавить',
        events: {
          click: (e) => {
            const input: HTMLInputElement | null =
              document.querySelector('.modal__user');

            ChatController.createChat(input?.value || '');
            if (input) {
              input.value = '';
              store.set('addChatFlag', false);
            }
          },
        },
      }),
    });

    this.children.pickedChat = new PickedChat({});

    this.children.addUserModal = new Modal({
      modalTitle: 'Добавить пользователя в чат',
      modalInput: new Input({
        inputClass: 'input',
        inputName: 'user_modal',
        inputPlaceholder: 'Введите id',
        inputType: 'text',
      }),
      modalButton: new Button({
        buttonClass: 'btn',
        buttonText: 'Добавить',
        events: {
          click: (e) => {
            const input: HTMLInputElement | null =
              document.querySelector('.input');

            if (input && input.value) {
              const value = input.value;
              const id = store.getState().pickedChatId;

              const chatData: { users: any; chatId: any } = {
                users: [],
                chatId: id,
              };

              chatData.users.push(Number(value));

              ChatController.addUserToChat(chatData);

              input.value = '';
              store.set('addUserToChatFlag', false);
            }
          },
        },
      }),
      events: {
        click: (e: { target: Element | null }) => {
          const modal = document.querySelector('.modal');

          if (e.target === modal) {
            store.set('addUserToChatFlag', false);
          }
        },
      },
    });

    this.children.deleteUserModal = new Modal({
      modalTitle: 'Удалить пользователя из чата',
      modalInput: new Input({
        inputClass: 'input',
        inputName: 'user_modal',
        inputPlaceholder: 'Введите id',
        inputType: 'text',
      }),
      modalButton: new Button({
        buttonClass: 'btn',
        buttonText: 'Удалить',
        events: {
          click: () => {
            const input: HTMLInputElement | null =
              document.querySelector('.input');

            if (input && input.value) {
              const value = input.value;
              const id = store.getState().pickedChatId;

              const chatData: { users: any; chatId: any } = {
                users: [],
                chatId: id,
              };

              chatData.users.push(Number(value));

              ChatController.deleteUserToChat(chatData);

              input.value = '';
              store.set('deleteUserToChatFlag', false);
            }
          },
        },
      }),
    });

    this.children.modalList = new ModalList({});
  }

  protected render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}

export const ChatPage = connect(mapStateToProps)(ChatPageBase);
