import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, useInView } from 'framer-motion';
import { Activity, Check } from 'lucide-react';
import SectionBadge from './ui/SectionBadge';

const TERMINAL_CONTENT = [
    { text: "> INICIANDO SAÍDA DE DADOS...", type: "cmd" },
    { text: "Dados recebidos e validados", type: "head" },
    { text: "Pontos de risco detectados", type: "head" },
    { text: "Análise de estoque e rupturas", type: "head" },
    { text: "Análise de giro e eficiência", type: "head" },
    { text: "Diagnóstico final e direcionamento", type: "head" },
    { text: "> DIAGNÓSTICO CONCLUÍDO.", type: "cmd" },
];

const TerminalOutput = ({ start }: { start: boolean }) => {
    type TerminalLine = { text: string; type: string };
    const [lines, setLines] = useState<TerminalLine[]>([]);

    useEffect(() => {
        if (!start) return;

        let currentIndex = 0;
        const interval = setInterval(() => {
            if (currentIndex < TERMINAL_CONTENT.length) {
                const lineToAdd = TERMINAL_CONTENT[currentIndex];
                setLines(prev => [...prev, lineToAdd]);
                currentIndex++;
            } else {
                clearInterval(interval);
            }
        }, 500);

        return () => clearInterval(interval);
    }, [start]);

    return (
        <div className="flex flex-col gap-3">
            {lines.map((line, index) => (
                <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`flex items-start gap-2 ${line.type === "cmd"
                        ? "text-primary-400 font-bold"
                        : "text-gray-300 font-medium ml-4 lg:ml-6"
                        }`}
                >
                    {line.type === "head" && (
                        <Check className="w-3.5 h-3.5 text-primary-500 shrink-0 mt-[2px]" />
                    )}
                    <span className="leading-snug">{line.text}</span>
                </motion.div>
            ))}
        </div>
    );
};

const Diagnostic = () => {
    const containerRef = useRef(null);
    const isInView = useInView(containerRef, { once: true, margin: "-40% 0px -40% 0px" });

    // Pre-calculate random deterministic values to avoid impure randoms during react render
    const bars = useMemo(() => {
        return [65, 40, 75, 55, 80, 45, 90].map(h => ({
            initialH: h,
            targetH: Math.max(20, Math.random() * 100),
            duration: 2 + Math.random(),
        }));
    }, []);

    return (
        <section className="py-12 md:py-24 bg-black relative overflow-hidden">
            {/* Radial gradient background */}
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary-900/10 rounded-full blur-[128px] pointer-events-none z-0" />

            <div className="container mx-auto px-4 md:px-6 relative z-10 flex flex-col lg:flex-row items-center gap-10 md:gap-16">

                {/* Text Content */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="lg:w-1/2 text-center lg:text-left"
                >
                    <SectionBadge icon={<Activity size={14} />}>O QUE É O DIAGNÓSTICO RX</SectionBadge>

                    <h2 className="text-3xl md:text-5xl font-extrabold mb-4 md:mb-6 leading-tight text-white mt-6">
                        Inteligência de dados para decisões precisas.
                    </h2>

                    <p className="text-[#A1A1A1] text-base md:text-lg mb-6 md:mb-8 leading-relaxed">
                        Uma leitura técnica completa do seu cenário atual. O Diagnóstico RX organiza seus
                        indicadores e entrega um plano de ação claro para proteger sua margem e evoluir sua gestão.
                    </p>
                </motion.div>

                {/* Visual Representation */}
                <motion.div
                    ref={containerRef}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="lg:w-1/2 w-full"
                >
                    <div className="relative rounded-2xl border border-gray-800 bg-gray-900/50 backdrop-blur-xl p-5 md:p-6 shadow-2xl overflow-hidden w-full group flex flex-col">

                        {/* Decor Header */}
                        <div className="flex items-center justify-between mb-5 md:mb-6 border-b border-gray-800 pb-4">
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full bg-red-500/50" />
                                <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                                <div className="w-3 h-3 rounded-full bg-green-500/50" />
                            </div>
                            <div className="text-xs text-gray-400 font-mono tracking-widest">Diagnóstico RX</div>
                        </div>

                        {/* Content Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-auto md:h-[220px] relative z-10">
                            {/* Left Panel: Processing */}
                            <div className="rounded-lg bg-black/40 border border-gray-700/50 p-4 flex flex-col relative overflow-hidden h-[180px] md:h-full justify-between">
                                <div className="flex flex-col flex-1 pb-4">
                                    <div className="flex items-center justify-between mb-4 shrink-0">
                                        <div className="flex items-center gap-2">
                                            <div className="w-2 h-2 rounded-full bg-primary-500 animate-pulse" />
                                            <span className="text-xs text-gray-300 font-mono">Analisando dados...</span>
                                        </div>
                                        <Activity className="w-4 h-4 text-primary-500/50" />
                                    </div>
                                    <div className="flex items-end justify-between flex-1 gap-1 min-h-0">
                                        {bars.map((bar, i) => (
                                            <motion.div
                                                key={i}
                                                initial={{ height: "0%" }}
                                                animate={isInView ? {
                                                    height: [`${bar.initialH}%`, `${bar.targetH}%`, `${bar.initialH}%`]
                                                } : { height: "0%" }}
                                                transition={{
                                                    duration: bar.duration,
                                                    repeat: Infinity,
                                                    ease: "easeInOut"
                                                }}
                                                className="w-full bg-primary-500/40 rounded-t-sm"
                                            />
                                        ))}
                                    </div>
                                </div>
                                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-800">
                                    <motion.div
                                        initial={{ width: "0%" }}
                                        animate={isInView ? { width: ["0%", "100%"] } : { width: "0%" }}
                                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                        className="h-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]"
                                    />
                                </div>
                            </div>

                            {/* Right Panel: Terminal */}
                            <div className="rounded-lg bg-black/40 border border-gray-700/50 p-4 font-mono text-[10px] sm:text-xs leading-relaxed overflow-y-auto flex flex-col h-[240px] md:h-full min-h-0">
                                <TerminalOutput start={isInView} />
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Diagnostic;
