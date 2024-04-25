'use client'

import { Button } from '@seventy-seven/ui/button'
import { Logo } from '@seventy-seven/ui/logo'
import dynamic from 'next/dynamic'
import Link from 'next/link'

const ChangeThemeButton = dynamic(
  () => import('./change-theme-button').then(({ ChangeThemeButton }) => ChangeThemeButton),
  {
    ssr: false,
    loading: () => null,
  },
)

export const Header = () => {
  return (
    <header className="p-4 h-20 flex items-center">
      <div className="w-full grid grid-cols-[repeat(2,1fr)] items-center h-full">
        <div className="h-10 overflow-hidden aspect-square">
          <Link href="/">
            <Logo />
          </Link>
        </div>

        {/* <nav className="justify-self-center">
          <ul className="flex items-center gap-4">
            <li>
              <Link href="/">Pricing</Link>
            </li>
            <li>
              <Link href="/">Docs</Link>
            </li>
          </ul>
        </nav> */}

        <div className="justify-self-end flex items-center gap-4">
          <ChangeThemeButton />
          <Button asChild>
            <a href="https://app.seventy-seven.dev">Sign in</a>
          </Button>
        </div>
      </div>
    </header>
  )
}
