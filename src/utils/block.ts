import { v4 as makeUUID } from "uuid";

import Handlebars from "handlebars";

import EventBus from "./eventBus";

class Block {
  static EVENTS = {
    INIT: "init",
    FLOW_CDM: "flow:component-did-mount",
    FLOW_CDU: "flow:component-did-update",
    FLOW_RENDER: "flow:render",
  };

  private _element: HTMLElement | null = null;
  private _meta: { props: any };
  public _id = null;

  protected props: any;
  protected children: Record<string, Block>;
  private eventBus: () => EventBus;

  constructor(propsAndChildren = {}) {
    const eventBus = new EventBus();

    const { props, children } = this._getChildren(propsAndChildren);

    this.children = children;

    this._meta = {
      props,
    };

    this._id = makeUUID();

    this.props = this._makePropsProxy({ ...props, __id: this._id });

    this.eventBus = () => eventBus;

    this._registerEvents(eventBus);
    eventBus.emit(Block.EVENTS.INIT);
  }

  private _registerEvents(eventBus: EventBus) {
    eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  private _getChildren(propsAndChildren: any) {
    const children: any = {};
    const props: any = {};

    Object.entries(propsAndChildren).forEach(([key, value]) => {
      if (value instanceof Block) {
        children[key] = value;
      } else {
        props[key] = value;
      }
    });

    return { props, children };
  }

  init() {
    this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
  }

  private _componentDidMount() {
    this.componentDidMount();

    Object.values(this.children).forEach((child) => {
      child.dispatchComponentDidMount();
    });
  }

  componentDidMount(oldProps?: any) {}

  dispatchComponentDidMount() {
    this.eventBus().emit(Block.EVENTS.FLOW_CDM);
  }

  private _componentDidUpdate(oldProps: any, newProps: any) {
    if (this.componentDidUpdate(oldProps, newProps)) {
      this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
    }
  }

  componentDidUpdate(oldProps: any, newProps: any) {
    return true;
  }

  setProps = (nextProps: any) => {
    if (!nextProps) {
      return;
    }

    Object.assign(this.props, nextProps);
  };

  get element(): HTMLElement | null {
    return this._element;
  }

  private _render() {
    const block = this.render();

    const newElement = block.firstElementChild as HTMLElement;

    if (this._element) {
      this._removeEvents();
      this._element.replaceWith(newElement);
    }

    this._element = newElement;

    this._addEvents();
  }

  protected render(): DocumentFragment {
    return new DocumentFragment();
  }

  getContent(): HTMLElement | null {
    return this.element;
  }

  private _makePropsProxy(props: any) {
    const self = this;
    return new Proxy(props as unknown as object, {
      get(target: Record<string, unknown>, prop: string) {
        const value = target[prop];
        return typeof value === "function" ? value.bind(target) : value;
      },

      set(target: Record<string, unknown>, prop: string, value: unknown) {
        const oldProps = { ...target };

        target[prop] = value;

        self.eventBus().emit(Block.EVENTS.FLOW_CDU, oldProps, target);

        return true;
      },

      deleteProperty() {
        throw new Error("permission denaed");
      },
    });
  }

  private _removeEvents() {
    const { events = {} } = this.props;
    if (!events) {
      return;
    }

    Object.keys(events).forEach((eventName) => {
      this._element!.removeEventListener(eventName, events[eventName]);
    });
  }

  private _addEvents() {
    const { events = {} } = this.props;
    if (!events) {
      return;
    }

    Object.keys(events).forEach((eventName) => {
      this._element!.addEventListener(eventName, events[eventName]);
    });
  }

  private _createDocumentElement(tagName: string): HTMLElement {
    const element = document.createElement(tagName);
    element.setAttribute("data-id", this._id!);
    return element;
  }

  compile(template: string, props: any): DocumentFragment {
    const propsAndStubs = { ...props };

    Object.entries(this.children).forEach(([key, child]) => {
      propsAndStubs[key] = `<div data-id="${child._id}"></div>`;
    });

    const fragment = this._createDocumentElement(
      "template"
    ) as HTMLTemplateElement;

    fragment.innerHTML = Handlebars.compile(template)(propsAndStubs);

    Object.values(this.children).forEach((child) => {
      const stub = fragment.content.querySelector(`[data-id="${child._id}"]`);

      if (!stub) {
        return;
      }

      stub.replaceWith(child.getContent()!);
    });

    return fragment.content;
  }

  show() {
    this.getContent()!.style.display = "block";
  }

  hide() {
    this.getContent()!.style.display = "none";
  }
}

export default Block;
