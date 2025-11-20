
import React from 'react';
import { Instagram, Mail, Phone } from 'lucide-react';
import { useContent } from '../context/ContentContext';
import EditableImage from './EditableImage';
import EditableText from './EditableText';

const Footer: React.FC = () => {
  const { content } = useContent();

  return (
    <footer className="bg-brand-grey text-white pt-16 pb-8 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          <div>
            <div className="mb-6 w-fit rounded-xl bg-white/10 p-2">
                <EditableImage 
                    section="hero"
                    imageField="logoUrl"
                    widthField="footerLogoWidth"
                    imageUrl={content.hero.logoUrl}
                    widthValue={200}
                    alt="Projeto UpToYou"
                    className="object-contain"
                    allowResize={false}
                />
            </div>
            <div className="text-gray-300">
               <EditableText section="footer" field="description" value={content.footer.description} />
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-bold mb-4 text-white">Contato</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-gray-300">
                <Mail className="w-5 h-5" />
                <a href="mailto:contato@uptoyouitabuna.com" className="hover:text-brand-yellow transition-colors">contato@uptoyouitabuna.com</a>
              </li>
              <li className="flex items-center gap-2 text-gray-300">
                <Phone className="w-5 h-5" />
                <a href="https://wa.me/5573999833058" className="hover:text-brand-yellow transition-colors">+55 73 99983-3058</a>
              </li>
            </ul>
          </div>

          <div>
             <h4 className="text-lg font-bold mb-4 text-white">Redes Sociais</h4>
             <a 
               href="https://www.instagram.com/uptoyouitabuna/" 
               target="_blank" 
               rel="noreferrer"
               className="inline-flex items-center gap-2 bg-white/10 hover:bg-brand-red px-6 py-3 rounded-full transition-colors"
             >
                <Instagram className="w-5 h-5" />
                <span>@uptoyouitabuna</span>
             </a>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 text-center text-sm text-gray-400">
          <p>&copy; 2025 UpToYou Itabuna. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
