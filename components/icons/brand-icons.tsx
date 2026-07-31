import type { ReactNode, SVGProps } from "react"

export type BrandIconProps = SVGProps<SVGSVGElement>

function IconBase({
  children,
  ...props
}: BrandIconProps & { children: ReactNode }) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {children}
    </svg>
  )
}

export function WriteIcon(props: BrandIconProps) {
  return (
    <IconBase {...props}>
      <path d="M8 36c5-4 11-4 16 0s11 4 16 0" />
      <path d="M32 8 40 16 24 24z" fill="currentColor" stroke="none" />
      <path d="M36 12l7-7" />
      <circle cx="40" cy="32" r="1.5" fill="currentColor" stroke="none" />
    </IconBase>
  )
}

export function ScheduleIcon(props: BrandIconProps) {
  return (
    <IconBase {...props}>
      <path d="M14 6v5M34 6v5" />
      <rect x="8" y="11" width="32" height="30" rx="4" />
      <path d="M8 21h32" />
      <circle cx="24" cy="32" r="5" />
      <path d="M24 29v6M21 32h6" />
    </IconBase>
  )
}

export function PerspectiveIcon(props: BrandIconProps) {
  return (
    <IconBase {...props}>
      <path d="M7 24c3.5-5 9-8 17-8s13.5 3 17 8c-3.5 5-9 8-17 8s-13.5-3-17-8z" />
      <circle cx="24" cy="24" r="5.5" />
      <path
        d="M34 4l1.8 4.2 4.2 1.8-4.2 1.8L34 16l-1.8-4.2L28 10l4.2-1.8z"
        fill="currentColor"
        stroke="none"
      />
    </IconBase>
  )
}

export function DeliveryIcon(props: BrandIconProps) {
  return (
    <IconBase {...props}>
      <rect x="8" y="12" width="32" height="24" rx="3" />
      <path d="M8 17l16 11 16-11" />
      <path
        d="M24 22.5c1.7-2.2 4.5-2.2 4.5.4 0 1.7-2.8 3.4-4.5 4.9-1.7-1.5-4.5-3.2-4.5-4.9 0-2.6 2.8-2.6 4.5-.4z"
        fill="currentColor"
        stroke="none"
      />
    </IconBase>
  )
}

export function ReflectionsIcon(props: BrandIconProps) {
  return (
    <IconBase {...props}>
      <circle cx="18" cy="19" r="6" />
      <path d="M10 34c1.5-4.5 4.5-6.5 8-6.5s6.5 2 8 6.5" />
      <path d="M31 15c3 1.5 4.5 4.5 4.5 7.5s-1.5 6-4.5 7.5" />
      <path d="M38 10c4.5 2 6.5 6 6.5 12s-2 10-6.5 12" />
    </IconBase>
  )
}

export function ContextIcon(props: BrandIconProps) {
  return (
    <IconBase {...props}>
      <path d="M6 24h36" />
      <circle cx="12" cy="24" r="3" />
      <circle cx="36" cy="24" r="3" />
      <path d="M24 19v-8" />
      <path d="M24 11l8 2.5-8 2.5z" fill="currentColor" stroke="none" />
      <circle cx="24" cy="24" r="5" />
    </IconBase>
  )
}

export function LockHeartIcon(props: BrandIconProps) {
  return (
    <IconBase {...props}>
      <rect x="10" y="21" width="28" height="19" rx="4" />
      <path d="M17 21v-4a7 7 0 0 1 14 0v4" />
      <path
        d="M24 25.5c1.8-2.3 4.7-2.3 4.7.4 0 1.8-2.9 3.6-4.7 5.2-1.8-1.6-4.7-3.4-4.7-5.2 0-2.7 2.9-2.7 4.7-.4z"
        fill="currentColor"
        stroke="none"
      />
    </IconBase>
  )
}
