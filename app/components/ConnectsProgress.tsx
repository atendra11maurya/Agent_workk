"use client";

import { useEffect, useState, type CSSProperties } from "react";

const steps = ["Strategy", "Design", "Development", "Conversion"];

export default function ConnectsProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const diagnosisList = document.querySelector<HTMLElement>(".diagnosis-list");
      if (!diagnosisList) return;

      const startLine = window.innerHeight * 0.2;
      const listTop = diagnosisList.getBoundingClientRect().top;
      const fillDistance = diagnosisList.offsetHeight * 0.7;
      const nextProgress = Math.max(
        0,
        Math.min(100, ((startLine - listTop) / fillDistance) * 100),
      );

      setProgress(nextProgress);
    };

    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);
    return () => {
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
    };
  }, []);

  return (
    <div
      className="connects-progress"
      aria-label="CodeAux connects"
      style={{
        "--progress": `${progress}%`,
      } as CSSProperties}
    >
      <span className="connects-progress__label">CodeAux connects</span>
      <div className="connects-progress__steps">
        <span className="connects-progress__rail" aria-hidden="true" />
        {steps.map((step, index) => (
          <div className="connects-progress__step-wrap" key={step}>
            <div
              className={`connects-progress__step${progress >= (index / (steps.length - 1)) * 100 ? " is-active" : ""}`}
              data-connect-step
            >
              <span className="connects-progress__dot" aria-hidden="true" />
              <strong>{step}</strong>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
