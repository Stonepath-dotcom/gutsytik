export default function Loading() {
  return (
    <div className="min-h-screen flex flex-col bg-[#09090B]">
      {/* Navbar skeleton */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#09090B]/95 border-b border-[#27272A]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-lg bg-[#18181B] animate-pulse" />
              <div className="w-16 h-5 rounded bg-[#18181B] animate-pulse" />
            </div>
            <nav className="hidden md:flex items-center gap-1">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="w-16 h-8 rounded-md bg-[#18181B] animate-pulse" style={{ animationDelay: `${i * 100}ms` }} />
              ))}
            </nav>
            <div className="hidden md:flex items-center gap-1.5">
              {[1, 2, 3].map((i) => (
                <div key={i} className="w-9 h-9 rounded-md bg-[#18181B] animate-pulse" style={{ animationDelay: `${i * 80}ms` }} />
              ))}
              <div className="w-24 h-9 rounded-lg bg-[#F97316]/20 animate-pulse" style={{ animationDelay: "300ms" }} />
            </div>
            <div className="flex md:hidden items-center gap-1.5">
              {[1, 2].map((i) => (
                <div key={i} className="w-9 h-9 rounded-md bg-[#18181B] animate-pulse" />
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* Hero skeleton */}
      <main className="flex-1 pt-16 flex items-center justify-center">
        <div className="text-center px-6 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#27272A] mb-8">
            <div className="w-2 h-2 rounded-full bg-[#F97316]/30 animate-pulse" />
            <div className="w-24 h-3 rounded bg-[#18181B] animate-pulse" />
          </div>
          <div className="space-y-4 mb-6">
            <div className="h-14 sm:h-16 w-72 mx-auto rounded-lg bg-[#18181B] animate-pulse" />
            <div className="h-14 sm:h-16 w-56 mx-auto rounded-lg bg-[#18181B] animate-pulse" style={{ animationDelay: "150ms" }} />
          </div>
          <div className="h-4 w-80 max-w-full mx-auto rounded bg-[#18181B] animate-pulse mb-12" />
          <div className="max-w-xl mx-auto">
            <div className="flex gap-3 p-2 rounded-xl bg-[#111113] border border-[#27272A]">
              <div className="flex-1 h-12 rounded-lg bg-[#18181B] animate-pulse" />
              <div className="w-28 h-12 rounded-lg bg-[#F97316]/20 animate-pulse" />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
