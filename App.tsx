import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import FeaturedOn from './components/FeaturedOn';
import Explanation from './components/Explanation';
import FrequencyGrid from './components/FrequencyGrid';
import Steps from './components/Steps';
import HowItWorks from './components/HowItWorks';
import Frustrations from './components/Frustrations';
import SampleShowcase from './components/SampleShowcase';
import SystemVisualizer from './components/SystemVisualizer';
import NeuralTerminal from './components/NeuralTerminal';
import Marquee from './components/Marquee';
import Footer from './components/Footer';

const App: React.FC = () => {
  const [activeProtocolIndex, setActiveProtocolIndex] = useState(0);

  const handleProtocolChange = (index: number) => {
    setActiveProtocolIndex(index);
  };

  return (
    <div className="flex flex-col w-full min-h-screen">
      <Header />
      
      <main className="w-full">
        {/* Section 1: Hero */}
        <section className="pt-[80px] pb-[40px]">
          <Hero />
        </section>

        {/* Section 2: Explanation */}
        <section className="pb-[60px]">
          <Explanation />
        </section>

        {/* Section 3: Frequencies */}
        <section className="pb-[60px]">
          <FrequencyGrid onSelect={handleProtocolChange} />
        </section>

        {/* Section: How It Works Visualizer */}
        <section className="pb-[40px]">
          <HowItWorks />
        </section>

        {/* Section: Frustrations */}
        <section className="pb-[40px]">
          <Frustrations />
        </section>

        {/* Section: System Visualizer */}
        <section className="pb-[40px]">
          <SystemVisualizer 
            activeIndex={activeProtocolIndex} 
            onIndexChange={setActiveProtocolIndex} 
          />
        </section>

        {/* Section: Neural Terminal (Interaction) */}
        <section className="pb-[40px] bg-white/[0.01] border-t border-b border-white/5">
          <NeuralTerminal activeProtocolIndex={activeProtocolIndex} />
        </section>

        {/* Section: Sample Showcase */}
        <section className="pb-[60px]">
          <SampleShowcase />
        </section>

        {/* Section: Steps */}
        <section className="pb-[60px]">
          <Steps />
        </section>

        {/* Section: Credibility Branding */}
        <section className="pb-[60px]">
          <FeaturedOn />
        </section>

        {/* Section 4: Social Proof */}
        <section className="pb-[60px]">
          <Marquee />
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default App;
