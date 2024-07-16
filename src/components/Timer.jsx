import React, { useEffect, useRef, useState } from "react";
import { FaPlay, FaPause } from "react-icons/fa";
import { GrPowerReset } from "react-icons/gr";

const Timer = ({ userEmail }) => {
  const [time, setTime] = useState(1500); // 25 minutes in seconds
  const [breakTime, setBreakTime] = useState(300); // 5 minutes in seconds
  const [isActive, setIsActive] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    // Timer logic for work time
    if (isActive && time > 0) {
      timerRef.current = setTimeout(() => {
        setTime(time - 1);
      }, 1000);
    } else if (time === 0) {
      setIsBreak(true);
      setIsActive(false);
    }

    // Timer logic for break time
    if (isBreak && breakTime > 0) {
      timerRef.current = setTimeout(() => {
        setBreakTime(breakTime - 1);
      }, 1000);
    } else if (breakTime === 0) {
      setIsBreak(false);
      setTime(1500);
      setBreakTime(300);
    }

    // Cleanup function for useEffect
    return () => clearTimeout(timerRef.current);
  }, [time, breakTime, isActive, isBreak]);

  const toggleTimer = () => {
    setIsActive((prev) => !prev); // Toggle isActive state
  };

  const resetTimer = () => {
    setIsActive(false);
    setTime(1500);
    setBreakTime(300);
    setIsBreak(false);
  };

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m < 10 ? "0" : ""}${m}:${s < 10 ? "0" : ""}${s}`;
  };

  return (
    <div className="flex justify-center items-center flex-col mt-8 gap-8">
      <h1 className="text-2xl font-semibold border-2 p-2 bg-black text-white">
        Hey <span className="underline text-gray-500">{userEmail}</span>{" "}
        Welcome!!!
      </h1>

      <h3 className="font-normal text-xl">
        {isBreak
          ? `Your Break Time: ${formatTime(breakTime)}`
          : `Your Work Time: ${formatTime(time)}`}
      </h3>
      <div className="flex gap-8">
        {/* Conditional rendering based on isActive state */}
        {isActive ? (
          <button onClick={toggleTimer} className="text-3xl font-bold">
            <FaPause />
          </button>
        ) : (
          <button onClick={toggleTimer} className="text-3xl font-bold">
            <FaPlay />
          </button>
        )}
        <button onClick={resetTimer} className="text-3xl font-bold">
          <GrPowerReset />
        </button>
      </div>
    </div>
  );
};

export default Timer;
