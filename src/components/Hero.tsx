import { useRef, useEffect, useState } from 'react';
import { motion, useMotionValue, useScroll, useTransform, useMotionValueEvent, MotionValue } from 'framer-motion';
import { ArrowRight, ChevronRight } from 'lucide-react';
import SectionBadge from './ui/SectionBadge';
import { useSolutionsModal } from '../hooks/useSolutionsModal';

const FRAME_COUNT = 98;

// Componente que revela uma palavra individual sincronizada ao scroll
const ScrollRevealWord = ({ word, scrollProgress, start, end }: {
    word: string;
    scrollProgress: MotionValue<number>;
    start: number;
    end: number;
}) => {
    const opacity = useTransform(scrollProgress, [start, end], [0.3, 1]);

    return (
        <motion.span
            style={{ opacity }}
            className="text-white inline-block transition-none font-light"
        >
            {word}
        </motion.span>
    );
};

const Hero = () => {
    const { openModal } = useSolutionsModal();
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const isMobileRef = useRef(false);
    
    // Store loaded HTMLImageElements in a mutable ref so they don't block React renders
    const imagesRef = useRef<HTMLImageElement[]>([]);
    const [imagesLoaded, setImagesLoaded] = useState(false);
    
    // Track current active frame implicitly to avoid repaints on resize
    const currentIndexRef = useRef(0);

    // Mouse tracking for spotlight effect
    const mouseX = useMotionValue(-1000);
    const mouseY = useMotionValue(-1000);

    const handleMouseMove = (e: React.MouseEvent) => {
        const { clientX, clientY } = e;
        const { left, top } = e.currentTarget.getBoundingClientRect();
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    };

    // --- Preload background frames ---
    useEffect(() => {
        const checkMobile = () => {
            isMobileRef.current = window.innerWidth < 768;
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);

        // Standardize paths like background000.webp
        const getFramePath = (index: number) => {
            const paddedObj = String(index).padStart(3, '0');
            return `/background/frames-bg/video${paddedObj}.webp`;
        };

        const loadBatch = (indices: number[]): Promise<void> => {
            return new Promise((resolve) => {
                let loaded = 0;
                indices.forEach((i) => {
                    const img = new Image();
                    img.src = getFramePath(i);
                    img.onload = img.onerror = () => {
                        imagesRef.current[i] = img;
                        loaded++;
                        if (loaded === indices.length) resolve();
                    };
                });
            });
        };

        const preloadImages = async () => {
            // Sempre carregamos uma base inicial rápida (keyframes)
            const framesToLoad = FRAME_COUNT;
            imagesRef.current = new Array(framesToLoad);

            // Phase 1: Load keyframes for quick functional scrub (10 frames)
            const keyframes = Array.from({ length: 10 }, (_, i) => Math.round(i * (FRAME_COUNT - 1) / 9));
            await loadBatch(keyframes);
            
            // Show first frame immediately after keyframes load
            const canvas = canvasRef.current;
            const ctx = canvas?.getContext('2d');
            if (canvas && ctx && imagesRef.current[0]) {
                renderImageToCanvas(ctx, canvas, imagesRef.current[0]);
            }

            // Phase 2: Fill remaining frames in small batches
            const remaining: number[] = [];
            for (let i = 0; i < FRAME_COUNT; i++) {
                if (!keyframes.includes(i)) remaining.push(i);
            }
            const batchSize = 12;
            for (let b = 0; b < remaining.length; b += batchSize) {
                await loadBatch(remaining.slice(b, b + batchSize));
            }

            setImagesLoaded(true);
        };

        preloadImages();
        
        // Spotlight anim mobile
        let animationFrameId: number;
        let angle = 0;
        const animateSpotlight = () => {
            if (isMobileRef.current) {
                angle += 0.015;
                const x = window.innerWidth / 2 + Math.cos(angle) * 150;
                const y = window.innerHeight / 2.5 + Math.sin(angle) * 100;
                mouseX.set(x);
                mouseY.set(y);
            }
            animationFrameId = requestAnimationFrame(animateSpotlight);
        };
        animateSpotlight();

        return () => {
            window.removeEventListener('resize', checkMobile);
            cancelAnimationFrame(animationFrameId);
        };
    }, [mouseX, mouseY]);

    // Helper puro para desenhar cobrindo o canvas como um css `object-cover` perfeito
    const renderImageToCanvas = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement, img: HTMLImageElement) => {
        const hRatio = canvas.width / img.width;
        const vRatio = canvas.height / img.height;
        const ratio  = Math.max(hRatio, vRatio); // "object-cover" logic
        
        const centerShiftX = (canvas.width - img.width * ratio) / 2;
        const centerShiftY = (canvas.height - img.height * ratio) / 2;
        
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0, img.width, img.height,
                      centerShiftX, centerShiftY, img.width * ratio, img.height * ratio);
    };

    // --- Resize handler ---
    useEffect(() => {
        const resizeCanvas = () => {
            if (!canvasRef.current) return;
            // Sets exact physical dimension mapping
            canvasRef.current.width = window.innerWidth;
            canvasRef.current.height = window.innerHeight;
            
            if (imagesLoaded) {
                const ctx = canvasRef.current.getContext('2d');
                // Use a index atual da animação, caso o usuário dê resize no meio do caminho
                const activeImg = imagesRef.current[currentIndexRef.current] || imagesRef.current[0];
                if (ctx && activeImg) {
                    renderImageToCanvas(ctx, canvasRef.current, activeImg); 
                }
            }
        };
        
        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();
        return () => window.removeEventListener('resize', resizeCanvas);
    }, [imagesLoaded]);


    // --- Scroll Mapping Framework ---
    // Atrelamos o tracker de scroll à nossa div wrapper de '300vh' de altura física total
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    // Mapeamos 0.0 -> 1.0 de rolagem para o frame index: 0 -> 49
    const activeFrameProgress = useTransform(scrollYProgress, [0, 1], [0, FRAME_COUNT - 1]);

    // Roda toda vez que o array fracionário sofre overflow pra um frame novo
    useMotionValueEvent(activeFrameProgress, "change", (latestFractional) => {
        if (!imagesLoaded) return;
        
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext('2d');
        if (!canvas || !ctx) return;

        // Arredondar para o quadro exílio inteiro
        const frameIndex = Math.min(FRAME_COUNT - 1, Math.max(0, Math.round(latestFractional)));
        
        // Ignora render se o quadro calculado não mudou
        if (frameIndex === currentIndexRef.current) return;
        currentIndexRef.current = frameIndex;
        
        // Tenta achar a imagem do frame, mas caso o usuário faça scroll rápido antes das lacunas carregarem
        // (comum no 3G Mobile), procuramos retroativamente o último "keyframe" já carregado no buffer para exibir
        let renderImg = imagesRef.current[frameIndex];
        
        if (!renderImg || !renderImg.complete) {
            for (let i = frameIndex - 1; i >= 0; i--) {
                if (imagesRef.current[i] && imagesRef.current[i].complete) {
                    renderImg = imagesRef.current[i];
                    break;
                }
            }
        }

        if (renderImg && renderImg.complete) {
            requestAnimationFrame(() => renderImageToCanvas(ctx, canvas, renderImg));
        }
    });

    const heroBadgeIcon = (
        <span className="relative flex h-2 w-2 mr-1">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-500"></span>
        </span>
    );

    return (
        // Wrapper alongado: Define a duração que a animação gasta para cruzar de "top top" para "end end".
        // 300vh = ~3 "telas" de scroll tracking dedicadas apenas pra Hero e sua sequência.
        <div ref={containerRef} className="relative w-full" style={{ height: '300vh' }}>
            
            {/* Secção Fixa: Permanece parada atrás de tudo enquanto as seções 2+ sobem por cima */}
            <section
                onMouseMove={handleMouseMove}
                className="fixed top-0 left-0 w-full h-screen overflow-hidden bg-[#020205] group"
            >
                {/* 
                  O painel do HTML Canvas que desenhará via Javascript os frames da webp sequence.
                  A opacidade atenuada harmoniza com a paleta preta do resto da página.
                */}
                <canvas 
                    ref={canvasRef}
                    className="absolute inset-0 w-full h-full z-0 object-cover opacity-60 mix-blend-screen transition-opacity duration-1000"
                    style={{ opacity: imagesLoaded ? 0.5 : 0 }}
                />

                {/* Camada Legacy: Degradê base Dark para garantir profundidade enquanto o canvas não termina o load ou em mobiles  */}
                <div className="absolute inset-0 z-[1] bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-primary-900/15 via-[#020205]/40 to-black/80 pointer-events-none"></div>

                <div className="container mx-auto px-4 md:px-6 relative h-full flex flex-col justify-center items-center z-10">
                    <div className="max-w-6xl mx-auto text-center mt-6 md:mt-8">
                        
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="inline-flex"
                        >
                            <SectionBadge 
                                autoStart={true} 
                                icon={heroBadgeIcon}
                                className="mb-6 md:mb-8 shadow-[0_0_20px_rgba(139,92,246,0.1)] inline-flex"
                            >
                                ECOSSISTEMA DE SOLUÇÕES
                            </SectionBadge>
                        </motion.div>

                        {/* Main Headline */}
                        <div className="mb-8 md:mb-12 flex flex-col items-center">
                            <motion.h1
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, ease: "easeOut" }}
                                className="text-4xl sm:text-5xl md:text-7xl lg:text-[5.5rem] font-bold tracking-tighter leading-[1.15] md:leading-[1.1] text-white max-w-5xl"
                            >
                                Aceleramos <br className="block md:hidden" />
                                o crescimento <br /> 
                                conectando <br className="block md:hidden" /> 
                                <motion.span style={{ color: useTransform(scrollYProgress, [0, 0.4], ['#ffffff', '#8B5CF6']) }}>oportunidades.</motion.span>
                            </motion.h1>
                        </div>

                        {/* Texto com revelação palavra-a-palavra sincronizada ao scroll */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="text-base sm:text-lg md:text-xl lg:text-2xl mb-10 md:mb-16 max-w-3xl mx-auto leading-relaxed px-2 md:px-0"
                        >
                            <p className="flex flex-wrap justify-center gap-x-[0.35em]">
                                {(() => {
                                    const words = "A RX Soluções é um Hub Comercial que integra nosso ecossistema de serviços, operação e parceiros estratégicos projetado para potencializar os seus resultados.".split(' ');
                                    const totalWords = words.length;
                                    // Revelação entre 10% e 80% do scroll da Hero
                                    const revealStart = 0.05;
                                    const revealEnd = 0.50;
                                    const range = revealEnd - revealStart;

                                    return words.map((word, i) => {
                                        const wordStart = revealStart + (i / totalWords) * range;
                                        const wordEnd = revealStart + ((i + 1) / totalWords) * range;

                                        return (
                                            <ScrollRevealWord
                                                key={i}
                                                word={word}
                                                scrollProgress={scrollYProgress}
                                                start={wordStart}
                                                end={wordEnd}
                                            />
                                        );
                                    });
                                })()}
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                            className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 w-full max-w-sm sm:max-w-none mx-auto"
                        >
                            <button
                                onClick={() => openModal()}
                                className="group relative w-full sm:w-auto inline-flex items-center justify-center px-6 py-3.5 sm:px-8 sm:py-4 font-bold text-white text-base sm:text-lg transition-all duration-500 rounded-full bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-500 hover:to-primary-400 shadow-[0_0_20px_rgba(139,92,246,0.3)] hover:shadow-[0_0_50px_rgba(139,92,246,0.6)] hover:-translate-y-1 overflow-hidden border border-white/10 hover:border-primary-300/50 cursor-pointer"
                            >
                                <span className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.3)_50%,transparent_75%)] bg-[length:250%_250%,100%_100%] animate-bg-pan opacity-40 group-hover:opacity-100 transition-opacity duration-500"></span>
                                <span className="absolute inset-0 bg-primary-400/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
                                <span className="relative z-10 flex items-center gap-2 drop-shadow-sm">
                                    Explorar RX Soluções
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform duration-300" />
                                </span>
                            </button>

                            <a
                                href="https://rxanalises.com.br/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group relative w-full sm:w-auto inline-flex items-center justify-center px-6 py-3.5 sm:px-8 sm:py-4 font-semibold text-white text-base sm:text-lg transition-all duration-300 bg-white/5 border border-white/10 rounded-full hover:bg-white/10 hover:border-primary-500/50 hover:shadow-[0_0_30px_rgba(139,92,246,0.15)] overflow-hidden backdrop-blur-md cursor-pointer"
                            >
                                <span className="relative z-10 flex items-center gap-2">
                                    Conhecer o RX Análises
                                    <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-primary-400 transition-colors" />
                                </span>
                            </a>
                        </motion.div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Hero;
