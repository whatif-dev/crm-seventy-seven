'use client'

import { Button } from '@seventy-seven/ui/button'
import { Icon, type IconName } from '@seventy-seven/ui/icon'
import { cn } from '@seventy-seven/ui/utils'
import Link from 'next/link'
import { useSelectedLayoutSegment } from 'next/navigation'

type LinkItemProps = {
  href: string
  label: string
  icon?: IconName
}

const LinkItem = ({ href, label, icon }: LinkItemProps) => {
  const segment = useSelectedLayoutSegment()
  const isActive = (segment === null && href === '/') || segment === href.substring(1)

  return (
    <li>
      <Button
        variant="ghost"
        size="sm"
        asChild
        className={cn('gap-2 text-muted-foreground flex justify-start', {
          'text-foreground bg-accent': isActive,
        })}
      >
        <Link href={href}>
          {icon && <Icon className="size-4" name={icon} />}
          <span className="sr-only md:not-sr-only">{label}</span>
        </Link>
      </Button>
    </li>
  )
}

export const MainMenu = () => {
  return (
    <nav>
      <ul className="flex flex-col gap-2">
        {/* <LinkItem href="/" icon="home" label="Overview" /> */}
        <LinkItem href="/inbox" icon="inbox" label="Inbox" />
        <LinkItem href="/settings" icon="settings" label="Settings" />
      </ul>
    </nav>
  )
}
