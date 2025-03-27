import React, { useEffect, useRef, useState } from 'react';
import { TimerText } from './index.styled';

interface ITimerProps {
  isActive: boolean;
}

const formatTime = (time: number) => {
  const minutes = Math.floor(time / 60);
  const seconds = String(time % 60).padStart(2, '0');
  return `${minutes}:${seconds}`;
};

const Timer: React.FC<ITimerProps> = ({ isActive }) => {
  const [recordingTime, setRecordingTime] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isActive) {
      setRecordingTime(0);
      timerRef.current = setInterval(() => {
        setRecordingTime((prev) => prev + 1);
      }, 1000);
    } else {
      clearInterval(timerRef.current as NodeJS.Timeout);
      timerRef.current = null;
    }

    return () => {
      clearInterval(timerRef.current as NodeJS.Timeout);
      timerRef.current = null;
    };
  }, [isActive]);

  return <TimerText>{formatTime(recordingTime)}</TimerText>;
};

export default Timer;
