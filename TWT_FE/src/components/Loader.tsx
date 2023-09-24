import React from 'react';

function Loader() {
  return (
    <div className="flex gap-1">
      <div className="w-2 h-2 rounded-full animate-pulse bg-skyblue"></div>
      <div className="w-2 h-2 rounded-full animate-pulse bg-skyblue"></div>
      <div className="w-2 h-2 rounded-full animate-pulse bg-skyblue"></div>
    </div>
  );
}

export default Loader;
