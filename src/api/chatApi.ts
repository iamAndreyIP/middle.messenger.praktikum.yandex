import BaseApi from './baseApi';

export class ChatApi extends BaseApi {
  private endpoint: string;
  constructor(path: string) {
    super();
    this.endpoint = BaseApi.API_URL + path;
  }

  create(title: { title: string }) {
    return this.http.post(`${this.endpoint}/`, {
      data: JSON.stringify(title),
      mode: 'cors',
      headers: { 'Content-type': 'application/json' },
    });
  }

  addUser(chatData: any) {
    return this.http.put(`${this.endpoint}/users`, {
      data: JSON.stringify(chatData),
      mode: 'cors',
      headers: { 'Content-type': 'application/json' },
    });
  }

  deleteUser(chatData: any): Promise<unknown> {
    return this.http.delete(`${this.endpoint}/users`, {
      data: JSON.stringify(chatData),
      mode: 'cors',
      headers: { 'Content-type': 'application/json' },
    });
  }

  read() {
    return this.http.get(`${this.endpoint}/`);
  }

  getToken(id: number) {
    return this.http.post(`${this.endpoint}/token/${id}`);
  }

  getUsersOfChat(id: number) {
    return this.http.get(`${this.endpoint}/${id}/users`);
  }

  delete(chat: { chatId: string }) {
    return this.http.delete(`${this.endpoint}/`, {
      data: JSON.stringify(chat),
      mode: 'cors',
      headers: { 'Content-type': 'application/json' },
    });
  }

  update = undefined;
}

export default new ChatApi('/chats');
