import Block from "../../utils/block";
import { template } from "./chatsTemplate";

class Chats extends Block {
  constructor(props: {} | undefined) {
    super(props);
  }

  render() {
    return this.compile(template, this.props);
  }

  show(): void {
    //Переопределение свойства 'block' из родительского класса
    this.getContent()!.style.display = "flex";
  }
}

export const chats = new Chats({});
