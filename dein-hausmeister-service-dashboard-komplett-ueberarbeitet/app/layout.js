import "./globals.css";

export const metadata = {
  title: "Dein-Hausmeister-Service Dashboard",
  description: "Schadenmeldungen einfach verwalten – für Hausverwaltung, Hausmeister & Handwerker."
};

export default function RootLayout({ children }) {
  return (
    <html lang="de">
      <body className="app-shell">
        {children}
      </body>
    </html>
  );
}
