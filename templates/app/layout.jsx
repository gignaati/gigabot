import "./globals.css";

export const metadata = {
  title: "Giga Bot — Gignaati AI Agent",
  description:
    "Giga Bot is Gignaati's autonomous AI agent platform. Build, deploy, and run AI agents 24/7.",
  keywords: ["AI", "agent", "Gignaati", "automation", "India", "edge AI"],
  authors: [{ name: "Gignaati", url: "https://www.gignaati.com" }],
  openGraph: {
    title: "Giga Bot — Gignaati AI Agent",
    description:
      "Gignaati's autonomous AI agent platform. Build, deploy, and run AI agents 24/7.",
    url: "https://www.gignaati.com",
    siteName: "Giga Bot by Gignaati",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Giga Bot — Gignaati AI Agent Platform",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Giga Bot — Gignaati AI Agent",
    description: "Gignaati's autonomous AI agent platform.",
    images: ["/og-image.png"],
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-white text-black font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
