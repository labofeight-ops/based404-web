import React from 'react';

const Explanation: React.FC = () => {
  return (
    <div className="w-full max-w-3xl mx-auto px-8 text-center space-y-8">
      <div className="flex items-center justify-center space-x-4 opacity-20">
        <div className="h-[1px] w-12 bg-white"></div>
        <span className="text-[10px] font-black tracking-[8px] uppercase">The Real Deal</span>
        <div className="h-[1px] w-12 bg-white"></div>
      </div>
      
    </div>
  );
};

export default Explanation;
