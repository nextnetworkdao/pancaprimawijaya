import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export function ProductSlider() {
  const [posters, setPosters] = useState<{ id: string; image: string }[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    fetch('/api/settings/slider')
      .then(res => res.json())
      .then(d => {
        if (d && Array.isArray(d.posters) && d.posters.length > 0) {
          setPosters(d.posters);
        }
      });
  }, []);

  useEffect(() => {
    if (posters.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev === posters.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(interval);
  }, [posters.length]);

  if (posters.length === 0) return null;

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? posters.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === posters.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 mt-6">
      <div className="relative w-full aspect-[21/9] sm:aspect-[4/1] rounded-2xl overflow-hidden shadow-sm group">
        <AnimatePresence mode="popLayout">
          <motion.img
            key={currentIndex}
            src={posters[currentIndex].image}
            alt="Promo Slider"
            className="absolute inset-0 w-full h-full object-cover"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          />
        </AnimatePresence>

        {posters.length > 1 && (
          <>
            <button
              onClick={handlePrev}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-md text-gray-800 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-md text-gray-800 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-2">
              {posters.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`transition-all rounded-full ${
                    currentIndex === idx 
                      ? "w-6 h-2 bg-white" 
                      : "w-2 h-2 bg-white/50 hover:bg-white/80"
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
