import Hero from '../components/sections/Hero';
import Features from '../components/sections/Features';
import HowItWorks from '../components/sections/HowItWorks';
import About from '../components/sections/About';
import Testimonials from '../components/sections/Testimonials';
import Pricing from '../components/sections/Pricing';
import FAQ from '../components/sections/FAQ';
import Contact from '../components/sections/Contact';

export default function Home() {
  return (
    <>
      <Hero />
      <Features />
      <HowItWorks />
      <About />
      <Testimonials />
      <Pricing />
      <FAQ />
      <Contact />
    </>
  );
}
