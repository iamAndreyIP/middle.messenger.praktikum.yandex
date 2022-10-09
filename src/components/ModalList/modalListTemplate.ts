export const template = `
<div class="modal">

    <div class="modal__content-list">
        <h3 class="modal__content-title">
            Список пользователей чата
        </h3>
        {{#if usersOflist.length}}
            {{#each usersOflist}}
                
                {{{this}}}

            {{/each}}
        {{else}}

            <div class="modal__conten-list-item-text">
                Нет пользователей в этом чате
            </div>

        {{/if}}
    </div>

</div>
`;

export const templateItem = `
<div class="modal__conten-list-item">
    <div class="modal__conten-list-item-text">
        {{login}} - {{id}}
        <br/>
        Role - {{role}}
    </div>

    <div class="modal__conten-list-item-icon">
        {{{deleteUserFromChatIcon}}}
    </div>
</div>
`;
