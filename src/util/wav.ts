
/**
 * Appends float data to DataView as 16-bit PCM data
 */
function writeDataViewFloatAsPCM(output: DataView, offset: number, input: number[]) {
    for (let i = 0; i < input.length; i++ , offset += 2) {
        let s = Math.max(-1, Math.min(1, input[i]));
        output.setInt16(offset, s < 0 ? s * 0x8000 : s * 0x7FFF, true);
    }
}

/**
 * Appends string data to DataView
 */
function writeDataViewString(output: DataView, offset: number, string: string) {
    for (let i = 0; i < string.length; i++) {
        output.setUint8(offset + i, string.charCodeAt(i));
    }
}

/**
 * Encodes float samples as a WAV Blob
 */
export function encodeWAV(input: number[], sampleRate: number, channels: number) {
    const buffer = new ArrayBuffer(44 + input.length * 2);
    const view = new DataView(buffer);
    // RIFF identifier
    writeDataViewString(view, 0, "RIFF");
    // RIFF chunk length
    view.setUint32(4, 36 + input.length * 2, true);
    // RIFF type
    writeDataViewString(view, 8, "WAVE");
    // format chunk identifier
    writeDataViewString(view, 12, "fmt ");
    // format chunk length
    view.setUint32(16, 16, true);
    // sample format (raw)
    view.setUint16(20, 1, true);
    // channel count
    view.setUint16(22, channels, true);
    // sample rate
    view.setUint32(24, sampleRate, true);
    // byte rate (sample rate * block align)
    view.setUint32(28, sampleRate * 4, true);
    // block align (channel count * bytes per sample)
    view.setUint16(32, channels * 2, true);
    // bits per sample
    view.setUint16(34, 16, true);
    // data chunk identifier
    writeDataViewString(view, 36, "data");
    // data chunk length
    view.setUint32(40, input.length * 2, true);
    writeDataViewFloatAsPCM(view, 44, input);
    return new Blob([view], {
        type: "audio/wav",
    });
}
