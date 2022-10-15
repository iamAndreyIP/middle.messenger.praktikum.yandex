export const template = `
<div class="modal {{modalClass}}">
      
      <div class="modal__content {{classForList}}">
      
        <h3 class="modal__content-title">
          {{modalTitle}}
        </h3>

        <div class="modal__content-input">
        
          {{{modalInput}}}

        </div>

        {{{modalList}}}

        <div class="modal__content-btn">
        
          {{{modalButton}}}
        
        </div>
        
      </div>

</div>
`;
