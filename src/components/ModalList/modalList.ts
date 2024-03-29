import Block from '../../utils/block';
import store, { connect } from '../../utils/store';
import Icon from '../Icons/icons';
import { Add } from '../Icons/iconsTemplates';
import { template, templateItem } from './modalListTemplate';
import { User } from '../../api/authApi';

type ModalListItemType = {
  login: string;
  role: string;
  deleteUserFromChatIcon: Icon;
};

class ModalListItem extends Block {
  constructor(props: {} | ModalListItemType) {
    super({ ...props });
  }

  protected render(): DocumentFragment {
    return this.compile(templateItem, this.props);
  }
}

interface ModalListBaseType extends User {
  role: string;
  display_name: string;
}

class ModalListBase extends Block {
  constructor(props: ModalListBaseType | {}) {
    super({ ...props });

    this.props.events = {
      click: (e: { target: Element }) => {
        const modal = document.querySelector('.modal');

        if (modal && e.target === modal) {
          store.set('openUsersListFlag', false);
        }
      },
    };
  }

  protected addChild(): void {
    this.children.usersOflist = this.createItem(this.props);
  }

  componentDidUpdate(oldProps: any, newProps: any): boolean {
    newProps;
    this.children.usersOflist = this.createItem(newProps);

    return true;
  }

  private createItem(props: { usersOflist: any }) {
    props;
    return (props?.usersOflist || []).map((item: ModalListBaseType) => {
      return new ModalListItem({
        ...item,
        events: {
          click: () => {
            console.log('click');
          },
        },
        deleteUserFromChatIcon: new Icon(
          {
            cls: 'delete',
            events: {
              click: () => {
                console.log('click icon');
              },
            },
          },
          Add
        ),
      });
    });
  }

  protected render(): DocumentFragment {
    this.props;
    return this.compile(template, { ...this.props });
  }
}

export const ModalList = connect((state) => ({
  usersOflist: state.usersOflist || [],
  modalListFlag: state.modalListFlag,
}))(ModalListBase);
