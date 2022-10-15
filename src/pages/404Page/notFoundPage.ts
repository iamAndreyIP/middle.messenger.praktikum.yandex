import { router } from '../../..';
import MyError from '../../components/Error/error';
import Link from '../../components/Link/link';
import Block from '../../utils/block';

const template = `
<div>
    {{{errorData}}}
</div>
`;

export default class NotfoundPage extends Block {
  constructor(props: {} | undefined) {
    super(props);
  }

  protected addChild(): void {
    this.children.errorData = new MyError({
      errorMessage: '404',
      errorTitle: 'Не туда попали',
      errorLink: new Link({
        linkHref: '/',
        linkClass: 'error__link link',
        linkText: 'Назад к чатам',
        events: {
          click: function (e: Event) {
            e.preventDefault();
            router.go('/messanger');
          },
        },
      }),
    });
  }

  protected render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}
