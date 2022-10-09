import EventBus from './eventBus';
import { set, isEqual } from './helpers';
import Block from './block';

export function connect(mapStateToProps: (state: any) => any) {
  return function (component: typeof Block) {
    return class extends component {
      constructor(props: {} | undefined) {
        let previousState = mapStateToProps(store.getState());
        super({ ...props, ...previousState });

        store.on(StoreEvents.UPDATED, () => {
          let newState = mapStateToProps(store.getState());

          if (!isEqual(previousState, newState)) {
            this.setProps({ ...newState });
          }

          previousState = newState;
        });
      }
    };
  };
}

export const StoreEvents = {
  UPDATED: 'update',
};

class Store extends EventBus {
  private state: any = {};

  public getState() {
    return this.state;
  }

  public set(path: string, value: unknown) {
    set(this.state, path, value);

    this.emit(StoreEvents.UPDATED);
  }
}

const store = new Store();

export default store;
