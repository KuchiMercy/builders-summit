import { useParams } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { useWorkshopData } from "../features/workshops/hooks/useWorkshopData";
import { WorkshopHero } from "../features/workshops/components/WorkshopHero";
import { WorkshopSyllabus } from "../features/workshops/components/WorkshopSyllabus";
import { WorkshopFacilitator } from "../features/workshops/components/WorkshopFacilitator";
import { WorkshopRegistrationForm } from "../features/workshops/components/WorkshopRegistrationForm";
import { ErrorBoundary } from "../components/common/ErrorBoundary";
import { WorkshopArchiveResources } from "../features/workshops/components/WorkshopArchiveResources";
import { WorkshopOtherSessions } from "../features/workshops/components/WorkshopOtherSessions";

const Workshop = () => {
  const { id } = useParams<{ id: string }>();
  const { workshop, otherWorkshops, isUpcoming, isLoading } = useWorkshopData(id);

  if (isLoading) {
    // Enterprise-grade skeleton loader
    return (
      <div className="min-h-screen bg-[#FAFAFA] flex flex-col">
        <Navbar theme="light" />
        <main className="grow pt-36 pb-24 bg-[#FAFAFA]">
          <div className="max-w-6xl mx-auto px-6 space-y-16 animate-pulse">
            <div className="h-40 bg-white rounded-2xl w-full border border-gray-200/60"></div>
            <div className="h-96 bg-white rounded-[2.5rem] w-full border border-gray-200/60"></div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // If we reach here and workshop is still null, the hook is already redirecting
  if (!workshop) return null;

  return (
    <div className="min-h-screen bg-[#FAFAFA] flex flex-col text-dark selection:bg-primary/30">
      <Navbar theme="light" />

      <main className="grow pb-24 bg-[#FAFAFA]">
        <WorkshopHero workshop={workshop} />

        <div className="max-w-6xl mx-auto px-6">
          <article className="space-y-16">
            
            {/* Premise / Description */}
            <section className="border-l-2 border-primary/50 pl-6 py-1 max-w-4xl animate-fade-in-up">
              <p className="text-lg md:text-xl text-gray-700 leading-relaxed font-light">
                {workshop.description}
              </p>
            </section>

            <WorkshopSyllabus syllabus={workshop.syllabus} />
            <WorkshopFacilitator facilitator={workshop.facilitator} />

            {/* Registration Form / Session Materials Section */}
            <section id="register" className="pt-12 border-t border-gray-200/60">
              {isUpcoming ? (
                <ErrorBoundary>
                  <WorkshopRegistrationForm workshop={workshop} />
                </ErrorBoundary>
              ) : (
                <WorkshopArchiveResources />
              )}
            </section>

            <WorkshopOtherSessions otherWorkshops={otherWorkshops} />

          </article>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Workshop;
