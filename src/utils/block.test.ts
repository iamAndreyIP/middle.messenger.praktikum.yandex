import proxyquire from 'proxyquire';
import { expect } from 'chai';
import * as sinon from 'sinon';
import type BlockType from './block';

const eventBusMock = {
  on: sinon.fake(),
  emit: sinon.fake(),
};

const { default: Block } = proxyquire('./block', {
  './eventBus': {
    default: class {
      emit = eventBusMock.emit;
      on = eventBusMock.on;
    },
  },
}) as { default: typeof BlockType };

describe('Block', () => {
  class ComponentMock extends Block {
    static getContent() {
      return null;
    }
  }

  it('should fire init event on initialization', () => {
    new ComponentMock({});

    expect(eventBusMock.emit.calledWith('init')).to.be.true;
  });

  it('should return content', () => {
    new ComponentMock({});
    expect(ComponentMock.getContent()).to.eql(null);
  });
});
