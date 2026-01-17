import React from 'react';

const FeaturedOn: React.FC = () => {
  const brands = [
    "FORBES",
    "WIRED",
    "BLOOMBERG",
    "THE NEW YORK TIMES",
    "TECHCRUNCH"
  ];

  return (
    <div className="w-full max-w-7xl mx-auto px-8 overflow-hidden">
      <div className="flex flex-col items-center space-y-12">
        
        
        {/* Strictly one line on mobile with horizontal scroll, centered on desktop */}
        
      </div>
      
      <style>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

export default FeaturedOn;
