'use client';

import React, { useState, useRef, useEffect } from 'react';

export default function SixPointFootwork() {
  const [tempo, setTempo] = useState(2.0);
  const [maxRounds, setMaxRounds] = useState(20);
  const [output, setOutput] = useState('_');
  const [isRunning, setIsRunning] = useState(false);

  const timerRef = useRef(null);
  const currentRoundRef = useRef(0);
  const audioFilesRef = useRef([]);

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
      <main style={styles.container}>
        <h1 style={styles.header}>Fixed Tempo Reader</h1>

        <div style={styles.inputGroup}>
          <label style={styles.label}>Tempo (Secs):</label>
          <input
            type="number"
            value={tempo}
            step="0.1"
            min="0.1"
            onChange={(e) => setTempo(parseFloat(e.target.value))}
            style={styles.input}
            disabled={isRunning}
          />
        </div>

        <div style={styles.inputGroup}>
          <label style={styles.label}>Max Rounds:</label>
          <input
            type="number"
            value={maxRounds}
            min="1"
            onChange={(e) => setMaxRounds(parseInt(e.target.value))}
            style={styles.input}
            disabled={isRunning}
          />
        </div>

        <div style={styles.output}>{output}</div>

        <button
          onClick={handleToggle}
          style={styles.button}
        >
          {isRunning ? 'Stop' : 'Start'}
        </button>
      </main>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '300px',
    width: '100%',
    padding: '30px',
    textAlign: 'center',
  },
  header: {
    marginTop: 0,
    marginBottom: '20px',
    fontSize: '1.5rem',
    fontWeight: 'bold',
  },
  inputGroup: {
    marginBottom: '15px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    display: 'inline-block',
    width: '140px',
    textAlign: 'right',
    marginRight: '10px',
    color: 'white',
  },
  input: {
    width: '80px',
    textAlign: 'center',
    padding: '5px',
    borderRadius: '4px',
    border: '1px solid #ccc',
  },
  output: {
    fontSize: '5rem',
    margin: '20px 0',
    minHeight: '100px',
    lineHeight: '100px',
    fontWeight: 'bold',
    color: 'white',
  },
  button: {
    padding: '12px 25px',
    fontSize: '18px',
    color: 'white',
    border: '1px solid #ccc',
    borderRadius: '5px',
    cursor: 'pointer',
    width: '100%',
    marginTop: '20px',
    transition: 'background-color 0.2s',
  },
};