import Block from "../../utils/block";

const template = `
    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 leftArrowIcon" viewBox="0 0 20 20" fill="currentColor">
    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm.707-10.293a1 1 0 00-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L9.414 11H13a1 1 0 100-2H9.414l1.293-1.293z" clip-rule="evenodd" />
    </svg>
`;

export default class LeftArrowIcon extends Block {
  constructor() {
    super();
  }

  render() {
    return this.compile(template, this.props);
  }
}

export const leftArrowIcon = new LeftArrowIcon();