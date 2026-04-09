import { RootProvider } from 'fumadocs-ui/provider/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import './global.css';
import { Syne } from 'next/font/google';

const syne = Syne({
  subsets: ['latin'],
  variable: '--font-syne',
  display: 'swap',
});

export default function Layout({ children }: LayoutProps<'/'>) {
  return (
    <html
      lang="en"
      className={syne.variable}
      suppressHydrationWarning
    >
      <body className="flex flex-col min-h-screen" suppressHydrationWarning>
        <RootProvider>
          {children}
        </RootProvider>
        <SpeedInsights />
      </body>
    </html>
  );
}
