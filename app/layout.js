import './globals.css';
import Navbar from '@/components/layout/Navbar';

export const metadata = {
  title: 'WritingCode — Aprende Java y Docker',
  description: 'Plataforma de aprendizaje interactivo de Java y Docker',
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>
        <Navbar />
        <main style={{ minHeight: '100vh', paddingTop: '72px' }}>
          {children}
        </main>
      </body>
    </html>
  );
}
