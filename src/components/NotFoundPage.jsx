import React, { useState, useEffect } from "react";
import { Link } from "react-router";

export default function NotFoundPage() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [eyePositions, setEyePositions] = useState({
    left: { x: 0, y: 0 },
    right: { x: 0, y: 0 },
  });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    const leftEyeCenter = document
      .getElementById("left-eye")
      ?.getBoundingClientRect();
    const rightEyeCenter = document
      .getElementById("right-eye")
      ?.getBoundingClientRect();

    if (leftEyeCenter && rightEyeCenter) {
      const calculatePupilPosition = (eyeRect) => {
        const eyeCenterX = eyeRect.left + eyeRect.width / 2;
        const eyeCenterY = eyeRect.top + eyeRect.height / 2;

        const angle = Math.atan2(
          mousePos.y - eyeCenterY,
          mousePos.x - eyeCenterX
        );
        const distance = Math.min(
          15,
          Math.hypot(mousePos.x - eyeCenterX, mousePos.y - eyeCenterY) / 20
        );

        return {
          x: Math.cos(angle) * distance,
          y: Math.sin(angle) * distance,
        };
      };

      setEyePositions({
        left: calculatePupilPosition(leftEyeCenter),
        right: calculatePupilPosition(rightEyeCenter),
      });
    }
  }, [mousePos]);

  return (
    <div className="min-h-screen bg-linear-to-br from-rose-50 to-rose-100 flex items-center justify-center p-4">
      <div className="text-center">
        {/* Eyes Container */}
        <div className="flex justify-center gap-12 mb-8">
          {/* Left Eye */}
          <div
            id="left-eye"
            className="w-32 h-32 bg-white rounded-full shadow-lg flex items-center justify-center relative overflow-hidden border-4 border-rose-300"
          >
            <div
              className="w-12 h-12 bg-rose-600 rounded-full transition-transform duration-100 ease-out"
              style={{
                transform: `translate(${eyePositions.left.x}px, ${eyePositions.left.y}px)`,
              }}
            >
              <div className="w-5 h-5 bg-rose-900 rounded-full ml-2 mt-2"></div>
            </div>
          </div>

          {/* Right Eye */}
          <div
            id="right-eye"
            className="w-32 h-32 bg-white rounded-full shadow-lg flex items-center justify-center relative overflow-hidden border-4 border-rose-300"
          >
            <div
              className="w-12 h-12 bg-rose-600 rounded-full transition-transform duration-100 ease-out"
              style={{
                transform: `translate(${eyePositions.right.x}px, ${eyePositions.right.y}px)`,
              }}
            >
              <div className="w-5 h-5 bg-rose-900 rounded-full ml-2 mt-2"></div>
            </div>
          </div>
        </div>

        {/* 404 Text */}
        <h1 className="text-9xl font-bold text-rose-600 mb-4">404</h1>

        {/* Message */}
        <h2 className="text-3xl font-semibold text-rose-800 mb-4">
          Oops! Page Not Found
        </h2>
        <p className="text-rose-600 text-lg mb-8 max-w-md mx-auto">
          The page you're looking for seems to have wandered off. Let's get you
          back on track!
        </p>

        {/* Button */}
        <Link
          to={"/"}
          className="bg-rose-600 hover:bg-rose-700 text-white font-semibold px-8 py-3 rounded-full shadow-lg transition-all duration-200 hover:scale-105"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
}
