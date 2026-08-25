"use client";

import { useState } from "react";
import BeforeAfter from "@/app/components/BeforeAfter";
import { showcaseProjects, type ShowcaseProject } from "@/src/data/site";

interface ProjectShowcaseProps {
  projects?: readonly ShowcaseProject[];
}

export default function ProjectShowcase({
  projects = showcaseProjects,
}: ProjectShowcaseProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const current = projects[activeIndex] || projects[0];

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % projects.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + projects.length) % projects.length);
  };

  return (
    <div className="project-showcase-container">
      {/* Project Selector Tabs */}
      <div className="showcase-tabs-wrapper">
        <div className="showcase-tabs" role="tablist" aria-label="Project Walkthroughs">
          {projects.map((item, idx) => {
            const isActive = idx === activeIndex;
            return (
              <button
                key={item.id}
                role="tab"
                aria-selected={isActive}
                aria-controls={`showcase-panel-${item.id}`}
                id={`showcase-tab-${item.id}`}
                className={`showcase-tab-btn ${isActive ? "showcase-tab-btn--active" : ""}`}
                onClick={() => setActiveIndex(idx)}
                type="button"
              >
                <span className="showcase-tab-dot" aria-hidden="true" />
                <span className="showcase-tab-text">{item.tabLabel}</span>
                {isActive ? (
                  <span className="showcase-tab-badge">{item.badge.split("/")[0].trim()}</span>
                ) : null}
              </button>
            );
          })}
        </div>

        <div className="showcase-nav-arrows">
          <button
            type="button"
            onClick={handlePrev}
            className="showcase-arrow-btn"
            aria-label="Previous project"
          >
            ←
          </button>
          <span className="showcase-counter">
            0{activeIndex + 1} / 0{projects.length}
          </span>
          <button
            type="button"
            onClick={handleNext}
            className="showcase-arrow-btn"
            aria-label="Next project"
          >
            →
          </button>
        </div>
      </div>

      {/* Main Project Display */}
      <div
        className="comparison-block showcase-panel"
        role="tabpanel"
        id={`showcase-panel-${current.id}`}
        aria-labelledby={`showcase-tab-${current.id}`}
        key={current.id}
      >
        <div className="comparison-copy showcase-copy">
          <p className="section-kicker">{current.badge}</p>
          <h3>{current.headline}</h3>
          <p>{current.description}</p>

          <div className="showcase-tags-list">
            {current.tags.map((tag) => (
              <span key={tag} className="showcase-tag-pill">
                {tag}
              </span>
            ))}
          </div>

          <div className="showcase-actions">
            {current.liveUrl ? (
              <a
                href={current.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="showcase-live-btn"
              >
                <span>View Full Site</span>
                <span aria-hidden="true">↗</span>
              </a>
            ) : (
              <a href="#contact" className="showcase-live-btn">
                <span>Discuss Similar Build</span>
                <span aria-hidden="true">→</span>
              </a>
            )}
          </div>
        </div>

        <div className="showcase-visual">
          <BeforeAfter
            key={current.id}
            label={`Walkthrough and comparison for ${current.title}`}
            aspectRatio="21 / 10"
            browserChrome
            browserUrl={current.browserUrl}
            before={
              current.beforeImage
                ? {
                    src: current.beforeImage,
                    alt: `Previous ${current.title} website design`,
                    objectPosition: "50% 0%",
                  }
                : undefined
            }
            after={{
              src: current.poster,
              alt: `Live scrolling preview of ${current.title}`,
              objectPosition: "50% 35%",
            }}
            afterVideoAv1Src={current.videoAv1Src}
            afterVideoSrc={current.videoSrc}
            beforeLabel={current.beforeImage ? "Before" : ""}
            afterLabel={current.beforeImage ? "After" : "Live Site"}
            caption={
              <>
                {current.caption}
                {current.liveUrl ? (
                  <>
                    {" "}·{" "}
                    <a
                      href={current.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                    >
                      View the full site ↗
                    </a>
                  </>
                ) : null}
              </>
            }
          />
        </div>
      </div>
    </div>
  );
}
