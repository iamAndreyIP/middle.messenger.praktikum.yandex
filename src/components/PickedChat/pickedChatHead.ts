import { User } from '../../api/authApi';
import Block from '../../utils/block';
import store from '../../utils/store';
import ChatMenuActionsBase, {
  ChatMenuActions,
} from '../ChatActionsMenu/chatActionsMenu';
import Icon from '../Icons/icons';
import { ThreeDots } from '../Icons/iconsTemplates';
import { withStore } from '../ListItem/listItem';

const template = `
<div class="picked-chat__head">
    
    {{#if chatMenuActionsFlag}}
        {{{chatMenuActions}}}
    {{/if}}
    
    <div class="picked-chat__info">
        <div class="picked-chat__avatar"></div>
        <div class="picked-chat__title">{{pickedChatItem.title}}</div>
    </div>

    <div class="users-count" title="Колличество участников чата">{{usersOflist.length}}</div>

    <div class="three-dots__box">
        {{{threeDotsIcon}}}
    </div>
    {{{testIcon}}}
</div>
`;

type PickedChatHeadBaseType = {
  chatMenuActions: ChatMenuActionsBase;
  pickedChatItem: User;
  threeDotsIcon: Icon;
  testIcon: Icon;
  chatMenuActionsFlag?: boolean;
};

export default class PickedChatHeadBase extends Block {
  constructor(props: PickedChatHeadBaseType) {
    super(props);

    this.props.chatMenuActionsFlag = true;

    this.props.events = {
      click: function (e: { target: Element | null }) {
        const title = document.querySelector('.picked-chat__title');

        const flag = store.getState().openUsersListFlag;

        if (e.target === title && !flag) {
          store.set('openUsersListFlag', true);
        }
      },
    };
  }

  protected addChild(): void {
    this.children.threeDotsIcon = new Icon(
      {
        events: {
          click: () => {
            document
              .querySelector('.three-dots__box')
              ?.classList.toggle('active');

            document.querySelector('.tooltip')?.classList.toggle('hidde');
          },
        },
      },
      ThreeDots
    );

    this.children.chatMenuActions = new ChatMenuActions({});
  }

  protected render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}

export const PickedChatHead = withStore(PickedChatHeadBase);
