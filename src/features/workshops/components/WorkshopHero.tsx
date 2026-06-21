import { Link } from "react-router-dom";
import { ArrowLeft, Clock, Award, Calendar } from "lucide-react";
import type { WorkshopData } from "../../../data/workshops";

interface WorkshopHeroProps {
  workshop: WorkshopData;
}

export const WorkshopHero = ({ workshop }: WorkshopHeroProps) => {
  return (
    <div className="bg-[#FAFAFA] border-b border-gray-200/60 pt-36 pb-24 mb-16 relative overflow-hidden">
      {/* Light mode mesh gradient and pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-primary/5 via-[#FAFAFA] to-[#FAFAFA] pointer-events-none"></div>
      <div className="absolute inset-0 bg-[radial-gradient(#000000_1px,transparent_1px)] bg-size-[24px_24px] opacity-[0.03] pointer-events-none"></div>

      <div className="max-w-6xl mx-auto px-6 relative z-10 animate-fade-in-up">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gray-500 hover:text-dark mb-10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm"
          aria-label="Go back to Home page"
        >
          <ArrowLeft size={14} aria-hidden="true" />
          Back to Home
        </Link>

        <div className="space-y-6">
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white border border-gray-200 text-dark text-[10px] font-bold uppercase tracking-wider shadow-sm backdrop-blur-md">
              {workshop.track}
            </span>
            <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full border border-gray-200 text-gray-600 text-[10px] font-bold uppercase tracking-wider bg-white/60 shadow-sm backdrop-blur-md">
              <Clock size={12} className="text-gray-400" aria-hidden="true" />
              {workshop.duration}
            </span>
            <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full border border-gray-200 text-gray-600 text-[10px] font-bold uppercase tracking-wider bg-white/60 shadow-sm backdrop-blur-md">
              <Award size={12} className="text-gray-400" aria-hidden="true" />
              {workshop.level}
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-dark leading-tight tracking-tight max-w-4xl text-balance drop-shadow-sm">
            {workshop.title}
          </h1>

          <div className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-wider pt-2">
            <Calendar size={14} className="text-primary" aria-hidden="true" />
            <time dateTime={workshop.date.toISOString()}>{workshop.time}</time>
          </div>
          
          <div className="pt-8">
            <button 
              onClick={() => {
                const el = document.getElementById('register');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 bg-primary text-white rounded-full font-bold uppercase tracking-wide overflow-hidden transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-[0_0_40px_-10px_rgba(247,134,40,0.5)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/50 cursor-pointer"
            >
              <span className="relative z-10">Secure Your Seat</span>
              <div className="absolute inset-0 h-full w-full bg-linear-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] pointer-events-none"></div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
