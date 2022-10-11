import Block from '../../utils/block';
import Input from '../Input/input';

const template = `
<form class="{{formClass}}">

    <div class="login-form__fields">

        <h3 class="login-form__title">{{formTitle}}</h3>

        {{#each formFields}}
            <div class="input-field-box">
                {{{this}}}
                <span class="error-m"></span>
            </div>
        {{/each}}
    </div>

    <div class="login-form__buttons">
        {{#each formActions}}
            {{{this}}}
        {{/each}}
    </div>

</form>
`;

type FormType = {
  formTitle: string;
  formFields: Input[];
  formActions: any[];
  events?: {};
  formClass?: string;
};

export default class Form extends Block {
  constructor(props: FormType) {
    super(props);
  }

  protected render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}
