
import React, { createContext, useContext, useState, useEffect } from 'react';
import { LOGO_URL, FAQ_DATA, SPEAKER_PHOTO_URL } from '../constants';

// Helper to flatten initial FAQ data
const initialFaqContent = FAQ_DATA.reduce((acc, item, index) => {
  acc[`q${index + 1}`] = item.question;
  acc[`a${index + 1}`] = item.answer;
  return acc;
}, {} as any);

// Default Initial Content
const defaultContent = {
  hero: {
    title: "Educação Emocional Internacional",
    highlight: "Chega a Itabuna",
    subtitle: "3 Eventos Transformadores com Prof. José Víctor Orón Semper",
    logoUrl: LOGO_URL,
    logoWidth: 300, // pixels
    footerLogoWidth: 150, // pixels
  },
  schedule: {
    title: "Programação Completa",
    // Event 1
    event1_title: "Conferência Magna",
    event1_date: "15 Dez (Seg)",
    event1_time: "19h",
    event1_location: "Auditório Bento XVI - Paróquia São Judas Tadeu",
    event1_theme: "Educar para o Encontro com o Outro",
    event1_audience: "Donos de escola, diretores, coordenadores, professores, psicólogos, psicopedagogos e afins.",
    event1_duration: "1h30min a 2h",
    event1_cta: "Inscrever-se na Conferência",
    // Event 2
    event2_title: "Mesa Redonda",
    event2_date: "16 Dez (Ter)",
    event2_time: "19h às 21h",
    event2_location: "Auditório Bento XVI - Paróquia São Judas Tadeu",
    event2_theme: "Debate com diretores de escolas",
    event2_audience: "Donos de escola, diretores, coordenadores, professores, psicólogos, psicopedagogos e afins.",
    event2_duration: "2h",
    event2_cta: "Inscrever-se na Mesa Redonda",
    // Event 3
    event3_title: "Oficina Prática",
    event3_date: "17 Dez (Qua)",
    event3_time: "19h às 22h",
    event3_location: "Auditório Bento XVI - Paróquia São Judas Tadeu",
    event3_theme: "Conheça o que Sente - Vocabulário Emocional",
    event3_audience: "Donos de escola, diretores, coordenadores, professores, psicólogos, psicopedagogos e afins.",
    event3_duration: "3h",
    event3_cta: "Inscrever-se na Oficina",
  },
  speaker: {
    name: "Padre José Víctor Orón Semper",
    role: "O Especialista",
    bio: "Sacerdote Escolapio e pesquisador dedicado, José Víctor combina uma sólida formação acadêmica com 15 anos de experiência prática em sala de aula. É referência internacional em Educação Emocional, defendendo uma abordagem que coloca o relacionamento interpessoal no centro do desenvolvimento humano.",
    photoUrl: SPEAKER_PHOTO_URL,
    photoWidth: 400, // default width in px
    
    // Highlights
    highlight1_title: "47 Obras Publicadas",
    highlight1_desc: "Vasta produção bibliográfica na área.",
    highlight2_title: "Multidisciplinar",
    highlight2_desc: "Dr. em Educação, Máster em Neurociência e Bioética, Eng. de Caminhos.",
    highlight3_title: "Liderança",
    highlight3_desc: "Diretor do Centro SLAM e da Fundação UpToYou.",
    highlight4_title: "Atuação Global",
    highlight4_desc: "Espanha, Camerún, México, Colômbia e Brasil.",
  },
  methodology: {
    title: "O Que é o UpToYou?",
    description: "\"Acompanhando o Crescimento - Renovar a educação melhorando a qualidade educativa e pessoal do educador\"",
    videoId: "qU_voG6JtrE", // Updated YouTube ID
    pillar1_title: "Foco na Pessoa",
    pillar1_desc: "Não no sistema, mas no ser humano.",
    pillar2_title: "Educação Relacional",
    pillar2_desc: "A pessoa só existe em relação, por e para o encontro.",
    pillar3_title: "Educação Emocional",
    pillar3_desc: "Autoconhecimento e reconhecimento de dons.",
  },
  targetAudience: {
    title: "Para Quem é Este Evento?",
    // Items
    item1_title: "Donos de Escola",
    item1_desc: "Conheça metodologia inovadora para sua instituição",
    item2_title: "Diretores",
    item2_desc: "Transforme sua escola em espaço de encontro",
    item3_title: "Coordenadores",
    item3_desc: "Implemente educação relacional",
    item4_title: "Professores",
    item4_desc: "Aprenda metodologias de educação emocional",
    item5_title: "Psicólogos",
    item5_desc: "Amplie seu repertório profissional",
    item6_title: "Pais",
    item6_desc: "Eduque emocionalmente seus filhos em casa",
  },
  partners: {
    title: "Respaldo Acadêmico & Apoio"
  },
  location: {
    title: "Local do Evento",
    placeName: "Auditório Bento XVI",
    addressLine1: "Paróquia São Judas Tadeu",
    addressLine2: "Itabuna - BA",
    howToGetTitle: "Como chegar?",
    howToGetDesc: "Localizado em ponto central de fácil acesso. Estacionamento disponível nas imediações."
  },
  faq: {
    title: "Perguntas Frequentes",
    ...initialFaqContent
  },
  registration: {
    title: "Inscrição Gratuita",
    description: "Garanta sua vaga preenchendo o formulário abaixo."
  },
  footer: {
    description: "Transformando a educação através do encontro e do desenvolvimento emocional."
  }
};

