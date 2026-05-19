function ValueStrip() {
  return (
    <section className="border-y border-border">
      <div className="max-w-7xl mx-auto px-6 py-5">
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-text-muted">
          <span className="flex items-center gap-1.5">
            <span className="font-semibold text-primary">1 click</span> to import
          </span>
          <span className="hidden sm:inline text-border">|</span>
          <span className="flex items-center gap-1.5">
            <span className="font-semibold text-primary">1 click</span> to publish
          </span>
          <span className="hidden sm:inline text-border">|</span>
          <span className="flex items-center gap-1.5">
            <span className="font-semibold text-text">0</span> config files
          </span>
          <span className="hidden sm:inline text-border">|</span>
          <span className="flex items-center gap-1.5">
            <span className="font-semibold text-text">6+</span> agents supported
          </span>
        </div>
      </div>
    </section>
  )
}

export default ValueStrip
