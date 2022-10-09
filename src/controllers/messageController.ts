import WSTransport from '../utils/WSTransport';
import store from '../utils/store';
import { User } from '../api/authApi';
import { WSTransportEvents } from '../utils/WSTransport';

class MessageController {
  private sockets: Map<number, WSTransport> = new Map();

  async connect(id: number, token: string) {
    if (this.sockets.has(id)) {
      return;
    }
    const userId: number = (store.getState().currentUser as unknown as User).id;

    const wsTransport = new WSTransport(
      `wss://ya-praktikum.tech/ws/chats/${userId}/${id}/${token}`
    );

    this.sockets.set(id, wsTransport);

    await wsTransport.connect();

    this.subscribe(wsTransport, id);
    this.fetchOldMessage(id);
  }

  getSocket(id: number) {
    const socket = this.sockets.get(id);

    if (!socket) {
      throw new Error(`Chat n ${id} is not connected`);
    }

    return socket;
  }

  sendMessage(id: number, message: string) {
    const socket = this.getSocket(id);

    socket.send({
      type: 'message',
      content: message,
    });
  }

  fetchOldMessage(id: number) {
    const socket = this.getSocket(id);

    socket.send({ type: 'get old', content: '0' });
  }

  formatMessage(messages: any) {
    const uId = (store.getState().currentUser as unknown as User).id;
    messages.formatTime =
      messages.type === 'message' ? messages.time.slice(11, 16) : null;
    +messages.user_id === +uId
      ? (messages.owner = true)
      : (messages.owner = false);

    return messages;
  }

  onClose(id: number) {
    this.sockets.delete(id);
  }

  allClose() {
    Array.from(this.sockets.values()).forEach((socket) => {
      socket.close();
    });
  }

  onMessage(id: number, messages: any) {
    let allMessages: any[] = [];

    if (Array.isArray(messages)) {
      allMessages = messages.map((m) => this.formatMessage(m)).reverse();
    } else {
      allMessages.push(this.formatMessage(messages));
    }

    const currentMessages = (store.getState().messages || {})[id] || [];

    allMessages = [...currentMessages, ...allMessages];

    store.set(`messages.${id}`, allMessages);
  }

  subscribe(transport: WSTransport, id: number) {
    transport.on(WSTransportEvents.Message, (message) => {
      this.onMessage(id, message);
    });
    transport.on(WSTransportEvents.Close, () => this.onClose(id));
  }
}

export default new MessageController();
