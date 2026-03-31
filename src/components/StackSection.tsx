import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface StackSectionProps {
  children: React.ReactNode;
  zIndex: number;
  disableOverlay?: boolean;
}

export const StackSection: React.FC<StackSectionProps> = ({ children, zIndex, disableOverlay = false }) => {
  const ref = useRef<HTMLDivElement>(null);
  
  // Rastreia o progresso do scroll apenas quando esta seção entra na tela e chega ao topo
  // O progresso deve calcular APENAS quando a base (bottom) desta seção estiver
  // saindo do fundo da tela, ou seja, quando a PRÓXIMA seção começar a subir por cima dela.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["end end", "end start"]
  });

  // Quando a seção chega ao topo e o usuário continua rolando, 
  // ela desce um pouco (efeito parallax inverso) e encolhe/escurece,
  // Apenas retém um pouquinho para dar efeito parallax sutil, sem encolher nem sumir
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const scale = 1; // Removido o encolhimento
  
  // Em vez de mudar a opacidade do elemento pai (o que revelaria fundos fixos atrás), 
  // usamos este valor para uma camada escura sobre o conteúdo.
  const overlayOpacity = useTransform(scrollYProgress, [0, 1], [0, 0.4]); 

  return (
    <motion.section
      ref={ref}
      style={{ 
        y, 
        scale, 
        zIndex,
        position: 'relative',
        transformOrigin: "top center"
      }}
      className="w-full will-change-transform shadow-[0_-5px_25px_rgba(0,0,0,0.15)] rounded-t-[2.5rem] overflow-hidden"
    >
      {/* Container do conteúdo */}
      <div className="relative z-10 w-full h-full">
        {children}
      </div>
      
      {/* Camada de escurecimento para dar a ilusão de profundidade quando a próxima seção sobe */}
      {!disableOverlay && (
        <motion.div 
          className="absolute inset-0 bg-black pointer-events-none z-50 rounded-t-[2.5rem]"
          style={{ opacity: overlayOpacity }}
        />
      )}
    </motion.section>
  );
};
