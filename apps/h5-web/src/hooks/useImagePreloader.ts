import { useState, useEffect } from "react";

// 图片预加载 Hook
export const useImagePreloader = (urls: string[]) => {
  const [loadedStatus, setLoadedStatus] = useState<boolean[]>(
    new Array(urls.length).fill(false),
  );
  const [errorStatus, setErrorStatus] = useState<boolean[]>(
    new Array(urls.length).fill(false),
  );

  useEffect(() => {
    if (urls.length === 0) return;

    const loadImage = (url: string, index: number) => {
      const img = new Image();

      img.onload = () => {
        setLoadedStatus((prev) => {
          const newStatus = [...prev];
          newStatus[index] = true;
          return newStatus;
        });
      };

      img.onerror = () => {
        setErrorStatus((prev) => {
          const newStatus = [...prev];
          newStatus[index] = true;
          return newStatus;
        });
      };

      img.src = url;
    };

    urls.forEach((url, index) => {
      if (url) {
        loadImage(url, index);
      }
    });
  }, [urls]);

  return {
    loaded: loadedStatus,
    errors: errorStatus,
    allLoaded: loadedStatus.every(Boolean),
    hasError: errorStatus.some(Boolean),
    loadedCount: loadedStatus.filter(Boolean).length,
    errorCount: errorStatus.filter(Boolean).length,
    progress:
      urls.length > 0 ? loadedStatus.filter(Boolean).length / urls.length : 0,
  };
};
