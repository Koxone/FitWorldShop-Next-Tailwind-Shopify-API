import '@/app/globals.css';
import { SpeedInsights } from '@vercel/speed-insights/next';
import I18nProvider from '@/components/providers/I18nProvider';
import PageTransitionWrapper from '@/components/wrappers/PageTransitionWrapper';
import Header from '@/components/headers/Header';
import Footer from '@/components/footers/Footer';
import { GeneralContextProvider } from '@/context/GeneralContext';
import { PurchaseProvider } from '@/context/PurchaseContext';
import { ShopifyProductsProvider } from '@/context/ShopifyProductsContext';
import { AuthContextProvider } from '@/context/AuthContext';
import { FilterContextProvider } from '@/context/FilterContext';

export const metadata = {
  title: {
    default: 'FitWorld Shop',
    template: '%s | FitWorld Shop',
  },
  description:
    'Tienda en línea moderna y responsiva de ropa deportiva y artículos fitness. Descubre calidad, estilo y rendimiento en FitWorld Shop.',
  keywords: [
    'ropa deportiva',
    'ropa de gimnasio',
    'tienda fitness',
    'tienda online',
    'ecommerce méxico',
    'shopify méxico',
    'next.js tienda',
    'tailwind css ecommerce',
    'ropa activa',
    'ropa deportiva para hombre y mujer',
  ],
  metadataBase: new URL('https://fitworldshop.koxland.dev'),
  openGraph: {
    title: 'FitWorld Shop',
    description:
      'Explora ropa deportiva de alto rendimiento y accesorios fitness en FitWorld Shop. Experiencia rápida y moderna en línea.',
    url: 'https://fitworldshop.koxland.dev',
    siteName: 'FitWorld Shop',
    images: [
      {
        url: 'https://fitworldshop.koxland.dev/og-image.png',
        width: 1200,
        height: 630,
        alt: 'FitWorld Shop - Ropa deportiva premium',
      },
    ],
    locale: 'es_MX',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      maxVideoPreview: -1,
      maxImagePreview: 'large',
      maxSnippet: -1,
    },
  },
  authors: [{ name: 'Kox', url: 'https://github.com/Koxone' }],
  creator: 'Kox',
  publisher: 'FitWorld Shop',
  alternates: {
    canonical: 'https://fitworldshop.koxland.dev',
    languages: {
      'es-MX': 'https://fitworldshop.koxland.dev',
      'en-US': 'https://fitworldshop.koxland.dev/en',
    },
  },
  category: 'ecommerce',
};

export default function RootLayout({ children }) {
  return (
    <FilterContextProvider>
      <AuthContextProvider>
        <GeneralContextProvider>
          <ShopifyProductsProvider>
            <PurchaseProvider>
              <html lang="en" className="overflow-x-hidden">
                <body>
                  <I18nProvider>
                    <Header />
                    <PageTransitionWrapper>{children}</PageTransitionWrapper>
                    <Footer />
                  </I18nProvider>
                  <SpeedInsights />
                </body>
              </html>
            </PurchaseProvider>
          </ShopifyProductsProvider>
        </GeneralContextProvider>
      </AuthContextProvider>
    </FilterContextProvider>
  );
}
