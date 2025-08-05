import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  getRecommendedImageQuality,
  getNetworkInfo,
  onNetworkChange,
} from "@packages/mobile-utils";
import clsx from "clsx";

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  // 不同质量的图片源
  sources?: {
    low?: string;
    medium?: string;
    high?: string;
    original?: string;
  };
  // 占位图
  placeholder?: string;
  // 懒加载
  lazy?: boolean;
  // 图片加载失败的回调
  onError?: () => void;
  // 图片加载成功的回调
  onLoad?: () => void;
  // 是否根据网络自动切换质量
  autoQuality?: boolean;
}

export const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  className,
  sources,
  placeholder = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100"%3E%3Crect width="100" height="100" fill="%23f0f0f0"/%3E%3C/svg%3E',
  lazy = true,
  onError,
  onLoad,
  autoQuality = true,
}) => {
  const [imageSrc, setImageSrc] = useState(placeholder);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadedSrcRef = useRef<string>("");

  // 根据网络质量选择图片源
  const getOptimalSrc = useCallback(() => {
    if (!sources || !autoQuality) return src;

    const quality = getRecommendedImageQuality();
    switch (quality) {
      case "low":
        return sources.low || sources.medium || sources.high || src;
      case "medium":
        return sources.medium || sources.high || src;
      case "high":
        return sources.high || sources.original || src;
      case "original":
        return sources.original || src;
      default:
        return src;
    }
  }, [sources, autoQuality, src]);

  // 预加载图片
  const preloadImage = useCallback(
    (srcToLoad: string) => {
      // 避免重复加载相同的图片
      if (srcToLoad === loadedSrcRef.current && !error) {
        return;
      }

      const img = new Image();

      img.onload = () => {
        setImageSrc(srcToLoad);
        setIsLoading(false);
        setError(false);
        loadedSrcRef.current = srcToLoad;
        onLoad?.();
      };

      img.onerror = () => {
        setError(true);
        setIsLoading(false);
        onError?.();
      };

      img.src = srcToLoad;
    },
    [error, onLoad, onError],
  );

  // 初始化加载
  useEffect(() => {
    if (!lazy) {
      // 立即加载
      preloadImage(getOptimalSrc());
      return;
    }

    // 懒加载逻辑
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            preloadImage(getOptimalSrc());
            observer.disconnect();
          }
        });
      },
      {
        // 提前加载
        rootMargin: "50px",
        threshold: 0.01,
      },
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
      observerRef.current = observer;
    }

    return () => {
      observer.disconnect();
    };
  }, [src, sources, lazy, autoQuality, getOptimalSrc, preloadImage]);

  // 网络状态变化时重新评估图片质量
  useEffect(() => {
    if (!autoQuality || !sources) return;

    const cleanup = onNetworkChange(() => {
      if (!isLoading && !error) {
        const networkInfo = getNetworkInfo();
        // 只在网络状态从离线变为在线，或网络质量有明显改善时重新加载
        if (networkInfo.online) {
          const newSrc = getOptimalSrc();
          if (newSrc !== imageSrc && newSrc !== placeholder) {
            preloadImage(newSrc);
          }
        }
      }
    });

    return cleanup;
  }, [
    isLoading,
    error,
    sources,
    imageSrc,
    autoQuality,
    placeholder,
    getOptimalSrc,
    preloadImage,
  ]);

  return (
    <div className={clsx("relative overflow-hidden", className)}>
      <img
        ref={imgRef}
        src={imageSrc}
        alt={alt}
        className={clsx(
          "w-full h-full object-cover transition-opacity duration-300",
          {
            "opacity-0": isLoading,
            "opacity-100": !isLoading,
          },
        )}
        loading={lazy ? "lazy" : "eager"}
      />

      {/* 加载状态 */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <div className="w-8 h-8 border-2 border-gray-300 border-t-primary-500 rounded-full animate-spin" />
        </div>
      )}

      {/* 错误状态 */}
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <div className="text-center">
            <svg
              className="w-12 h-12 mx-auto text-gray-400 mb-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <p className="text-sm text-gray-500">加载失败</p>
          </div>
        </div>
      )}
    </div>
  );
};
