import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TrendingDown, Calculator, Scale, AlertTriangle, EyeOff, CheckCircle2 } from 'lucide-react';
import SpotlightCard from './ui/SpotlightCard';
import SectionBadge from './ui/SectionBadge';

const painPoints = [
    {
        icon: TrendingDown,
        title: "Margem comprimida",
        description: "Por descontos excessivos e mix de produtos pouco rentável."
    },
    {
        icon: Calculator,
        title: "Precificação sem critério",
        description: "Falta de clareza na definição de preços por categoria e canal."
    },
    {
        icon: Scale,
        title: "Tributação ineficiente",
        description: "Enquadramento gerando custo fiscal acima do necessário."
    },
    {
        icon: AlertTriangle,
        title: "Estoque irregular",
        description: "Giro baixo e capital parado em produtos sem saída."
    },
    {
        icon: EyeOff,
        title: "Cegueira gerencial",
        description: "Dificuldade em enxergar os indicadores que realmente importam."
    }
];

// Hook: highlights the card most visible in the viewport (mobile scroll spotlight)
function useScrollSpotlight(containerRef: React.RefObject<HTMLElement | null>) {
    useEffect(() => {
        const isMobile = window.matchMedia('(max-width: 767px)').matches;
        if (!isMobile) return;

        const cards = containerRef.current?.querySelectorAll<HTMLElement>('[data-spotlight-card]');
        if (!cards || cards.length === 0) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    const el = entry.target as HTMLElement;
                    const isSuccess = el.getAttribute('data-spotlight-variant') === 'success';
                    if (entry.intersectionRatio > 0.55) {
                        el.classList.add('mobile-spotlight-active');
                        if (isSuccess) el.classList.add('mobile-spotlight-success');
                    } else {
                        el.classList.remove('mobile-spotlight-active');
                        el.classList.remove('mobile-spotlight-success');
                    }
                });
            },
            { threshold: [0, 0.55, 1], rootMargin: '-10% 0px -10% 0px' }
        );

        cards.forEach(card => observer.observe(card));
        return () => observer.disconnect();
    }, [containerRef]);
}


const Reality = () => {
    const gridRef = useRef<HTMLDivElement>(null);
    useScrollSpotlight(gridRef);

    return (
        <section className="py-12 md:py-24 bg-black relative z-10">
            <div className="container mx-auto px-4 md:px-6 relative z-10">
                <div className="text-center mb-10 md:mb-20">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                    >
                        <SectionBadge icon={<AlertTriangle size={14} />}>Cenário Atual</SectionBadge>
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-5xl font-bold mb-6 tracking-tight"
                    >
                        A Realidade de <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-white">Muitas Farmácias</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-gray-400 text-base md:text-lg max-w-2xl mx-auto"
                    >
                        Mesmo com movimento e vendas, é comum a gestão enfrentar desafios invisíveis que corroem o lucro.
                    </motion.p>
                </div>

                <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                    {painPoints.map((point, index) => (
                        <motion.div
                            key={index}
                            data-spotlight-card
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="mobile-spotlight-card"
                        >
                            <SpotlightCard className="h-full group hover:shadow-primary-900/20 transition-all duration-500">
                                <div className="flex flex-col items-center md:items-start text-center md:text-left">
                                    <div className="mb-4 md:mb-5 inline-flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-lg bg-primary-500/10 group-hover:bg-primary-500/20 group-hover:scale-110 transition-all duration-300">
                                        <point.icon className="w-5 h-5 md:w-6 md:h-6 text-primary-400 group-hover:text-primary-300 transition-colors" />
                                    </div>
                                    <h3 className="text-lg md:text-xl font-bold text-white mb-2 md:mb-3 group-hover:translate-x-1 transition-transform">{point.title}</h3>
                                    <p className="text-gray-400 leading-relaxed font-light text-sm md:text-base">
                                        {point.description}
                                    </p>
                                </div>
                            </SpotlightCard>
                        </motion.div>
                    ))}

                    {/* Summary Card */}
                    <motion.div
                        data-spotlight-card
                        data-spotlight-variant="success"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        whileHover="hover"
                        viewport={{ once: true }}
                        transition={{ delay: 0.5 }}
                        className="h-full mobile-spotlight-card"
                    >
                        <SpotlightCard
                            spotlightColor="rgba(34, 197, 94, 0.15)"
                            className="h-full border-green-500/50 bg-gradient-to-br from-gray-900 via-green-950/30 to-green-900/20 shadow-[0_0_30px_rgba(34,197,94,0.15)] group relative overflow-hidden !p-0"
                        >
                            <motion.div
                                className="absolute inset-0 bg-gradient-to-r from-transparent via-green-400/20 to-transparent -skew-x-12 z-0 pointer-events-none transition-opacity duration-300 group-hover:opacity-0"
                                animate={{ x: ['-100%', '200%'] }}
                                transition={{ repeat: Infinity, duration: 2, ease: "linear", repeatDelay: 0.5 }}
                            />
                            <div className="flex flex-col h-full items-center justify-center text-center relative z-10 px-8 py-12 md:py-16">
                                <div className="mb-6 inline-flex items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-full bg-green-500/20 shadow-[0_0_20px_rgba(34,197,94,0.3)] group-hover:scale-110 transition-transform duration-300">
                                    <CheckCircle2 className="w-7 h-7 md:w-8 md:h-8 text-green-400" />
                                </div>
                                <h3 className="text-xl md:text-2xl font-bold text-white mb-3">O Resultado?</h3>
                                <p className="text-gray-300 leading-relaxed text-sm md:text-base">
                                    O diagnóstico traz visibilidade para agir com mais precisão e retomar o controle.
                                </p>
                            </div>
                        </SpotlightCard>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Reality;
