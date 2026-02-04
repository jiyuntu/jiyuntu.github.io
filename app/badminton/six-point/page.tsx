'use client';

import React, { useState, useRef, useEffect } from 'react';
import styles from './page.module.css'

export default function SixPointFootwork() {
  const [tempo, setTempo] = useState(2.0);
  const [maxRounds, setMaxRounds] = useState(20);
  const [output, setOutput] = useState('_');
  const [isRunning, setIsRunning] = useState(false);

  const timerRef = useRef<NodeJS.Timeout>(null);
  const currentRoundRef = useRef(0);
  const audioFilesRef = useRef<HTMLAudioElement[]>([]);

  useEffect(() => {
    const loadedAudio = [];
    for (let i = 1; i <= 6; i++) {
      loadedAudio.push(new Audio(`/${i}.m4a`));
    }
    audioFilesRef.current = loadedAudio;

    return () => stopReader();
  }, []);

  const playRandomNumber = () => {
    if (currentRoundRef.current >= maxRounds) {
      stopReader();
      return;
    }

    currentRoundRef.current += 1;

    const randomIndex = Math.floor(Math.random() * 6);
    const randomNumber = randomIndex + 1;

    if (audioFilesRef.current[randomIndex]) {
      const audio = audioFilesRef.current[randomIndex];
      audio.currentTime = 0;
      audio.play().catch((e) => console.log("Audio play error:", e));
    }

    setOutput(randomNumber.toString());
  };

  const startReader = () => {
    if (tempo <= 0) return alert("Tempo must be > 0");
    if (maxRounds <= 0) return alert("Rounds must be > 0");

    currentRoundRef.current = 0;
    setIsRunning(true);

    playRandomNumber();

    const intervalTime = tempo * 1000;
    timerRef.current = setInterval(playRandomNumber, intervalTime);
  };

  const stopReader = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    setIsRunning(false);
    setOutput('_');
  };

  const handleToggle = () => {
    if (isRunning) {
      stopReader();
    } else {
      startReader();
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-black">
      <main className={styles.container}>
        <h1 className={styles.header}>Fixed Tempo Reader</h1>

        <div className={styles.inputGroup}>
          <label className={styles.label}>Tempo (Secs):</label>
          <input
            type="number"
            value={tempo}
            step="0.1"
            min="0.1"
            onChange={(e) => setTempo(parseFloat(e.target.value))}
            className={styles.input}
            disabled={isRunning}
          />
        </div>

        <div className={styles.inputGroup}>
          <label className={styles.label}>Max Rounds:</label>
          <input
            type="number"
            value={maxRounds}
            min="1"
            onChange={(e) => setMaxRounds(parseInt(e.target.value))}
            className={styles.input}
            disabled={isRunning}
          />
        </div>

        <div className={styles.output}>{output}</div>

        <button onClick={handleToggle} className={styles.button}>
          {isRunning ? 'Stop' : 'Start'}
        </button>
      </main>
    </div>
  );
}