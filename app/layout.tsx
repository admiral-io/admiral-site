import { RootProvider } from 'fumadocs-ui/provider/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import './global.css';
import { Syne, DM_Sans, JetBrains_Mono } from 'next/font/google';

const syne = Syne({
  subsets: ['latin'],
  variable: '--font-syne',
  display: 'swap',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  display: 'swap',
});

export default function Layout({ children }: LayoutProps<'/'>) {
  return (
    <html
      lang="en"
      className={`${syne.variable} ${dmSans.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <body className="flex flex-col min-h-screen font-[family-name:var(--font-dm-sans)]">
        <RootProvider>{children}</RootProvider>
        <SpeedInsights />
      </body>
    </html>
  );
}
