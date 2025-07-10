import '@/app/globals.css';
import { SpeedInsights } from '@vercel/speed-insights/next';
import I18nProvider from '@/components/providers/I18nProvider';
import PageTransitionWrapper from '@/components/PageTransitionWrapper';

export const metadata = {
  title: 'Next.js Template',
  description:
    'Reusable Next.js + Tailwind + Framer Motion + i18n starter template for projects.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <I18nProvider>
          <PageTransitionWrapper>{children}</PageTransitionWrapper>
        </I18nProvider>
        <SpeedInsights />
      </body>
    </html>
  );
}
