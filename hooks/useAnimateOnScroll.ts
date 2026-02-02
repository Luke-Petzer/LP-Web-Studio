import { useRef, RefObject, useEffect } from 'react';

export function useAnimateOnScroll<T extends HTMLElement>(): RefObject<T> {
  const ref = useRef<T>(null);

  useEffect(() => {
    if (!ref.current) return;

    const element = ref.current;
    let hasAnimated = false;

    // Disable animations on mobile to prevent flashing
    const isMobile = window.innerWidth <= 768;
    if (isMobile) {
      element.style.opacity = '1';
      element.style.transform = 'translateY(0)';
      return;
    }

    // Check if element is already in viewport and set initial state
    const initialRect = element.getBoundingClientRect();
    const isInitiallyVisible = initialRect.top < window.innerHeight && initialRect.bottom > 0;

    if (isInitiallyVisible) {
      element.style.opacity = '1';
      element.style.transform = 'translateY(0)';
      hasAnimated = true;
      return;
    }

    // Set initial state for elements not in viewport
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            const target = entry.target as HTMLElement;
            target.style.opacity = '1';
            target.style.transform = 'translateY(0)';
            target.style.transition = 'opacity 0.4s ease-out, transform 0.4s ease-out';
            hasAnimated = true;
            observer.unobserve(target);
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: '20px 0px -20px 0px'
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, []);

  return ref;
}