import { Award, Target, Users, MapPin } from 'lucide-react';

export const About = () => {
  return (
    <section id="sobre" className="py-20 bg-shark-black">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-16 animate-fade-in">
          <h2 className="section-title mb-6">SOBRE NÓS</h2>
          <p className="text-xl text-shark-white font-light mb-4">
            Mais do que suplementos, um estilo de vida.
          </p>
          <p className="text-shark-gray-light text-lg leading-relaxed">
            A Black Shark Suplementos nasceu com o propósito de entregar qualidade, 
            performance e confiança aos seus treinos. Somos apaixonados por resultados 
            e acreditamos que cada atleta merece o melhor suporte nutricional para 
            alcançar seus objetivos.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="product-card p-8 text-center animate-slide-up">
            <div className="w-16 h-16 bg-shark-white rounded-full flex items-center justify-center mx-auto mb-6">
              <Award className="w-8 h-8 text-shark-black" />
            </div>
            <h3 className="text-xl font-bold text-shark-white mb-3">
              Qualidade Premium
            </h3>
            <p className="text-shark-gray-light">
              Produtos selecionados das melhores marcas do mercado, 
              garantindo máxima eficácia e segurança.
            </p>
          </div>

          <div 
            className="product-card p-8 text-center animate-slide-up" 
            style={{ animationDelay: '0.1s' }}
          >
            <div className="w-16 h-16 bg-shark-white rounded-full flex items-center justify-center mx-auto mb-6">
              <Target className="w-8 h-8 text-shark-black" />
            </div>
            <h3 className="text-xl font-bold text-shark-white mb-3">
              Foco em Resultados
            </h3>
            <p className="text-shark-gray-light">
              Comprometidos em ajudar você a atingir seus objetivos, 
              seja ganho de massa, definição ou performance.
            </p>
          </div>

          <div 
            className="product-card p-8 text-center animate-slide-up" 
            style={{ animationDelay: '0.2s' }}
          >
            <div className="w-16 h-16 bg-shark-white rounded-full flex items-center justify-center mx-auto mb-6">
              <Users className="w-8 h-8 text-shark-black" />
            </div>
            <h3 className="text-xl font-bold text-shark-white mb-3">
              Atendimento Exclusivo
            </h3>
            <p className="text-shark-gray-light">
              Suporte personalizado para orientar na escolha dos 
              melhores suplementos para seu perfil e objetivos.
            </p>
          </div>
        </div>

        {/* BLOCO ATUALIZADO */}
        <div 
          className="mt-16 text-center animate-slide-up animate-fade-in" 
          style={{ animationDelay: '0.3s' }}
        >
          <p className="text-shark-white text-lg mb-2">
            <strong>Loja física:</strong> Ibirama - SC
          </p>
          <p className="text-shark-gray-light mb-6">
            Vendas online com entrega em todo o Brasil
          </p>

          <a
            href="https://maps.app.goo.gl/kcXrcepPN8FH4mdYA"
            target="_blank"
            rel="noopener noreferrer"
            className="
              inline-flex items-center gap-3 px-6 py-3 rounded-xl
              bg-white/10 backdrop-blur-md
              border border-white/20
              hover:bg-white/15
              transition-all duration-300
              text-shark-white font-medium
              shadow-[0_0_15px_rgba(0,200,255,0.4)]
              hover:shadow-[0_0_25px_rgba(0,200,255,0.7)]
              animate-slide-up animate-fade-in
            "
            style={{ animationDelay: '0.45s' }}
          >
            <MapPin 
              className="w-5 h-5 text-shark-blue animate-slide-up animate-fade-in" 
              style={{ animationDelay: '0.55s' }} 
            />
            Ver localização
          </a>
        </div>
      </div>
    </section>
  );
};
