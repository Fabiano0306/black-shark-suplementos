import { useEffect, useState } from 'react';
import heroBannerDesktop from '@/assets/hero-banner2.jpg';
import heroBannerMobile from '@/assets/hero-banner2-mobile.jpg';

const phrases = [
  'Seu treino merece o MELHOR.',
  'Força. Performance. Resultado.',
  'Supere seus limites todos os dias.',
  'Transforme seu corpo, transforme sua vida.',
  'Nutrição esportiva de alta qualidade para você.',
  'Alcance seus objetivos com a BLACK SHARK.',
  'O combustível que seu corpo precisa.',
];

export const Hero = () => {
  const [currentPhrase, setCurrentPhrase] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPhrase((prev) => (prev + 1) % phrases.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const scrollToProducts = () => {
    const element = document.getElementById('produtos');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        {/* Versão MOBILE */}
        <img
          src={heroBannerMobile}
          alt="Fitness Motivation Mobile"
          className="w-full h-full object-cover sm:hidden"
        />

        {/* Versão DESKTOP */}
        <img
          src={heroBannerDesktop}
          alt="Fitness Motivation Desktop"
          className="hidden sm:block w-full h-full object-cover object-[center_-50%]"
        />

        <div className="absolute inset-0 bg-gradient-to-b from-shark-black/80 via-shark-black/60 to-shark-black"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center pt-16 sm:pt-24">
        <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8 animate-fade-in">
          <h1
            className="
              text-4xl sm:text-5xl md:text-7xl 
              font-black text-shark-white text-glow 
              tracking-tight leading-tight
            "
          >
            BLACK SHARK
          </h1>

          <p className="text-lg sm:text-xl md:text-2xl text-[#00ffff] font-extrabold tracking-wide">
            SUPLEMENTOS
          </p>

          {/* Animated Phrases */}
          <div className="h-20 sm:h-24 flex items-center justify-center">
            <p
              key={currentPhrase}
              className="text-lg sm:text-2xl md:text-4xl font-bold text-shark-white animate-fade-in px-4"
            >
              {phrases[currentPhrase]}
            </p>
          </div>

          {/* BOTÃO AZUL NEON COM GLOW FORTE */}
          <button
            onClick={scrollToProducts}
            className="
              px-8 sm:px-12 py-4 sm:py-5 mt-6 sm:mt-8
              rounded-lg font-bold uppercase tracking-wide
              bg-gradient-to-r from-[#00ffff] to-[#0077ff]
              text-white
              shadow-[0_0_20px_rgba(0,200,255,0.6)]
              transition-all duration-300
              hover:scale-[1.03] hover:shadow-[0_0_35px_rgba(0,200,255,0.8)]
            "
          >
            Monte seu Pedido Agora
          </button>
        </div>
      </div>
    </section>
  );
};
