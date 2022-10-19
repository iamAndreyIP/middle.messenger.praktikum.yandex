import Router from './Router';
import { expect } from 'chai';
import * as sinon from 'sinon';
import Block from './block';

describe('Router', () => {
  global.window.history.back = () => {
    if (typeof window.onpopstate === 'function') {
      window.onpopstate({
        currentTarget: window,
      } as unknown as PopStateEvent);
    }
  };
  global.window.history.forward = () => {
    if (typeof window.onpopstate === 'function') {
      window.onpopstate({
        currentTarget: window,
      } as unknown as PopStateEvent);
    }
  };

  const getContentFake = sinon.fake.returns(document.createElement('div'));

  const BlockMock = class {
    getContent = getContentFake;
  } as unknown as typeof Block;

  let router;

  beforeEach(() => {
    router = new Router();
  });

  it('use() should return Router instance', () => {
    const res = router.use('/', BlockMock);

    expect(res).to.eq(router);
  });

  describe('back()', () => {
    it('should render a page on history back action', () => {
      router.use('/', BlockMock).start();

      router.back();

      expect(getContentFake.callCount).to.eq(3);
    });

    it('should render a page on start', () => {
      router.use('/', BlockMock).start();

      expect(getContentFake.callCount).to.eq(5);
    });
  });
});

//
