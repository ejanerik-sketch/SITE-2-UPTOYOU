
import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Schedule from './components/Schedule';
import AboutSpeaker from './components/AboutSpeaker';
import Methodology from './components/Methodology';
import TargetAudience from './components/TargetAudience';
import Partners from './components/Partners';
import Location from './components/Location';
import FAQ from './components/FAQ';
import RegistrationForm from './components/RegistrationForm';
import Footer from './components/Footer';
import FloatingCTA from './components/FloatingCTA';
import { ContentProvider, useContent } from './context/ContentContext';
import { Settings, Check, RotateCcw, Download, FileText, Loader2 } from 'lucide-react';
import JSZip from 'jszip';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

// Helper to generate a screenshot image for the theme
const generateScreenshot = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 1200;
    canvas.height = 900;
    const ctx = canvas.getContext('2d');
    if (ctx) {
        ctx.fillStyle = '#fd0104';
        ctx.fillRect(0, 0, 1200, 900);
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 80px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('UpToYou Itabuna', 600, 450);
        ctx.font = '40px Arial';
        ctx.fillText('Tema Landing Page', 600, 520);
    }
    return canvas.toDataURL('image/png').split(',')[1];
};

const AdminControls: React.FC = () => {
    const { isEditing, toggleEditMode, resetContent, content } = useContent();
    const [isGenerating, setIsGenerating] = useState(false);

    // --- EXPORT WORDPRESS THEME ---
    const handleExportTheme = async () => {
        setIsGenerating(true);
        try {
            const zip = new JSZip();
            const themeName = "uptoyou-theme";
            const root = zip.folder(themeName);

            if (!root) return;

            // 1. style.css
            const styleCss = `/*
Theme Name: UpToYou Itabuna
Theme URI: https://uptoyouitabuna.com
Author: UpToYou System
Description: Tema dedicado para Landing Page do Evento UpToYou Itabuna.
Version: 1.0.0
License: Proprietary
*/

/* Reset básico */
body { margin: 0; padding: 0; background-color: #f3f4f6; }
`;

            // 2. functions.php (OPTIMIZED)
            // Reads content.json and injects it
            const functionsPhp = `<?php
function uptoyou_enqueue_scripts() {
    // Carrega CSS e JS da pasta assets/
    wp_enqueue_style('uptoyou-style', get_template_directory_uri() . '/assets/app.css', array(), '1.0.0');
    wp_enqueue_script('uptoyou-script', get_template_directory_uri() . '/assets/app.js', array(), '1.0.0', true);

    // Carrega o conteúdo salvo no JSON
    $content_file = get_template_directory() . '/content.json';
    
    if (file_exists($content_file)) {
        $content_json = file_get_contents($content_file);
        // Injeta como variável global antes do script principal carregar
        wp_add_inline_script('uptoyou-script', 'window.UPTOYOU_PRELOADED_CONTENT = ' . $content_json . ';', 'before');
    }
}
add_action('wp_enqueue_scripts', 'uptoyou_enqueue_scripts');

add_theme_support('title-tag');
?>`;

            // 3. index.php
            const indexPhp = `<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo( 'charset' ); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="https://cdn.tailwindcss.com"></script>
    <script>
      tailwind.config = {
        theme: {
          extend: {
            fontFamily: { sans: ['Inter', 'sans-serif'] },
            colors: {
              brand: {
                red: '#fd0104',
                green: '#038938',
                yellow: '#ffe006',
                grey: '#77736f',
              }
            }
          }
        }
      }
    </script>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700;800&display=swap" rel="stylesheet">
    <?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
    <div id="uptoyou-root">
        <!-- Fallback loading content -->
        <div style="height: 100vh; display: flex; align-items: center; justify-content: center; flex-direction: column; color: #666;">
            <h2 style="font-family: sans-serif; font-size: 24px; margin-bottom: 10px;">Carregando UpToYou...</h2>
            <p>Se isso demorar, verifique se os arquivos app.js e app.css estão na pasta assets.</p>
        </div>
    </div>
    <?php wp_footer(); ?>
</body>
</html>`;

            // 4. content.json (The actual data)
            const contentJson = JSON.stringify(content, null, 2);

            // 5. README
            const readmeTxt = `
=== GUIA DE INSTALAÇÃO ===

1. Este arquivo ZIP é um TEMA WordPress completo.
2. IMPORTANTE: O tema precisa dos arquivos 'buildados' do React.

COMO INSTALAR:

1. No seu projeto React, rode 'npm run build' no terminal.
2. Vá na pasta 'dist/assets/'. Você verá um arquivo .js e um .css (ex: index.a1b2.js).
3. RENOMEIE o .js para 'app.js'.
4. RENOMEIE o .css para 'app.css'.
5. Coloque esses dois arquivos (app.js e app.css) dentro da pasta 'uptoyou-theme/assets/' que está neste ZIP.
6. Agora compacte a pasta 'uptoyou-theme' novamente em ZIP.
7. No WordPress, vá em Aparência > Temas > Adicionar Novo > Enviar Tema.
8. Instale e ative.

Todo o conteúdo que você editou está salvo no arquivo 'content.json'.
`;

            // Add files to ZIP
            root.file("style.css", styleCss);
            root.file("functions.php", functionsPhp);
            root.file("index.php", indexPhp);
            root.file("content.json", contentJson);
            root.file("header.php", "<?php ?>");
            root.file("footer.php", "<?php ?>");
            root.file("screenshot.png", generateScreenshot(), {base64: true});
            root.file("README.txt", readmeTxt);
            root.folder("assets");

            const blob = await zip.generateAsync({ type: "blob" });
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = 'uptoyou-theme-completo.zip';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (err) {
            console.error("Failed to zip", err);
            alert("Erro ao gerar ZIP. Tente novamente.");
        } finally {
            setIsGenerating(false);
        }
    };

    // --- EXPORT PDF PRESENTATION ---
    const handleExportPDF = async () => {
        setIsGenerating(true);
        const doc = new jsPDF('p', 'mm', 'a4');
        
        // Temporarily hide admin controls
        const adminControls = document.querySelector('.admin-controls-container');
        if (adminControls) (adminControls as HTMLElement).style.display = 'none';

        try {
             // Capture Document Body
             // Note: Ensure the user is NOT in edit mode for best results, although we can try to capture regardless.
             const canvas = await html2canvas(document.body, {
                 scale: 1.5, // balance quality/speed
                 useCORS: true,
                 ignoreElements: (element) => element.classList.contains('admin-controls-container')
             });

             const imgData = canvas.toDataURL('image/jpeg', 0.9);
             const imgWidth = 210; // A4 width mm
             const pageHeight = 297; // A4 height mm
             const imgHeight = (canvas.height * imgWidth) / canvas.width;
             
             let heightLeft = imgHeight;
             let position = 0;

             doc.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight);
             heightLeft -= pageHeight;

             while (heightLeft >= 0) {
                 position = heightLeft - imgHeight;
                 doc.addPage();
                 doc.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight);
                 heightLeft -= pageHeight;
             }

             doc.save('uptoyou-apresentacao.pdf');

        } catch (err) {
            console.error("PDF Error", err);
            alert("Erro ao gerar PDF.");
        } finally {
            setIsGenerating(false);
            if (adminControls) (adminControls as HTMLElement).style.display = 'flex';
        }
    };

    return (
        <div className="fixed bottom-4 left-4 z-50 flex flex-col gap-3 admin-controls-container">
            {/* Export Buttons - Always Visible */}
            <button 
                onClick={handleExportPDF}
                disabled={isGenerating}
                className="bg-purple-600 hover:bg-purple-700 text-white p-3 rounded-full shadow-xl transition-all flex items-center justify-center group relative"
                title="Baixar Apresentação (PDF)"
            >
                {isGenerating ? <Loader2 className="animate-spin" size={20} /> : <FileText size={20} />}
                <span className="absolute left-full ml-2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 whitespace-nowrap transition-opacity">
                    Baixar PDF (Apresentação)
                </span>
            </button>

            <button 
                onClick={handleExportTheme}
                disabled={isGenerating}
                className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-xl transition-all flex items-center justify-center group relative"
                title="Baixar Tema WordPress (ZIP)"
            >
                {isGenerating ? <Loader2 className="animate-spin" size={20} /> : <Download size={20} />}
                <span className="absolute left-full ml-2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 whitespace-nowrap transition-opacity">
                    Baixar Tema WP
                </span>
            </button>

             {/* Edit Mode Only Actions */}
             {isEditing && (
                <button 
                    onClick={resetContent}
                    className="bg-gray-800 hover:bg-red-600 text-white p-3 rounded-full shadow-xl transition-all flex items-center justify-center"
                    title="Resetar conteúdo"
                >
                    <RotateCcw size={20} />
                </button>
            )}

            {/* Main Toggle */}
            <button 
                onClick={toggleEditMode}
                className={`${isEditing ? 'bg-green-600 hover:bg-green-700' : 'bg-gray-800 hover:bg-gray-900'} text-white p-3 rounded-full shadow-xl transition-all flex items-center justify-center`}
                title={isEditing ? "Salvar e Visualizar" : "Editar Site"}
            >
                {isEditing ? <Check size={20} /> : <Settings size={20} />}
            </button>
        </div>
    );
}

const AppContent: React.FC = () => {
  return (
    <main className="font-sans text-gray-800 antialiased relative">
      <Navbar />
      <Hero />
      <Schedule />
      <AboutSpeaker />
      <Methodology />
      <TargetAudience />
      <Partners />
      <Location />
      <FAQ />
      <RegistrationForm />
      <Footer />
      <FloatingCTA />
      <AdminControls />
    </main>
  );
}

const App: React.FC = () => {
  return (
    <ContentProvider>
        <AppContent />
    </ContentProvider>
  );
};

export default App;
