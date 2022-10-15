import Block from '../../utils/block';
import Icon from '../Icons/icons';

const template = `
<div class="profile__left">
    <div class="profile__nav-icon">
        {{{leftArrowIcon}}}
    </div>
</div>
`;

type SidePanelType = {
  leftArrowIcon: Icon;
};

export default class SidePanel extends Block {
  constructor(props: SidePanelType) {
    super(props);
  }

  render() {
    return this.compile(template, this.props);
  }
}
