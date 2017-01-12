import { Promise } from "../promise";
import { defaults } from "../util";

/**
 * Base request configuration object interface.
 */
interface BaseRequestConfig {
  baseUrl: string;
  headers: {
    [prop: string]: string;
  };
}

/**
 * Request configuration object interface.
 */
interface RequestConfig {
  baseUrl?: string;
  headers?: {
    [prop: string]: string;
  };
  method?: "get" | "post";
  uri?: string;
  query?: {
    [prop: string]: string;
  };
  body?: any;
}

/**
 * Base request config with some defaults
 */
const baseConfig: BaseRequestConfig = {
  baseUrl: "https://api.aimbrain.com",
  headers: {
    "Content-Type": "application/json",
  },
};

/**
 * Set a base location of request.
 */
export function setBaseUrl(url: string): void {
  baseConfig.baseUrl = url;
}

/**
 * Set default request headers.
 */
export function setBaseHeader(name: string, value: string) {
  baseConfig.headers[name] = value;
}

/**
 * Request class.
 *
 * Encapsulates a request to an API endpoint, with ability to serialize it
 * without actually making a request.
 *
 * Has a Promise-like .then() method, for ease of use.
 *
 * .send() will explicitly send a request.
 * .serialize() will return the request payload without sending a request.
 */
export class Request<TRes> implements BaseRequestConfig, RequestConfig {

  /**
   * A memoized response promise.
   */
  private promise: Promise<TRes>;

  /**
   * Array of middlewares
   */
  private middleware: ({
    onResolve: (x) => any,
    onReject?: (x) => any,
  })[] = [];

  // Contents of RequestConfig interface
  baseUrl: string;
  headers: {
    [prop: string]: string;
  };
  method?: "get" | "post";
  uri?: string;
  query?: {
    [prop: string]: string;
  };
  body?: any;

  constructor(config?: RequestConfig) {
    // Initialize from baseConfig
    this.baseUrl = baseConfig.baseUrl;
    this.headers = defaults({}, baseConfig.headers);
    // Initialize from config
    if (config) {
      defaults(this, config);
    }
  }

  /**
   * Handles an API response while making a request to an API endpoint.
   */
  then<T>(onResolve: (value: TRes) => T, onReject?: (reason) => T): Promise<T> {
    return this.send().then<T>(onResolve, onReject);
  }

  /**
   * Handles an API response without making a request.
   *
   * Useful as a middleware for the request.
   *
   * NOTE: Beware of heavy type-casting! This function mutates the object
   * while changing its signature.
   */
  use<T>(onResolve: (value: TRes) => T, onReject?: (reason) => T): Request<T> {
    this.middleware.push({ onResolve, onReject });
    return (this as any) as Request<T>;
  }

  /**
   * Makes a request to an API endpoint.
   * Returns a Promise wrapping a response of a generic type T.
   */
  send(): Promise<TRes> {
    // Return a cached promise
    if (this.promise) {
      return this.promise;
    }
    // Create an XHR object
    const xhr = new XMLHttpRequest();
    // Open it
    xhr.open(this.method, this.baseUrl + this.uri);
    // Set headers
    for (let i in this.headers) {
      if (this.headers.hasOwnProperty(i)) {
        xhr.setRequestHeader(i, this.headers[i]);
      }
    }
    // Create a response promise
    this.promise = new Promise<TRes>((resolve, reject) => {
      xhr.addEventListener("load", (e) => {
        let response;
        try {
          response = JSON.parse(xhr.responseText);
          if (xhr.status !== 200) {
            response.errorCode = xhr.status;
          }
        } catch (e) {
          response = xhr.response;
        }
        if (xhr.status !== 200) {
          return reject(response);
        } else {
          return resolve(response);
        }
      });
      // Send with JSON payload
      if (this.body) {
        const body = JSON.stringify(this.body);
        return xhr.send(body);
      }
      // Send without payload
      return xhr.send();
    });
    // Apply middleware to the promise
    this.middleware.forEach(({ onResolve, onReject }) => {
      this.promise = this.promise.then(onResolve, onReject);
    });
    // Return a promise
    return this.promise;
  }

  /**
   * Serializes the payload to be sent to an API endpoint.
   */
  serialize(): string {
    return JSON.stringify(this.body);
  }
}
