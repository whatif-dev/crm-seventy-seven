'use client'

import { cn } from '@seventy-seven/ui/utils'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { usePathname, useSelectedLayoutSegment } from 'next/navigation'

type SubLinkItemProps = {
  href: string
  label: string
}

const SubLinkItem = ({ href, label }: SubLinkItemProps) => {
  const segment = useSelectedLayoutSegment()
  const pathname = usePathname()

  const isActive = (href === '/settings' && segment === null) || pathname === href

  return (
    <li className="relative">
      <Link
        href={href}
        className={cn('transition-colors', {
          'text-foreground': isActive,
          'text-muted-foreground': !isActive,
        })}
      >
        {label}
      </Link>
      {isActive && (
        <motion.div layoutId="underline" className="absolute -bottom-0.5 left-0 w-full h-0.5 bg-muted-foreground" />
      )}
    </li>
  )
}

type Props = {
  className?: string
}

export const SettingsSubNav = ({ className }: Props) => {
  return (
    <nav className={cn(className)}>
      <ul className="flex items-center gap-4">
        <SubLinkItem href="/settings" label="General" />
        <SubLinkItem href="/settings/members" label="Members" />
        <SubLinkItem href="/settings/security" label="Security" />
      </ul>
    </nav>
  )
}
