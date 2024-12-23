'use client';
import React from "react";
import { useLoading } from "@/app/context/loading-context";

const LoadingOverlay = () => {
  const { loading } = useLoading();

  return loading ? (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 cursor-none">
      {/* Optional: You can add a spinner here */}
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-white"></div>
    </div>
  ) : null;
};

export default LoadingOverlay;
