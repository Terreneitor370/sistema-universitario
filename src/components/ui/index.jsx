import clsx from 'clsx'

// ── Button ────────────────────────────────────────────────
export function Button({ children, variant = 'primary', size = 'md', className, ...props }) {
  const base = 'inline-flex items-center gap-2 font-medium rounded-[var(--radius-md)] transition-all duration-150 cursor-pointer border disabled:opacity-50 disabled:cursor-not-allowed'

  const variants = {
    primary: 'bg-[var(--color-primary)] text-white border-transparent hover:bg-[var(--color-primary-dark)] active:scale-[0.98]',
    secondary: 'bg-[var(--color-surface)] text-[var(--color-text-primary)] border-[var(--color-border)] hover:bg-[var(--color-surface-alt)]',
    ghost: 'bg-transparent text-[var(--color-text-secondary)] border-transparent hover:bg-[var(--color-surface-alt)]',
    danger: 'bg-[var(--color-danger-bg)] text-[var(--color-danger)] border-transparent hover:opacity-80',
    success: 'bg-[var(--color-success-bg)] text-[var(--color-success)] border-transparent hover:opacity-80',
  }

  const sizes = {
    sm: 'text-xs px-3 py-1.5',
    md: 'text-sm px-4 py-2',
    lg: 'text-base px-5 py-2.5',
  }

  return (
    <button className={clsx(base, variants[variant], sizes[size], className)} {...props}>
      {children}
    </button>
  )
}

// ── Badge / Status pill ───────────────────────────────────
const badgeStyles = {
  active:   'bg-[var(--color-success-bg)] text-[var(--color-success)]',
  warning:  'bg-[var(--color-warning-bg)] text-[var(--color-warning)]',
  danger:   'bg-[var(--color-danger-bg)]  text-[var(--color-danger)]',
  info:     'bg-[var(--color-info-bg)]    text-[var(--color-info)]',
  default:  'bg-[var(--color-surface-alt)] text-[var(--color-text-secondary)]',
}

export function Badge({ children, variant = 'default', className }) {
  return (
    <span className={clsx('inline-block text-xs font-medium px-2 py-0.5 rounded-full', badgeStyles[variant], className)}>
      {children}
    </span>
  )
}

// ── Card ──────────────────────────────────────────────────
export function Card({ children, className, ...props }) {
  return (
    <div
      className={clsx('bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[var(--radius-lg)] p-4', className)}
      style={{ boxShadow: 'var(--shadow-sm)' }}
      {...props}
    >
      {children}
    </div>
  )
}

export function CardTitle({ children, icon: Icon, className }) {
  return (
    <div className={clsx('flex items-center gap-2 text-sm font-medium text-[var(--color-text-primary)] mb-3', className)}>
      {Icon && <Icon size={15} style={{ color: 'var(--color-primary)' }} />}
      {children}
    </div>
  )
}

// ── Avatar ────────────────────────────────────────────────
const avatarColors = [
  { bg: '#E6F1FB', text: '#0C447C' },
  { bg: '#EAF3DE', text: '#27500A' },
  { bg: '#EEEDFE', text: '#3C3489' },
  { bg: '#E1F5EE', text: '#085041' },
  { bg: '#FAEEDA', text: '#633806' },
  { bg: '#FCEBEB', text: '#791F1F' },
]

function getInitials(name = '') {
  return name.split(' ').slice(0, 2).map(w => w[0]).join('').toUpperCase()
}

function getColor(name = '') {
  const idx = name.charCodeAt(0) % avatarColors.length
  return avatarColors[idx]
}

export function Avatar({ name, size = 32, className }) {
  const { bg, text } = getColor(name)
  const initials = getInitials(name)
  return (
    <div
      className={clsx('rounded-full flex items-center justify-center font-medium flex-shrink-0', className)}
      style={{ width: size, height: size, background: bg, color: text, fontSize: size * 0.35 }}
    >
      {initials}
    </div>
  )
}

// ── Input ─────────────────────────────────────────────────
export function Input({ label, error, className, ...props }) {
  return (
    <div className="flex flex-col gap-1">
      {label && <label className="text-xs font-medium text-[var(--color-text-secondary)]">{label}</label>}
      <input
        className={clsx(
          'border border-[var(--color-border)] rounded-[var(--radius-md)] px-3 py-2 text-sm bg-[var(--color-surface)] text-[var(--color-text-primary)] outline-none transition-all',
          'focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary-light)]',
          error && 'border-[var(--color-danger)]',
          className
        )}
        {...props}
      />
      {error && <span className="text-xs text-[var(--color-danger)]">{error}</span>}
    </div>
  )
}

// ── Select ────────────────────────────────────────────────
export function Select({ label, error, children, className, ...props }) {
  return (
    <div className="flex flex-col gap-1">
      {label && <label className="text-xs font-medium text-[var(--color-text-secondary)]">{label}</label>}
      <select
        className={clsx(
          'border border-[var(--color-border)] rounded-[var(--radius-md)] px-3 py-2 text-sm bg-[var(--color-surface)] text-[var(--color-text-primary)] outline-none transition-all cursor-pointer',
          'focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary-light)]',
          className
        )}
        {...props}
      >
        {children}
      </select>
      {error && <span className="text-xs text-[var(--color-danger)]">{error}</span>}
    </div>
  )
}

// ── KPI Metric Card ───────────────────────────────────────
export function KpiCard({ label, value, trend, trendUp, className }) {
  return (
    <div className={clsx('bg-[var(--color-surface-alt)] rounded-[var(--radius-md)] p-4', className)}>
      <p className="text-xs text-[var(--color-text-secondary)] mb-1">{label}</p>
      <p className="text-2xl font-medium text-[var(--color-text-primary)] leading-none">{value}</p>
      {trend && (
        <p className="text-xs mt-1.5" style={{ color: trendUp ? 'var(--color-success)' : 'var(--color-danger)' }}>
          {trendUp ? '↑' : '↓'} {trend}
        </p>
      )}
    </div>
  )
}

// ── Empty State ───────────────────────────────────────────
export function EmptyState({ icon: Icon, title, description, action }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      {Icon && <Icon size={40} style={{ color: 'var(--color-text-muted)', marginBottom: '1rem' }} />}
      <p className="font-medium text-[var(--color-text-primary)] mb-1">{title}</p>
      {description && <p className="text-sm text-[var(--color-text-secondary)] mb-4">{description}</p>}
      {action}
    </div>
  )
}

// ── Alert Banner ──────────────────────────────────────────
export function AlertBanner({ type = 'warning', children, action }) {
  const styles = {
    warning: 'bg-[var(--color-warning-bg)] text-[var(--color-warning)] border-[var(--color-warning)]',
    danger:  'bg-[var(--color-danger-bg)]  text-[var(--color-danger)]  border-[var(--color-danger)]',
    info:    'bg-[var(--color-info-bg)]    text-[var(--color-info)]    border-[var(--color-info)]',
    success: 'bg-[var(--color-success-bg)] text-[var(--color-success)] border-[var(--color-success)]',
  }
  return (
    <div className={clsx('flex items-center justify-between gap-3 border-l-4 rounded-[var(--radius-md)] px-4 py-3 text-sm font-medium', styles[type])}>
      <span>{children}</span>
      {action}
    </div>
  )
}
