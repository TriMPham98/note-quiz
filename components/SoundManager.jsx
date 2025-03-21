import React, { useRef, useCallback, useEffect, useState } from "react";

const SoundManager = () => {
  const successAudioRef = useRef(null);
  const errorAudioRef = useRef(null);
  const practiceSuccessAudioRef = useRef(null);
  const highScoreSuccessAudioRef = useRef(null);

  return (
    <>
      <audio ref={successAudioRef} src="/success.mp3" />
      <audio ref={errorAudioRef} src="/error.mp3" />
      <audio ref={practiceSuccessAudioRef} src="/practiceSuccess.mp3" />
      <audio ref={highScoreSuccessAudioRef} src="/highScoreSuccess.mp3" />
    </>
  );
};

export const useSound = () => {
  const sampler = useRef(null);
  const [isBrowser, setIsBrowser] = useState(false);
  const Tone = useRef(null);

  // First check if we're in the browser
  useEffect(() => {
    setIsBrowser(typeof window !== "undefined");
  }, []);

  // Then load Tone.js dynamically only on the client side
  useEffect(() => {
    if (isBrowser) {
      // Dynamically import Tone.js only on the client side
      import("tone").then((ToneModule) => {
        Tone.current = ToneModule.default;

        // Initialize the sampler with piano samples
        sampler.current = new Tone.current.Sampler({
          urls: {
            C4: "C4.mp3",
            "D#4": "Ds4.mp3",
            "F#4": "Fs4.mp3",
            A4: "A4.mp3",
          },
          baseUrl: "https://tonejs.github.io/audio/salamander/",
        }).toDestination();

        // Wait for the sampler to load
        Tone.current.loaded().then(() => {
          console.log("Piano samples loaded");
        });
      });
    }
  }, [isBrowser]);

  const playSound = useCallback(
    (soundType) => {
      if (!isBrowser) return;

      let audio;
      switch (soundType) {
        case "success":
          audio = new Audio("/success.mp3");
          break;
        case "error":
          audio = new Audio("/error.mp3");
          break;
        case "practiceSuccess":
          audio = new Audio("/practiceSuccess.mp3");
          break;
        case "highScoreSuccess":
          audio = new Audio("/highScoreSuccess.mp3");
          break;
        default:
          console.error("Invalid sound type");
          return;
      }
      audio.play();
    },
    [isBrowser]
  );

  const playNote = useCallback(
    (note, octave) => {
      if (!isBrowser || !sampler.current || !Tone.current) {
        console.log("Tone.js not ready yet");
        return;
      }

      try {
        sampler.current.triggerAttackRelease(`${note}${octave}`, "4n");
      } catch (error) {
        console.error("Error playing note:", error);
      }
    },
    [isBrowser]
  );

  return { playSound, playNote };
};

export default SoundManager;
