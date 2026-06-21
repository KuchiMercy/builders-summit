import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import type { WorkshopData } from "../../../data/workshops";

interface WorkshopOtherSessionsProps {
  otherWorkshops: WorkshopData[];
}

export const WorkshopOtherSessions = ({ otherWorkshops }: WorkshopOtherSessionsProps) => {
  if (!otherWorkshops || otherWorkshops.length === 0) return null;

  return (
    <section className="pt-24 animate-fade-in-up" style={{ animationDelay: "300ms" }}>
      <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-200">
        <h3 className="text-2xl font-black text-dark tracking-tight uppercase">More Workshops</h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {otherWorkshops.map(w => (
          <div key={w.id} className="bg-white border border-gray-100 rounded-3xl p-6 hover:shadow-lg hover:border-gray-200 transition-all duration-300 flex flex-col h-full group">
            <div className="flex-1 space-y-4 mb-6">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                  {w.track}
                </span>
              </div>
              <h4 className="text-xl font-black text-dark leading-tight line-clamp-2 group-hover:text-primary transition-colors">
                {w.title}
              </h4>
            </div>
            
            <div className="mt-auto pt-6 border-t border-gray-50 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xs">
                  {w.facilitator.name.charAt(0)}
                </div>
                <span className="text-sm font-bold text-dark">{w.facilitator.name}</span>
              </div>
              {w.isActive ? (
                <Link
                  to={`/workshop/${w.id}`}
                  className="text-primary font-bold text-sm hover:underline flex items-center gap-1 uppercase tracking-wider focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm"
                >
                  Details <ArrowRight size={14} aria-hidden="true" />
                </Link>
              ) : (
                <span className="text-gray-400 font-bold text-sm flex items-center gap-1 uppercase tracking-wider cursor-not-allowed">
                  Coming Soon
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
