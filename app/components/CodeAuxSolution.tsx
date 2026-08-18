import { Reveal } from "./MotionLayer";
import { codeAuxSystemSteps } from "@/src/data/site";

export function CodeAuxSolution() {
  return (
    <section className="solution-section section-pad" id="services">
      <div className="section-index">
        <span>02</span>
        <span>From Website to Business Asset</span>
      </div>
      <Reveal className="section-heading solution-heading">
        <p className="section-kicker">The CodeAux System</p>
        <h2>
          We remove the friction between{" "}
          <em>attention and action.</em>
        </h2>
        <p>
          CodeAux doesn&apos;t simply redesign websites. We understand the business, identify where potential customers are dropping out, remove those points of friction, and create a clearer journey toward meaningful business actions.
        </p>
      </Reveal>

      <div className="solution-transformation">
        <Reveal className="solution-transformation__before" delay={0.1}>
          <div className="transformation-path">
            <span>Traffic</span>
            <i className="arrow">↓</i>
            <span>Website</span>
            <i className="arrow">↓</i>
            <span>Confusion</span>
            <i className="arrow">↓</i>
            <span className="exit">Exit</span>
          </div>
        </Reveal>

        <div className="solution-system-steps">
          {codeAuxSystemSteps.map((step, index) => (
            <Reveal key={step.id} delay={0.1 + index * 0.05} className="solution-step">
              <div className="solution-step__indicator">
                <span className="solution-step__dot" />
                <span className="solution-step__number">0{index + 1}</span>
              </div>
              <div className="solution-step__content">
                <h4>{step.title}</h4>
                <p>{step.description}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="solution-transformation__after" delay={0.4}>
          <div className="transformation-path success">
            <span>Attention</span>
            <i className="arrow">↓</i>
            <span>Clarity</span>
            <i className="arrow">↓</i>
            <span>Trust</span>
            <i className="arrow">↓</i>
            <span>Action</span>
            <i className="arrow">↓</i>
            <span className="lead">Lead / Booking / Sale</span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
