import { useEffect, useRef, useState, type ReactNode } from "react";

interface LazyLoadProps {
  children: ReactNode;
  fallback?: ReactNode;
  rootMargin?: string;
  className?: string;
}

export function LazyLoad({
  children,
  fallback = null,
  rootMargin = "50px", // 提前 50px 开始加载，优化体验
  className = "",
}: LazyLoadProps) {
  const [isInView, setIsInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 检查浏览器支持
    if (!("IntersectionObserver" in window)) {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect(); // 加载后断开观察
        }
      },
      { rootMargin },
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [rootMargin]);

  return (
    <div ref={ref} className={className}>
      {isInView ? children : fallback}
    </div>
  );
}
