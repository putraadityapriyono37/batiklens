// src/app/page.tsx
import Navbar from '@/components/Header';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import History from '@/components/History';
// import FeaturesDeskriptions from '@/components/FeaturesDeskriptions_backup';
// import Eksplore from '@/components/Eksplore_backup';
import Gallery from '@/components/Gallery';
import ContactForm from '@/components/ContactForm';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="bg-white">
      <Navbar />
      <Hero />
      <Features />
      <History />
      {/* <FeaturesDeskriptions /> */}
      {/* <Eksplore /> */}
      <Gallery />
      <ContactForm />
      <Footer />
    </main>
  );
}