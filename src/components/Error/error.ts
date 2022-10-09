import Block from '../../utils/block';

import { template } from './errorTemplate';

type errorTypes = {
  errorTitle: string;
  errorMessage: string;
  errorLink: {};
};

export default class MyError extends Block {
  constructor(props: errorTypes) {
    super(props);
  }

  protected render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}
