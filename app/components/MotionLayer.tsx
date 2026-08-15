"use client";

import {
  useEffect,
  useRef,
  useSyncExternalStore,
  type PointerEventHandler,
  type ReactNode,
} from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  type HTMLMotionProps,
} from "motion/react";

const FINE_POINTER_QUERY = "(hover: hover) and (pointer: fine)";

function subscribeToFinePointer(onChange: () => void) {
  const mediaQuery = window.matchMedia(FINE_POINTER_QUERY);
  mediaQuery.addEventListener("change", onChange);
  return () => mediaQuery.removeEventListener("change", onChange);
}

function getFinePointerSnapshot() {
  return window.matchMedia(FINE_POINTER_QUERY).matches;
}

function getServerFinePointerSnapshot() {
  return false;
}

function useFinePointer() {
  return useSyncExternalStore(
    subscribeToFinePointer,
    getFinePointerSnapshot,
    getServerFinePointerSnapshot,
  );
}

export interface RevealProps
  extends Omit<
    HTMLMotionProps<"div">,
    "animate" | "initial" | "transition" | "variants" | "viewport" | "whileInView"
  > {
  amount?: number;
  delay?: number;
  distance?: number;
  duration?: number;
  once?: boolean;
}

export function Reveal({
  amount = 0.18,
  children,
  className,
  delay = 0,
  distance = 18,
  duration = 0.5,
  once = true,
  ...props
}: RevealProps) {
  const shouldReduceMotion = useReducedMotion() === true;

  return (
    <motion.div
      {...props}
      className={["motion-reveal", className].filter(Boolean).join(" ")}
      data-reveal="true"
      initial={shouldReduceMotion ? false : { opacity: 0, y: distance }}
      transition={{
        delay: shouldReduceMotion ? 0 : delay,
        duration: shouldReduceMotion ? 0 : duration,
        ease: [0.22, 1, 0.36, 1],
      }}
      viewport={{ amount, once }}
      whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
    >
      {children}
    </motion.div>
  );
}

export interface MagneticProps
  extends Omit<HTMLMotionProps<"span">, "children"> {
  children: ReactNode;
  strength?: number;
}

export function Magnetic({
  children,
  className,
  onPointerCancel,
  onPointerLeave,
  onPointerMove,
  strength = 6,
  style,
  ...props
}: MagneticProps) {
  const hasFinePointer = useFinePointer();
  const shouldReduceMotion = useReducedMotion() === true;
  const isEnabled = hasFinePointer && !shouldReduceMotion;
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { damping: 24, mass: 0.35, stiffness: 320 });
  const springY = useSpring(y, { damping: 24, mass: 0.35, stiffness: 320 });

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  const handlePointerMove: PointerEventHandler<HTMLSpanElement> = (event) => {
    onPointerMove?.(event);

    if (!isEnabled) {
      return;
    }

    const bounds = event.currentTarget.getBoundingClientRect();
    const horizontalProgress = (event.clientX - bounds.left) / bounds.width - 0.5;
    const verticalProgress = (event.clientY - bounds.top) / bounds.height - 0.5;
    x.set(horizontalProgress * strength * 2);
    y.set(verticalProgress * strength * 2);
  };

  const handlePointerLeave: PointerEventHandler<HTMLSpanElement> = (event) => {
    onPointerLeave?.(event);
    reset();
  };

  const handlePointerCancel: PointerEventHandler<HTMLSpanElement> = (event) => {
    onPointerCancel?.(event);
    reset();
  };

  return (
    <motion.span
      {...props}
      className={["magnetic", className].filter(Boolean).join(" ")}
      data-magnetic-enabled={isEnabled ? "true" : "false"}
      onPointerCancel={handlePointerCancel}
      onPointerLeave={handlePointerLeave}
      onPointerMove={handlePointerMove}
      style={{ display: "inline-flex", ...style, x: springX, y: springY }}
    >
      {children}
    </motion.span>
  );
}

export interface CustomCursorProps {
  className?: string;
  interactiveSelector?: string;
  nativeCursorSelector?: string;
}

export function CustomCursor({
  className,
  interactiveSelector =
    "a, button, [role='button'], [data-cursor='interactive']",
  nativeCursorSelector =
    "input, textarea, select, [contenteditable='true'], [data-native-cursor]",
}: CustomCursorProps) {
  const hasFinePointer = useFinePointer();
  const shouldReduceMotion = useReducedMotion() === true;
  const isEnabled = hasFinePointer && !shouldReduceMotion;
  const cursorRef = useRef<HTMLDivElement>(null);
  const pointerX = useMotionValue(-100);
  const pointerY = useMotionValue(-100);
  const ringX = useSpring(pointerX, { damping: 28, mass: 0.18, stiffness: 500 });
  const ringY = useSpring(pointerY, { damping: 28, mass: 0.18, stiffness: 500 });

  useEffect(() => {
    if (!isEnabled) {
      return;
    }

    const root = document.documentElement;
    root.classList.add("has-custom-cursor");

    const updateCursor = (event: PointerEvent) => {
      const cursor = cursorRef.current;
      pointerX.set(event.clientX);
      pointerY.set(event.clientY);

      if (!cursor) {
        return;
      }

      const target = event.target instanceof Element ? event.target : null;
      cursor.dataset.visible = "true";
      cursor.dataset.active = target?.closest(interactiveSelector)
        ? "true"
        : "false";
      cursor.dataset.native = target?.closest(nativeCursorSelector)
        ? "true"
        : "false";
    };

    const hideCursor = () => {
      if (cursorRef.current) {
        cursorRef.current.dataset.visible = "false";
      }
    };

    const hideWhenLeavingWindow = (event: PointerEvent) => {
      if (!event.relatedTarget) {
        hideCursor();
      }
    };

    window.addEventListener("pointermove", updateCursor, { passive: true });
    window.addEventListener("pointerout", hideWhenLeavingWindow);
    window.addEventListener("blur", hideCursor);

    return () => {
      root.classList.remove("has-custom-cursor");
      window.removeEventListener("pointermove", updateCursor);
      window.removeEventListener("pointerout", hideWhenLeavingWindow);
      window.removeEventListener("blur", hideCursor);
    };
  }, [interactiveSelector, isEnabled, nativeCursorSelector, pointerX, pointerY]);

  if (!isEnabled) {
    return null;
  }

  return (
    <motion.div
      ref={cursorRef}
      className={["custom-cursor", className].filter(Boolean).join(" ")}
      data-active="false"
      data-native="false"
      data-visible="false"
      style={{ x: ringX, y: ringY }}
      aria-hidden="true"
    >
      <span className="custom-cursor__ring" />
      <span className="custom-cursor__dot" />
    </motion.div>
  );
}

export interface MotionLayerProps extends CustomCursorProps {
  cursor?: boolean;
}

export function MotionLayer({ cursor = true, ...cursorProps }: MotionLayerProps) {
  return cursor ? <CustomCursor {...cursorProps} /> : null;
}

export default MotionLayer;
