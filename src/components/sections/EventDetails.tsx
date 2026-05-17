import { Calendar, Clock, MapPin, Ticket } from "lucide-react";

const EventDetails = () => {
  return (
    <section className="py-12 bg-white relative z-20 ">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-black text-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row">
          {/* Left Side: Date & Time */}
          <div className="p-8 md:p-12 md:w-1/3 border-b md:border-b-0 md:border-r border-gray-800 flex flex-col justify-center items-center md:items-start text-center md:text-left bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-800 text-xs font-bold uppercase tracking-wider mb-6">
              <Calendar size={14} />
              Past Event
            </div>
            <h3 className="text-5xl font-black mb-2">28</h3>
            <p className="text-xl font-bold uppercase tracking-widest text-gray-400 mb-6">March 2026</p>
            <div className="flex items-center gap-3 text-gray-300">
              <Clock size={20} />
              <span className="text-lg">11:00 AM Prompt</span>
            </div>
          </div>

          {/* Middle: Venue & Format */}
          <div className="p-8 md:p-12 md:w-1/3 border-b md:border-b-0 md:border-r border-gray-800 flex flex-col justify-center items-center md:items-start text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-800 text-xs font-bold uppercase tracking-wider mb-6">
              <MapPin size={14} />
              Location
            </div>
            <h3 className="text-3xl font-bold mb-4">Virtual Summit</h3>
            <p className="text-gray-400 leading-relaxed mb-6">
              Join from anywhere in the world. Experience the same energy, connection, and impact, right from your screen.
            </p>
            <div className="flex items-center gap-2 text-sm font-bold text-gray-500 uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              Zoom Live Stream
            </div>
          </div>

          {/* Right Side: CTA */}
          <div className="p-8 md:p-12 md:w-1/3 flex flex-col justify-center items-center text-center bg-gray-900">
            <Ticket size={48} className="text-white mb-6 opacity-80" />
            <h3 className="text-2xl font-bold mb-2">Join Our Network</h3>
            <p className="text-gray-400 text-sm mb-8">Access event highlights and connect with our growing community of builders.</p>
            <button 
              onClick={() => document.getElementById('register')?.scrollIntoView({ behavior: 'smooth'})}
              className="w-full py-4 bg-white text-black rounded-xl font-bold hover:bg-gray-200 transition-all transform hover:scale-105 active:scale-95"
            >
              Join Community
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EventDetails;
