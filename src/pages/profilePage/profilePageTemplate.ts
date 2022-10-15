export const template = `
<main class="profile">
    {{#if changeAvatarModalFlag}}
        {{{changeAvatarModal}}}
    {{/if}}
  {{{changeData}}}
  {{{changePassword}}}
  {{{profileAvatar}}}
  {{{leftPanel}}}

  <div class="profile__user-data">
    <div class="profile__user-data-name">
      <h1>{{currentUserProfile.first_name}}</h1>
    </div>
  </div>

  <ul class="profile__list-data">
        <li class="profile__list-data-item ">
            <span class="list-item--bold">
                Почта
            </span>
            <span class="list-item--light">
            {{currentUser.email}}
            </span>
        </li>
        <li class="profile__list-data-item ">
            <span class="list-item--bold">
                Логин
            </span>
            <span class="list-item--light">
                {{currentUser.login}}
            </span>
        </li>
        <li class="profile__list-data-item ">
            <span class="list-item--bold">
                Имя
            </span>
            <span class="list-item--light">
            {{currentUser.first_name}}
            </span>
        </li>
        <li class="profile__list-data-item ">
            <span class="list-item--bold">
                Фамилия
            </span>
            <span class="list-item--light">
            {{currentUser.second_name}}
            </span>
        </li>
        <li class="profile__list-data-item ">
            <span class="list-item--bold">
                Имя в чате
            </span>
            <span class="list-item--light">
            {{currentUser.login}}
            </span>
        </li>
        <li class="profile__list-data-item ">
            <span class="list-item--bold">
                Телефон
            </span>
            <span class="list-item--light">
            {{currentUser.phone}}
            </span>
        </li>
    </ul>

  <div class="profile__nav">
   
      {{#each profileActions}}
        {{{this}}}
      {{/each}}
   
  </div>
</main>
`;
