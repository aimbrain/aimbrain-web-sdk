import { Promise } from "../promise";
import { global } from "../util";

let lastUsedStream: MediaStream;

type getUserMedia = (constraints: MediaStreamConstraints,
  successCallback: NavigatorUserMediaSuccessCallback,
  errorCallback: NavigatorUserMediaErrorCallback) => void;

const AudioContext = global.AudioContext || global.webkitAudioContext;
const getUserMedia: getUserMedia = (navigator.getUserMedia
  || (navigator as any).webkitGetUserMedia
  || (navigator as any).mozGetUserMedia).bind(navigator);

/**
 * Checks whether browser supports audio recording
 */
export function isSupported() {
  return !!(getUserMedia && AudioContext);
}

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
function encodeWAV(input: number[], sampleRate: number, channels: number) {
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

/**
 * getUserMedia options
 */
const STREAM_OPTIONS = {
  video: false,
  audio: {
    optional: [],
    mandatory: {
      googEchoCancellation: false,
      googAutoGainControl: false,
      googNoiseSuppression: false,
      googHighpassFilter: false,
    },
  },
};

export function initAudio(): Promise<MediaStream> {
  if (!isSupported()) {
    const err = new Error("Audio capture is not supported on this platform");
    return Promise.reject(err);
  }
  return new Promise((resolve, reject) => {
    getUserMedia(STREAM_OPTIONS, (stream) => { resolve(stream); }, reject);
  });
}

/**
 * Records a sample of specified length in miliseconds
 */
export function recordSample(stream: MediaStream, duration: number = 5000): Promise<Blob> {
  return new Promise((resolve, reject) => {
    lastUsedStream = stream;
    //  Setup nodes
    // ----------------------------------------
    // Create an audio context
    const context: AudioContext = new AudioContext();
    // Create an audio stream source
    const source = context.createMediaStreamSource(stream);
    // Create a gain node
    const gain = context.createGain();
    // Create a script processor
    const createScriptProcessor = context.createScriptProcessor
      || (context as any).createJavaScriptNode;
    const processor: ScriptProcessorNode = createScriptProcessor
      .call(context, 2048, 1, 1);

    //  Connect nodes
    // ----------------------------------------
    // [source] -> [gain] -> [processor] -> [context.destination]
    source.connect(gain);
    gain.connect(processor);
    processor.connect(context.destination);

    //  Listen for data
    // ----------------------------------------
    const samples: number[] = [];
    const audioProcessListener = (e: AudioProcessingEvent) => {
      const channel = e.inputBuffer.getChannelData(0);
      for (let i = 0; i < channel.length; i++) {
        samples.push(channel[i]);
      }
    };
    processor.addEventListener("audioprocess", audioProcessListener);

    //  Stop capturing and resolve
    // ----------------------------------------
    setTimeout(() => {
      stream.getAudioTracks()[0].stop();
      processor.removeEventListener("audioprocess", audioProcessListener);
      const blob = encodeWAV(samples, context.sampleRate, 1);
      resolve(blob);
    }, duration);
  });
}

export function stopStream() {
  try {
    if (lastUsedStream) {
      lastUsedStream.getAudioTracks()[0].stop();
    }
  } catch (e) {
  }
}
