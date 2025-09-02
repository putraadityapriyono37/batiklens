// src/app/page.tsx
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import FeaturesDeskriptions from '@/components/FeaturesDeskriptions';
import Eksplore from '@/components/Eksplore';
import Gallery from '@/components/Gallery';
import ContactForm from '@/components/ContactForm';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="bg-white">
      <Navbar />
      <Hero />
      <Features />
      <FeaturesDeskriptions />
      <Eksplore />
      <Gallery />
      <ContactForm />
      <Footer />
    </main>
  );
}