
import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Schedule from './components/Schedule';
import AboutSpeaker from './components/AboutSpeaker';
import Methodology from './components/Methodology';
import TargetAudience from './components/TargetAudience';
import Partners from './components/Partners';
import Location from './components/Location';
import FAQ from './components/FAQ';
import RegistrationForm from './components/RegistrationForm';
import Footer from './components/Footer';
import FloatingCTA from './components/FloatingCTA';
import { ContentProvider } from './context/ContentContext';

const AppContent: React.FC = () => {
  return (
    <main className="font-sans text-gray-800 antialiased relative">
      <Navbar />
      <Hero />
      <Schedule />
      <AboutSpeaker />
      <Methodology />
      <TargetAudience />
      <Partners />
      <Location />
      <FAQ />
      <RegistrationForm />
      <Footer />
      <FloatingCTA />
    </main>
  );
}

const App: React.FC = () => {
  return (
    <ContentProvider>
        <AppContent />
    </ContentProvider>
  );
};

export default App;
