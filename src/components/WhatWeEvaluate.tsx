import { motion } from 'framer-motion';
import { FileText, Percent, Coins, RefreshCw, BarChart3, ShieldCheck, Database } from 'lucide-react';
import SectionBadge from './ui/SectionBadge';

const evaluationPoints = [
    { icon: FileText, title: "Regime tributário", desc: "Impactos fiscais no resultado e possíveis enquadramentos." },
    { icon: Percent, title: "Margem por categoria", desc: "Formação de preços, mark-up e identificação do lucro real." },
    { icon: Coins, title: "Descontos", desc: "Efeitos pontuais e cumulativos na rentabilidade final da loja." },
    { icon: RefreshCw, title: "Giro de estoque", desc: "Imobilização de capital, rupturas e perdas financeiras associadas." },
    { icon: BarChart3, title: "Indicadores de desempenho", desc: "Dashboard de eficiência operacional da loja." },
    { icon: ShieldCheck, title: "Obrigações e conformidade", desc: "Camada de segurança fiscal e regulatória." },
    { icon: Database, title: "Benchmarks", desc: "Comparativo de performance com parâmetros do mercado farmacêutico." },
];

const WhatWeEvaluate = () => {
    return (
        // On mobile: bg-scroll (bg-fixed is broken on iOS Safari)
        <section
            id="avaliamos"
            className="relative bg-black md:bg-[url('/background/background-rxanalises-otimizado.webp')] md:bg-fixed md:bg-cover md:bg-center"
        >
            {/* Background Decor & Dark Overlay */}
            <div className="absolute inset-0 bg-black/80 pointer-events-none z-0 hidden md:block" />
            <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-primary-900/10 rounded-full blur-[120px] -translate-y-1/2 z-0 pointer-events-none hidden md:block" />

            {/* ─── MOBILE LAYOUT: Static heading + horizontal carousel ─── */}
            <div className="md:hidden relative z-10 px-4 pt-12 pb-10">
                {/* Heading */}
                <div className="mb-8">
                    <SectionBadge icon={<FileText size={14} />}>Escopo da Análise</SectionBadge>
                    <h2 className="text-4xl font-extrabold text-white mt-4 mb-3 leading-tight tracking-tight">
                        O Que <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-primary-200">Avaliamos</span>
                    </h2>
                    <p className="text-gray-400 text-sm leading-relaxed">
                        Uma varredura completa nos dados para identificar onde o dinheiro está sendo perdido e onde pode ser multiplicado.
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
                    {evaluationPoints.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.05 }}
                            className="snap-center shrink-0 w-[80vw] max-w-[320px] flex flex-col gap-3 items-start rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-sm p-5"
                        >
                            <div className="w-10 h-10 shrink-0 rounded-xl bg-gradient-to-br from-gray-900 to-black border border-gray-800 flex items-center justify-center shadow-lg">
                                <item.icon className="text-primary-400" size={18} />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-white mb-1 tracking-tight">{item.title}</h3>
                                <p className="text-gray-400 text-sm leading-relaxed font-light">{item.desc}</p>
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
                                <SectionBadge icon={<FileText size={14} />}>Escopo da Análise</SectionBadge>
                                <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 md:mb-6 text-white mt-4 md:mt-6 leading-[1.1] tracking-tight">
                                    O Que <br className="hidden lg:block" />
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-primary-200">Avaliamos</span>
                                </h2>
                                <p className="text-gray-400 text-base md:text-lg leading-relaxed max-w-sm">
                                    Uma varredura completa nos dados para identificar onde o dinheiro está sendo perdido e onde pode ser multiplicado.
                                </p>
                            </motion.div>
                        </div>
                    </div>

                    {/* Right Scrolling Column */}
                    <div className="lg:w-7/12 w-full py-[10vh] lg:py-[35vh] relative z-10">
                        <div className="flex flex-col gap-[15vh] lg:gap-[30vh]">
                            {evaluationPoints.map((item, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, scale: 0.95, y: 30, filter: "blur(8px)" }}
                                    whileInView={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
                                    viewport={{ margin: "-25% 0px -25% 0px" }}
                                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                                    className="flex flex-col sm:flex-row gap-4 md:gap-5 items-start relative group"
                                >
                                    <div className="w-10 h-10 md:w-12 md:h-12 shrink-0 rounded-xl bg-gradient-to-br from-gray-900 to-black border border-gray-800 flex items-center justify-center shadow-lg relative transition-transform duration-500 group-hover:scale-110">
                                        <div className="absolute inset-0 bg-primary-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                        <item.icon className="text-primary-400 relative z-10" size={20} />
                                    </div>
                                    <div className="pt-1">
                                        <h3 className="text-xl md:text-2xl font-bold text-white mb-2 tracking-tight group-hover:text-primary-100 transition-colors duration-300">
                                            {item.title}
                                        </h3>
                                        <p className="text-gray-400 text-sm md:text-base leading-relaxed max-w-md font-light">
                                            {item.desc}
                                        </p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </section >
    );
};

export default WhatWeEvaluate;
