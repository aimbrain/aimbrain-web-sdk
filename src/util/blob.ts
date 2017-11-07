import { global } from "./env/global";
import { Promise } from "./promise";

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
