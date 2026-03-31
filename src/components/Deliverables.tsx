import { motion } from 'framer-motion';
import { Target, TrendingUp, LayoutDashboard, Compass } from 'lucide-react';
import SectionBadge from './ui/SectionBadge';

const Deliverables = () => {
    const deliverables = [
        {
            id: 1,
            icon: Target,
            title: "Principais riscos",
            subtitle: "e pontos de atenção",
            desc: "Mapeamento claro, minucioso e fundamentado em dados sobre tudo o que ameaça a saúde do negócio e a rentabilidade da operação.",
            color: "from-red-500/20 to-transparent",
            accent: "text-red-400",
            border: "border-red-500/30",
            glow: "bg-red-500/20"
        },
        {
            id: 2,
            icon: TrendingUp,
            title: "Oportunidades",
            subtitle: "de melhoria",
            desc: "Ações práticas e direcionadas para aumentar a eficiência operacional, reduzir perdas e destravar novas vias de margem de lucro.",
            color: "from-green-500/20 to-transparent",
            accent: "text-green-400",
            border: "border-green-500/30",
            glow: "bg-green-500/20"
        },
        {
            id: 3,
            icon: LayoutDashboard,
            title: "Indicadores",
            subtitle: "organizados",
            desc: "Um painel visual e estruturado para o acompanhamento contínuo da loja, eliminando o achismo e a 'cegueira gerencial'.",
            color: "from-blue-500/20 to-transparent",
            accent: "text-blue-400",
            border: "border-blue-500/30",
            glow: "bg-blue-500/20"
        },
        {
            id: 4,
            icon: Compass,
            title: "Recomendações",
            subtitle: "objetivas",
            desc: "Direcionamento estratégico, passo a passo, estruturado para embasar as suas próximas decisões de gestão com segurança.",
            color: "from-primary-500/20 to-transparent",
            accent: "text-primary-400",
            border: "border-primary-500/30",
            glow: "bg-primary-500/20"
        },
    ];

    return (
        // On mobile: bg-scroll (bg-fixed broken on iOS Safari)
        <section
            id="entregaveis"
            className="relative bg-black md:bg-[url('/background/background-rxanalises-otimizado.webp')] md:bg-fixed md:bg-cover md:bg-center"
        >
            {/* Background overlays (desktop only) */}
            <div className="absolute inset-0 bg-black/80 pointer-events-none z-0 hidden md:block" />
            <div className="absolute inset-0 opacity-10 pointer-events-none z-0 hidden md:block"
                style={{ backgroundImage: "url('https://grainy-gradients.vercel.app/noise.svg')" }} />

            {/* ─── MOBILE LAYOUT: Static heading + horizontal carousel ─── */}
            <div className="md:hidden relative z-10 px-4 pt-12 pb-10">
                {/* Heading */}
                <div className="mb-8">
                    <SectionBadge icon={<Target size={14} />}>Entregáveis</SectionBadge>
                    <h2 className="text-4xl font-extrabold text-white mt-4 mb-3 leading-tight tracking-tight">
                        O Que Você <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-white">Leva</span>
                    </h2>
                    <p className="text-gray-400 text-sm leading-relaxed">
                        O plano de ação completo para destravar resultados reais e retomar a previsibilidade financeira da loja.
                    </p>
                </div>

                {/* Horizontal Swipe Carousel */}
                <motion.div
                    initial={{ x: 0 }}
                    whileInView={{ x: [0, -30, 0] }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ delay: 1, duration: 0.8, ease: "easeInOut" }}
                    className="flex gap-4 overflow-x-auto pb-4 px-4 -mx-4 snap-x snap-mandatory scroll-smooth"
                    style={{ scrollbarWidth: 'none', WebkitOverflowScrolling: 'touch' }}
                >
                    {deliverables.map((item) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="snap-center shrink-0 w-[80vw] max-w-[320px] relative rounded-2xl overflow-hidden border border-white/5 bg-white/[0.015] backdrop-blur-md p-5 shadow-2xl"
                        >
                            <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-20`} />
                            <div className="relative z-10">
                                <div className={`w-10 h-10 rounded-xl bg-black border ${item.border} flex items-center justify-center mb-4 shadow-xl`}>
                                    <item.icon className={`w-5 h-5 ${item.accent}`} />
                                </div>
                                <h3 className="text-xl font-extrabold text-white leading-tight mb-1 tracking-tight">
                                    {item.title} <span className={`${item.accent} font-light`}>{item.subtitle}</span>
                                </h3>
                                <p className="text-gray-400 text-sm leading-relaxed mt-2 font-light">{item.desc}</p>
                            </div>
                            {/* Big BG number */}
                            <div className="absolute -bottom-4 -right-2 text-[72px] font-black pointer-events-none select-none" style={{ color: 'rgba(255,255,255,0.02)' }}>
                                0{item.id}
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Swipe hint */}
                <p className="text-center text-gray-400 text-xs mt-2 tracking-wide">← deslize para ver mais →</p>
            </div>

            {/* ─── DESKTOP LAYOUT: Original sticky + scroll (unchanged) ─── */}
            <div className="hidden md:block container mx-auto px-4 md:px-6 relative z-10 lg:w-[1100px]">
                <div className="flex flex-col lg:flex-row gap-12 lg:gap-24">

                    {/* Left Sticky Column */}
                    <div className="lg:w-5/12 w-full lg:h-auto">
                        <div className="sticky top-0 h-[40vh] lg:h-screen flex flex-col justify-end lg:justify-center pb-12 lg:pb-0 z-20 bg-black/80 lg:bg-transparent backdrop-blur-md lg:backdrop-blur-none -mx-4 px-4 md:mx-0 md:px-0">
                            <motion.div
                                initial={{ opacity: 0, x: -30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                            >
                                <SectionBadge icon={<Target size={14} />}>Entregáveis</SectionBadge>
                                <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 md:mb-6 text-white mt-4 md:mt-6 leading-[1.1] tracking-tight">
                                    O Que Você <br className="hidden lg:block" />
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-white">Leva</span>
                                </h2>
                                <p className="text-gray-400 text-base md:text-lg leading-relaxed max-w-sm">
                                    O plano de ação completo para destravar resultados reais e retomar a previsibilidade financeira da loja.
                                </p>
                            </motion.div>
                        </div>
                    </div>

                    {/* Right Scrolling Column */}
                    <div className="lg:w-7/12 w-full py-[10vh] lg:py-[35vh] relative z-10">
                        <div className="flex flex-col gap-[15vh] lg:gap-[30vh]">
                            {deliverables.map((item) => (
                                <div
                                    key={item.id}
                                    className="w-full max-w-lg relative rounded-2xl overflow-hidden border border-white/5 bg-white/[0.015] backdrop-blur-md p-6 lg:p-8 shadow-2xl group transition-all duration-300 hover:bg-white/[0.03]"
                                >
                                    <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-20 group-hover:opacity-40 transition-opacity duration-700`} />

                                    <div className="relative z-10">
                                        <div className={`w-10 h-10 md:w-12 md:h-12 rounded-xl bg-black border ${item.border} flex items-center justify-center mb-5 shadow-xl relative transition-transform duration-500 group-hover:scale-110`}>
                                            <div className={`absolute inset-0 ${item.glow} rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                                            <item.icon className={`w-5 h-5 md:w-6 md:h-6 ${item.accent} relative z-10`} />
                                        </div>
                                        <h3 className="text-xl lg:text-3xl font-extrabold text-white leading-tight mb-2 tracking-tight">
                                            {item.title} <br className="hidden xl:block" />
                                            <span className={`${item.accent} font-light`}> {item.subtitle}</span>
                                        </h3>
                                        <p className="text-gray-400 text-sm md:text-base leading-relaxed mt-3 font-light">
                                            {item.desc}
                                        </p>
                                    </div>

                                    <div className="absolute -bottom-6 -right-2 text-[80px] md:text-[100px] font-black pointer-events-none select-none transition-transform duration-700 group-hover:-translate-y-2 group-hover:-translate-x-2" style={{ color: 'rgba(255,255,255,0.02)' }}>
                                        0{item.id}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </section >
    );
};

export default Deliverables;
