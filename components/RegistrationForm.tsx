import React, { useState } from 'react';
import { FormType } from '../types';
import FadeIn from './FadeIn';
import { useContent } from '../context/ContentContext';
import EditableText from './EditableText';
import { Download, Mail } from 'lucide-react';

const RegistrationForm: React.FC = () => {
  const [activeTab, setActiveTab] = useState<FormType>(FormType.PF);
  const { content } = useContent();

  // Initial State for PJ
  const initialPJ = {
    institutionName: '',
    institutionType: '',
    stages: [] as string[],
    studentCount: '',
    address: '',
    phone: '',
    email: '',
    site: '',
    managerName: '',
    managerRole: '',
    managerPhone: '',
    managerEmail: '',
    motivation: '',
    challenges: [] as string[],
    challengesOther: '',
    hasProject: '', // 'Sim' or 'Não'
    projectName: '',
    expectations: '',
    teacherTraining: '',
    modality: ''
  };

  // Initial State for PF
  const initialPF = {
    fullName: '',
    cpf: '',
    dob: '',
    phone: '',
    email: '',
    location: '',
    jobFunction: '',
    jobFunctionOther: '',
    institution: '',
    experience: '',
    level: '', // Education level worked with
    knowledgeEI: '', // Yes/No
    knowledgeEIDesc: '',
    knowledgeNeuro: '', // Yes/No
    knowledgeNeuroDesc: '',
    interests: [] as string[],
    objective: '',
    modality: '',
    timePreference: ''
  };

  const [pjData, setPjData] = useState(initialPJ);
  const [pfData, setPfData] = useState(initialPF);

  // Generic Handle Change
  const handleChange = (type: 'PF' | 'PJ', field: string, value: string) => {
    if (type === 'PJ') {
      setPjData(prev => ({ ...prev, [field]: value }));
    } else {
      setPfData(prev => ({ ...prev, [field]: value }));
    }
  };

  // Handle Checkboxes (Arrays)
  const handleCheckbox = (type: 'PF' | 'PJ', field: string, value: string, max?: number) => {
    if (type === 'PJ') {
      const current = pjData[field as keyof typeof pjData] as string[];
      if (current.includes(value)) {
        setPjData(prev => ({ ...prev, [field]: current.filter(i => i !== value) }));
      } else {
        if (max && current.length >= max) return;
        setPjData(prev => ({ ...prev, [field]: [...current, value] }));
      }
    } else {
      const current = pfData[field as keyof typeof pfData] as string[];
      if (current.includes(value)) {
        setPfData(prev => ({ ...prev, [field]: current.filter(i => i !== value) }));
      } else {
        if (max && current.length >= max) return;
        setPfData(prev => ({ ...prev, [field]: [...current, value] }));
      }
    }
  };

  // Generate CSV Content
  const generateCSV = () => {
    let csvContent = "data:text/csv;charset=utf-8,";
    const data = activeTab === FormType.PJ ? pjData : pfData;
    
    // Header
    csvContent += Object.keys(data).join(",") + "\n";
    // Row
    const row = Object.values(data).map(value => {
        if (Array.isArray(value)) return `"${value.join('; ')}"`;
        return `"${String(value).replace(/"/g, '""')}"`; // Escape quotes
    }).join(",");
    csvContent += row;

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `inscricao_${activeTab === FormType.PJ ? 'instituicao' : 'individual'}_uptoyou.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Handle Submit (Mailto)
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const recipient = "inscricoes@uptoyouitabuna.com";
    const subject = `Inscrição UpToYou - ${activeTab === FormType.PJ ? 'Institucional' : 'Individual'}`;
    
    let body = "";

    if (activeTab === FormType.PJ) {
      body += `DADOS INSTITUCIONAIS\n`;
      body += `Instituição: ${pjData.institutionName}\n`;
      body += `Tipo: ${pjData.institutionType}\n`;
      body += `Etapas: ${pjData.stages.join(', ')}\n`;
      body += `Alunos: ${pjData.studentCount}\n`;
      body += `Endereço: ${pjData.address}\n`;
      body += `Telefone: ${pjData.phone}\n`;
      body += `Email: ${pjData.email}\n`;
      body += `Site: ${pjData.site}\n\n`;
      body += `RESPONSÁVEL\n`;
      body += `Nome: ${pjData.managerName}\n`;
      body += `Cargo: ${pjData.managerRole}\n`;
      body += `WhatsApp: ${pjData.managerPhone}\n`;
      body += `Email Pessoal: ${pjData.managerEmail}\n\n`;
      body += `NECESSIDADES\n`;
      body += `Motivação: ${pjData.motivation}\n`;
      body += `Desafios: ${pjData.challenges.join(', ')} ${pjData.challengesOther ? `(${pjData.challengesOther})` : ''}\n`;
      body += `Projeto Existente: ${pjData.hasProject} - ${pjData.projectName}\n\n`;
      body += `EXPECTATIVAS\n`;
      body += `Expectativa: ${pjData.expectations}\n`;
      body += `Formação Professores: ${pjData.teacherTraining}\n`;
      body += `Modalidade: ${pjData.modality}\n`;
    } else {
      body += `DADOS PESSOAIS\n`;
      body += `Nome: ${pfData.fullName}\n`;
      body += `CPF: ${pfData.cpf}\n`;
      body += `Nascimento: ${pfData.dob}\n`;
      body += `WhatsApp: ${pfData.phone}\n`;
      body += `Email: ${pfData.email}\n`;
      body += `Cidade/UF: ${pfData.location}\n\n`;
      body += `PROFISSIONAL\n`;
      body += `Função: ${pfData.jobFunction === 'Outro' ? pfData.jobFunctionOther : pfData.jobFunction}\n`;
      body += `Instituição: ${pfData.institution}\n`;
      body += `Experiência: ${pfData.experience}\n`;
      body += `Nível: ${pfData.level}\n\n`;
      body += `CONHECIMENTO\n`;
      body += `Conhecimento IE: ${pfData.knowledgeEI} - ${pfData.knowledgeEIDesc}\n`;
      body += `Conhecimento Neuro: ${pfData.knowledgeNeuro} - ${pfData.knowledgeNeuroDesc}\n`;
      body += `Temas de Interesse: ${pfData.interests.join(', ')}\n\n`;
      body += `EXPECTATIVAS\n`;
      body += `Objetivo: ${pfData.objective}\n`;
      body += `Modalidade: ${pfData.modality}\n`;
      body += `Horário: ${pfData.timePreference}\n`;
    }

    // Generate Table (CSV) automatically on submit
    generateCSV();

    // Open Mail Client
    window.location.href = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <section id="registration" className="py-20 bg-white px-4">
      <FadeIn>
        <div className="max-w-4xl mx-auto bg-gray-50 rounded-2xl shadow-2xl overflow-hidden border border-gray-200">
          <div className="bg-brand-grey text-white p-8 text-center">
            <h2 className="text-3xl font-bold mb-2">
                 <EditableText section="registration" field="title" value={content.registration.title} />
            </h2>
            <div className="opacity-80">
                 <EditableText section="registration" field="description" value={content.registration.description} />
            </div>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-gray-200">
            <button 
                onClick={() => setActiveTab(FormType.PJ)}
                className={`flex-1 py-4 font-bold text-center transition-colors ${activeTab === FormType.PJ ? 'bg-white text-brand-red border-t-4 border-brand-red' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}
            >
                Escolas / Instituições
            </button>
            <button 
                onClick={() => setActiveTab(FormType.PF)}
                className={`flex-1 py-4 font-bold text-center transition-colors ${activeTab === FormType.PF ? 'bg-white text-brand-green border-t-4 border-brand-green' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}
            >
                Pessoa Física
            </button>
          </div>

          <div className="p-8">
            <form onSubmit={handleSubmit} className="space-y-8 animate-fade-in">
              
              {/* --- FORMULÁRIO PJ --- */}
              {activeTab === FormType.PJ && (
                <>
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold text-brand-red">Formulário de Inscrição – Programa Up to You</h3>
                    <p className="text-gray-600">Objetivo: Inscrição da instituição para participação no projeto.</p>
                  </div>

                  {/* Dados Institucionais */}
                  <fieldset className="space-y-4">
                    <legend className="text-xl font-bold text-brand-red mb-4 border-b border-brand-red/20 pb-2 w-full">Dados Institucionais</legend>
                    
                    <div className="grid grid-cols-1 gap-4">
                        <label className="block">
                            <span className="text-gray-700 font-semibold">Nome da Instituição:</span>
                            <input required type="text" className="mt-1 w-full p-3 border rounded focus:ring-2 focus:ring-brand-red outline-none" 
                                value={pjData.institutionName} onChange={e => handleChange('PJ', 'institutionName', e.target.value)} />
                        </label>
                    </div>

                    <div>
                        <span className="text-gray-700 font-semibold block mb-2">Tipo da Instituição:</span>
                        <div className="flex flex-col gap-2 text-sm">
                             {['Escola Pública', 'Escola Privada', 'Associação / ONG / Instituto Educacional'].map(opt => (
                                <label key={opt} className="flex items-center gap-2">
                                    <input type="radio" name="instType" required checked={pjData.institutionType === opt} onChange={() => handleChange('PJ', 'institutionType', opt)} className="accent-brand-red" />
                                    {opt}
                                </label>
                             ))}
                        </div>
                    </div>

                    <div>
                        <span className="text-gray-700 font-semibold block mb-2">Etapas Atendidas:</span>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                             {['Educação Infantil', 'Ensino Fundamental I', 'Ensino Fundamental II', 'Ensino Médio'].map(opt => (
                                <label key={opt} className="flex items-center gap-2">
                                    <input type="checkbox" checked={pjData.stages.includes(opt)} onChange={() => handleCheckbox('PJ', 'stages', opt)} className="accent-brand-red" />
                                    {opt}
                                </label>
                             ))}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                         <label>
                            <span className="text-gray-700 font-semibold">Número aproximado de alunos:</span>
                            <input type="number" required className="mt-1 w-full p-3 border rounded focus:ring-2 focus:ring-brand-red outline-none"
                                value={pjData.studentCount} onChange={e => handleChange('PJ', 'studentCount', e.target.value)} />
                         </label>
                         <label>
                            <span className="text-gray-700 font-semibold">Telefone fixo da instituição:</span>
                            <input type="tel" required className="mt-1 w-full p-3 border rounded focus:ring-2 focus:ring-brand-red outline-none"
                                value={pjData.phone} onChange={e => handleChange('PJ', 'phone', e.target.value)} />
                         </label>
                    </div>
                    
                    <label className="block">
                        <span className="text-gray-700 font-semibold">Endereço completo (rua, nº, bairro, cidade, UF):</span>
                        <input type="text" required className="mt-1 w-full p-3 border rounded focus:ring-2 focus:ring-brand-red outline-none"
                            value={pjData.address} onChange={e => handleChange('PJ', 'address', e.target.value)} />
                    </label>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <label>
                            <span className="text-gray-700 font-semibold">E-mail institucional:</span>
                            <input type="email" required className="mt-1 w-full p-3 border rounded focus:ring-2 focus:ring-brand-red outline-none"
                                value={pjData.email} onChange={e => handleChange('PJ', 'email', e.target.value)} />
                        </label>
                        <label>
                            <span className="text-gray-700 font-semibold">Site ou rede social (opcional):</span>
                            <input type="text" className="mt-1 w-full p-3 border rounded focus:ring-2 focus:ring-brand-red outline-none"
                                value={pjData.site} onChange={e => handleChange('PJ', 'site', e.target.value)} />
                        </label>
                    </div>
                  </fieldset>

                  {/* Responsável */}
                  <fieldset className="space-y-4">
                    <legend className="text-xl font-bold text-brand-red mb-4 border-b border-brand-red/20 pb-2 w-full">Responsável pela Instituição</legend>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <label>
                            <span className="text-gray-700 font-semibold">Nome do gestor responsável:</span>
                            <input type="text" required className="mt-1 w-full p-3 border rounded focus:ring-2 focus:ring-brand-red outline-none"
                                value={pjData.managerName} onChange={e => handleChange('PJ', 'managerName', e.target.value)} />
                        </label>
                        <label>
                            <span className="text-gray-700 font-semibold">Cargo:</span>
                            <input type="text" required className="mt-1 w-full p-3 border rounded focus:ring-2 focus:ring-brand-red outline-none"
                                value={pjData.managerRole} onChange={e => handleChange('PJ', 'managerRole', e.target.value)} />
                        </label>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <label>
                            <span className="text-gray-700 font-semibold">Telefone para contato (WhatsApp):</span>
                            <input type="tel" required className="mt-1 w-full p-3 border rounded focus:ring-2 focus:ring-brand-red outline-none"
                                value={pjData.managerPhone} onChange={e => handleChange('PJ', 'managerPhone', e.target.value)} />
                        </label>
                        <label>
                            <span className="text-gray-700 font-semibold">E-mail pessoal ou corporativo:</span>
                            <input type="email" required className="mt-1 w-full p-3 border rounded focus:ring-2 focus:ring-brand-red outline-none"
                                value={pjData.managerEmail} onChange={e => handleChange('PJ', 'managerEmail', e.target.value)} />
                        </label>
                    </div>
                  </fieldset>

                  {/* Necessidades */}
                  <fieldset className="space-y-4">
                    <legend className="text-xl font-bold text-brand-red mb-4 border-b border-brand-red/20 pb-2 w-full">Necessidades e Motivação</legend>
                    
                    <label className="block">
                        <span className="text-gray-700 font-semibold">Qual a principal motivação da instituição em participar do projeto?</span>
                        <textarea required className="mt-1 w-full p-3 border rounded focus:ring-2 focus:ring-brand-red outline-none h-24"
                            value={pjData.motivation} onChange={e => handleChange('PJ', 'motivation', e.target.value)} />
                    </label>

                    <div>
                        <span className="text-gray-700 font-semibold block mb-2">Quais desafios emocionais a escola enfrenta com maior frequência?</span>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                             {['Ansiedade dos alunos', 'Bullying / agressividade', 'Desmotivação escolar', 'Problemas de convivência', 'Indisciplina', 'Estresse entre professores'].map(opt => (
                                <label key={opt} className="flex items-center gap-2">
                                    <input type="checkbox" checked={pjData.challenges.includes(opt)} onChange={() => handleCheckbox('PJ', 'challenges', opt)} className="accent-brand-red" />
                                    {opt}
                                </label>
                             ))}
                             <label className="flex items-center gap-2 col-span-1 sm:col-span-2 mt-1">
                                <span className="whitespace-nowrap">Outro:</span>
                                <input type="text" className="border-b border-gray-300 focus:border-brand-red outline-none w-full" 
                                    value={pjData.challengesOther} onChange={e => handleChange('PJ', 'challengesOther', e.target.value)} />
                             </label>
                        </div>
                    </div>

                    <div>
                        <span className="text-gray-700 font-semibold block mb-2">A escola já desenvolve algum projeto relacionado a Inteligência Emocional?</span>
                        <div className="space-y-2">
                            <div className="flex items-center gap-2">
                                <input 
                                    type="radio" 
                                    name="hasProject" 
                                    value="Sim" 
                                    checked={pjData.hasProject === 'Sim'} 
                                    onChange={() => handleChange('PJ', 'hasProject', 'Sim')} 
                                    className="accent-brand-red flex-shrink-0" 
                                />
                                <span className="whitespace-nowrap">Sim. Qual?</span>
                                <input 
                                    type="text" 
                                    disabled={pjData.hasProject !== 'Sim'}
                                    className={`border-b border-gray-300 focus:border-brand-red outline-none w-full ${pjData.hasProject !== 'Sim' ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : ''}`}
                                    value={pjData.projectName} 
                                    onChange={e => handleChange('PJ', 'projectName', e.target.value)} 
                                />
                            </div>
                            <label className="flex items-center gap-2">
                                <input 
                                    type="radio" 
                                    name="hasProject" 
                                    value="Não" 
                                    checked={pjData.hasProject === 'Não'} 
                                    onChange={() => {
                                        handleChange('PJ', 'hasProject', 'Não');
                                        handleChange('PJ', 'projectName', '');
                                    }} 
                                    className="accent-brand-red" 
                                />
                                Não
                            </label>
                        </div>
                    </div>
                  </fieldset>

                  {/* Expectativas */}
                  <fieldset className="space-y-4">
                    <legend className="text-xl font-bold text-brand-red mb-4 border-b border-brand-red/20 pb-2 w-full">Expectativas</legend>
                    <label className="block">
                        <span className="text-gray-700 font-semibold">O que a escola espera do projeto?</span>
                        <textarea required className="mt-1 w-full p-3 border rounded focus:ring-2 focus:ring-brand-red outline-none h-24"
                             value={pjData.expectations} onChange={e => handleChange('PJ', 'expectations', e.target.value)} />
                    </label>

                    <div>
                        <span className="text-gray-700 font-semibold block mb-2">Tem interesse em receber formação para professores?</span>
                        <div className="flex gap-4 text-sm">
                            {['Sim', 'Não', 'Talvez'].map(opt => (
                                <label key={opt} className="flex items-center gap-2">
                                    <input type="radio" name="teacherTraining" required checked={pjData.teacherTraining === opt} onChange={() => handleChange('PJ', 'teacherTraining', opt)} className="accent-brand-red" />
                                    {opt}
                                </label>
                            ))}
                        </div>
                    </div>

                    <div>
                        <span className="text-gray-700 font-semibold block mb-2">Qual a melhor modalidade para a instituição?</span>
                        <div className="flex gap-4 text-sm">
                            {['Presencial', 'Híbrido', 'Online'].map(opt => (
                                <label key={opt} className="flex items-center gap-2">
                                    <input type="radio" name="modalityPJ" required checked={pjData.modality === opt} onChange={() => handleChange('PJ', 'modality', opt)} className="accent-brand-red" />
                                    {opt}
                                </label>
                            ))}
                        </div>
                    </div>
                  </fieldset>
                </>
              )}


              {/* --- FORMULÁRIO PF --- */}
              {activeTab === FormType.PF && (
                <>
                   <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold text-brand-green">Formulário de Inscrição Individual – Programa Up to You</h3>
                   </div>

                   {/* Dados Pessoais */}
                   <fieldset className="space-y-4">
                    <legend className="text-xl font-bold text-brand-green mb-4 border-b border-brand-green/20 pb-2 w-full">Dados Pessoais</legend>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                         <label className="block md:col-span-2">
                            <span className="text-gray-700 font-semibold">Nome Completo:</span>
                            <input required type="text" className="mt-1 w-full p-3 border rounded focus:ring-2 focus:ring-brand-green outline-none"
                                value={pfData.fullName} onChange={e => handleChange('PF', 'fullName', e.target.value)} />
                        </label>
                        <label>
                            <span className="text-gray-700 font-semibold">CPF:</span>
                            <input required type="text" className="mt-1 w-full p-3 border rounded focus:ring-2 focus:ring-brand-green outline-none"
                                value={pfData.cpf} onChange={e => handleChange('PF', 'cpf', e.target.value)} />
                        </label>
                        <label>
                            <span className="text-gray-700 font-semibold">Data de Nascimento:</span>
                            <input required type="date" className="mt-1 w-full p-3 border rounded focus:ring-2 focus:ring-brand-green outline-none"
                                value={pfData.dob} onChange={e => handleChange('PF', 'dob', e.target.value)} />
                        </label>
                        <label>
                            <span className="text-gray-700 font-semibold">Telefone (WhatsApp):</span>
                            <input required type="tel" className="mt-1 w-full p-3 border rounded focus:ring-2 focus:ring-brand-green outline-none"
                                value={pfData.phone} onChange={e => handleChange('PF', 'phone', e.target.value)} />
                        </label>
                        <label>
                            <span className="text-gray-700 font-semibold">E-mail:</span>
                            <input required type="email" className="mt-1 w-full p-3 border rounded focus:ring-2 focus:ring-brand-green outline-none"
                                value={pfData.email} onChange={e => handleChange('PF', 'email', e.target.value)} />
                        </label>
                        <label className="md:col-span-2">
                            <span className="text-gray-700 font-semibold">Cidade/Estado de residência:</span>
                            <input required type="text" className="mt-1 w-full p-3 border rounded focus:ring-2 focus:ring-brand-green outline-none"
                                value={pfData.location} onChange={e => handleChange('PF', 'location', e.target.value)} />
                        </label>
                    </div>
                   </fieldset>

                   {/* Info Profissional */}
                   <fieldset className="space-y-4">
                    <legend className="text-xl font-bold text-brand-green mb-4 border-b border-brand-green/20 pb-2 w-full">Informações Profissionais</legend>
                    
                    <div>
                        <span className="text-gray-700 font-semibold block mb-2">Função atual:</span>
                        <div className="flex flex-col gap-2 text-sm">
                             {['Professor(a)', 'Psicólogo(a)', 'Coordenador(a) Pedagógico(a)', 'Orientador(a) Educacional', 'Diretor(a) Escolar'].map(opt => (
                                <label key={opt} className="flex items-center gap-2">
                                    <input type="radio" name="jobFunction" required checked={pfData.jobFunction === opt} onChange={() => handleChange('PF', 'jobFunction', opt)} className="accent-brand-green" />
                                    {opt}
                                </label>
                             ))}
                             <div className="flex items-center gap-2">
                                <input 
                                    type="radio" 
                                    name="jobFunction" 
                                    value="Outro" 
                                    checked={pfData.jobFunction === 'Outro'} 
                                    onChange={() => handleChange('PF', 'jobFunction', 'Outro')} 
                                    className="accent-brand-green flex-shrink-0" 
                                />
                                <span className="whitespace-nowrap">Outro:</span>
                                <input 
                                    type="text" 
                                    disabled={pfData.jobFunction !== 'Outro'}
                                    className={`border-b border-gray-300 focus:border-brand-green outline-none w-full ${pfData.jobFunction !== 'Outro' ? 'bg-transparent text-gray-400 cursor-not-allowed' : ''}`}
                                    value={pfData.jobFunctionOther} 
                                    onChange={e => handleChange('PF', 'jobFunctionOther', e.target.value)} 
                                />
                             </div>
                        </div>
                    </div>

                    <label className="block">
                        <span className="text-gray-700 font-semibold">Instituição onde atua atualmente (se houver):</span>
                        <input type="text" className="mt-1 w-full p-3 border rounded focus:ring-2 focus:ring-brand-green outline-none"
                            value={pfData.institution} onChange={e => handleChange('PF', 'institution', e.target.value)} />
                    </label>

                    <div>
                        <span className="text-gray-700 font-semibold block mb-2">Tempo de experiência na área:</span>
                        <div className="flex flex-col gap-2 text-sm">
                            {['Menos de 1 ano', '1–5 anos', '6–10 anos', 'Mais de 10 anos'].map(opt => (
                                <label key={opt} className="flex items-center gap-2">
                                    <input type="radio" name="experience" required checked={pfData.experience === opt} onChange={() => handleChange('PF', 'experience', opt)} className="accent-brand-green" />
                                    {opt}
                                </label>
                            ))}
                        </div>
                    </div>

                    <div>
                        <span className="text-gray-700 font-semibold block mb-2">Nível de ensino com que trabalha:</span>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                            {['Educação Infantil', 'Fundamental I', 'Fundamental II', 'Ensino Médio', 'Não atuo diretamente com sala de aula'].map(opt => (
                                <label key={opt} className="flex items-center gap-2">
                                    <input type="radio" name="level" required checked={pfData.level === opt} onChange={() => handleChange('PF', 'level', opt)} className="accent-brand-green" />
                                    {opt}
                                </label>
                            ))}
                        </div>
                    </div>
                   </fieldset>

                   {/* Conhecimento */}
                   <fieldset className="space-y-4">
                    <legend className="text-xl font-bold text-brand-green mb-4 border-b border-brand-green/20 pb-2 w-full">Interesse e Conhecimento</legend>
                    
                    <div>
                        <span className="text-gray-700 font-semibold block mb-2">Você possui algum conhecimento prévio sobre Inteligência Emocional?</span>
                        <div className="flex flex-col gap-2">
                            <label className="flex items-center gap-2">
                                <input type="radio" name="knowledgeEI" value="Sim" checked={pfData.knowledgeEI === 'Sim'} onChange={() => handleChange('PF', 'knowledgeEI', 'Sim')} className="accent-brand-green" /> Sim
                            </label>
                            <label className="flex items-center gap-2">
                                <input type="radio" name="knowledgeEI" value="Não" checked={pfData.knowledgeEI === 'Não'} onChange={() => handleChange('PF', 'knowledgeEI', 'Não')} className="accent-brand-green" /> Não
                            </label>
                            <div className="mt-2">
                                <label className="block text-sm text-gray-600 mb-1">Se sim, qual?</label>
                                <input 
                                    type="text" 
                                    disabled={pfData.knowledgeEI !== 'Sim'}
                                    className={`w-full border-b border-gray-300 focus:border-brand-green outline-none ${pfData.knowledgeEI !== 'Sim' ? 'bg-transparent cursor-not-allowed' : ''}`}
                                    value={pfData.knowledgeEIDesc} 
                                    onChange={e => handleChange('PF', 'knowledgeEIDesc', e.target.value)} 
                                />
                            </div>
                        </div>
                    </div>

                    <div>
                        <span className="text-gray-700 font-semibold block mb-2">Você possui algum conhecimento prévio em Neurociência aplicada à educação?</span>
                         <div className="flex flex-col gap-2">
                            <label className="flex items-center gap-2">
                                <input type="radio" name="knowledgeNeuro" value="Sim" checked={pfData.knowledgeNeuro === 'Sim'} onChange={() => handleChange('PF', 'knowledgeNeuro', 'Sim')} className="accent-brand-green" /> Sim
                            </label>
                            <label className="flex items-center gap-2">
                                <input type="radio" name="knowledgeNeuro" value="Não" checked={pfData.knowledgeNeuro === 'Não'} onChange={() => handleChange('PF', 'knowledgeNeuro', 'Não')} className="accent-brand-green" /> Não
                            </label>
                            <div className="mt-2">
                                <label className="block text-sm text-gray-600 mb-1">Se sim, qual?</label>
                                <input 
                                    type="text" 
                                    disabled={pfData.knowledgeNeuro !== 'Sim'}
                                    className={`w-full border-b border-gray-300 focus:border-brand-green outline-none ${pfData.knowledgeNeuro !== 'Sim' ? 'bg-transparent cursor-not-allowed' : ''}`}
                                    value={pfData.knowledgeNeuroDesc} 
                                    onChange={e => handleChange('PF', 'knowledgeNeuroDesc', e.target.value)} 
                                />
                            </div>
                        </div>
                    </div>

                    <div>
                        <span className="text-gray-700 font-semibold block mb-2">Quais temas são mais interessantes para você? (marque até 3)</span>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                             {['Habilidades socioemocionais', 'Neurociência da aprendizagem', 'Técnicas de regulação emocional', 'Comunicação não violenta', 'Gestão de comportamento em sala', 'Saúde mental do educador'].map(opt => (
                                <label key={opt} className="flex items-center gap-2">
                                    <input type="checkbox" checked={pfData.interests.includes(opt)} onChange={() => handleCheckbox('PF', 'interests', opt, 3)} className="accent-brand-green" />
                                    {opt}
                                </label>
                             ))}
                        </div>
                    </div>
                   </fieldset>

                   {/* Expectativas */}
                   <fieldset className="space-y-4">
                    <legend className="text-xl font-bold text-brand-green mb-4 border-b border-brand-green/20 pb-2 w-full">Expectativas e Disponibilidade</legend>
                    
                    <label className="block">
                        <span className="text-gray-700 font-semibold">Qual o seu principal objetivo ao participar do projeto?</span>
                        <textarea required className="mt-1 w-full p-3 border rounded focus:ring-2 focus:ring-brand-green outline-none h-24"
                            value={pfData.objective} onChange={e => handleChange('PF', 'objective', e.target.value)} />
                    </label>

                    <div>
                        <span className="text-gray-700 font-semibold block mb-2">Preferência de modalidade:</span>
                        <div className="flex gap-4 text-sm">
                            {['Presencial', 'Híbrido', 'Online'].map(opt => (
                                <label key={opt} className="flex items-center gap-2">
                                    <input type="radio" name="modalityPF" required checked={pfData.modality === opt} onChange={() => handleChange('PF', 'modality', opt)} className="accent-brand-green" />
                                    {opt}
                                </label>
                            ))}
                        </div>
                    </div>

                    <div>
                        <span className="text-gray-700 font-semibold block mb-2">Melhor horário para participar:</span>
                        <div className="flex gap-4 text-sm">
                            {['Manhã', 'Tarde', 'Noite'].map(opt => (
                                <label key={opt} className="flex items-center gap-2">
                                    <input type="radio" name="timePreference" required checked={pfData.timePreference === opt} onChange={() => handleChange('PF', 'timePreference', opt)} className="accent-brand-green" />
                                    {opt}
                                </label>
                            ))}
                        </div>
                    </div>
                   </fieldset>
                </>
              )}

              <div className="space-y-4 pt-4">
                <button type="submit" className={`w-full ${activeTab === FormType.PF ? 'bg-brand-green hover:bg-green-700' : 'bg-brand-red hover:bg-red-700'} text-white font-bold py-4 rounded-lg shadow-lg transition-transform transform hover:scale-[1.01] flex items-center justify-center gap-2`}>
                  <Mail size={20} /> ENVIAR INSCRIÇÃO POR E-MAIL
                </button>
                <p className="text-xs text-center text-gray-500">
                  Ao clicar, seu gerenciador de e-mail padrão será aberto com os dados preenchidos. Além disso, um arquivo CSV (tabela) com seus dados será baixado automaticamente.
                </p>
              </div>
            </form>
          </div>
        </div>
      </FadeIn>
    </section>
  );
};

export default RegistrationForm;