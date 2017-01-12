import { Promise } from "./promise";

/**
 * Global object
 */
export const global: any = Function("return this")() || {};

/**
 * Assigns own properties of `source` object to the `target` object for all
 * properties that resolve to `undefined`.
 *
 * Example:
 *   defaults({ 'a': 1 }, { 'b': 2 })         => { 'a': 1, 'b': 2 }
 *   defaults({ 'a': 1, 'b': 2 }, { 'b': 3 }) => { 'a': 1, 'b': 2 }
 */
export function defaults<T>(target: T | void, source: T): T {
  const output = Object(target);
  for (let i in source) {
    if (source.hasOwnProperty(i) && !output.hasOwnProperty(i)) {
      output[i] = source[i];
    }
  }
  return output;
}

const URL: {
  createObjectURL(object: any, options?: ObjectURLOptions): string;
  revokeObjectURL(url: string): void;
} = global.URL || global.webkitURL;

/**
 * Forces a download of a blob
 */
export function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.style.display = "none";
  document.body.appendChild(link);
  link.click();
  setTimeout(() => {
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }, 0);
}

/**
 * Encodes blob as Base64
 */
export function blobToBase64(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.addEventListener("loadend", () => {
      resolve(reader.result.split(",")[1]);
    });
    reader.addEventListener("error", reject);
  });
}
