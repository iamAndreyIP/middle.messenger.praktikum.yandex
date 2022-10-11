import Block from '../../utils/block';
import PickedChatActions from './pickedChatActions';
import PickedChatContent, { PickedChatContent2 } from './pickedChatContent';
import { PickedChatHead } from './pickedChatHead';
import store, { StoreEvents } from '../../utils/store';

const template = `
<div class="picked-chat">
    {{{pickedHead}}}

    {{{pickedContent}}}

    {{{pickedActions}}}
</div>
`;

type PickedChatType = {
  pickedHead: PickedChat;
  pickedContent: PickedChatContent;
  pickedActions: PickedChatActions;
};

export default class PickedChat extends Block {
  constructor(props: PickedChatType | undefined | {}) {
    super({ ...props, pickedChatItem: store.getState().pickedChatItem });

    store.on(StoreEvents.UPDATED, () => {
      this.setProps({
        pickedChatItem: store.getState().pickedChatItem,
        messages: store.getState().messages,
      });
    });
  }

  protected addChild(): void {
    this.children.pickedHead = new PickedChatHead({});

    this.children.pickedContent = new PickedChatContent2({});

    this.children.pickedActions = new PickedChatActions({});
  }

  protected render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}
