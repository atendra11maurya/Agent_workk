import Image from "next/image";
import { Reveal } from "@/app/components/MotionLayer";
import { projects } from "@/src/data/site";

const projectArtLabels = {
  interface: ["Message", "Hierarchy", "Action"],
  editorial: ["Positioning", "Proof", "Enquiry"],
  conversion: ["Attention", "Trust", "Conversion"],
} as const;

export default function ProjectStories() {
  return (
    <section className="work-section section-pad" id="case-studies">
      <div className="section-index">
        <span>03</span>
        <span>Case studies</span>
      </div>
      <Reveal className="work-heading section-heading">
        <p className="section-kicker">Work in progress</p>
        <h2>
          Case studies built to show the thinking.{" "}
          <em>Five stories, ready for proof.</em>
        </h2>
        <p>
          Each case study will pair the project work with verified screenshots,
          context and outcomes. These current slots are intentionally marked as
          demo content.
        </p>
      </Reveal>

      <div className="project-stack">
        {projects.map((project, index) => {
          const placeholder = project.status === "placeholder";
          const labels = placeholder
            ? projectArtLabels[project.artDirection]
            : ["Problem", "Strategy", "Result"];
          const image = placeholder ? null : project.projectImage;

          return (
            <article
              className="project-story"
              key={project.id}
              data-analytics-event="portfolio_interaction"
              data-analytics-project={project.id}
            >
              <div className="project-meta">
                <p>CASE STUDY / {String(index + 1).padStart(2, "0")}</p>
                <h3>
                  {placeholder ? `Project slot 0${index + 1}` : project.title}
                </h3>
                <span>
                  {placeholder
                    ? "Awaiting verified client content"
                    : project.category}
                </span>
              </div>
              <div
                className={`project-media project-media--${
                  placeholder ? project.artDirection : "published"
                }`}
              >
                {image ? (
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    sizes="(max-width: 900px) 100vw, 76vw"
                  />
                ) : (
                  <div className="project-placeholder-art" aria-hidden="true">
                    <div className="placeholder-window">
                      <span />
                      <span />
                      <span />
                    </div>
                    <div className="placeholder-copy">
                      <strong>{labels[0]}</strong>
                      <i />
                      <i />
                    </div>
                    <div className="placeholder-path">
                      {labels.map((label) => (
                        <span key={label}>{label}</span>
                      ))}
                    </div>
                  </div>
                )}
                {placeholder ? (
                  <p className="demo-label">
                    Demo content · Replace before public launch
                  </p>
                ) : null}
              </div>
              <div className="project-outcome">
                <span>OUTCOME</span>
                <p>
                  {placeholder
                    ? "Verified project outcome will be added here."
                    : project.shortOutcome}
                </p>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
