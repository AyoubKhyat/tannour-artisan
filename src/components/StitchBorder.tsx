'use client';

import { useEffect, useRef } from 'react';

export default function StitchBorder() {
  const pathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const path = pathRef.current;
    if (!path) return;
    const length = path.getTotalLength();
    path.style.strokeDasharray = `${length}`;
    path.style.strokeDashoffset = `${length}`;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { path.style.transition = 'stroke-dashoffset 2s ease-in-out'; path.style.strokeDashoffset = '0'; } },
      { threshold: 0.3 }
    );
    observer.observe(path);
    return () => observer.disconnect();
  }, []);

  return (
    <svg viewBox="0 0 400 200" className="w-full h-auto" fill="none" aria-hidden="true">
      <path ref={pathRef} d="M10,10 L390,10 L390,190 L10,190 Z" stroke="var(--accent)" strokeWidth="2" strokeDasharray="8 6" strokeLinecap="round" opacity="0.3" />
    </svg>
  );
}
