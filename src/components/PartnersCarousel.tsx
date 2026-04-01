import { useRef, useEffect, useCallback } from 'react';

const IMG_DESKTOP = '/parceiros-carrossel/parceiros-desktop.webp';
const IMG_MOBILE = '/parceiros-carrossel/parceiros.webp';

// Enough copies to always cover the viewport + overflow
const COPIES = 4;
// Base speed in px/s
const BASE_SPEED = 50;

/**
 * Scroll-reactive infinite marquee.
 * - Moves left by default.
 * - Reverses direction while the user scrolls in the opposite direction.
 * - No hover pause, transparent bg, seamless loop.
 */
const PartnersCarousel = () => {
  const desktopTrackRef = useRef<HTMLDivElement>(null);
  const mobileTrackRef = useRef<HTMLDivElement>(null);
  const offsetRef = useRef(0);
  const directionRef = useRef(-1); // -1 left, 1 right
  const singleWRef = useRef(0);
  const rafRef = useRef(0);
  const prevTimeRef = useRef(0);
  const prevScrollRef = useRef(0);

  /* ── Scroll direction detection ────────────────────────── */
  // Direction only changes when the user actually scrolls in the opposite sense.
  // No timer reset — it stays in the last detected direction.
  const onScroll = useCallback(() => {
    const y = window.scrollY;
    const delta = y - prevScrollRef.current;
    if (Math.abs(delta) > 2) {
      directionRef.current = delta > 0 ? -1 : 1;
    }
    prevScrollRef.current = y;
  }, []);

  /* ── Measure one image width ───────────────────────────── */
  const measure = useCallback(() => {
    const track = desktopTrackRef.current ?? mobileTrackRef.current;
    if (!track) return;
    const img = track.querySelector('img');
    if (img && img.offsetWidth > 0) {
      singleWRef.current = img.offsetWidth;
    }
  }, []);

  /* ── Animation loop ────────────────────────────────────── */
  useEffect(() => {
    prevScrollRef.current = window.scrollY;
    window.addEventListener('scroll', onScroll, { passive: true });

    const tick = (t: number) => {
      if (!prevTimeRef.current) prevTimeRef.current = t;
      const dt = (t - prevTimeRef.current) / 1000;
      prevTimeRef.current = t;

      offsetRef.current += BASE_SPEED * directionRef.current * dt;

      // Seamless wrapping
      const w = singleWRef.current;
      if (w > 0) {
        while (offsetRef.current <= -w) offsetRef.current += w;
        while (offsetRef.current >= 0) offsetRef.current -= w;
      }

      const tx = `translateX(${offsetRef.current}px)`;
      if (desktopTrackRef.current) desktopTrackRef.current.style.transform = tx;
      if (mobileTrackRef.current) mobileTrackRef.current.style.transform = tx;

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('scroll', onScroll);
    };
  }, [onScroll]);

  return (
    <div className="w-full overflow-hidden pt-6 pb-4 md:pt-10 md:pb-4 bg-black">

      {/* ── Desktop track ──────────────────────────────── */}
      <div
        ref={desktopTrackRef}
        className="hidden md:flex items-center will-change-transform"
        style={{ width: 'max-content' }}
      >
        {Array.from({ length: COPIES }).map((_, i) => (
          <img
            key={i}
            src={IMG_DESKTOP}
            alt="Parceiros RX Soluções"
            onLoad={i === 0 ? measure : undefined}
            draggable={false}
            className="h-16 lg:h-20 xl:h-24 max-w-none object-contain select-none pointer-events-none flex-shrink-0"
          />
        ))}
      </div>

      {/* ── Mobile track ───────────────────────────────── */}
      <div
        ref={mobileTrackRef}
        className="flex md:hidden items-center will-change-transform"
        style={{ width: 'max-content' }}
      >
        {Array.from({ length: COPIES }).map((_, i) => (
          <img
            key={i}
            src={IMG_MOBILE}
            alt="Parceiros RX Soluções"
            onLoad={i === 0 ? measure : undefined}
            draggable={false}
            className="h-20 sm:h-24 max-w-none object-contain select-none pointer-events-none flex-shrink-0"
          />
        ))}
      </div>

    </div>
  );
};

export default PartnersCarousel;
