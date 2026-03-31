import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useSolutionsModal } from '../hooks/useSolutionsModal';

const Header = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { openModal } = useSolutionsModal();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
        setIsMenuOpen(false); // Fecha o menu
        
        if (id === 'top') {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
            return;
        }
        
        // Deixamos o evento sem preventDefault() para que a âncora nativa resolva, 
        // ou disparamos manualmente se preferir, mas para evitar bugs no GSAP 
        // a âncora nativa do browser em sections normais é mais safe, porém para
        // scroll suave consistente faremos o smooth apenas se não for o 'como-funciona'.
        const element = document.getElementById(id);
        if (element) {
            if (id === 'como-funciona') {
                // Apenas fecha o menu e deixa o navegador resolver instantaneamente,
                // evitando a briga entre scroll suave e o PIN recalculation do GSAP.
                setTimeout(() => {
                    element.scrollIntoView({ behavior: 'instant' } as ScrollIntoViewOptions);
                }, 50);
            } else {
                e.preventDefault();
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }
    };

    const navLinks = [
        { name: 'Início', id: 'top' },
        { name: 'O que é a RX', id: 'sobre' },
        { name: 'Para Quem', id: 'para-quem' },
        { name: 'RX Análises', id: 'rx-analises' },
        { name: 'Partner Program', id: 'partner-program' },
    ];

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b ${isScrolled || isMenuOpen
                ? 'bg-black/80 backdrop-blur-xl py-3 md:py-3 border-gray-800/50 shadow-[0_4px_30px_rgba(0,0,0,0.5)]'
                : 'bg-transparent py-4 md:py-6 border-transparent'
                }`}
        >
            {/* 
                Logotipo mais esquerdo e para baixo: 
                Ao invés de "container mx-auto px-4", usamos w-full com px-4 md:px-8 xl:px-12, e um margin-top sutil.
            */}
            <div className="w-full px-4 md:px-8 xl:px-12 mx-auto flex items-center justify-between mt-1 md:mt-2 transition-all">
                
                {/* Logo */}
                <a href="#" onClick={(e) => scrollToSection(e, 'top')} className="flex items-center gap-2 sm:gap-3 z-50 relative shrink-0">
                    <img
                        src="/logo/rx-logo-branca.webp"
                        alt="RX Soluções"
                        width={264}
                        height={56}
                        fetchPriority="high"
                        className="h-6 sm:h-7 md:h-10 w-auto py-0.5"
                    />
                </a>

                {/* Right Group: CTA + Menu Dropdown Toggle */}
                <div className="flex items-center justify-end gap-2 sm:gap-3 md:gap-4 relative z-50 shrink-0">
                    
                    {/* Botão Principal de Soluções - mais sutil */}
                    <button
                        onClick={() => openModal()}
                        className="bg-white/10 border border-white/20 text-white px-3 py-1.5 sm:px-4 sm:py-2 md:px-6 md:py-2.5 rounded-full font-semibold text-[10px] sm:text-[11px] md:text-sm hover:bg-white/20 hover:border-primary-500/50 transition-all shadow-[0_0_15px_rgba(255,255,255,0.05)] hover:shadow-[0_0_25px_rgba(139,92,246,0.2)] cursor-pointer"
                    >
                        <span className="hidden sm:inline">Conhecer Soluções</span>
                        <span className="sm:hidden">Soluções</span>
                    </button>

                    {/* Botão Menu Interativo (•• para : ativo ou no hover) */}
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className={`group flex items-center justify-center gap-1.5 sm:gap-2 md:gap-3 px-3 py-1.5 sm:px-5 sm:py-2 md:py-2.5 rounded-full font-bold text-[10px] sm:text-xs md:text-sm tracking-widest uppercase transition-all duration-300 border backdrop-blur-md cursor-pointer
                            ${isMenuOpen 
                                ? 'bg-white text-zinc-950 border-transparent shadow-[0_0_30px_rgba(255,255,255,0.2)]'
                                : 'bg-[#18181A] text-white border-white/10 hover:bg-[#202022] hover:border-white/20'
                            }
                        `}
                    >
                        <span className="mt-[1px]">{isMenuOpen ? 'Fechar' : 'Menu'}</span>
                        
                        {/* Wrapper dos pontos - Animado para girar no hover e clique */}
                        <div className={`flex flex-row items-center justify-center gap-[3px] transition-transform duration-300 origin-center ${isMenuOpen ? 'rotate-90' : 'group-hover:rotate-90'}`}>
                            <div className={`w-[4px] h-[4px] rounded-full transition-colors ${isMenuOpen ? 'bg-zinc-950' : 'bg-white'}`} />
                            <div className={`w-[4px] h-[4px] rounded-full transition-colors ${isMenuOpen ? 'bg-zinc-950' : 'bg-white'}`} />
                        </div>
                    </button>

                    {/* Menu Dropdown Panel */}
                    <AnimatePresence>
                        {isMenuOpen && (
                            <motion.div
                                initial={{ opacity: 0, y: -10, scale: 0.96 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: -10, scale: 0.96 }}
                                transition={{ duration: 0.25, type: "spring", stiffness: 350, damping: 25 }}
                                className="absolute top-full mt-4 right-0 min-w-[220px] md:min-w-[280px] bg-zinc-950/95 backdrop-blur-3xl border border-white/10 rounded-3xl p-4 md:p-5 shadow-[0_30px_60px_rgba(0,0,0,0.8)] origin-top-right flex flex-col overflow-hidden"
                            >
                                <div className="absolute top-0 right-0 w-32 h-32 bg-primary-500/10 blur-[50px] pointer-events-none rounded-full" />
                                
                                {navLinks.map((link, i) => (
                                    <motion.a
                                        key={link.id}
                                        href={`#${link.id}`}
                                        onClick={(e) => scrollToSection(e, link.id)}
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: i * 0.05 + 0.05, duration: 0.3 }}
                                        className="group flex items-center justify-between p-2 md:p-3 rounded-2xl hover:bg-white/5 transition-all cursor-pointer relative z-10"
                                    >
                                        <span className="text-white text-xs md:text-sm font-semibold tracking-wide group-hover:text-primary-400 transition-colors uppercase">
                                            {link.name}
                                        </span>
                                        <ArrowRight size={16} className="text-white/20 -translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 group-hover:text-primary-400 transition-all duration-300" />
                                    </motion.a>
                                ))}
                            </motion.div>
                        )}
                    </AnimatePresence>

                </div>
            </div>
            
            {/* Overlay para clicar fora e fechar caso passe o mouse longe */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div 
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm -mt-[80px]"
                        style={{ height: '120vh' }}
                        onClick={() => setIsMenuOpen(false)}
                    />
                )}
            </AnimatePresence>
        </header>
    );
};

export default Header;
