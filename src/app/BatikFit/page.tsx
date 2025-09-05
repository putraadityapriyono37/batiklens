import Navbar from '@/components/Navbar';
import BatikFit from '@/components/BatikFit';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="bg-white">
      <Navbar />
      <BatikFit />
      <Footer />
    </main>
  );
}