import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, Rocket } from 'lucide-react';
import SectionBadge from './ui/SectionBadge';
import { usePartnerModal } from '../hooks/usePartnerModal';
import { useSolutionsModal } from '../hooks/useSolutionsModal';


const CTA = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });
    const { openModal: openPartnerModal } = usePartnerModal();
    const { openModal: openSolutionsModal } = useSolutionsModal();

    return (
        <section id="contato" className="pt-12 md:pt-16 pb-24 relative overflow-visible bg-[#040409]" ref={ref}>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(139,92,246,0.15)_0%,transparent_60%)] pointer-events-none" />
            
            <div className="container mx-auto px-4 md:px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.6 }}
                    className="max-w-4xl mx-auto rounded-3xl bg-black/40 border border-white/10 p-8 md:p-16 backdrop-blur-xl text-center shadow-[0_0_50px_rgba(139,92,246,0.1)] relative overflow-hidden"
                >

                    
                    <SectionBadge icon={<Rocket className="w-4 h-4" />}>
                        Próximos Passos
                    </SectionBadge>

                    <h2 className="text-4xl md:text-6xl font-bold mb-6 text-white tracking-tight">
                        Vamos crescer <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-primary-600">juntos?</span>
                    </h2>
                    
                    <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-2xl mx-auto font-light leading-relaxed">
                        Se você quer vender mais, estruturar sua operação ou gerar novas receitas com parceiros. <strong className="text-white font-medium">A RX é o caminho.</strong>
                    </p>
                    
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
                        <button
                            onClick={() => openSolutionsModal()}
                            className="group relative w-full sm:w-auto inline-flex items-center justify-center px-6 py-3.5 sm:px-8 sm:py-4 font-bold text-white text-base sm:text-lg transition-all duration-300 bg-primary-600 rounded-full hover:bg-primary-500 hover:shadow-[0_0_40px_rgba(139,92,246,0.4)] overflow-hidden cursor-pointer"
                        >
                            <span className="relative z-10 flex items-center gap-2">
                                Conhecer Soluções
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform duration-300" />
                            </span>
                        </button>

                        <button
                            onClick={() => openPartnerModal()}
                            className="group relative w-full sm:w-auto inline-flex items-center justify-center px-6 py-3.5 sm:px-8 sm:py-4 font-semibold text-white text-base sm:text-lg transition-all duration-300 bg-white/5 border border-white/10 rounded-full hover:bg-white/10 hover:border-primary-500/50 hover:shadow-[0_0_30px_rgba(139,92,246,0.15)] overflow-hidden backdrop-blur-md cursor-pointer"
                        >
                            <span className="relative z-10 flex items-center gap-2">
                                Quero ser parceiro
                                <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-primary-400 group-hover:translate-x-1.5 transition-all duration-300" />
                            </span>
                        </button>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default CTA;
