"use client"; // Enables client-side rendering for this component
// import image
import Image from 'next/image'
import bgImage from '../../public/digi1.jpg'; // Import the image at the top
// Import necessary hooks from React
import { useState, useEffect, useMemo } from "react";

// Import custom UI components from the UI directory
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// Default export of the DigitalClockComponent function
export default function DigitalClock() {
  // State hooks for managing current time, time format (24-hour or 12-hour), and component mount status
  const [time, setTime] = useState<Date>(new Date());
  const [is24Hour, setIs24Hour] = useState<boolean>(true);
  const [mounted, setMounted] = useState<boolean>(false);

  // Effect hook to run on component mount
  useEffect(() => {
    setMounted(true); // Set mounted status to true
    const interval = setInterval(() => {
      setTime(new Date()); // Update the time every second
    }, 1000);
    return () => clearInterval(interval); // Cleanup the interval on component unmount
  }, []);

  // Memoized computation of formatted time to avoid unnecessary recalculations
  const formattedTime = useMemo<string>(() => {
    if (!mounted) return ""; // Don't render time on the server
    const hours = is24Hour
      ? time.getHours().toString().padStart(2, "0") // Format hours in 24-hour format
      : (time.getHours() % 12 || 12).toString().padStart(2, "0"); // Format hours in 12-hour format
    const minutes = time.getMinutes().toString().padStart(2, "0"); // Format minutes
    const seconds = time.getSeconds().toString().padStart(2, "0"); // Format seconds
    return `${hours}:${minutes}:${seconds}`; // Return formatted time string
  }, [time, is24Hour, mounted]); // Dependencies to re-run the memoized function

  // JSX return statement rendering the digital clock UI
  return (
    <div className=" relative flex items-center justify-center h-screen">
         <Image
  src={bgImage}
  layout="fill"
  objectFit="cover"
  alt="Background Image"
/>
      {/* Center the digital clock within the screen */}
      <Card className=" relative p-8 shadow-lg rounded-2xl bg-gradient-to-br from-pink-400 to-teal-400">
        <div className="flex flex-col items-center justify-center">
          {/* Header with title */}
          <div className="text-4xl font-bold tracking-tight">Digital Clock</div>
          {/* Description */}
          <div className="text-sm font-bold text-teal-900 dark:text-gray-500 mb-4 mt-2">
            Display current time in hours, minutes, and seconds.
          </div>
          {/* Display the formatted time */}
          <div className="text-6xl font-bold tracking-tight text-teal-900 p-4 shadow-lg rounded-2xl  bg-gradient-to-br from-gray-500 to-green-300">
            {formattedTime}
          </div>
          {/* Buttons to switch between 24-hour and 12-hour formats */}
          <div className="mt-4 flex items-center">
  {/* 24-Hour Format Button */}
  <Button
    onClick={() => setIs24Hour(true)}
    className={`mr-2 font-bold  shadow-lg rounded-xl px-4 py-2 
      ${is24Hour
        ? "bg-gradient-to-r from-blue-500 to-pink-900 text-white"
        : "bg-gradient-to-r from-gray-500 to-white text-black border border-gray-300"}`}
  >
    24-Hour Format
  </Button>

  {/* 12-Hour Format Button */}
  <Button
    onClick={() => setIs24Hour(false)}
    className={`mr-2 font-bold shadow-lg rounded-xl px-4 py-2 transition-colors duration-300
      ${!is24Hour
        ? "bg-gradient-to-r from-blue-500 to-pink-900 text-white"
        : "bg-gradient-to-r from-gray-500 to-white text-black border border-gray-300"}`}
  >
    12-Hour Format
  </Button>
</div>

        </div>
      </Card>
    </div>
  );
}