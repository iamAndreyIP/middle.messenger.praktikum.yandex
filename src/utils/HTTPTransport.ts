enum Methods {
  GET = "GET",
  PUT = "PUT",
  POST = "POST",
  DELETE = "DELETE",
}

function queryStringify(data: any): string {
  if (typeof data !== "object") {
    throw new Error("Data must be object");
  }

  const keys = Object.keys(data);
  return keys.reduce((result, key, index) => {
    return `${result}${key}=${data[key]}${index < keys.length - 1 ? "&" : ""}`;
  }, "?");
}

type Options = {
  method?: Methods;
  data?: any;
  headers?: any;
  timeout?: number;
};

class HTTPTransport {
  get = (url: string, options: Options = {}) => {
    return this.request(
      url,
      { ...options, method: Methods.GET },
      options.timeout
    );
  };

  post = (url: string, options = {}) => {
    return this.request(url, { ...options, method: Methods.POST });
  };

  put = (url: string, options = {}) => {
    return this.request(url, { ...options, method: Methods.PUT });
  };

  delete = (url: string, options = {}) => {
    return this.request(url, { ...options, method: Methods.DELETE });
  };

  request = (url: string, options: Options = {}, timeout = 5000) => {
    const { headers = {}, method, data } = options;

    return new Promise(function (resolve, reject) {
      if (!method) {
        reject("No method");
        return;
      }

      const xhr = new XMLHttpRequest();
      const isGet = method === Methods.GET;

      xhr.open(method, isGet && !!data ? `${url}${queryStringify(data)}` : url);

      Object.keys(headers).forEach((key) => {
        xhr.setRequestHeader(key, headers[key]);
      });

      xhr.onload = function () {
        resolve(xhr);
      };

      xhr.onabort = reject;
      xhr.onerror = reject;

      xhr.timeout = timeout;
      xhr.ontimeout = reject;

      if (isGet || !data) {
        xhr.send();
      } else {
        xhr.send(data);
      }
    });
  };
}
