import { Clock, BookOpen, Sparkles, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { getActiveWorkshop, getOtherWorkshops } from "../../data/workshops";
import type { WorkshopData } from "../../data/workshops";

const Workshops = () => {
  const workshop = getActiveWorkshop();
  const archivedWorkshops = getOtherWorkshops(workshop.id);

  const isUpcoming = (date: Date) => new Date() < date;

  const renderWorkshopCard = (w: WorkshopData, isFeatured: boolean) => {
    const upcoming = isUpcoming(w.date);

    if (isFeatured) {
      return (
        <div className="group bg-gray-50 rounded-[3rem] border-2 border-gray-100 hover:border-primary/20 hover:bg-white transition-all duration-500 overflow-hidden shadow-xl hover:shadow-2xl mb-12">
          <div className="p-8 md:p-12 lg:p-16 flex flex-col lg:flex-row gap-12">
            
            {/* Left Column: Details & Speaker */}
            <div className="lg:w-1/2 flex flex-col justify-between gap-8">
              <div className="space-y-6">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-dark text-white text-xs font-black uppercase tracking-wider">
                    <Clock size={12} />
                    {w.time.split(' | ')[0]}
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-black uppercase tracking-wider">
                    <BookOpen size={12} />
                    {w.track}
                  </span>
                </div>

                <h3 className="text-4xl md:text-5xl font-black text-dark tracking-tight leading-tight group-hover:text-primary transition-colors duration-300">
                  {w.title}
                </h3>

                <p className="text-lg text-dark/70 font-medium leading-relaxed">
                  {w.description}
                </p>
              </div>

              {/* Facilitator Card */}
              <div className="flex items-center gap-4 bg-white p-4 rounded-2xl border border-gray-100 shadow-sm w-fit">
                <div className="w-14 h-14 rounded-full overflow-hidden bg-gray-100 border border-gray-200 shrink-0">
                  {w.facilitator.avatar ? (
                    <img
                      src={w.facilitator.avatar}
                      alt={w.facilitator.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xl">
                      {w.facilitator.name.charAt(0)}
                    </div>
                  )}
                </div>
                <div>
                  <p className="text-xs text-dark/40 font-bold uppercase tracking-wider">Facilitator</p>
                  <h4 className="text-lg font-black text-dark leading-tight">{w.facilitator.name}</h4>
                </div>
              </div>
            </div>

            {/* Right Column: Key Takeaways & Action Resources */}
            <div className="lg:w-1/2 flex flex-col justify-between bg-white/60 backdrop-blur-sm p-8 md:p-10 rounded-[2.5rem] border border-gray-200/50 shadow-inner gap-10">
              <div>
                <h4 className="text-xl font-black text-dark uppercase tracking-wider mb-6 flex items-center gap-3">
                  <span className="w-3 h-3 rounded-full bg-primary"></span>
                  Key Takeaways
                </h4>
                <ul className="space-y-4">
                  {w.takeaways.slice(0, 3).map((takeaway, idx) => (
                    <li key={idx} className="flex gap-4 items-start">
                      <span className="shrink-0 w-7 h-7 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xs mt-0.5 shadow-sm border border-primary/20">
                        {idx + 1}
                      </span>
                      <span className="text-dark/90 font-medium text-lg leading-relaxed">
                        {takeaway}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-8 border-t border-gray-100">
                <Link
                  to={`/workshop/${w.id}`}
                  className="flex items-center justify-center gap-2 w-full px-6 py-4 bg-primary text-white hover:bg-dark transition-all duration-300 rounded-2xl font-bold text-sm tracking-wide transform active:scale-95 shadow-md shadow-primary/20 text-center uppercase cursor-pointer"
                >
                  {upcoming ? "Register for Workshop" : "View Resources & Recording"}
                  <ArrowRight size={18} />
                </Link>
              </div>
            </div>

          </div>
        </div>
      );
    }

    // Archived / Smaller Workshop Card
    return (
      <div key={w.id} className="bg-white border border-gray-100 rounded-3xl p-6 hover:shadow-lg hover:border-gray-200 transition-all flex flex-col h-full">
        <div className="flex-1 space-y-4 mb-6">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gray-100 text-gray-600 text-[10px] font-bold uppercase tracking-wider">
              {upcoming ? 'Upcoming' : 'Archived'}
            </span>
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
              {w.track}
            </span>
          </div>
          <h4 className="text-2xl font-black text-dark leading-tight line-clamp-2">
            {w.title}
          </h4>
          <p className="text-sm text-gray-500 font-medium line-clamp-3">
            {w.description}
          </p>
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
              className="text-primary font-bold text-sm hover:underline flex items-center gap-1 uppercase tracking-wider"
            >
              Details <ArrowRight size={14} />
            </Link>
          ) : (
            <span className="text-gray-400 font-bold text-sm flex items-center gap-1 uppercase tracking-wider cursor-not-allowed">
              Coming Soon
            </span>
          )}
        </div>
      </div>
    );
  };

  return (
    <section id="workshops" className="py-24 bg-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] bg-size-[20px_20px] opacity-40 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary mb-4 font-bold text-xs uppercase tracking-wider">
              <Sparkles size={14} className="animate-pulse" />
              Featured Workshop
            </div>
            <h2 className="text-5xl md:text-7xl font-black text-dark tracking-tighter leading-none">
              interactive <br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-orange-600">
                WORKSHOP
              </span>
            </h2>
          </div>
        </div>

        {/* Featured Workshop */}
        {renderWorkshopCard(workshop, true)}

        {/* Workshop Archive Grid */}
        {archivedWorkshops.length > 0 && (
          <div className="mt-20">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-3xl font-black text-dark tracking-tight">More Sessions</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {archivedWorkshops.map(w => renderWorkshopCard(w, false))}
            </div>
          </div>
        )}

      </div>
    </section>
  );
};

export default Workshops;
