import React, { useEffect, useState } from "react";

const countdownClock = (endDate) => {
  const [countDown, setCountDown] = useState(endDate - new Date().getTime());

  useEffect(() => {
    const interval = setInterval(() => {
      setCountDown(endDate - new Date().getTime());
    }, 1000);

    return () => clearInterval(interval);
  }, [countDown]);

  return getReturnValues(countDown);
};

const getReturnValues = (countDown) => {
  const days = Math.floor(countDown / (1000 * 60 * 60 * 24));
  const hours = Math.floor((countDown % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((countDown % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((countDown % (1000 * 60)) / 1000);
  return [days, hours, minutes, seconds];
};

export { countdownClock };
