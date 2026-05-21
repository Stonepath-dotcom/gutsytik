export default function Loading() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Navbar skeleton */}
      <header className="fixed top-0 left-0 right-0 z-50 glass-strong">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo skeleton */}
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-lg bg-muted animate-pulse" />
              <div className="w-24 h-6 rounded bg-muted animate-pulse" />
            </div>

            {/* Nav links skeleton - desktop */}
            <nav className="hidden md:flex items-center gap-1">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="w-16 h-8 rounded-md bg-muted animate-pulse" style={{ animationDelay: `${i * 100}ms` }} />
              ))}
            </nav>

            {/* Right side skeleton */}
            <div className="hidden md:flex items-center gap-1.5">
              {[1, 2, 3].map((i) => (
                <div key={i} className="w-9 h-9 rounded-md bg-muted animate-pulse" style={{ animationDelay: `${i * 80}ms` }} />
              ))}
              <div className="w-28 h-9 rounded-lg bg-muted animate-pulse" style={{ animationDelay: "300ms" }} />
            </div>

            {/* Mobile nav skeleton */}
            <div className="flex md:hidden items-center gap-1.5">
              {[1, 2].map((i) => (
                <div key={i} className="w-9 h-9 rounded-md bg-muted animate-pulse" />
              ))}
              <div className="w-9 h-9 rounded-md bg-muted animate-pulse" />
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 pt-16">
        {/* Hero section skeleton */}
        <section className="relative py-20 sm:py-28 overflow-hidden">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass mb-6 mx-auto">
              <div className="w-2 h-2 rounded-full bg-gutsy-pink animate-pulse" />
              <div className="w-28 h-4 rounded bg-muted animate-pulse" />
            </div>

            {/* Title */}
            <div className="space-y-3 mb-6">
              <div className="h-12 sm:h-14 w-80 mx-auto rounded-lg bg-muted animate-pulse" />
              <div className="h-12 sm:h-14 w-64 mx-auto rounded-lg bg-muted animate-pulse" style={{ animationDelay: "150ms" }} />
            </div>

            {/* Subtitle */}
            <div className="h-5 w-96 max-w-full mx-auto rounded bg-muted animate-pulse mb-8" />

            {/* Input + Button */}
            <div className="max-w-2xl mx-auto">
              <div className="flex gap-2 p-2 rounded-2xl glass">
                <div className="flex-1 h-12 rounded-xl bg-muted animate-pulse" />
                <div className="w-28 h-12 rounded-xl bg-muted animate-pulse" style={{ background: "linear-gradient(to right, rgba(255,45,85,0.3), rgba(124,58,237,0.3))" }} />
              </div>
            </div>
          </div>
        </section>

        {/* Features section skeleton */}
        <section className="py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {/* Section title */}
            <div className="text-center mb-12">
              <div className="h-8 w-64 mx-auto rounded-lg bg-muted animate-pulse mb-3" />
              <div className="h-5 w-80 mx-auto rounded bg-muted animate-pulse" />
            </div>

            {/* Feature cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div
                  key={i}
                  className="p-6 rounded-2xl glass animate-pulse"
                  style={{ animationDelay: `${i * 100}ms` }}
                >
                  <div className="w-12 h-12 rounded-xl bg-muted mb-4" />
                  <div className="h-5 w-3/4 rounded bg-muted mb-2" />
                  <div className="h-4 w-full rounded bg-muted mb-1" />
                  <div className="h-4 w-5/6 rounded bg-muted" />
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
