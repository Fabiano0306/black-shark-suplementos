import { CartProvider } from '@/contexts/CartContext';
import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { Products } from '@/components/Products';
import { Cart } from '@/components/Cart';
import { About } from '@/components/About';
import { Footer } from '@/components/Footer';

const Index = () => {
  return (
    <CartProvider>
      <div className="min-h-screen bg-shark-black">
        <Header />
        <main>
          <Hero />
          <Products />
          <Cart />
          <About />
        </main>
        <Footer />
      </div>
    </CartProvider>
  );
};

export default Index;
