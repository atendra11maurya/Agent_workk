import { Reveal } from "./MotionLayer";
import { customerProblems } from "@/src/data/site";

export function CustomerProblems() {
  return (
    <section className="problem-section section-pad" id="problems">
      <div className="section-index">
        <span>01</span>
        <span>The Business Problem</span>
      </div>
      <Reveal className="problem-heading">
        <h2>
          Why Most Websites Underperform
        </h2>
        <p>
          A website can look good and still lose business. Small points of friction compound into lost attention, lost trust and lost enquiries.
        </p>
      </Reveal>
      
      <div className="diagnostic-grid">
        {customerProblems.map((problem, index) => (
          <Reveal key={problem.id} delay={0.05 * index} className="diagnostic-problem">
            <div className="diagnostic-problem__header">
              <span className="diagnostic-problem__number">{String(index + 1).padStart(2, "0")}</span>
              <h3 className="diagnostic-problem__label">{problem.title}</h3>
            </div>
            <div className="diagnostic-problem__body">
              <p className="diagnostic-problem__description">{problem.description}</p>
              <div className="diagnostic-problem__consequence">
                <span className="consequence-label lg:hidden">Business Consequence</span>
                <p>{problem.consequence}</p>
                <i className="consequence-arrow" aria-hidden="true">→</i>
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal className="problem-transition" delay={0.3}>
        <p>
          These aren&apos;t isolated design problems. They&apos;re points where potential customers are being lost.
        </p>
        <div className="problem-transition__connector">
          <div className="problem-transition__line" />
        </div>
      </Reveal>
    </section>
  );
}
