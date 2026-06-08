"use client";

import { useEffect, useRef } from "react";

const VARIANTS = ["classic", "dog", "tora", "maia", "vaporwave", "ramxcodes"];

export default function Oneko() {
  const nekoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const nekoEl = nekoRef.current;
    if (!nekoEl) return;

    const isReducedMotion =
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isReducedMotion) return;

    function parseLS<T>(key: string, fallback: T): T {
      try {
        const v = JSON.parse(localStorage.getItem(`oneko:${key}`) || "null");
        return v !== null ? (v as T) : fallback;
      } catch { return fallback; }
    }

    // Pick a random variant on every fresh visit (no saved variant = random)
    const savedVariant = localStorage.getItem("oneko:variant");
    let variant: string;
    if (savedVariant) {
      try { variant = JSON.parse(savedVariant); }
      catch { variant = VARIANTS[Math.floor(Math.random() * VARIANTS.length)]; }
    } else {
      variant = VARIANTS[Math.floor(Math.random() * VARIANTS.length)];
      localStorage.setItem("oneko:variant", JSON.stringify(variant));
    }

    let forceSleep = parseLS<boolean>("forceSleep", false);

    let nekoPosX = 32, nekoPosY = 32;
    let mousePosX = 0, mousePosY = 0;
    let frameCount = 0;
    let idleTime = 0;
    let idleAnimation: string | null = null;
    let idleAnimationFrame = 0;
    let lastTimestamp = 0;
    let rafId: number;

    const nekoSpeed = 10;
    const spriteSets: Record<string, number[][]> = {
      idle: [[-3, -3]],
      alert: [[-7, -3]],
      scratchSelf: [[-5, 0], [-6, 0], [-7, 0]],
      scratchWallN: [[0, 0], [0, -1]],
      scratchWallS: [[-7, -1], [-6, -2]],
      scratchWallE: [[-2, -2], [-2, -3]],
      scratchWallW: [[-4, 0], [-4, -1]],
      tired: [[-3, -2]],
      sleeping: [[-2, 0], [-2, -1]],
      N: [[-1, -2], [-1, -3]],
      NE: [[0, -2], [0, -3]],
      E: [[-3, 0], [-3, -1]],
      SE: [[-5, -1], [-5, -2]],
      S: [[-6, -3], [-7, -2]],
      SW: [[-5, -3], [-6, -1]],
      W: [[-4, -2], [-4, -3]],
      NW: [[-1, 0], [-1, -1]],
    };

    nekoEl.style.backgroundImage = `url('/oneko/oneko-${variant}.gif')`;

    function setSprite(name: string, frame: number) {
      const sprite = spriteSets[name];
      if (!sprite) return;
      const [x, y] = sprite[frame % sprite.length];
      nekoEl!.style.backgroundPosition = `${x * 32}px ${y * 32}px`;
    }

    function resetIdleAnimation() {
      idleAnimation = null;
      idleAnimationFrame = 0;
    }

    function idle() {
      idleTime += 1;
      if (idleTime > 10 && Math.floor(Math.random() * 200) === 0 && idleAnimation == null) {
        const available = ["sleeping", "scratchSelf"];
        if (nekoPosX < 32) available.push("scratchWallW");
        if (nekoPosY < 32) available.push("scratchWallN");
        if (nekoPosX > window.innerWidth - 32) available.push("scratchWallE");
        if (nekoPosY > window.innerHeight - 32) available.push("scratchWallS");
        idleAnimation = available[Math.floor(Math.random() * available.length)];
      }
      if (forceSleep) { idleAnimation = "sleeping"; }

      switch (idleAnimation) {
        case "sleeping":
          if (idleAnimationFrame < 8) { setSprite("tired", 0); break; }
          setSprite("sleeping", Math.floor(idleAnimationFrame / 4));
          if (idleAnimationFrame > 192 && !forceSleep) resetIdleAnimation();
          break;
        case "scratchWallN": case "scratchWallS":
        case "scratchWallE": case "scratchWallW":
        case "scratchSelf":
          setSprite(idleAnimation, idleAnimationFrame);
          if (idleAnimationFrame > 9) resetIdleAnimation();
          break;
        default:
          setSprite("idle", 0);
          return;
      }
      idleAnimationFrame += 1;
    }

    function frame() {
      frameCount += 1;

      // forceSleep: always idle, never move
      if (forceSleep) { idle(); return; }

      const diffX = nekoPosX - mousePosX;
      const diffY = nekoPosY - mousePosY;
      const distance = Math.sqrt(diffX ** 2 + diffY ** 2);

      if (distance < nekoSpeed || distance < 48) { idle(); return; }

      idleAnimation = null;
      idleAnimationFrame = 0;
      if (idleTime > 1) {
        setSprite("alert", 0);
        idleTime = Math.min(idleTime, 7);
        idleTime -= 1;
        return;
      }

      let direction = diffY / distance > 0.5 ? "N" : "";
      direction += diffY / distance < -0.5 ? "S" : "";
      direction += diffX / distance > 0.5 ? "W" : "";
      direction += diffX / distance < -0.5 ? "E" : "";
      setSprite(direction, frameCount);

      nekoPosX -= (diffX / distance) * nekoSpeed;
      nekoPosY -= (diffY / distance) * nekoSpeed;
      nekoPosX = Math.min(Math.max(16, nekoPosX), window.innerWidth - 16);
      nekoPosY = Math.min(Math.max(16, nekoPosY), window.innerHeight - 16);
      nekoEl!.style.left = `${nekoPosX - 16}px`;
      nekoEl!.style.top = `${nekoPosY - 16}px`;
    }

    // Throttled to ~100ms per frame — matches original oneko.js
    function onAnimationFrame(timestamp: number) {
      if (!nekoEl || !nekoEl.isConnected) return;
      if (timestamp - lastTimestamp > 100) {
        lastTimestamp = timestamp;
        frame();
      }
      rafId = requestAnimationFrame(onAnimationFrame);
    }
    rafId = requestAnimationFrame(onAnimationFrame);

    // Event listeners
    const onMouseMove = (e: MouseEvent) => { mousePosX = e.clientX; mousePosY = e.clientY; };
    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) { mousePosX = e.touches[0].clientX; mousePosY = e.touches[0].clientY; }
    };
    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        mousePosX = e.touches[0].clientX; mousePosY = e.touches[0].clientY;
        if (forceSleep) { forceSleep = false; localStorage.setItem("oneko:forceSleep", "false"); resetIdleAnimation(); }
      }
    };

    const onChangeVariant = () => {
      const idx = VARIANTS.indexOf(variant);
      variant = VARIANTS[(idx + 1) % VARIANTS.length];
      localStorage.setItem("oneko:variant", JSON.stringify(variant));
      if (nekoEl) nekoEl.style.backgroundImage = `url("/oneko/oneko-${variant}.gif")`;
    };
    const onToggleSleep = () => {
      forceSleep = !forceSleep;
      localStorage.setItem("oneko:forceSleep", JSON.stringify(forceSleep));
      if (!forceSleep) { idleTime = 0; resetIdleAnimation(); }
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("oneko:change-variant", onChangeVariant);
    window.addEventListener("oneko:toggle-sleep", onToggleSleep);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("oneko:change-variant", onChangeVariant);
      window.removeEventListener("oneko:toggle-sleep", onToggleSleep);
    };
  }, []);

  return (
    <div
      ref={nekoRef}
      id="oneko"
      aria-hidden="true"
      style={{
        width: 32, height: 32,
        position: "fixed",
        imageRendering: "pixelated",
        left: 16, top: 16,
        zIndex: 99999,
        backgroundSize: "auto",
        pointerEvents: "none",
      }}
    />
  );
}
