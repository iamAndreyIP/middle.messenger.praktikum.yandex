import BaseApi from './baseApi';
import { User } from './authApi';

export interface ChatInfo {
  id: number;
  title: string;
  avatar: string;
  unread_count: number;
  last_message: {
    user: User;
    time: string;
    content: string;
  };
}

export class ChatApi extends BaseApi {
  private endpoint: string;
  constructor(path: string) {
    super();
    this.endpoint = BaseApi.API_URL + path;
  }

  create(title: { title: string }): Promise<unknown> {
    return this.http.post(`${this.endpoint}/`, {
      data: JSON.stringify(title),
      mode: 'cors',
      headers: { 'Content-type': 'application/json' },
    });
  }

  addUser(chatData: { chatId: number; users: number[] }): Promise<unknown> {
    return this.http.put(`${this.endpoint}/users`, {
      data: JSON.stringify(chatData),
      mode: 'cors',
      headers: { 'Content-type': 'application/json' },
    });
  }

  deleteUser(chatData: { users: []; chatId: number }): Promise<unknown> {
    return this.http.delete(`${this.endpoint}/users`, {
      data: JSON.stringify(chatData),
      mode: 'cors',
      headers: { 'Content-type': 'application/json' },
    });
  }

  read(): Promise<ChatInfo[] | unknown> {
    return this.http.get(`${this.endpoint}/`);
  }

  getToken(id: number) {
    return this.http.post(`${this.endpoint}/token/${id}`);
  }

  getUsersOfChat(id: number) {
    return this.http.get(`${this.endpoint}/${id}/users`);
  }

  delete(chat: { chatId: number }) {
    return this.http.delete(`${this.endpoint}/`, {
      data: JSON.stringify(chat),
      mode: 'cors',
      headers: { 'Content-type': 'application/json' },
    });
  }

  update = undefined;
}

export default new ChatApi('/chats');
