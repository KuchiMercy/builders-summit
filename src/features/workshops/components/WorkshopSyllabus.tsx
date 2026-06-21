import type { WorkshopData } from "../../../data/workshops";

interface WorkshopSyllabusProps {
  syllabus: WorkshopData["syllabus"];
}

export const WorkshopSyllabus = ({ syllabus }: WorkshopSyllabusProps) => {
  if (!syllabus || syllabus.length === 0) return null;

  return (
    <section className="space-y-8 pt-12 border-t border-gray-200/60 animate-fade-in-up" style={{ animationDelay: "100ms" }}>
      <div className="space-y-2">
        <h2 className="text-xs font-bold uppercase tracking-widest text-primary">
          Syllabus Breakdown
        </h2>
        <h3 className="text-3xl font-black text-dark tracking-tight">
          What You'll Learn
        </h3>
      </div>

      <div className="bg-white border border-gray-200/60 rounded-3xl p-6 md:p-10 shadow-xl shadow-black/5">
        <ol className="relative border-l border-gray-200/60 ml-4 md:ml-6 space-y-12 my-4">
          {syllabus.map((item, idx) => (
            <li
              key={idx}
              className="relative pl-10 md:pl-12 group"
            >
              <span
                className="absolute -left-[17px] top-0 w-8 h-8 rounded-full bg-white border border-gray-200 text-dark flex items-center justify-center font-bold text-xs shadow-sm ring-8 ring-white group-hover:border-primary group-hover:text-primary transition-colors"
                aria-hidden="true"
              >
                {String(idx + 1).padStart(2, "0")}
              </span>
              <div className="space-y-2 bg-gray-50/50 border border-transparent p-6 rounded-2xl group-hover:bg-gray-50 group-hover:border-gray-100 transition-all">
                <h4 className="text-lg font-bold text-dark tracking-wide">
                  {item.topic}
                </h4>
                <p className="text-gray-600 text-sm leading-relaxed font-medium">
                  {item.detail}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
};
