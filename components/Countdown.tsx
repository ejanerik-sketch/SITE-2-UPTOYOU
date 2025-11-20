import React, { useState, useEffect } from 'react';
import { EVENT_DATE } from '../constants';
import { CountdownTime } from '../types';

const Countdown: React.FC = () => {
  const calculateTimeLeft = (): CountdownTime => {
    const difference = +EVENT_DATE - +new Date();
    let timeLeft: CountdownTime = { days: 0, hours: 0, minutes: 0, seconds: 0 };

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }
    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState<CountdownTime>(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearTimeout(timer);
  });

  return (
    <div className="flex justify-center gap-4 md:gap-8 mt-6 text-white">
      {Object.entries(timeLeft).map(([unit, value]) => (
        <div key={unit} className="flex flex-col items-center">
          <span className="text-3xl md:text-5xl font-bold bg-black/30 rounded-lg p-2 min-w-[60px] text-center backdrop-blur-sm">
            {value.toString().padStart(2, '0')}
          </span>
          <span className="text-xs md:text-sm uppercase mt-1 font-semibold tracking-wider">{unit}</span>
        </div>
      ))}
    </div>
  );
};

export default Countdown;