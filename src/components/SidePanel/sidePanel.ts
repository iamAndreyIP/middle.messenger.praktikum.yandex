import Block from '../../utils/block';

const template = `
<div class="profile__left">
    <div class="profile__nav-icon">
        {{{leftArrowIcon}}}
    </div>
</div>
`;

export default class SidePanel extends Block {
  constructor(props: {} | undefined) {
    super(props);
  }

  render() {
    return this.compile(template, this.props);
  }
}
