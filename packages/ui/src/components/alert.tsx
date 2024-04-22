import type { ComponentProps } from 'react'
// import { cn } from '../utils'
import {
  // AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from './shadcn/alert-dialog'

export { AlertDialog } from './shadcn/alert-dialog'
export { createPushModal } from 'pushmodal'

type Props = ComponentProps<typeof AlertDialogContent>

export const Alert = ({ children, ...restProps }: Props) => {
  return <AlertDialogContent {...restProps}>{children}</AlertDialogContent>
}

export const AlertHeader = ({ children }: { children: React.ReactNode }) => {
  return <AlertDialogHeader className="mb-4">{children}</AlertDialogHeader>
}

export const AlertTitle = ({ children }: { children: React.ReactNode }) => {
  return <AlertDialogTitle className="text-left">{children}</AlertDialogTitle>
}

export const AlertDescription = ({ children }: { children: React.ReactNode }) => {
  return <AlertDialogDescription className="text-left">{children}</AlertDialogDescription>
}

export const AlertFooter = AlertDialogFooter
export const AlertCancel = AlertDialogCancel
// export const AlertAction = AlertDialogAction

// export const AlertCancel = ({ children }: { children: React.ReactNode }) => {
//   return <AlertDialogCancel>{children}</AlertDialogCancel>
// }

// export const AlertAction = ({ children }: { children: React.ReactNode }) => {
//   return <AlertDialogAction>{children}</AlertDialogAction>
// }
