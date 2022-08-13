export const template = `
<form action="#" class="login-form">
  <div class="login-form__fields">
    <h3 class="login-form__title">{{formTitle}}</h3>
    <div class="input-field-box">
      {{{loginInput}}}
      <span class="error-m"></span>
    </div>
    <div class="input-field-box">
      {{{passwordInput}}}
      <span class="error-m"></span>
    </div>
  </div>
  <div class="login-form__buttons">
    {{{submitButton}}}
    {{{loginLink}}}
  </div>
</form>
`;