interface ContentContextType {
  content: typeof defaultContent;
  isEditing: boolean;
  toggleEditMode: () => void;
  updateContent: (section: keyof typeof defaultContent, key: string, value: any) => void;
  resetContent: () => void;
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

export const ContentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [content, setContent] = useState(defaultContent);
  const [isEditing, setIsEditing] = useState(false); // Editing disabled by default

  // Load content strategy:
  // 1. Check for Window Variable (WordPress Injection) - highest priority for static exports
  // 2. Check LocalStorage - for local editing
  // 3. Fallback to default
  useEffect(() => {
    // @ts-ignore
    const preloaded = window.UPTOYOU_PRELOADED_CONTENT;
    
    if (preloaded) {
        // If we have preloaded content from the PHP plugin, use it.
        // We still merge with default to ensure structure validity.
         setContent(prev => {
            const merged = { ...prev };
            Object.keys(defaultContent).forEach(section => {
                // @ts-ignore
                merged[section] = { ...defaultContent[section], ...(preloaded[section] || {}) };
            });
            return merged;
        });
    } else {
        // Standard LocalStorage Logic
        const saved = localStorage.getItem('uptoyou_content');
        if (saved) {
            try {
                const parsed = JSON.parse(saved);
                setContent(prev => {
                    const merged = { ...prev };
                    Object.keys(defaultContent).forEach(section => {
                        // @ts-ignore
                        merged[section] = { ...defaultContent[section], ...(parsed[section] || {}) };
                    });
                    return merged;
                });
            } catch (e) {
                console.error("Failed to parse saved content", e);
            }
        }
    }
  }, []);

  // Save to LocalStorage on change (only if not preloaded/read-only mode ideally, but keeping simple)
  useEffect(() => {
    localStorage.setItem('uptoyou_content', JSON.stringify(content));
  }, [content]);

  const updateContent = (section: keyof typeof defaultContent, key: string, value: any) => {
    setContent(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: value
      }
    }));
  };

  const toggleEditMode = () => setIsEditing(!isEditing);

  const resetContent = () => {
    if(confirm("Tem certeza que deseja resetar todas as alterações para o padrão original?")) {
        setContent(defaultContent);
        localStorage.removeItem('uptoyou_content');
        window.location.reload();
    }
  };

  return (
    <ContentContext.Provider value={{ content, isEditing, toggleEditMode, updateContent, resetContent }}>
      {children}
    </ContentContext.Provider>
  );
};

export const useContent = () => {
  const context = useContext(ContentContext);
  if (!context) {
    throw new Error('useContent must be used within a ContentProvider');
  }
  return context;
};
