import { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

export function useAutoTranslate<T extends Record<string, any>>(
  data: T | null,
  fieldsToTranslate: (keyof T)[]
): { translatedData: T | null; loading: boolean } {
  const { isEn } = useLanguage();
  const [translatedData, setTranslatedData] = useState<T | null>(null);

  useEffect(() => {
    if (!data) {
      setTranslatedData(null);
      return;
    }

    if (!isEn) {
      setTranslatedData(data);
      return;
    }

    // Direct mapping of server-side translated database fields
    const translated = { ...data };
    for (const field of fieldsToTranslate) {
      const enField = `${String(field)}_en`;
      // Check if translating a standard DB column which has its corresponding _en version
      if (data[enField] !== undefined && data[enField] !== null && data[enField] !== '') {
        translated[field] = data[enField];
      }
    }
    setTranslatedData(translated);
  }, [data, isEn, JSON.stringify(fieldsToTranslate)]);

  return { translatedData, loading: false };
}
