const Footer = () => {
    return (
        <footer className="bg-[#040409] border-t border-white/10 py-16">
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-12">
                    <div className="flex items-center gap-3">
                        <img src="/logo/rx-logo-branca.webp" alt="RX Soluções" className="h-6 sm:h-8 md:h-10 w-auto opacity-90" />
                    </div>

                    <div className="flex items-center gap-6">
                        <a href="https://wa.me/5521998689659?text=Ol%C3%A1%2C%20vim%20pelo%20site%20da%20RX%20Solu%C3%A7%C3%B5es%20e%20gostaria%20de%20saber%20mais%20sobre%20as%20solu%C3%A7%C3%B5es%20dispon%C3%ADveis.%20Podem%20me%20ajudar%3F" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-400 hover:text-primary-400 transition-colors">Contato</a>
                        
                        {/* Instagram icon (line/outline) */}
                        <a href="#" aria-label="Instagram" className="text-white/70 hover:text-white transition-colors">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                <rect x="2" y="2" width="20" height="20" rx="5" />
                                <circle cx="12" cy="12" r="5" />
                                <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                            </svg>
                        </a>
                        
                        {/* Facebook icon (line/outline) */}
                        <a href="#" aria-label="Facebook" className="text-white/70 hover:text-white transition-colors">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                            </svg>
                        </a>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8 border-t border-white/5">
                    <p className="text-gray-400 text-sm text-center md:text-left">
                        Conectando soluções, parceiros e oportunidades.
                    </p>
                    <p className="text-gray-500 text-xs text-center md:text-right">
                        © {new Date().getFullYear()} RX Soluções. Todos os direitos reservados.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
