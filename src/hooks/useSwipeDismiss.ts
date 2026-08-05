"use client";

import { useCallback, useRef, useState } from "react";

/** How far past a boundary the drag still follows, with rising resistance. */
const RUBBERBAND_C = 0.55;
/** Matches iOS scroll deceleration. 0.99 feels snappier, 0.998 natural. */
const DECELERATION = 0.998;
/** Movement before we commit to an axis. Below this it may still be a tap. */
const HYSTERESIS = 10;
/** Projected travel past which a horizontal flick counts as next/prev. */
const COMMIT_X = 80;
/** Projected travel past which a downward drag counts as dismiss. */
const COMMIT_Y = 120;

interface Sample {
  x: number;
  y: number;
  t: number;
}

interface Options {
  onDismiss: () => void;
  onNext: () => void;
  onPrev: () => void;
  enabled?: boolean;
}

/**
 * Apple's momentum projection (Designing Fluid Interfaces). Predicts where a
 * flick would come to rest, so the gesture commits based on where it was
 * *going* rather than where the finger happened to lift. Note this is the
 * exponential-decay form, not the textbook v^2/(2a).
 */
function project(velocity: number, decelerationRate = DECELERATION): number {
  return ((velocity / 1000) * decelerationRate) / (1 - decelerationRate);
}

/** Resistance that grows the further past the boundary you pull. */
function rubberband(overshoot: number, dimension: number): number {
  return (
    (overshoot * dimension * RUBBERBAND_C) /
    (dimension + RUBBERBAND_C * Math.abs(overshoot))
  );
}

/**
 * Turns a pointer drag into a live offset plus a committed direction on
 * release. Horizontal drags page between items, a downward drag dismisses,
 * and an upward drag meets rising resistance because there is nowhere to go.
 */
export function useSwipeDismiss({
  onDismiss,
  onNext,
  onPrev,
  enabled = true,
}: Options) {
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);

  const start = useRef<Sample | null>(null);
  const axis = useRef<"x" | "y" | null>(null);
  // A short history rather than just the last point: one frame's delta is far
  // too noisy to derive a usable release velocity from.
  const history = useRef<Sample[]>([]);

  const onPointerDown = useCallback(
    (e: React.PointerEvent<HTMLElement>) => {
      if (!enabled || e.button !== 0) return;
      // Capture so tracking survives the pointer leaving the element.
      e.currentTarget.setPointerCapture(e.pointerId);
      const sample = { x: e.clientX, y: e.clientY, t: e.timeStamp };
      start.current = sample;
      history.current = [sample];
      axis.current = null;
      setIsDragging(true);
    },
    [enabled]
  );

  const onPointerMove = useCallback((e: React.PointerEvent<HTMLElement>) => {
    if (!start.current) return;

    const dx = e.clientX - start.current.x;
    const dy = e.clientY - start.current.y;

    // Decide the axis once, after enough movement to be sure. Before that we
    // stay neutral, so a tap is still a tap.
    if (!axis.current) {
      if (Math.abs(dx) < HYSTERESIS && Math.abs(dy) < HYSTERESIS) return;
      axis.current = Math.abs(dx) > Math.abs(dy) ? "x" : "y";
    }

    history.current.push({ x: e.clientX, y: e.clientY, t: e.timeStamp });
    if (history.current.length > 5) history.current.shift();

    if (axis.current === "x") {
      setOffset({ x: dx, y: 0 });
    } else {
      // Downward tracks 1:1 because it can dismiss. Upward has nowhere to go,
      // so it meets rising resistance rather than a dead stop.
      setOffset({ x: 0, y: dy < 0 ? rubberband(dy, window.innerHeight) : dy });
    }
  }, []);

  const onPointerUp = useCallback(
    (e: React.PointerEvent<HTMLElement>) => {
      if (!start.current) return;
      if (e.currentTarget.hasPointerCapture(e.pointerId)) {
        e.currentTarget.releasePointerCapture(e.pointerId);
      }

      const samples = history.current;
      const first = samples[0];
      const last = samples[samples.length - 1];
      const dt = Math.max(last.t - first.t, 1);
      const vx = ((last.x - first.x) / dt) * 1000;
      const vy = ((last.y - first.y) / dt) * 1000;

      const dx = last.x - start.current.x;
      const dy = last.y - start.current.y;

      // Commit against where the flick was heading, not where it stopped.
      const projectedX = dx + project(vx);
      const projectedY = dy + project(vy);
      const committedAxis = axis.current;

      start.current = null;
      axis.current = null;
      history.current = [];
      setIsDragging(false);
      setOffset({ x: 0, y: 0 });

      if (committedAxis === "x") {
        if (projectedX <= -COMMIT_X) onNext();
        else if (projectedX >= COMMIT_X) onPrev();
      } else if (committedAxis === "y") {
        if (projectedY >= COMMIT_Y) onDismiss();
      }
    },
    [onDismiss, onNext, onPrev]
  );

  return {
    bind: {
      onPointerDown,
      onPointerMove,
      onPointerUp,
      onPointerCancel: onPointerUp,
      // Stop the browser claiming the gesture for scrolling or back-navigation.
      style: { touchAction: "none" as const },
    },
    offset,
    isDragging,
  };
}
