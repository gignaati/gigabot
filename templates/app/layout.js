import './globals.css';
import { ThemeProvider } from './components/theme-provider';

export const metadata = {
  title: 'Giga Bot — Autonomous AI Agent by Gignaati',
  description: 'Giga Bot is an autonomous AI agent platform by Gignaati. Build, deploy, and run AI agents 24/7 with India-first, edge-native AI. Supports PragatiGPT, Claude, GPT, Gemini, and local models via Ollama.',
  keywords: ['AI agent', 'autonomous agent', 'Gignaati', 'PragatiGPT', 'India AI', 'edge AI', 'Giga Bot'],
  authors: [{ name: 'Gignaati', url: 'https://www.gignaati.com' }],
  creator: 'Gignaati',
  publisher: 'Gignaati',
  openGraph: {
    title: 'Giga Bot — Autonomous AI Agent by Gignaati',
    description: 'Build, deploy, and run AI agents 24/7 with India-first, edge-native AI.',
    siteName: 'Giga Bot by Gignaati',
    type: 'website',
  },
  robots: {
    index: false, // Private agent — do not index
    follow: false,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-background text-foreground antialiased">
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
