
import { Request, RequestConfig } from "../util/request";
import { hmacSha256 } from "../util/hmac";
import * as base64 from "../util/base64" 

export let baseUrl: string; 
export let apiKey: string;
export let apiSecret: string;

/**
 * @hidden Signs API request. Signing is done by adding HTTP header 
 * `X-aimbrain-signature` to a request.  
 * @param req request to be signed 
 */
function signRequest<T>(request: Request<T>) {
    // HMAC signature message
    const message = [
        request.method.toUpperCase(),
        request.uri.toLowerCase(),
        JSON.stringify(request.body),
    ].join("\n");
    // Generate the signature
    const signature = base64.encode(hmacSha256(apiSecret, message, true));
    // Add a signature header
    request.headers["X-aimbrain-apikey"] = apiKey;
    request.headers["X-aimbrain-signature"] = signature;
    return request;
}

export function setBaseUrl(url: string) {
    baseUrl = url;
}

export function setApiCredentials(key: string, secret: string) {
    apiKey = key;
    apiSecret = secret;
}

export function createRequest<T>(config: RequestConfig): Request<T> {
    config.baseUrl = baseUrl;
    let request = new Request<T>(config); 
    request.headers["Content-Type"] = "application/json";    
    if (apiKey != null && apiSecret != null) {
        signRequest(request);
    }    
    return request;
}  