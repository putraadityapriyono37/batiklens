import Navbar from '@/components/Navbar';
import UploadSection from '@/components/UploadSection';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="bg-white">
      <Navbar />
      <UploadSection />
      <Footer />
    </main>
  );
}