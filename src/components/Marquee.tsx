'use client';

export default function Marquee() {
  const text = 'Tanned by hand · Born in the medina · مدبوغ باليد · Fait à la main · ';

  return (
    <div className="py-6 border-y border-subtle overflow-hidden relative" style={{ backgroundColor: 'var(--marquee-bg)' }}>
      <p className="sr-only">{text.trim()}</p>
      <div className="flex animate-marquee whitespace-nowrap" aria-hidden="true">
        {Array.from({ length: 4 }).map((_, i) => (
          <span key={i} className="text-faint text-sm tracking-[0.3em] uppercase font-sans mx-4">{text}</span>
        ))}
      </div>
    </div>
  );
}
