'use client';

export function HeroSkeleton() {
  return (
    <div className="h-screen flex items-center justify-center bg-surface">
      <div className="rounded-2xl bg-card/50 backdrop-blur-sm border border-subtle px-10 py-12 text-center">
        <div className="w-16 h-px bg-accent/10 mx-auto mb-8 animate-pulse" />
        <div className="w-32 h-3 bg-accent/10 mx-auto mb-6 rounded animate-pulse" />
        <div className="w-64 h-12 bg-accent/5 mx-auto mb-4 rounded animate-pulse" />
        <div className="w-48 h-px bg-accent/10 mx-auto mb-4 animate-pulse" />
        <div className="w-40 h-4 bg-accent/10 mx-auto mb-10 rounded animate-pulse" />
        <div className="w-48 h-12 border border-accent/20 mx-auto rounded animate-pulse" />
      </div>
    </div>
  );
}

export function ProductViewerSkeleton() {
  return (
    <div className="w-full aspect-square bg-surface-alt border border-subtle flex items-center justify-center overflow-hidden">
      <div className="text-center">
        <div className="w-20 h-20 rounded-full border-2 border-accent/20 mx-auto mb-4 animate-pulse" />
        <span className="text-faint text-sm tracking-widest uppercase">Loading 3D...</span>
      </div>
    </div>
  );
}

export function ProductCardSkeleton() {
  return (
    <div className="bg-card border border-subtle overflow-hidden">
      <div className="aspect-[3/4] bg-surface-alt animate-pulse" />
      <div className="p-5">
        <div className="w-3/4 h-5 bg-accent/5 rounded animate-pulse mb-2" />
        <div className="w-1/2 h-3 bg-accent/5 rounded animate-pulse mb-4" />
        <div className="flex items-center justify-between">
          <div className="w-20 h-5 bg-accent/5 rounded animate-pulse" />
          <div className="w-16 h-8 border border-subtle rounded animate-pulse" />
        </div>
      </div>
    </div>
  );
}
