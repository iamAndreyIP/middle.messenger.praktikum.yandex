import API, { ChatApi } from '../api/chatApi';
import store from '../utils/store';
import MessageController from './messageController';

export class ChatController {
  private readonly api: ChatApi;

  constructor() {
    this.api = API;
  }

  async createChat(title: string) {
    try {
      const response: any = await this.api.create({ title });

      if (response.response.includes('id')) {
        this.fetchChats();
      }
    } catch (error) {
      console.error(error);
    }
  }

  async fetchChats() {
    try {
      const response: any = await this.api.read();

      const chats = JSON.parse(response.response);

      store.set('listOfChat', chats);
    } catch (error) {
      console.error(error);
    }
  }

  async getToken(chatId: number) {
    try {
      const response: any = await this.api.getToken(chatId);
      const { token } = JSON.parse(response.response);

      await MessageController.connect(chatId, token);
    } catch (error) {
      console.error(error);
    }
  }

  async addUserToChat(chatData: { users: number[]; chatId: number }) {
    try {
      const res: any = await this.api.addUser(chatData);

      await this.getUsersOfChat(chatData.chatId);
    } catch (error) {
      console.error(error);
    }
  }

  async deleteUserToChat(chatData: { users: any; chatId: any }) {
    try {
      const res: any = await this.api.deleteUser(chatData);

      await this.getUsersOfChat(chatData.chatId);
    } catch (error) {
      console.error(error);
    }
  }

  async getUsersOfChat(id: number) {
    try {
      const res: any = await this.api.getUsersOfChat(id);

      if (!res.response.includes('reason')) {
        const users = JSON.parse(res.response);

        store.set('usersOflist', users || []);
      } else {
        console.log(res.response);
      }
    } catch (error) {
      console.error(error);
    }
  }

  async deleteChat(chat: { chatId: number }) {
    try {
      const res: any = await this.api.delete(chat);

      if (res.response.includes('reason')) {
        console.log('bed response', res.response);
      } else {
        console.log('ok response', res.response);
        const newlistOfChat = store
          .getState()
          .listOfChat.filter((ch) => Number(ch.id) !== Number(chat.chatId));

        store.set('listOfChat', newlistOfChat);
      }
    } catch (error) {
      console.error(error);
    }
  }

  setPickedChatId(id: number) {
    store.set('pickedChatId', id);
  }
}

export default new ChatController();
