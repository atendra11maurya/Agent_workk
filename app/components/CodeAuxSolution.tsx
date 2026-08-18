import { Reveal } from "./MotionLayer";
import { codeAuxSystemSteps, customerSolutions } from "@/src/data/site";

export function CodeAuxSolution() {
  return (
    <section className="solution-section section-pad" id="services">
      <div className="section-index">
        <span>02</span>
        <span>What We Build / How We Solve It</span>
      </div>
      
      <Reveal className="section-heading solution-heading">
        <p className="section-kicker">The CodeAux System</p>
        <h2>
          We Design Around the Problems<br />
          <em>That Cost You Customers.</em>
        </h2>
        <p>
          Every design, development and conversion decision exists to remove friction between a visitor arriving and taking action.
        </p>
      </Reveal>

      {/* Transformation System */}
      <div className="mt-20 flex flex-col gap-6">
        {/* Desktop Header Row */}
        <div className="hidden lg:flex flex-row items-center gap-8 px-8 mb-[-8px]">
          <div className="flex-1 lg:max-w-[280px]">
            <span className="text-[10px] font-extrabold tracking-[0.12em] text-[#687281] uppercase">The Problem</span>
          </div>
          <div className="w-[24px]"></div>
          <div className="flex-[2]">
            <span className="text-[10px] font-extrabold tracking-[0.12em] text-[#2f6bff] uppercase">The Solution</span>
          </div>
          <div className="w-[24px]"></div>
          <div className="flex-1 lg:max-w-[220px] text-right">
            <span className="text-[10px] font-extrabold tracking-[0.12em] text-[#050608]/40 uppercase">The Outcome</span>
          </div>
        </div>
        {customerSolutions.map((item, index) => (
          <Reveal key={item.id} delay={0.1 + index * 0.05}>
            <div className="flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-8 p-6 lg:p-8 bg-white border border-[#050608]/[0.08] rounded-[24px] shadow-[0_10px_30px_rgba(5,6,8,0.04)]">
              
              {/* Problem */}
              <div className="flex-1 flex flex-col lg:max-w-[280px]">
                <span className="text-[10px] font-extrabold tracking-[0.12em] text-[#687281] uppercase mb-2 lg:hidden">The Problem</span>
                <h3 className="text-[20px] font-medium leading-[1.2] text-[#050608] tracking-[-0.02em] font-['Space_Grotesk_Variable',_sans-serif]">
                  {item.problem}
                </h3>
              </div>

              {/* Arrow 1 */}
              <div className="hidden lg:flex text-[#91a0b5]">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div className="flex lg:hidden text-[#91a0b5] justify-start py-1">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 5V19M12 19L5 12M12 19L19 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>

              {/* Solution */}
              <div className="flex-[2] flex flex-col">
                <span className="text-[10px] font-extrabold tracking-[0.12em] text-[#2f6bff] uppercase mb-2 lg:hidden">The Solution</span>
                <h3 className="text-[20px] font-medium leading-[1.2] text-[#2f6bff] tracking-[-0.02em] mb-3 font-['Space_Grotesk_Variable',_sans-serif]">
                  {item.solution}
                </h3>
                <p className="text-[15px] text-[#555d68] leading-[1.6] m-0">
                  {item.description}
                </p>
              </div>

              {/* Arrow 2 */}
              <div className="hidden lg:flex text-[#91a0b5]">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div className="flex lg:hidden text-[#91a0b5] justify-start py-1">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 5V19M12 19L5 12M12 19L19 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>

              {/* Outcome */}
              <div className="flex-1 flex flex-col items-start lg:items-end lg:max-w-[220px]">
                <span className="text-[10px] font-extrabold tracking-[0.12em] text-[#050608]/40 uppercase mb-2 lg:text-right lg:hidden">The Outcome</span>
                <div className="inline-flex items-center justify-center px-4 py-2 rounded-full bg-[rgba(47,107,255,0.06)] border border-[rgba(47,107,255,0.15)] text-[#2f6bff] font-semibold text-[13px] tracking-[0.02em]">
                  {item.outcome}
                </div>
              </div>

            </div>
          </Reveal>
        ))}
      </div>

      {/* Methodology Section */}
      <div className="mt-32 pt-24 border-t border-[#050608]/[0.08]">
        <Reveal>
          <div className="mb-16">
            <h3 className="text-[32px] font-medium leading-[1.1] text-[#050608] tracking-[-0.04em] font-['Space_Grotesk_Variable',_sans-serif] mb-4">
              How CodeAux Works
            </h3>
            <p className="text-[16px] text-[#555d68] leading-[1.6] max-w-[600px]">
              The mechanism behind these solutions. We follow a connected workflow to ensure business goals drive the final website.
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {codeAuxSystemSteps.map((step, index) => (
            <Reveal key={step.id} delay={0.1 + index * 0.05} className="relative group">
              {/* Continuous Connector line for desktop (spans from col 1 to col 4) */}
              {index === 0 && (
                <div className="hidden lg:block absolute top-[24px] left-[24px] w-[calc(300%+6rem)] h-[1px] bg-[#050608]/[0.08] z-0 overflow-hidden" aria-hidden="true">
                  <div className="horizontal-flow-line" style={{ animationDuration: '4s' }} />
                </div>
              )}
              
              <div className="relative z-10 flex flex-col h-full">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-[48px] h-[48px] rounded-full bg-[#ffffff] border border-[#050608]/[0.08] shadow-[0_4px_12px_rgba(5,6,8,0.03)] flex items-center justify-center text-[14px] font-bold text-[#2f6bff]">
                    0{index + 1}
                  </div>
                  <div className="h-[1px] flex-1 bg-[#050608]/[0.08] lg:hidden" aria-hidden="true" />
                </div>
                
                <h4 className="text-[20px] font-medium leading-[1.2] text-[#050608] tracking-[-0.02em] mb-3 font-['Space_Grotesk_Variable',_sans-serif]">
                  {step.title}
                </h4>
                <p className="text-[14px] text-[#555d68] leading-[1.6] m-0">
                  {step.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
