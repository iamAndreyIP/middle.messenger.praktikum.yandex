import sinon, {
  SinonFakeXMLHttpRequest,
  SinonFakeXMLHttpRequestStatic,
} from 'sinon';
import HTTPTransport from './HTTPTransport';
import { expect } from 'chai';

describe('HTTPTransport', () => {
  let xhr: SinonFakeXMLHttpRequestStatic;
  let instance: HTTPTransport;
  const requests: SinonFakeXMLHttpRequest[] = [];

  beforeEach(() => {
    xhr = sinon.useFakeXMLHttpRequest();

    // @ts-ignore
    global.XMLHttpRequest = xhr;

    xhr.onCreate = (request: SinonFakeXMLHttpRequest) => {
      requests.push(request);
    };

    instance = new HTTPTransport();
  });

  afterEach(() => {
    requests.length = 0;
  });

  it('.get() should send GET request', () => {
    instance.get('/auth/user');

    const [request] = requests;

    expect(request.method).to.eq('GET');
  });

  it('.post() should send POST request', () => {
    instance.post('/auth/user');

    const [request] = requests;

    expect(request.method).to.eq('POST');
  });

  it('.put() should send PUT request', () => {
    instance.put('/auth/user');

    const [request] = requests;

    expect(request.method).to.eq('PUT');
  });
});
