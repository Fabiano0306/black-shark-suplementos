import { MapPin, Phone, Instagram, Mail } from 'lucide-react';
import logoShark from '@/assets/logo-shark.png';

export const Footer = () => {
  return (
    <footer id="contato" className="bg-shark-gray-dark py-12 border-t border-shark-gray">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Logo and Description */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img src={logoShark} alt="Black Shark Logo" className="w-12 h-12" />
              <div>
                <h3 className="text-xl font-black text-shark-white">BLACK SHARK</h3>
                <p className="text-xs text-shark-white-light">SUPLEMENTOS</p>
              </div>
            </div>
            <p className="text-shark-gray-light text-sm">
              Qualidade, performance e confiança para seus treinos.
            </p>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-bold text-shark-white mb-4">Contato</h4>
            <div className="space-y-3">
              <a
                href="https://wa.me/5547991906158"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-shark-gray-light hover:text-shark-white transition-colors group"
              >
                <Phone className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <span>Acessar WhatsApp</span>
              </a>
              <a
                href="https://maps.app.goo.gl/kcXrcepPN8FH4mdYA"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-shark-gray-light hover:text-shark-white transition-colors group"
                aria-label="Abrir CEP 89140-000 no Google Maps"
              >
                <MapPin className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <span>Ibirama - SC</span>
              </a>
            </div>
          </div>

          {/* Social Media */}
          <div>
            <h4 className="text-lg font-bold text-shark-white mb-4">Redes Sociais</h4>
<div className="flex gap-4">
  {/* Instagram */}
  <a
    href="https://instagram.com/blackshark_suplementos"
    target="_blank"
    rel="noopener noreferrer"
    className="w-12 h-12 bg-shark-gray rounded-full flex items-center justify-center hover:bg-shark-white hover:scale-110 transition-all group relative overflow-hidden"
    aria-label="Instagram"
  >
    <span
      className="absolute inset-0 rounded-full z-0"
      style={{
        background:
          'conic-gradient(from 0deg, #405de6, #5851db, #833ab4, #c13584, #e1306c, #fd1d1d, #f77737, #fcb045, #405de6)',
        animation: 'spin 2s linear infinite',
      }}
    />
    <Instagram className="w-6 h-6 text-shark-white group-hover:text-shark-black transition-colors relative z-10" />
  </a>

  {/* WhatsApp com PNG */}
  <a
    href="https://wa.me/5547991906158"
    target="_blank"
    rel="noopener noreferrer"
    className="w-12 h-12 bg-shark-gray rounded-full flex items-center justify-center hover:bg-shark-white hover:scale-110 transition-all group relative overflow-hidden"
    aria-label="WhatsApp"
  >
    {/* Efeito animado */}
    <span
      className="absolute inset-0 rounded-full z-0"
      style={{
        background:
          'conic-gradient(from 0deg, #25D366, #128C7E, #075E54, #25D366, #128C7E)',
        animation: 'spin 3s linear infinite',
      }}
    />
    {/* Ícone PNG centralizado */}
    <img
      src="/icons/whatsapp.png" // 🟢 coloque o caminho da sua imagem aqui
      alt="WhatsApp"
      className="w-6 h-6 relative z-10 transition-all group-hover:scale-110 group-hover:brightness-110"
    />

    <style>
      {`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .group:hover span {
          filter: brightness(1.2) blur(1px);
        }
      `}
    </style>
  </a>
</div>


            
          </div>
        </div>

        {/* Bottom Bar */}
<div className="border-t border-shark-gray pt-8 text-center">
  <p className="text-shark-gray-light text-sm">
      © {new Date().getFullYear()} Black Shark Suplementos. Todos os direitos reservados.<br /><br />
  </p>
  <p className="text-xs mt-2">
    <a
    href="https://instagram.com/desenvolvedor_fabiano"
    target="_blank"
    rel="noopener noreferrer"
    className="
      bg-gradient-to-r from-[#00ffff] to-[#0077ff]
      text-neutral-900 font-bold px-2 py-1 rounded-lg
      shadow-[0_0_12px_rgba(0,200,255,0.5)]
      transition-all duration-300
      hover:shadow-[0_0_25px_rgba(0,200,255,0.8)]
    "
  >
    Fabiano Costa - Desenvolvedor Frontend
  </a>{' '}
  
</p>
</div>

      </div>
    </footer>
  );
};
