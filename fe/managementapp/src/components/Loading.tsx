import React from "react";

interface LoadingProps {
  fullscreen?: boolean;
}

const Loading: React.FC<LoadingProps> = ({ fullscreen = false }) => {
  const loadingContent = (
    <div className="flex flex-col items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mb-3"></div>
      <p className="text-gray-600">Đang tải...</p>
    </div>
  );

  if (fullscreen) {
    return (
      <div className="fixed inset-0 bg-white bg-opacity-90 z-50 flex items-center justify-center">
        {loadingContent}
      </div>
    );
  }

  return (
    <div className="w-full h-full min-h-[200px] flex items-center justify-center">
      {loadingContent}
    </div>
  );
};

export default Loading;
