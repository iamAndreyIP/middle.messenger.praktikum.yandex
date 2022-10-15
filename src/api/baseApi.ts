import HTTPTransport from '../utils/HTTPTransport';

export default abstract class BaseApi {
  static API_URL = 'https://ya-praktikum.tech/api/v2';

  protected http: HTTPTransport;

  constructor() {
    this.http = new HTTPTransport();
  }

  public abstract create?(data: unknown): Promise<unknown>;

  public abstract read?(data: unknown): Promise<unknown>;

  public abstract update?(date: unknown): Promise<unknown>;

  public abstract delete?(date: unknown): Promise<unknown>;
}
