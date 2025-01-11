import { AlertProvider } from '@/components/alerts'
import { AnalyticsSetProfile } from '@/components/analytics-set-profile'
import { Header } from '@/components/header'
import { ModalProvider } from '@/components/modals'
import { SheetProvider } from '@/components/sheets'
import { trpc } from '@/trpc/server'
import { Toaster } from '@seventy-seven/ui/sonner'

type Props = {
  children: React.ReactNode
}

const AuthedLayout = async ({ children }: Props) => {
  const user = await trpc.users.maybeMe()

  return (
    <>
      <Toaster position="top-center" />
      <ModalProvider />
      <AlertProvider />
      <SheetProvider />
      <AnalyticsSetProfile user={user} />

      <div className="h-full overflow-hidden grid grid-rows-[auto_1fr]">
        <Header />

        {children}
      </div>
    </>
  )
}

export default AuthedLayout
