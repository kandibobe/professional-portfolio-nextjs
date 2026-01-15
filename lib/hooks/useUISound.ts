"use client";

import { useSound } from "use-sound";
import { useCallback } from "react";

export function useUISound() {
  const [playHover] = useSound("/sounds/hover.mp3", { volume: 0.1 });
  const [playClick] = useSound("/sounds/click.mp3", { volume: 0.2 });

  const playHoverSound = useCallback(() => {
    playHover();
  }, [playHover]);

  const playClickSound = useCallback(() => {
    playClick();
  }, [playClick]);

  return { playHover: playHoverSound, playClick: playClickSound };
}
