import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import RegistrationPopup from "../components/layout/RegistrationPopup";
import Hero from "../components/sections/Hero";
import EventDetails from "../components/sections/EventDetails";
import WhatToExpect from "../components/sections/WhatToExpect";
import About from "../components/sections/About";
import MissionImpactGoal from "../components/sections/MissionImpactGoal";
import EventObjectives from "../components/sections/EventObjectives";
import Speakers from "../components/sections/Speakers";
import WhyAttend from "../components/sections/WhyAttend";
import Sponsors from "../components/sections/Sponsors";
import Register from "../components/sections/Register";
import FAQ from "../components/sections/FAQ";
import Contact from "../components/sections/Contact";

const Home = () => {
  return (
    <div className="min-h-screen bg-white text-black selection:bg-blue-100">
      <Navbar />
      <RegistrationPopup />
      <main>
        <Hero />
        <EventDetails />
        <About />
        <MissionImpactGoal />
        <WhatToExpect />
        <EventObjectives />
        <Speakers />
        <WhyAttend />
        <Sponsors />
        <Register />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
