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
                <span>(47) 99190-6158</span>
              </a>
              <div className="flex items-center gap-3 text-shark-gray-light">
                <MapPin className="w-5 h-5" />
                <span>Presidente Getúlio - SC</span>
              </div>
            </div>
          </div>

          {/* Social Media */}
          <div>
            <h4 className="text-lg font-bold text-shark-white mb-4">Redes Sociais</h4>
            <div className="flex gap-4">
              <a
                href="https://instagram.com/blackshark_suplementos"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-shark-gray rounded-full flex items-center justify-center hover:bg-shark-white hover:scale-110 transition-all group"
                aria-label="Instagram"
              >
                <Instagram className="w-6 h-6 text-shark-white group-hover:text-shark-black transition-colors" />
              </a>
              <a
                href="https://wa.me/5547991906158"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-shark-gray rounded-full flex items-center justify-center hover:bg-shark-white hover:scale-110 transition-all group"
                aria-label="WhatsApp"
              >
                <Phone className="w-6 h-6 text-shark-white group-hover:text-shark-black transition-colors" />
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
        text-white font-bold px-2 py-1 rounded-lg
        shadow-[0_0_12px_rgba(0,200,255,0.5)]
        transition-all duration-300
        hover:shadow-[0_0_25px_rgba(0,200,255,0.8)]
      "
    >
      DEV Fabiano
    </a>{' '} - Desenvolvedor Frontend
  </p>
</div>

      </div>
    </footer>
  );
};
