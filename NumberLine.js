import { useState } from "react";
import { Button } from "@/components/ui/button"; // Remove this if not using a UI library
import { motion } from "framer-motion";

export default function NumberLine() {
  const zoomLevels = [
    { start: 3.0, end: 4.0, interval: 0.1, decimals: 1 },
    { start: 3.1, end: 3.2, interval: 0.01, decimals: 2 },
    { start: 3.14, end: 3.15, interval: 0.001, decimals: 3 },
    { start: 3.141, end: 3.142, interval: 0.0001, decimals: 4 },
    { start: 3.1415, end: 3.1416, interval: 0.00001, decimals: 5 },
    { start: 3.14159, end: 3.14160, interval: 0.000001, decimals: 6 },
    { start: 3.141592, end: 3.141593, interval: 0.0000001, decimals: 7 },
    { start: 3.1415926, end: 3.1415927, interval: 0.00000001, decimals: 8 },
    { start: 3.14159265, end: 3.14159266, interval: 0.000000001, decimals: 9 },
    { start: 3.141592653, end: 3.141592654, interval: 0.0000000001, decimals: 10 },
    ...Array.from({ length: 40 }, (_, i) => {
      const zoomFactor = Math.pow(10, i + 10);
      const pi = 3.1415926535;
      return {
        start: parseFloat((pi - 5 / zoomFactor).toFixed(15)),
        end: parseFloat((pi + 5 / zoomFactor).toFixed(15)),
        interval: 1 / zoomFactor,
        decimals: Math.min(10 + i, 15), // Limit decimal places to prevent overflow
      };
    }),
  ];

  const [zoomIndex, setZoomIndex] = useState(0);
  const { start, end, interval, decimals } = zoomLevels[zoomIndex];
  const pi = 3.1415926535;

  const zoomIn = () => {
    if (zoomIndex < zoomLevels.length - 1) {
      setZoomIndex(zoomIndex + 1);
    }
  };

  const zoomOut = () => {
    if (zoomIndex > 0) {
      setZoomIndex(zoomIndex - 1);
    }
  };

  const generateTicks = () => {
    let ticks = [];
    let maxTicks = 20; // Ensure at most 20 visible ticks
    let step = Math.max(1, Math.floor((end - start) / interval / maxTicks));

    for (let i = start; i <= end; i += interval * step) {
      ticks.push(parseFloat(i.toFixed(decimals)).toString()); // Prevent scientific notation
    }
    return ticks;
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen space-y-6 p-4">
      <div className="flex space-x-4">
        <button onClick={zoomIn} className="px-4 py-2 bg-blue-500 text-white rounded">
          Zoom In
        </button>
        <button onClick={zoomOut} className="px-4 py-2 bg-gray-500 text-white rounded">
          Zoom Out
        </button>
      </div>
      <div className="relative w-full max-w-4xl border-t border-gray-400 mt-6 overflow-hidden">
        <motion.div
          initial={{ x: 0 }}
          animate={{ x: 0 }} // Keep position stable
          transition={{ duration: 0.5 }}
          className="flex justify-between mt-2 whitespace-nowrap"
        >
          {generateTicks().map((tick, index) => (
            <div key={index} className="relative text-center" style={{ minWidth: "40px" }}>
              <div className="w-1 h-4 bg-gray-600 mx-auto" />
              <span className="text-xs font-normal">{tick}</span>
            </div>
          ))}
        </motion.div>
        <motion.div
          initial={{ left: `${((pi - start) / (end - start)) * 100}%` }}
          animate={{ left: `${((pi - start) / (end - start)) * 100}%` }}
          transition={{ duration: 0.5 }}
          className="absolute top-0 transform -translate-y-1/2 text-red-500 font-bold"
        >
          π
        </motion.div>
      </div>
    </div>
  );
}
