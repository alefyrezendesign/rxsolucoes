import { lazy, Suspense } from 'react';
import { LazyMotion, domAnimation } from 'framer-motion';
import Header from './components/Header';
import Hero from './components/Hero';
import PartnerModal from './components/PartnerModal';
import { PartnerModalProvider } from './context/PartnerModalContext';
import SolutionsModal from './components/SolutionsModal';
import { SolutionsModalProvider } from './context/SolutionsModalContext';

// Heavy sections lazy-loaded for performance
import TransitionSceneAboutToMechanics from './components/TransitionSceneAboutToMechanics';

// Heavy sections lazy-loaded for performance
const PartnerProgram = lazy(() => import('./components/PartnerProgram'));

import RxAnalises from './components/RxAnalises';
const Audience = lazy(() => import('./components/Audience'));
const CTA = lazy(() => import('./components/CTA'));
const Footer = lazy(() => import('./components/Footer'));

const SectionSkeleton = () => <div className="min-h-[400px] bg-black border-b border-white/5" />;

const App = () => {
  return (
    <SolutionsModalProvider>
        <PartnerModalProvider>
          <LazyMotion features={domAnimation} strict>
        {/* 
          Main container.
          Using a standard full-app background and removing locomotive or global wrappers 
          that interfere with native sticky rendering. 
        */}
        <main className="bg-black min-h-screen font-sans selection:bg-primary-500/30 selection:text-white relative">
            <Header />

            {/* Hero fixed, no StackSection */}
            <Hero />

            {/* Unified Cinematic GSAP Scroll for About & HowItWorks */}
            <Suspense fallback={<SectionSkeleton />}>
              <TransitionSceneAboutToMechanics />
            </Suspense>

            {/* Normal flow wrapper for the rest of the site (Audience, Partner, CTA, Footer).
                A negative top margin exactly matches the height of the sticky container above it (100vh).
                This guarantees that Section 4 (Audience) overlaps Section 3 natively on scroll,
                and the remaining sections scroll naturally without visual divisions or GSAP Pin bugs. */}
            <div className="relative z-30 w-full bg-[#040409] mt-0 md:-mt-[100vh]">
                <Suspense fallback={<SectionSkeleton />}>
                    {/* Audience is guaranteed to overlap because of the negative margin */}
                    <Audience />
                </Suspense>
                
                
                <RxAnalises />
                
                
                <Suspense fallback={<SectionSkeleton />}>
                    <PartnerProgram />
                </Suspense>
                
                <Suspense fallback={<SectionSkeleton />}>
                    <CTA />
                </Suspense>
                
                <Suspense fallback={<SectionSkeleton />}>
                    <Footer />
                </Suspense>
            </div>
            
        </main>

        {/* Modais flutuantes renderizados fora do fluxo */}
        <PartnerModal />
        <SolutionsModal />
      </LazyMotion>
    </PartnerModalProvider>
    </SolutionsModalProvider>
  );
};

export default App;
