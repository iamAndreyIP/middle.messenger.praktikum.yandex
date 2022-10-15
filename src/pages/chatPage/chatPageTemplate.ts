export const template = `
<div class="chat">

    {{#if addUserToChatFlag}}

        {{{addUserModal}}}

    {{/if}}

    {{#if deleteUserToChatFlag}}

        {{{deleteUserModal}}}

    {{/if}}

    {{#if addChatFlag}}

        {{{addChatModal}}}

    {{/if}}

    {{#if openUsersListFlag}}

        {{{modalList}}}

    {{/if}}


    <div class="menu">
        <div class="head">
            {{{profileLink}}}

            {{{searchInput}}}
        </div>

        {{{chatList}}}

    </div>

    <div class="content">
        {{#if pickedChatFlag}}

            {{{pickedChat}}}

        {{else}}

            <div class="msg__no-pick-chat">
                Вберите чат что бы отправить сообщение
            </div>
            
        {{/if}}
    </div>

</div>
`;
