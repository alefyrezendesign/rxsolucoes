import { useRef, useState, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Building2, Handshake, Briefcase, Expand, ArrowRight, Users } from 'lucide-react';
import SectionBadge from './ui/SectionBadge';

function VideoBackground({ src, isActive, poster }: { src: string; isActive: boolean; poster: string }) {
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        if (!videoRef.current) return;
        if (isActive) {
            videoRef.current.play().catch(() => {});
        } else {
            videoRef.current.pause();
        }
    }, [isActive]);

    return (
        <video 
            ref={videoRef}
            src={src}
            poster={poster}
            loop
            muted
            playsInline
            preload="auto"
            className={`absolute inset-0 w-full h-full object-cover transition-all duration-1000 group-hover:scale-105`}
        />
    );
}

const Audience = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });
    const [activeIndex, setActiveIndex] = useState(0);

    const profiles = [
        {
            icon: <Building2 className="w-5 h-5 text-white" />,
            image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=1200",
            video: "/videos-para-quem/01.mp4",
            title: "Empresas que querem crescer com estratégia",
            description: "Para negócios que buscam soluções validadas para ganho de performance e eficiência operacional."
        },
        {
            icon: <Handshake className="w-5 h-5 text-white" />,
            image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=1200",
            video: "/videos-para-quem/02.mp4",
            title: "Parceiros que querem gerar receita recorrente",
            description: "Para quem tem uma base de clientes e quer monetizá-la indicando ou distribuindo as soluções do nosso hub."
        },
        {
            icon: <Briefcase className="w-5 h-5 text-white" />,
            image: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&q=80&w=1200",
            video: "/videos-para-quem/03.mp4",
            title: "Negócios que precisam de estrutura comercial",
            description: "Para empresas que possuem um bom produto, mas necessitam de inteligência de vendas e execução terceirizada."
        },
        {
            icon: <Expand className="w-5 h-5 text-white" />,
            image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1200",
            video: "/videos-para-quem/04.mp4",
            title: "Empresas que querem escalar sem aumentar equipe",
            description: "Terceirização estratégica da operação de vendas e estruturação de novos canais de receita."
        }
    ];

    return (
        <section id="para-quem" className="min-h-screen pt-28 pb-12 flex flex-col justify-center bg-black relative overflow-hidden" ref={ref}>
            <div className="container mx-auto px-4 md:px-6 relative z-10 w-full">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                    transition={{ duration: 0.6 }}
                    className="max-w-4xl mx-auto text-center mb-16 md:mb-20"
                >
                    <SectionBadge icon={<Users className="w-4 h-4" />}>
                        Para Quem
                    </SectionBadge>
                    <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white tracking-tight">
                        Para quem é a <span className="text-primary-500 font-bold border-b-2 border-primary-500">RX Soluções?</span>
                    </h2>
                    <p className="text-gray-400 font-light text-lg max-w-2xl mx-auto mb-10 md:mb-14">
                        O hub que conecta todos os pontos necessários para escalar um negócio.
                    </p>
                </motion.div>

                {/* Expanding Image Accordion */}
                <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="flex flex-col md:flex-row gap-3 sm:gap-4 min-h-[480px] sm:min-h-[600px] h-[65svh] md:min-h-0 md:h-[440px] lg:h-[480px] w-full max-w-6xl mx-auto"
                >
                    {profiles.map((profile, i) => {
                        const isActive = activeIndex === i;
                        return (
                            <motion.div
                                key={i}
                                layout
                                onClick={() => setActiveIndex(i)}
                                className={`relative overflow-hidden rounded-2xl cursor-pointer group transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] ${
                                    isActive ? 'flex-[4_4_0%]' : 'flex-[0_auto] basis-[80px] sm:basis-[100px] md:basis-auto md:flex-[1_1_0%] hover:shadow-[0_20px_40px_rgba(139,92,246,0.12)]'
                                }`}
                                style={!isActive ? { minHeight: '80px' } : {}}
                            >
                                {/* Background Media Wrapper */}
                                <div className={`absolute inset-0 w-full h-full rounded-2xl overflow-hidden transition-all duration-500 ${isActive ? 'bg-black border border-white/5' : 'bg-[#06040a] border border-white/10 group-hover:border-primary-500/40'}`}>
                                    <AnimatePresence>
                                        {isActive && (
                                            <motion.div 
                                                initial={{ opacity: 0 }} 
                                                animate={{ opacity: 1 }} 
                                                exit={{ opacity: 0 }} 
                                                transition={{ duration: 0.5 }} 
                                                className="absolute inset-0 w-full h-full"
                                            >
                                                {profile.video ? (
                                                    <VideoBackground src={profile.video} isActive={isActive} poster={profile.image} />
                                                ) : (
                                                    <img 
                                                        src={profile.image} 
                                                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 scale-[1.01] overflow-hidden"
                                                        alt={profile.title}
                                                    />
                                                )}
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                                
                                {/* Gradient Overlay (Only over media) */}
                                <AnimatePresence>
                                    {isActive && (
                                        <motion.div 
                                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                                            className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-transparent pointer-events-none" 
                                        />
                                    )}
                                </AnimatePresence>
                                
                                {/* Inactive State Content (Premium Dark Glass Look Mobile vs Desktop) */}
                                <AnimatePresence>
                                    {!isActive && (
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            transition={{ duration: 0.3 }}
                                            className="absolute inset-0 flex flex-row md:flex-col items-center justify-start px-6 md:justify-center md:p-6 bg-gradient-to-b md:bg-gradient-to-b from-[#110822]/40 to-transparent transition-colors duration-700 pointer-events-none"
                                        >
                                            {/* Ambient Purple Glow */}
                                            <div className="absolute left-10 md:top-1/2 md:left-1/2 -translate-y-1/2 md:-translate-x-1/2 w-40 h-40 bg-primary-600/20 blur-[60px] rounded-full group-hover:bg-primary-500/30 transition-all duration-700" />
                                            
                                            <div className="relative z-10 p-3 md:p-5 rounded-xl md:rounded-2xl bg-gradient-to-br from-white/10 to-white/0 border border-white/10 backdrop-blur-md group-hover:from-primary-500/30 group-hover:to-primary-900/40 group-hover:border-primary-500/50 group-hover:shadow-[0_0_40px_rgba(139,92,246,0.3)] transition-all duration-500 shrink-0 mr-4 mb-0 md:mr-0 md:mb-6 inline-flex">
                                                {profile.icon}
                                            </div>
                                            
                                            <h3 className="relative z-10 text-white font-bold text-lg md:text-2xl tracking-wide md:tracking-wider text-left md:text-center group-hover:text-primary-300 transition-colors duration-300 drop-shadow-md">
                                                {profile.title.split(' ')[0]}
                                            </h3>
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                {/* Active State Content (Bottom aligned) */}
                                <AnimatePresence mode="wait">
                                    {isActive && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: 10 }}
                                            transition={{ duration: 0.4, delay: 0.2 }}
                                            className="absolute inset-0 p-5 md:p-8 flex flex-col justify-end z-10"
                                        >
                                            <div className="flex flex-col md:flex-row items-start md:items-end gap-3 md:gap-4 w-full">
                                                <div className="p-3 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 shadow-lg shrink-0 mb-2 md:mb-0">
                                                    {profile.icon}
                                                </div>
                                                <div className="flex-1 w-full relative">
                                                    <h3 className="font-bold text-white text-xl md:text-3xl leading-tight mb-2">
                                                        {profile.title}
                                                    </h3>
                                                    <p className="text-gray-300 font-light text-sm md:text-base leading-relaxed hidden sm:block">
                                                        {profile.description}
                                                    </p>
                                                    <button 
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            const targetId = profile.title.toLowerCase().includes('parceiro') ? 'partner-program' : 'contato';
                                                            document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth' });
                                                        }}
                                                        className="mt-2 md:mt-4 inline-flex items-center gap-2 text-primary-400 font-medium text-sm md:text-base hover:text-primary-300 transition-colors w-fit cursor-pointer outline-none border-none bg-transparent"
                                                    >
                                                        Saber mais <ArrowRight className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        );
                    })}
                </motion.div>
            </div>
        </section>
    );
};

export default Audience;
