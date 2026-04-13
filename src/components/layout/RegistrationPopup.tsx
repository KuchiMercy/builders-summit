import { useState, useEffect } from "react";
import { ArrowRight, X } from "lucide-react";

const RegistrationPopup = () => {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        // Check if the popup has been shown this session
        const hasSeenPopup = sessionStorage.getItem("hasSeenRegistrationPopup");

        if (!hasSeenPopup) {
            // Show popup after 2 seconds
            const timer = setTimeout(() => {
                setIsOpen(true);
            }, 2000);

            return () => clearTimeout(timer);
        }
    }, []);

    const closePopup = () => {
        setIsOpen(false);
        sessionStorage.setItem("hasSeenRegistrationPopup", "true");
    };

    const handleRegisterClick = () => {
        closePopup();
        // Small delay to let the modal close animation start before scrolling
        setTimeout(() => {
            document.getElementById("register")?.scrollIntoView({ behavior: "smooth" });
        }, 100);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in duration-300">
            {/* Backdrop click dismiss */}
            <div className="absolute inset-0" onClick={closePopup}></div>

            {/* Dialog content */}
            <div className="relative bg-white w-full max-w-lg rounded-[2.5rem] p-8 md:p-12 shadow-2xl overflow-hidden animate-zoom-in duration-500">
                {/* Decorative Background Element */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl -mr-16 -mt-16"></div>
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-green-400/20 rounded-full blur-3xl -ml-16 -mb-16"></div>

                {/* Close button */}
                <button
                    onClick={closePopup}
                    className="absolute top-6 right-6 p-2 text-gray-400 hover:text-dark hover:bg-gray-100 rounded-full transition-colors z-10"
                    aria-label="Close dialog"
                >
                    <X size={24} />
                </button>

                <div className="relative z-10 text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary mb-6">
                        <span className="w-2 h-2 bg-primary rounded-full animate-pulse"></span>
                        <span className="text-xs font-bold tracking-widest uppercase">
                            Community Open
                        </span>
                    </div>

                    <h2 className="text-3xl md:text-5xl font-black text-dark mb-4 tracking-tight leading-tight">
                        Join the Movement!
                    </h2>

                    <p className="text-gray-600 font-medium mb-8 text-lg">
                        The 2026 Summit was just the beginning. Join the community and build the future with us.
                    </p>

                    <button
                        onClick={handleRegisterClick}
                        className="w-full py-4 bg-primary text-white rounded-full font-bold text-lg hover:opacity-90 transition-all transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 shadow-xl hover:shadow-primary/30 relative overflow-hidden group border-2 border-primary/50"
                    >
                        <span className="z-10 tracking-wider uppercase">Join Community</span>
                        <ArrowRight size={20} className="z-10 group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default RegistrationPopup;
