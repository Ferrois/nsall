import { useState, useEffect } from "react";

const returnTimings = (milliseconds) => {
  // this thing is a logical flow to calculate n convert milliseconds to hours & mins & seconds
  var currentMilliseconds = milliseconds;
  //hours
  const days = Math.floor(currentMilliseconds / (1000 * 60 * 60 * 24));
  currentMilliseconds = currentMilliseconds - days * (1000 * 60 * 60 * 24);
  // hours
  const hours = Math.floor(currentMilliseconds / (1000 * 60 * 60));
  currentMilliseconds = currentMilliseconds - hours * (1000 * 60 * 60);
  // mins
  const minutes = Math.floor(currentMilliseconds / (1000 * 60));
  currentMilliseconds = currentMilliseconds - minutes * (1000 * 60);
  // seconds
  const seconds = Math.floor(currentMilliseconds / 1000);
  currentMilliseconds = currentMilliseconds - seconds * 1000;
  //return an array of stuff
  return [days, hours, minutes, seconds, milliseconds];
};

const useTimeLeft = (target) => {
  const [timeLeft, setTimeleft] = useState(null);
  const targetTime = new Date(target);
  const updateTimeLeft = () => {
    const currentTime = new Date();
    const remainingTime = targetTime - currentTime;
    setTimeleft(returnTimings(remainingTime));
  };
  useEffect(() => {
    updateTimeLeft();
    const interval = setInterval(() => {
      updateTimeLeft();
			// const currentTime = new Date();
			// const remainingTime = targetTime - currentTime;
			// setTimeleft(returnTimings(remainingTime));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return timeLeft || [0, 0, 0, 0, 0];
};

export default useTimeLeft;
