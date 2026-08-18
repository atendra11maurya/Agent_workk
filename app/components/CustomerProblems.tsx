import { Reveal } from "./MotionLayer";
import { customerProblems } from "@/src/data/site";

export function CustomerProblems() {
  return (
    <section className="problem-section section-pad" id="problems">
      <div className="section-index">
        <span>01</span>
        <span>Customer Problems</span>
      </div>
      <Reveal className="problem-heading">
        <p className="section-kicker">Diagnostic</p>
        <h2>
          Your website may look fine.<br />
          <em>That doesn&apos;t mean it&apos;s working.</em>
        </h2>
        <p>
          Most websites don&apos;t fail because they are ugly. They fail because customers cannot understand the offer, trust the business, or take the next step easily.
        </p>
      </Reveal>
      
      <div className="diagnostic-journey">
        <div className="diagnostic-journey__rail" aria-hidden="true" />
        <div className="diagnostic-journey__nodes">
          {customerProblems.map((problem, index) => (
            <Reveal key={problem.id} delay={0.05 * index} className="diagnostic-journey__node">
              <div className="diagnostic-journey__indicator">
                <span className="diagnostic-journey__dot" />
                <span className="diagnostic-journey__number">{String(index + 1).padStart(2, "0")}</span>
              </div>
              <div className="diagnostic-journey__content">
                <h3>{problem.title}</h3>
                <p>{problem.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
