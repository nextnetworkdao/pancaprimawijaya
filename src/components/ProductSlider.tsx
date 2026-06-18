import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export function ProductSlider() {
  const [posters, setPosters] = useState<{ id: string; image: string }[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    let mounted = true;
    fetch('/api/settings/slider')
      .then(res => res.ok ? res.text() : Promise.reject(res.status))
      .then(text => {
        if (!text) return {};
        try {
          return JSON.parse(text);
        } catch(e) {
          return {};
        }
      })
      .then(d => {
        if (mounted) {
          if (d && Array.isArray(d.posters) && d.posters.length > 0) {
            setPosters(d.posters);
          } else {
            // Fallback default banners if admin hasn't set any
            setPosters([
              { id: '1', image: 'https://wpmartfury.com/marketplace5/wp-content/uploads/sites/6/2023/01/c1-1650.jpg' },
              { id: '2', image: 'https://wpmartfury.com/marketplace5/wp-content/uploads/sites/6/2023/01/c2-1650.jpg' }
            ]);
          }
        }
      })
      .catch(e => {
        console.error('Failed to load slider', e);
        if (mounted) {
          setPosters([
            { id: '1', image: 'https://wpmartfury.com/marketplace5/wp-content/uploads/sites/6/2023/01/c1-1650.jpg' },
            { id: '2', image: 'https://wpmartfury.com/marketplace5/wp-content/uploads/sites/6/2023/01/c2-1650.jpg' }
          ]);
        }
      });
    return () => { mounted = false; };
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
    <div className="relative w-full mb-8 bg-gray-100 border-b border-gray-200">
      <div className="relative w-full aspect-[21/9] sm:aspect-[4/1] lg:aspect-[6/1] overflow-hidden group">
        <AnimatePresence mode="wait">
          <motion.img
            key={currentIndex}
            src={posters[currentIndex].image}
            alt={`Promo Slider ${currentIndex + 1}`}
            className="absolute inset-0 w-full h-full object-cover"
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          />
        </AnimatePresence>

        <div className="absolute inset-0 bg-black/10 pointer-events-none" />

        {posters.length > 1 && (
          <>
            <button
              onClick={handlePrev}
              className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 backdrop-blur-md p-3 rounded-full text-white opacity-0 group-hover:opacity-100 transition-all border border-white/20 shadow-lg"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 backdrop-blur-md p-3 rounded-full text-white opacity-0 group-hover:opacity-100 transition-all border border-white/20 shadow-lg"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2">
              {posters.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`transition-all rounded-full ${
                    currentIndex === idx 
                      ? "w-8 h-2 bg-white shadow-[0_0_10px_rgba(255,255,255,0.5)]" 
                      : "w-2 h-2 bg-white/40 hover:bg-white/80"
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
