export function stringToHex(input: string): string {
  return uint8ArrayToHex(stringToUint8Array(input));
}

export function stringToUint8Array(input: string): number[] {
  let output: number[] = [];
  for (let i = 0; i < input.length; i++) {
    output.push(input.charCodeAt(i));
  }
  return output;
}

export function stringToUint32Array(input: string): number[] {
  return uint8ArrayToUint32Array(stringToUint8Array(input));
};

export function hexToString(input: string): string {
  return uint8ArrayToString(hexToUint8Array(input));
}

export function hexToUint8Array(input: string): number[] {
  let output: number[] = [];
  for (let i = 0; i < input.length; i += 2) {
    output.push(parseInt(input.substr(i, 2), 16));
  }
  return output;
}

export function hexToUint32Array(input: string): number[] {
  return uint8ArrayToUint32Array(hexToUint8Array(input));
}

export function uint8ArrayToString(input: number[]): string {
  return input.map((x) => String.fromCharCode(x)).join("");
}

export function uint8ArrayToHex(input: number[]): string {
  let output = "";
  for (let i = 0; i < input.length; i++) {
    output += (input[i] < 0x10 ? "0" : "") + input[i].toString(16);
  }
  return output;
}

export function uint8ArrayToUint32Array(input: number[]): number[] {
  const output: number[] = [];
  const length = input.length;
  let tmp = 0;
  let i = 0;
  for (i = 0; i < length || (i & 3) !== 0; i++) {
    tmp <<= 8;
    if (i < length) {
      tmp |= input[i];
    }
    if ((i & 3) === 3) {
      output.push(tmp);
      tmp = 0;
    }
  }
  return output;
}

export function uint32ArrayToString(input: number[], outputLenght?: number): string {
  return uint8ArrayToString(uint32ArrayToUint8Array(input, outputLenght));
}

export function uint32ArrayToHex(input: number[], outputLenght?: number): string {
  return uint8ArrayToHex(uint32ArrayToUint8Array(input, outputLenght));
}

export function uint32ArrayToUint8Array(input: number[], outputLength?: number): number[] {
  const output: number[] = [];
  const length = input.length;
  for (let i = 0; i < length; i++) {
    const value = input[i];
    for (let i = 3; i >= 0; i--) {
      output.push(value >> 8 * i & 0xff);
    }
  }
  if (outputLength) {
    return output.slice(0, outputLength);
  }
  return output;
}
