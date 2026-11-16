import type { Metadata } from 'next';
import './globals.css';
import { LanguageProvider } from '../contexts/LanguageContext';
import { AuthProvider } from '../contexts/AuthContext';
import { ThemeProvider } from '../contexts/ThemeContext';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';

export const metadata: Metadata = {
  title: 'Nyoria चिना | AI Palm Reading & Vedic Kundali Platform',
  description: 'Discover What Your Hands Reveal. Traditional Vedic Palmistry and Astronomical Kundali generation in Nepali and English powered by AI.',
  keywords: 'Nyoria चिना, palm reading, vedic kundali, nepali kundali, hastarekha, astrology nepal, जन्मकुण्डली, हस्तरेखा',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ne" className="dark scroll-smooth">
      <body className="min-h-screen bg-bgLight dark:bg-bgDark text-navy-900 dark:text-gray-100 antialiased transition-colors duration-300 flex flex-col justify-between font-sans">
        <ThemeProvider>
          <LanguageProvider>
            <AuthProvider>
              <div className="flex flex-col min-h-screen">
                <Navbar />
                <main className="flex-grow">
                  {children}
                </main>
                <Footer />
              </div>
            </AuthProvider>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
