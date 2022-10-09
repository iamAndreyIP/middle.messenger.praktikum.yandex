import Block from '../../utils/block';
import { connect } from '../../utils/store';

const template = `
<div class="profile__avatar">
    <img class="profile__avatar-img" src="https://ya-praktikum.tech/api/v2/resources{{avatar}}" alt="" width="130px" height="130px"/>
    <div class="overlayAvatar">
      {{{avatarLink}}}
    </div>
</div>
`;

export class AvatarBase extends Block {
  constructor(props: {} | undefined) {
    super({ ...props });
  }

  protected render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}

export const Avatar = connect((state) => ({
  avatar: state.currentUser?.avatar,
}))(AvatarBase);
