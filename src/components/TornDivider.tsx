'use client';

export default function TornDivider({ flip = false }: { flip?: boolean }) {
  return (
    <div className={`w-full overflow-hidden leading-[0] ${flip ? 'rotate-180' : ''}`} role="presentation" aria-hidden="true">
      <svg viewBox="0 0 1200 60" preserveAspectRatio="none" className="w-full h-8 md:h-12">
        <path
          d="M0,30 Q30,5 60,28 Q90,50 120,25 Q150,0 180,30 Q210,55 240,22 Q270,0 300,32 Q330,58 360,20 Q390,0 420,35 Q450,60 480,18 Q510,0 540,30 Q570,55 600,25 Q630,0 660,28 Q690,52 720,22 Q750,0 780,30 Q810,55 840,20 Q870,0 900,32 Q930,60 960,25 Q990,0 1020,28 Q1050,52 1080,22 Q1110,0 1140,30 Q1170,55 1200,25 L1200,60 L0,60 Z"
          fill="var(--surface)"
        />
      </svg>
    </div>
  );
}
