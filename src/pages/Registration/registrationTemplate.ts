export const template = `
<form action="#" class="registration-form">
  <div class="registration-form__fields">
    <h3 class="registration-form__title">{{formTitle}}</h3>
    <div class="input-field-box">
      {{{emailInput}}}
      <span class="error-m"></span>
    </div>
    <div class="input-field-box">
      {{{loginInput}}}
      <span class="error-m"></span>
    </div>
    <div class="input-field-box">
      {{{firstNameInput}}}
      <span class="error-m"></span>
    </div>
    <div class="input-field-box">
      {{{secondNameInput}}}
      <span class="error-m"></span>
    </div>
    <div  class="input-field-box">
      {{{phoneInput}}}
      <span class="error-m"></span>
    </div>
    <div class="input-field-box">
      {{{passwordInput}}}
      <span class="error-m"></span>
    </div>
    <div class="input-field-box">
      {{{repeatPasswordInput}}}
      <span class="error-m"></span>
    </div>
  </div>
  <div class="registration-form__buttons">
    {{{submitButton}}}
    {{{loginLink}}}
  </div>
</form>
`;
