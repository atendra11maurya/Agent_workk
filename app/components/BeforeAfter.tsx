"use client";

import Image, { type ImageProps } from "next/image";
import {
  useId,
  useState,
  type CSSProperties,
  type KeyboardEvent,
  type ReactNode,
} from "react";

export interface ComparisonImage {
  alt: string;
  objectPosition?: CSSProperties["objectPosition"];
  src: ImageProps["src"];
}

export interface BeforeAfterProps {
  after: ComparisonImage;
  afterLabel?: string;
  aspectRatio?: CSSProperties["aspectRatio"];
  before: ComparisonImage;
  beforeLabel?: string;
  caption?: ReactNode;
  className?: string;
  demo?: boolean;
  demoLabel?: string;
  initialPosition?: number;
  label?: string;
  sizes?: string;
  step?: number;
}

function clampPosition(value: number) {
  if (!Number.isFinite(value)) {
    return 50;
  }

  return Math.min(100, Math.max(0, value));
}

export default function BeforeAfter({
  after,
  afterLabel = "After",
  aspectRatio = "16 / 10",
  before,
  beforeLabel = "Before",
  caption,
  className,
  demo = false,
  demoLabel = "Interaction demo — not client results",
  initialPosition = 50,
  label = "Compare the website before and after",
  sizes = "(max-width: 768px) 100vw, 80vw",
  step = 1,
}: BeforeAfterProps) {
  const [position, setPosition] = useState(() =>
    clampPosition(initialPosition),
  );
  const [isFocused, setIsFocused] = useState(false);
  const captionId = useId();
  const demoId = useId();
  const descriptionIds = [caption ? captionId : null, demo ? demoId : null]
    .filter(Boolean)
    .join(" ");
  const clipPath = `inset(0 ${100 - position}% 0 0)`;
  const safeStep = Number.isFinite(step) && step > 0 ? Math.min(step, 100) : 1;
  const comparisonStyle = {
    "--before-after-position": `${position}%`,
  } as CSSProperties;
  const updatePosition = (value: string) =>
    setPosition(clampPosition(Number(value)));

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    const direction = event.key === "ArrowRight" || event.key === "ArrowUp"
      ? safeStep
      : event.key === "ArrowLeft" || event.key === "ArrowDown"
        ? -safeStep
        : null;

    if (direction !== null) {
      event.preventDefault();
      setPosition((current) => clampPosition(current + direction));
      return;
    }

    if (event.key === "Home" || event.key === "End") {
      event.preventDefault();
      setPosition(event.key === "Home" ? 0 : 100);
    }
  };

  return (
    <figure
      className={["before-after", className].filter(Boolean).join(" ")}
      style={comparisonStyle}
    >
      <div
        className="before-after__viewport"
        data-focused={isFocused ? "true" : "false"}
        role="group"
        aria-label={label}
        style={{
          aspectRatio,
          outline: isFocused ? "2px solid var(--blue, #2f6bff)" : undefined,
          outlineOffset: isFocused ? 4 : undefined,
          overflow: "hidden",
          position: "relative",
        }}
      >
        <div
          className="before-after__layer before-after__layer--after"
          style={{ inset: 0, position: "absolute" }}
        >
          <Image
            className="before-after__image"
            src={after.src}
            alt={after.alt}
            fill
            sizes={sizes}
            draggable={false}
            style={{ objectFit: "cover", objectPosition: after.objectPosition }}
          />
        </div>

        <div
          className="before-after__layer before-after__layer--before"
          style={{ clipPath, inset: 0, position: "absolute" }}
        >
          <Image
            className="before-after__image"
            src={before.src}
            alt={before.alt}
            fill
            sizes={sizes}
            draggable={false}
            style={{ objectFit: "cover", objectPosition: before.objectPosition }}
          />
        </div>

        <span className="before-after__badge before-after__badge--before">
          {beforeLabel}
        </span>
        <span className="before-after__badge before-after__badge--after">
          {afterLabel}
        </span>

        <div
          className="before-after__divider"
          style={{ left: `${position}%` }}
          aria-hidden="true"
        >
          <span className="before-after__handle">
            <span>←</span>
            <span>→</span>
          </span>
        </div>

        <input
          className="before-after__range"
          type="range"
          min="0"
          max="100"
          step={safeStep}
          value={position}
          aria-label={label}
          aria-describedby={descriptionIds || undefined}
          aria-valuetext={`${position}% of the before image visible`}
          onBlur={() => setIsFocused(false)}
          onInput={(event) => updatePosition(event.currentTarget.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => setIsFocused(true)}
          style={{
            cursor: "ew-resize",
            height: "100%",
            inset: 0,
            margin: 0,
            opacity: 0,
            position: "absolute",
            width: "100%",
            zIndex: 4,
          }}
        />
      </div>

      {caption || demo ? (
        <figcaption className="before-after__caption">
          {caption ? (
            <span className="before-after__caption-text" id={captionId}>
              {caption}
            </span>
          ) : null}
          {demo ? (
            <span className="before-after__demo-label" id={demoId}>
              {demoLabel}
            </span>
          ) : null}
        </figcaption>
      ) : null}
    </figure>
  );
}
