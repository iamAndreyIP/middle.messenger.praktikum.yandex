import { expect } from 'chai';
import Button from './button';
import sinon from 'sinon';

describe('Button', () => {
  it('should render', () => {
    new Button({
      buttonClass: '',
      buttonText: 'test',
      events: { onClick(e: Event): void {} },
    });
  });

  it('element should return button', () => {
    const btn = new Button({
      buttonClass: '',
      buttonText: 'test',
      events: { onClick(e: Event): void {} },
    });
    const element = btn.element;

    expect(element).to.be.instanceof(window.HTMLButtonElement);
  });
});
