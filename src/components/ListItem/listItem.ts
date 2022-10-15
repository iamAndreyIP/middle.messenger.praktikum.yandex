import Block from '../../utils/block';
import { template } from './listItemTemplate';
import { connect } from '../../utils/store';
import { ChatInfo } from '../../api/chatApi';

type ListItem = {
  id: number;
  title: string;
  unread_count: number;
  pickedChatItem: ChatInfo;
  events?: {
    click: () => void;
  };
};

export class ListItemBase extends Block {
  constructor(props: {} | ListItem) {
    super(props);
  }

  render() {
    return this.compile(template, {
      ...this.props,
      isPicked: this.props.id === this.props.pickedChatItem?.id,
    });
  }
}

export const withStore = connect((state) => ({
  pickedChatItem: (state.listOfChat || []).find(
    ({ id }) => id === state.pickedChatId
  ),
  usersOflist: state.usersOflist,
}));

export const ListItem = withStore(ListItemBase);
