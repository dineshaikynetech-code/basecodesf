import { useState, useLayoutEffect} from 'react'
import type {RefObject} from 'react';

export const useIsTruncated = (ref: RefObject<HTMLElement | null>) => {
  const [isTruncated, setIsTruncated] = useState(false);

  useLayoutEffect(() => {
    const element = ref.current;
    if (!element) return;

    const checkTruncation = () => {
      // If scrollWidth is greater than clientWidth, the text is overflowing
      setIsTruncated(element.scrollWidth > element.clientWidth);
    };

    // Initial check
    checkTruncation();

    // Re-check whenever the element's size changes
    const resizeObserver = new ResizeObserver(checkTruncation);
    resizeObserver.observe(element);

    return () => resizeObserver.disconnect();
  }, [ref]);

  return isTruncated;
};