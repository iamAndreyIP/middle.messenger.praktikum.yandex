import Block from '../../utils/block';
import store, { connect } from '../../utils/store';
import Icon from '../Icons/icons';
import { Add } from '../Icons/iconsTemplates';

const template = `
<div class="tooltip hidde">
      <div class="tooltip__add">
        <div>
          {{{addIcon}}}
        </div>
        Добавить пользователя
      </div>
      <div class="tooltip__delete">
        {{{deleteIcon}}}
        Удалить пользователя
      </div>
</div>
`;

export default class ChatMenuActionsBase extends Block {
  constructor(props: {} | undefined) {
    super({ ...props });
  }

  protected addChild(): void {
    this.children.addIcon = new Icon(
      {
        cls: 'add',
        events: {
          click: () => {
            store.set('addUserToChatFlag', true);
          },
        },
      },
      Add
    );

    this.children.deleteIcon = new Icon(
      {
        cls: 'delete',
        events: {
          click: () => {
            store.set('deleteUserToChatFlag', true);
          },
        },
      },
      Add
    );
  }

  protected render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}

export const ChatMenuActions = connect((state) => ({
  deleteUserToChatFlag: state.deleteUserToChatFlag,
  addUserToChatFlag: state.addUserToChatFlag,
}))(ChatMenuActionsBase);
