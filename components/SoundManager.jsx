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

// Map of notes to URLs for preloading
const NOTE_URLS = {
  C3: "https://tonejs.github.io/audio/salamander/C3.mp3",
  D3: "https://tonejs.github.io/audio/salamander/D3.mp3",
  E3: "https://tonejs.github.io/audio/salamander/E3.mp3",
  F3: "https://tonejs.github.io/audio/salamander/F3.mp3",
  G3: "https://tonejs.github.io/audio/salamander/G3.mp3",
  A3: "https://tonejs.github.io/audio/salamander/A3.mp3",
  B3: "https://tonejs.github.io/audio/salamander/B3.mp3",
  C4: "https://tonejs.github.io/audio/salamander/C4.mp3",
  D4: "https://tonejs.github.io/audio/salamander/D4.mp3",
  E4: "https://tonejs.github.io/audio/salamander/E4.mp3",
  F4: "https://tonejs.github.io/audio/salamander/F4.mp3",
  G4: "https://tonejs.github.io/audio/salamander/G4.mp3",
  A4: "https://tonejs.github.io/audio/salamander/A4.mp3",
  B4: "https://tonejs.github.io/audio/salamander/B4.mp3",
};

export const useSound = () => {
  const [isBrowser, setIsBrowser] = useState(false);
  const audioCache = useRef({});

  // Check if we're in the browser
  useEffect(() => {
    setIsBrowser(typeof window !== "undefined");
  }, []);

  // Preload audio samples if in browser
  useEffect(() => {
    if (!isBrowser) return;

    // Preload notes
    Object.entries(NOTE_URLS).forEach(([note, url]) => {
      const audio = new Audio();
      audio.src = url;
      audio.load(); // Preload the audio file
      audioCache.current[note] = audio;
    });

    console.log("Audio samples preloaded");
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
      audio.play().catch((err) => console.error("Error playing sound:", err));
    },
    [isBrowser]
  );

  const playNote = useCallback(
    (note, octave) => {
      if (!isBrowser) {
        console.log("Browser environment not available");
        return;
      }

      const noteWithOctave = `${note}${octave}`;

      try {
        // Check if we have this note cached
        if (audioCache.current[noteWithOctave]) {
          // Create a new instance to allow overlapping sounds
          const audio = new Audio(audioCache.current[noteWithOctave].src);
          audio
            .play()
            .catch((err) => console.error("Error playing note:", err));
        } else {
          // Fallback if note not in cache
          console.log(`Note ${noteWithOctave} not found in cache`);
          // Try to play it anyway from the standard URL pattern
          const audio = new Audio(
            `https://tonejs.github.io/audio/salamander/${noteWithOctave}.mp3`
          );
          audio
            .play()
            .catch((err) => console.error("Error playing note:", err));
        }
      } catch (error) {
        console.error("Error playing note:", error);
      }
    },
    [isBrowser]
  );

  return { playSound, playNote };
};

export default SoundManager;
