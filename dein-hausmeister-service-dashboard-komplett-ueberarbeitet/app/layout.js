import { Figtree } from 'next/font/google';
import "./globals.css";

const figtree = Figtree({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  display: 'swap',
  variable: '--font-figtree',
});

export const metadata = {
  title: "Dein Hausmeister-Service · Beta v0.2",
  description: "Das komplette Hausmeister-Management System für Hausverwaltungen und Hausmeister.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="de" className={figtree.variable}>
      <body style={{ fontFamily: "var(--font-figtree), 'Figtree', system-ui, sans-serif", margin: 0, height: "100%" }}>
        {children}
      </body>
    </html>
  );
}
