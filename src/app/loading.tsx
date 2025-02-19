"use client";

import React from "react";
import { ClipLoader } from "react-spinners";

const LoadingSpinner = () => {
  // スピナーのサイズや色をカスタマイズできます
  const size = 50;
  const color = "#1266d5";

  return (
    <div className="h-screen flex justify-center items-center sm:-mt-[156px] max-sm:-mt-[116px]">
      <ClipLoader size={size} color={color} className="spinner-container" />
    </div>
  );
};

export default LoadingSpinner;
