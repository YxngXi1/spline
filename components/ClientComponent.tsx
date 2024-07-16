'use client'

import Spline from '@splinetool/react-spline/next';
import React, { useEffect, useState } from 'react'

export default function Home() {
  const [keyPressed, setKeyPressed] = useState(false);
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);

  const startKeyPressSimulation = (key: string) => {
    const keyDownEvent = new KeyboardEvent('keydown', { key: key });
    document.dispatchEvent(keyDownEvent);
    const id = setInterval(() => {
      document.dispatchEvent(keyDownEvent);
    }, 100); 
    setIntervalId(id);
  }

  const stopKeyPressSimulation = (key: string) => {
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(null);
      const keyUpEvent = new KeyboardEvent('keyup', { key: key });
      document.dispatchEvent(keyUpEvent);
    }
  }

  const handleKeyPress = (event: { key: string; }) => {
      if (keyPressed) return;

      if (event.key === '1' || event.key === '1') {
        console.log('1 key was pressed');
      } else if (event.key === '2' || event.key === '2') {
        console.log('2 key was pressed');
      } else if (event.key === '0' || event.key === '0') {
        console.log('0 key was pressed');
      } else if (event.key === 'Enter' || event.key === 'Enter') {
        console.log('Enter key was pressed');
      }
      setKeyPressed(true); 
      setTimeout(() => setKeyPressed(false), 100); // Reset the flag after a short delay
  }

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [keyPressed]); // Re-add the listener when keyPressed changes

  return (
    <main>
      <Spline
        scene="https://prod.spline.design/hRxPlLPnK7Oecexf/scene.splinecode" 
      />
      <button 
        onMouseDown={() => startKeyPressSimulation('1')} 
        onMouseUp={() => stopKeyPressSimulation('1')}
      >A</button>
      <button 
        onMouseDown={() => startKeyPressSimulation('2')} 
        onMouseUp={() => stopKeyPressSimulation('2')}
      >B</button>
      <button 
        onMouseDown={() => startKeyPressSimulation('0')} 
        onMouseUp={() => stopKeyPressSimulation('0')}
      >0</button>
      <button 
        onMouseDown={() => startKeyPressSimulation('Enter')} 
        onMouseUp={() => stopKeyPressSimulation('Enter')}
      >Enter</button>
    </main>
  );
}