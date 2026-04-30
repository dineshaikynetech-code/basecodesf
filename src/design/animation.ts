/**
 * Global animation constants for consistent feel 
 */
export const ANIMATION = {
 
  easing: [0.4, 0, 0.2, 1] as const,

  // Sidebar collapse/expand timings (asymmetric)
  sidebar: {
    open: 0.25,     // Fast when opening (snappy)
    close: 0.65,    // Slightly slower when closing (allows text to fade gracefully)
  },

  // Text fade timing (tied to sidebar close for smoothness)
  textFade: {
    duration: 0.28,
    delay: 0.05,    // Small delay so text starts fading after width starts shrinking
  },

  // Tooltip behavior during collapse
  tooltipDelay: 80,
} as const;

export const getDuration = (key: keyof typeof ANIMATION.sidebar | 'textFade') => {
  if (key === 'textFade') return ANIMATION.textFade.duration;
  return ANIMATION.sidebar[key as 'open' | 'close'];
};
