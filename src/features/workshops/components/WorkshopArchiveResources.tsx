import { useState } from "react";

export const WorkshopArchiveResources = () => {
  const [notification, setNotification] = useState<string | null>(null);

  const triggerNotification = (message: string) => {
    setNotification(message);
    setTimeout(() => setNotification(null), 3000);
  };

  return (
    <>
      <div className="bg-white border border-gray-200 rounded-[2.5rem] p-8 md:p-12 shadow-2xl animate-fade-in-up" style={{ animationDelay: "200ms" }}>
        <div className="space-y-2 mb-6">
          <h2 className="text-xs font-bold uppercase tracking-widest text-gray-400">
            Session Archive
          </h2>
          <h3 className="text-3xl font-black text-dark uppercase leading-snug tracking-tighter">
            Resources & Recording
          </h3>
          <p className="text-gray-600 font-medium pt-1">
            This summit has concluded. You can access the recording and slide presentation decks below.
          </p>
        </div>
        <div className="flex flex-wrap gap-4 pt-2">
          <button
            onClick={() => triggerNotification("The workshop recording video will be available soon.")}
            className="px-8 py-4 bg-primary text-white hover:opacity-90 transition-all duration-300 font-bold text-sm uppercase tracking-wider rounded-xl cursor-pointer shadow-xl hover:shadow-primary/30 hover:scale-[1.02] active:scale-95 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/30"
          >
            Watch Recording
          </button>
          <button
            onClick={() => triggerNotification("The workbook slide will be available soon.")}
            className="px-8 py-4 border-2 border-dark text-dark hover:bg-gray-50 transition-colors duration-300 font-bold text-sm uppercase tracking-wider rounded-xl cursor-pointer focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-dark/20"
          >
            Download Slides
          </button>
        </div>
      </div>

      {notification && (
        <div 
          className="fixed bottom-6 right-6 z-50 bg-black text-white px-6 py-4 rounded-lg shadow-2xl text-xs font-bold uppercase tracking-wider animate-fade-in border border-white/10"
          role="status"
          aria-live="polite"
        >
          {notification}
        </div>
      )}
    </>
  );
};
