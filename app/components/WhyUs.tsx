import { Reveal } from "./MotionLayer";
import { whyUsComparisons } from "@/src/data/site";
import Image from "next/image";

export function WhyUs() {
  return (
    <section className="why-us-section section-pad" id="why-us">
      <div className="section-index">
        <span>05</span>
        <span>Why Us</span>
      </div>
      
      <Reveal className="section-heading">
        <p className="section-kicker">WHY US</p>
        <h2 className="why-us-heading">
          <span className="why-us-heading__primary">Why us?</span>
          <span className="why-us-heading__secondary">(and not 500 other agencies)</span>
        </h2>
      </Reveal>

      {/* 
        The container maps the dark, high-contrast comparison presentation 
        to the website's existing dark surface tokens.
      */}
      <Reveal className="mt-20 w-full relative z-10">
        <div className="flex flex-col">
          {/* Header row for Desktop */}
          <div className="hidden lg:grid grid-cols-[1fr_2.2fr_1.4fr] items-end pb-6 mb-2">
            <div className="px-4"></div>
            
            <div className="flex items-center justify-start gap-5 lg:gap-8 px-6 lg:px-8">
              <div className="flex-shrink-0 flex items-center justify-center -ml-3">
                <Image
                  src="/codeaux-logo.png"
                  alt="CodeAux logo"
                  width={56}
                  height={56}
                  className="object-contain"
                />
              </div>
              <span className="font-bold text-[25px] tracking-wide font-['Space_Grotesk_Variable',_sans-serif]">
                <span className="text-slate-900">Code</span>
                <span className="text-blue-600">Aux</span>
              </span>
            </div>
            
            <div className="px-6 lg:pl-10">
              <span className="text-slate-900 font-bold tracking-[0.02em] text-[22px] font-['Space_Grotesk_Variable',_sans-serif]">Traditional agencies</span>
            </div>
          </div>

          <div className="border-t border-slate-200">
            {/* Rows */}
            {whyUsComparisons.map((item, index) => {
              return (
                <div key={index} className="flex flex-col lg:grid lg:grid-cols-[1fr_2.2fr_1.4fr] group relative border-b border-slate-200">
                  
                  {/* Criterion */}
                  <div className="py-6 px-4 flex items-center">
                    <h3 className="text-slate-900 font-bold text-[20px] lg:text-[22px] font-['Space_Grotesk_Variable',_sans-serif] leading-[1.3]">
                      {item.criterion}
                    </h3>
                  </div>

                  {/* CODEAUX */}
                  <div className="bg-[#F4F7FA] p-6 lg:p-8 flex items-center gap-5 lg:gap-8 relative transition-colors duration-300 group-hover:bg-[#EDF2F7]">
                    <div className="flex-shrink-0 flex items-center justify-center">
                      <svg width="25" height="25" viewBox="0 0 24 24" fill="none" className="text-blue-600">
                        <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <p className="text-slate-800 font-semibold text-[18px] lg:text-[19px] leading-[1.6] m-0">
                      {item.codeaux}
                    </p>
                  </div>

                  {/* Traditional */}
                  <div className="py-6 px-4 lg:p-8 lg:pl-10 flex items-center">
                    <span className="block lg:hidden text-slate-400 font-bold tracking-[0.05em] text-[14px] mb-3 font-['Space_Grotesk_Variable',_sans-serif]">
                      Traditional Agencies
                    </span>
                    <p className="text-slate-500 font-medium text-[18px] lg:text-[18px] leading-[1.6] m-0 group-hover:text-slate-600 transition-colors">
                      {item.traditional}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
