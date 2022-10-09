import Block from '../../utils/block';
import { BlueArrow2, Clip } from '../Icons/iconsTemplates';
import Input from '../Input/input';
import Icon from '../Icons/icons';
import MessageController from '../../controllers/messageController';
import store from '../../utils/store';

const template = `
<div class="picked-chat__actions">
    {{{clipModal}}}

    <div>
        {{{clipIcon}}}
    </div>

    {{{inputMessage}}}

    {{{blueArrowIcon}}}
</div>
`;

export default class PickedChatActions extends Block {
  constructor(props: {} | undefined) {
    super(props);
  }

  protected addChild(): void {
    this.children.inputMessage = new Input({
      inputClass: 'message',
      inputName: 'message',
      inputPlaceholder: 'Сообщение',
      inputType: 'text',
      events: {
        keypress: function (event: any) {
          if (this && this.value.length > 0 && event.key === 'Enter') {
            const value: string = (this as HTMLInputElement).value;
            const chatId = store.getState().pickedChatId;

            MessageController.sendMessage(chatId, value);

            this.value = '';
            this.focus();
          }
        },
      },
    });

    this.children.blueArrowIcon = new Icon(
      {
        events: {
          click: function (event: { key: string }) {
            const input: HTMLInputElement | null =
              document.querySelector('.message');

            if (input && input.value.length > 0) {
              const value = input.value;
              const chatId = store.getState().pickedChatId;

              value.length
                ? MessageController.sendMessage(chatId, value)
                : null;
              input.value = '';
              input.focus();
            }
          },
        },
      },
      BlueArrow2
    );
    this.children.clipIcon = new Icon(
      {
        events: {
          click: function () {
            console.log('click blue clip');
          },
        },
      },
      Clip
    );
  }

  protected render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}
