import '@/app/globals.css';
import { SpeedInsights } from '@vercel/speed-insights/next';
import I18nProvider from '@/components/providers/I18nProvider';
import PageTransitionWrapper from '@/components/wrappers/PageTransitionWrapper';
import Header from '@/components/headers/Header';
import Footer from '@/components/footers/Footer';
import { GeneralContextProvider } from '@/context/GeneralContext';
import { PurchaseProvider } from '@/context/PurchaseContext';
import { ShopifyProductsProvider } from '@/context/ShopifyProductsContext';

export const metadata = {
  title: 'Next.js Template',
  description: 'FitWorld Shop - Tienda de Ropa Deportiva',
};

export default function RootLayout({ children }) {
  return (
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
  );
}
