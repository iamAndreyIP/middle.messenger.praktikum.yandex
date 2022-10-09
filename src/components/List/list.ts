import Block from '../../utils/block';
import store from '../../utils/store';
import { ListItem } from '../ListItem/listItem';
import { connect } from '../../utils/store';
import ChatController from '../../controllers/chatController';

const template = `
<ul class="menu__list list" width="310">
    {{{addChatButton}}}

    {{#if chat.length}}
        {{#each chat}}
            {{{this}}}
        {{/each}}
    {{else}}
        <div class="msg__no-pick-chat" style="text-align:center">Пока что нет ни одного чата</div>
    {{/if}}

</ul>
`;

type listType = {
  addChatButton: Block;
  listOfChat?: Block[];
  events?: { [key: string]: (e: Event) => void };
};

export class ListBase extends Block {
  constructor(props: listType) {
    super({
      ...props,
    });
  }

  protected addChild(): void {
    this.children.listOfChat = this.createChat(this.props);
  }

  private createChat(props) {
    return props.listOfChat.map((chat) => {
      if (chat.last_message) {
        const formatTime = chat.last_message.time.slice(11, 16);

        chat.last_message.time = formatTime;
      }
      return new ListItem({
        ...chat,
        events: {
          click: async function () {
            ChatController.setPickedChatId(chat.id);
            ChatController.getUsersOfChat(chat.id);
            await ChatController.getToken(chat.id);

            if (chat) {
              store.set('pickedChatFlag', true);
            }
          },
        },
      });
    });
  }

  componentDidUpdate(oldProps: any, newProps: any): boolean {
    this.children.chat = this.createChat(newProps);

    return true;
  }

  protected render() {
    return this.compile(template, this.props);
  }
}

function mapStateToProps(state: any) {
  return {
    listOfChat: state.listOfChat || [],
  };
}

const withStore = connect(mapStateToProps);

export const List = withStore(ListBase);
