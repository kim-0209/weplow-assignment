import {
  User,
  Tag,
  CheckCircle2,
  TrendingUp,
  MessageSquare,
  LayoutTemplate,
  Palette,
  Code2,
  Search,
  Megaphone,
} from "lucide-react";
import { PROCESS } from "@/data/homeText";

const TIMELINE_ICONS = {
  user: User,
  tag: Tag,
  check: CheckCircle2,
  trending: TrendingUp,
};

const STEP_ICONS = {
  message: MessageSquare,
  layout: LayoutTemplate,
  palette: Palette,
  code: Code2,
  search: Search,
  megaphone: Megaphone,
};

export default function ProcessSection() {
  const { timeline, sixSteps } = PROCESS;

  return (
    <section className="relative py-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-cyan-400/6 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-blue-600/8 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-950/10 to-transparent pointer-events-none" />

      <div className="relative max-w-5xl lg:max-w-6xl mx-auto gap-12 lg:gap-24 lg:items-start">
        {/* 우측: 요약 타임라인 */}
        <div className="lg:w-full w-2/3 mx-auto">
          {/* <h2 className="mb-8 text-xl lg:text-3xl font-black text-white mb-1 text-center">
            {timeline.title}
          </h2> */}

          <h2 className="w-full py-4 rounded-xl mb-8 text-xl lg:text-3xl font-black text-white text-center bg-gradient-to-r from-blue-600 to-cyan-400 transition-all shadow-lg shadow-blue-500/30">
            {timeline.title}
          </h2>
          <div className="flex flex-col">
            {timeline.steps.map((step, idx) => {
              const Icon = TIMELINE_ICONS[step.icon];
              const isLast = idx === timeline.steps.length - 1;
              return (
                <div
                  key={step.label}
                  className="flex items-stretch gap-4 lg:gap-5"
                >
                  <div className="flex flex-col items-center flex-shrink-0">
                    <div className="w-11 h-11 lg:w-16 lg:h-16 rounded-xl bg-blue-500/10 border border-blue-500/25 flex items-center justify-center shadow-md shadow-blue-500/10">
                      <Icon size={18} className="text-cyan-400 lg:hidden" />
                      <Icon
                        size={26}
                        className="text-cyan-400 hidden lg:block"
                      />
                    </div>
                    {!isLast && (
                      <div
                        className="w-px flex-1 bg-gradient-to-b from-blue-500/30 to-blue-500/05 my-1"
                        style={{ minHeight: "28px" }}
                      />
                    )}
                  </div>

                  <div className={`flex-1 ${!isLast ? "mb-2" : ""}`}>
                    <div className="h-11 lg:h-16 flex items-center justify-center px-4 lg:px-6 bg-slate-900/60 border border-white/[0.05] rounded-xl">
                      <span className="text-sm lg:text-base font-semibold text-slate-200">
                        {step.label}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
