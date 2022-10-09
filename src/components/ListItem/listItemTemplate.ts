export const template = `
<li class="list__item{{#if isPicked}} www {{/if}}" data-id="{{id}}">
    <div class="list__item-avatar2">
        
    </div>

    <div class="list__item-content chat__info">
        <h3 class="chat__info-title">{{title}}</h3>

        <div class="chat__info-last-msg">
            {{last_message.content}}
        </div>

        <div class="chat__info-date">
            <span class="date-data">
                <time>{{last_message.time}}</time>
            </span>
            {{#if unread_count}}
            <div class="ring">
                {{unread_count}}
            </div>
            {{/if}}
        </div>
    </div>

</li>
`;
