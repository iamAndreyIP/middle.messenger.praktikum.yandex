import Block from '../../utils/block';
import { connect } from '../../utils/store';
import Link from '../../components/Link/link';

const template = `
<div class="profile__avatar">
    <img class="profile__avatar-img" src="https://ya-praktikum.tech/api/v2/resources{{avatar}}" alt="avatar" width="130px" height="130px"/>
    <div class="overlayAvatar">
      {{{avatarLink}}}
    </div>
</div>
`;

type AvatarType = {
  avatarLink: Link;
  avatar?: string;
};

export class AvatarBase extends Block {
  constructor(props: AvatarType) {
    super({ ...props });
  }

  protected render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}

export const Avatar = connect((state) => ({
  avatar: state.currentUser?.avatar,
}))(AvatarBase);
