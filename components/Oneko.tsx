"use client";

import { useEffect, useRef } from "react";

export default function Oneko() {
  const nekoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const nekoEl = nekoRef.current;
    if (!nekoEl) return;

    let nekoPosX = 32, nekoPosY = 32;
    let mousePosX = 0, mousePosY = 0;
    let frameCount = 0;
    let idleTime = 0;
    let idleAnimation: string | null = null;
    let idleAnimationFrame = 0;
    let forceSleep = false;
    let autoSleepActive = false;
    let variant = "classic";
    let animFrameId: number;

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

    function parseLocalStorage(key: string, fallback: unknown) {
      try {
        const value = JSON.parse(localStorage.getItem(`oneko:${key}`) || "null");
        return typeof value === typeof fallback ? value : fallback;
      } catch { return fallback; }
    }

    // Load saved variant
    variant = parseLocalStorage("variant", "classic") as string;
    forceSleep = parseLocalStorage("forceSleep", false) as boolean;

    nekoEl.style.backgroundImage = `url('/oneko/oneko-${variant}.gif')`;
    nekoEl.style.display = "block";

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
      if (idleTime > 10 && idleAnimation == null) {
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
      const diffX = nekoPosX - mousePosX;
      const diffY = nekoPosY - mousePosY;
      const distance = Math.sqrt(diffX ** 2 + diffY ** 2);

      if (distance < nekoSpeed || distance < 48) {
        idle();
        return;
      }

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

    // Mouse tracking
    const onMouseMove = (e: MouseEvent) => {
      mousePosX = e.clientX;
      mousePosY = e.clientY;
    };

    // Touch tracking — mobile support
    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        mousePosX = e.touches[0].clientX;
        mousePosY = e.touches[0].clientY;
      }
    };
    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        mousePosX = e.touches[0].clientX;
        mousePosY = e.touches[0].clientY;
        if (forceSleep) {
          forceSleep = false;
          autoSleepActive = false;
          resetIdleAnimation();
        }
      }
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("touchstart", onTouchStart, { passive: true });

    // Variant change via custom event
    const onSetVariant = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      if (typeof detail === "string") {
        variant = detail;
        localStorage.setItem("oneko:variant", JSON.stringify(variant));
        nekoEl!.style.backgroundImage = `url('/oneko/oneko-${variant}.gif')`;
      }
    };
    const onChangeVariant = () => {
      const variants = ["classic", "dog", "tora", "maia", "vaporwave", "ramxcodes"];
      const idx = variants.indexOf(variant);
      variant = variants[(idx + 1) % variants.length];
      localStorage.setItem("oneko:variant", JSON.stringify(variant));
      nekoEl!.style.backgroundImage = `url('/oneko/oneko-${variant}.gif')`;
    };
    const onToggleSleep = () => {
      forceSleep = !forceSleep;
      localStorage.setItem("oneko:forceSleep", JSON.stringify(forceSleep));
      if (!forceSleep) resetIdleAnimation();
    };

    window.addEventListener("oneko:set-variant", onSetVariant);
    window.addEventListener("oneko:change-variant", onChangeVariant);
    window.addEventListener("oneko:toggle-sleep", onToggleSleep);

    // Animation loop
    const loop = () => {
      frame();
      animFrameId = requestAnimationFrame(loop);
    };
    animFrameId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(animFrameId);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("oneko:set-variant", onSetVariant);
      window.removeEventListener("oneko:change-variant", onChangeVariant);
      window.removeEventListener("oneko:toggle-sleep", onToggleSleep);
    };
  }, []);

  return (
    <div
      ref={nekoRef}
      id="oneko"
      style={{
        width: 32,
        height: 32,
        position: "fixed",
        imageRendering: "pixelated",
        left: 16,
        top: 16,
        zIndex: 99999,
        backgroundSize: "256px 256px",
        pointerEvents: "none",
      }}
      aria-hidden="true"
    />
  );
}
