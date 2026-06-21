import type { WorkshopData } from "../../../data/workshops";

interface WorkshopFacilitatorProps {
  facilitator: WorkshopData["facilitator"];
}

export const WorkshopFacilitator = ({ facilitator }: WorkshopFacilitatorProps) => {
  if (!facilitator) return null;

  return (
    <section className="space-y-6 pt-12 border-t border-gray-200/60 animate-fade-in-up" style={{ animationDelay: "150ms" }}>
      <div className="space-y-2">
        <h2 className="text-xs font-bold uppercase tracking-widest text-primary">
          Facilitator
        </h2>
        <h3 className="text-3xl font-black text-dark tracking-tight">
          Meet the Workshop Leader
        </h3>
      </div>

      <div className="bg-white border border-gray-200/60 rounded-3xl p-8 md:p-10 flex flex-col md:flex-row gap-8 items-start shadow-xl shadow-black/5 transition-all duration-300 hover:border-gray-300/50">
        <div className="w-24 h-24 rounded-full bg-gray-50 border border-gray-200 text-dark overflow-hidden flex items-center justify-center font-black text-3xl shrink-0 uppercase tracking-widest shadow-lg">
          {facilitator.avatar ? (
            <img
              src={facilitator.avatar}
              alt={`Avatar of ${facilitator.name}`}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          ) : (
            <span aria-hidden="true">
              {facilitator.name.split(' ').map(n => n[0]).join('')}
            </span>
          )}
        </div>
        <div className="space-y-4">
          <div className="space-y-1">
            <h4 className="text-xl font-bold text-dark tracking-wide">
              {facilitator.name}
            </h4>
            <p className="text-xs font-bold text-primary uppercase tracking-widest">
              {facilitator.role}
            </p>
          </div>
          <p className="text-sm text-gray-600 leading-relaxed font-medium">
            {facilitator.bio}
          </p>
        </div>
      </div>
    </section>
  );
};
