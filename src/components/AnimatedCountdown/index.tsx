import React, { useState, useEffect } from "react";
import { useSpring, animated } from "react-spring";

type AnimatedCountdownProps = {
  endDate: Date;
};

const AnimatedCountdown: React.FC<AnimatedCountdownProps> = ({ endDate }) => {
  const [timeRemaining, setTimeRemaining] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  }>(getTimeRemaining(endDate));

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimeRemaining(getTimeRemaining(endDate));
    }, 1000);

    return () => clearInterval(intervalId);
  }, [endDate]);

  const { seconds } = timeRemaining;
  const { number } = useSpring({
    number: seconds,
    from: { number: seconds - 1 },
    config: { tension: 80, friction: 60 },
  });

  return (
    <animated.p style={{ fontSize: 24 }}>
      {number.interpolate((val) => Math.ceil(val))}
    </animated.p>
  );
};

export default AnimatedCountdown;

function getTimeRemaining(endDate: Date) {
    const total = endDate.getTime() - Date.now();
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
    const days = Math.floor(total / (1000 * 60 * 60 * 24));
    return { days, hours, minutes, seconds };
}