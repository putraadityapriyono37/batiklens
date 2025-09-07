// src/components/Layout/Header/Logo/index.tsx

import Image from 'next/image';
import Link from 'next/link';

// Definisikan tipe props yang akan diterima komponen Logo
interface LogoProps {
  isSticky: boolean; // Menunjukkan apakah header sedang di-scroll
}

const Logo: React.FC<LogoProps> = ({ isSticky }) => {
  // Tentukan path gambar berdasarkan isSticky
  const logoSrc = isSticky 
    ? "/images/logo/logo_white_batiklens.svg" // Logo putih saat sticky (di-scroll)
    : "/images/logo/logo_brown_batiklens.svg";   // Logo coklat saat tidak sticky (default)

  return (
    <Link href="/">
      <Image
        src={logoSrc}
        alt="Batiklens Logo"
        width={175} // Sesuaikan lebar logo Anda
        height={40}  // Sesuaikan tinggi logo Anda
        priority 
      />
    </Link>
  );
};

export default Logo;