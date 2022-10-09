export const template = `
<div class="modal hidde">

    <div class="change-data-window">
        {{#if changeDataFlag}}
        <ul class="profile__list-data">
            <li class="profile__list-data-item ">
                <span class="list-item--bold">
                    Почта
                </span>
                <span class="list-item--light">
                    <input value="{{currentUser.email}}" class="change-data-profile" name="email"/>
                </span>
            </li>
            <li class="profile__list-data-item ">
                <span class="list-item--bold">
                    Логин
                </span>
                <span class="list-item--light">
                    <input value="{{currentUser.login}}" class="change-data-profile" name="login"/>
                    <span class="error-m"></span>              
                </span>
            </li>
            <li class="profile__list-data-item ">
                <span class="list-item--bold">
                    Имя
                </span>
                <span class="list-item--light">
                <input value="{{currentUser.first_name}}" class="change-data-profile" name="first_name"/>               
                </span>
            </li>
            <li class="profile__list-data-item ">
                <span class="list-item--bold">
                    Фамилия
                </span>
                <span class="list-item--light">
                <input value="{{currentUser.second_name}}" class="change-data-profile" name="second_name"/>               
                </span>
            </li>
            <li class="profile__list-data-item ">
                <span class="list-item--bold">
                    Телефон
                </span>
                <span class="list-item--light">
                    <input value="{{currentUser.phone}}" class="change-data-profile" name="phone"/>
                </span>
            </li>
        </ul>

        {{else}}

        <ul class="profile__list-data">
            <li class="profile__list-data-item ">
                <span class="list-item--bold">
                    Пароль
                </span>
                <span class="list-item--light">
                    <input type="password" class="change-data-profile" name="password" placeholder="Текущий пароль"/>
                </span>
            </li>
            <li class="profile__list-data-item ">
                <span class="list-item--bold">
                    Новый пароль
                </span>
                <span class="list-item--light">
                    <input type="password" class="change-data-profile" name="new_password" placeholder="Новый  Пароль"/>
                </span>
            </li>
            <li class="profile__list-data-item ">
                <span class="list-item--bold">
                    Повторить новый пароль
                </span>
                <span class="list-item--light">
                    <input type="password" class="change-data-profile" name="new_password2" placeholder="Повторить новый пароль"/>
                </span>
            </li>
        </ul>

        {{/if}}

        <div class="profile__nav">
            {{{saveBtn}}}
        </div>

    </div>

</div>
`;
