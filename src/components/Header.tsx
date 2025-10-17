import { ShoppingCart, Menu } from 'lucide-react';
import { useState } from 'react';
import { useCart } from '@/contexts/CartContext';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import logoShark from '@/assets/logo-shark.png';

export const Header = () => {
  const { totalItems } = useCart();
  const [isOpen, setIsOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-shark-black/95 backdrop-blur-sm border-b border-shark-gray-dark">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => scrollToSection('home')}>
            <img src={logoShark} alt="Black Shark Logo" className="w-10 h-10 md:w-12 md:h-12" />
            <div>
              <h1 className="text-xl md:text-2xl font-black text-shark-white">BLACK SHARK</h1>
              <p className="text-xs text-shark-white-light hidden md:block">SUPLEMENTOS</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <button onClick={() => scrollToSection('home')} className="text-shark-white hover:text-shark-gray-light transition-colors">
              Início
            </button>
            <button onClick={() => scrollToSection('produtos')} className="text-shark-white hover:text-shark-gray-light transition-colors">
              Produtos
            </button>
            <button onClick={() => scrollToSection('sobre')} className="text-shark-white hover:text-shark-gray-light transition-colors">
              Sobre
            </button>
            <button onClick={() => scrollToSection('contato')} className="text-shark-white hover:text-shark-gray-light transition-colors">
              Contato
            </button>
          </nav>

          {/* Cart and Mobile Menu */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => scrollToSection('carrinho')}
              className="relative p-2 hover:bg-shark-gray-dark rounded-lg transition-colors"
              aria-label="Carrinho de compras"
            >
              <ShoppingCart className="w-6 h-6 text-shark-white" />
              {totalItems > 0 && (
                <span className="cart-badge">
                  {totalItems}
                </span>
              )}
            </button>

            {/* Mobile Menu */}
<Sheet open={isOpen} onOpenChange={setIsOpen}>
  <SheetTrigger className="md:hidden p-2 hover:bg-shark-gray-dark rounded-lg transition-colors">
    <Menu className="w-6 h-6 text-shark-white" />
  </SheetTrigger>
  <SheetContent side="right" className="bg-shark-black border-shark-gray-dark">
    <nav className="flex flex-col gap-6 mt-8">
      <button onClick={() => scrollToSection('home')} className="text-shark-white hover:text-shark-gray-light transition-colors text-left text-lg">
        Início
      </button>
      <button onClick={() => scrollToSection('produtos')} className="text-shark-white hover:text-shark-gray-light transition-colors text-left text-lg">
        Produtos
      </button>
      <button onClick={() => scrollToSection('sobre')} className="text-shark-white hover:text-shark-gray-light transition-colors text-left text-lg">
        Sobre
      </button>
      <button onClick={() => scrollToSection('contato')} className="text-shark-white hover:text-shark-gray-light transition-colors text-left text-lg">
        Contato
      </button>
    </nav>
    <div className="mt-8 border-t border-shark-gray-dark pt-4 flex justify-center">
  <a
    href="https://instagram.com/desenvolvedor_fabiano"
    target="_blank"
    rel="noopener noreferrer"
    className="
      bg-gradient-to-r from-[#00ffff] to-[#0077ff]
      text-white font-bold px-4 py-2 rounded-lg
      shadow-[0_0_15px_rgba(0,200,255,0.5)]
      transition-all duration-300
      hover:shadow-[0_0_25px_rgba(0,200,255,0.8)]
    "
  >
    DEV Fabiano
  </a>
</div>

  </SheetContent>
</Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};
