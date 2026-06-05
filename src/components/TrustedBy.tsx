import React from 'react';

export function TrustedBy() {
  return (
    <div className="mt-12 pt-8 border-t border-white/10 overflow-hidden">
      <p className="text-xs text-gray-400 mb-4 font-semibold uppercase tracking-wider">Dipercaya oleh industri modern</p>
      
      <style>
        {`
          @keyframes scroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(calc(-100% - 1rem)); }
          }
          .mobile-marquee {
            display: flex;
            width: max-content;
            animation: scroll 8s linear infinite;
          }
          @media (min-width: 640px) {
            .mobile-marquee {
              animation: none;
              width: 100%;
              justify-content: space-between;
            }
          }
        `}
      </style>
      
      <div className="flex w-max sm:w-full gap-4 sm:gap-8 opacity-70 grayscale">
        <div className="mobile-marquee shrink-0 gap-4 sm:gap-8 items-center">
          <img src="/img/icon1.png" alt="Industry 1" className="h-8 sm:h-10 w-auto object-contain" />
          <img src="/img/icon2.png" alt="Industry 2" className="h-8 sm:h-10 w-auto object-contain" />
          <img src="/img/icon3.png" alt="Industry 3" className="h-8 sm:h-10 w-auto object-contain" />
          <img src="/img/icon4.png" alt="Industry 4" className="h-8 sm:h-10 w-auto object-contain" />
        </div>
        <div className="mobile-marquee shrink-0 gap-4 sm:gap-8 items-center sm:hidden" aria-hidden="true">
          <img src="/img/icon1.png" alt="Industry 1" className="h-8 sm:h-10 w-auto object-contain" />
          <img src="/img/icon2.png" alt="Industry 2" className="h-8 sm:h-10 w-auto object-contain" />
          <img src="/img/icon3.png" alt="Industry 3" className="h-8 sm:h-10 w-auto object-contain" />
          <img src="/img/icon4.png" alt="Industry 4" className="h-8 sm:h-10 w-auto object-contain" />
        </div>
      </div>
    </div>
  );
}
