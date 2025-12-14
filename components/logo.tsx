export function Logo({ className = "", variant = "full" }: { className?: string; variant?: "full" | "icon" }) {
  if (variant === "icon") {
    return (
      <svg className={className} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="40" height="40" rx="8" fill="url(#gradient)" />
        <path d="M12 10L20 18L28 10L30 12L20 22L10 12L12 10Z" fill="white" opacity="0.95" />
        <path d="M12 20L20 28L28 20L30 22L20 32L10 22L12 20Z" fill="white" opacity="0.7" />
        <defs>
          <linearGradient id="gradient" x1="0" y1="0" x2="40" y2="40">
            <stop offset="0%" stopColor="#8B5CF6" />
            <stop offset="100%" stopColor="#EC4899" />
          </linearGradient>
        </defs>
      </svg>
    )
  }

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <svg className="w-8 h-8" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="40" height="40" rx="8" fill="url(#gradient)" />
        <path d="M12 10L20 18L28 10L30 12L20 22L10 12L12 10Z" fill="white" opacity="0.95" />
        <path d="M12 20L20 28L28 20L30 22L20 32L10 22L12 20Z" fill="white" opacity="0.7" />
        <defs>
          <linearGradient id="gradient" x1="0" y1="0" x2="40" y2="40">
            <stop offset="0%" stopColor="#8B5CF6" />
            <stop offset="100%" stopColor="#EC4899" />
          </linearGradient>
        </defs>
      </svg>
      <span className="text-2xl font-bold tracking-tight">Seret</span>
    </div>
  )
}
