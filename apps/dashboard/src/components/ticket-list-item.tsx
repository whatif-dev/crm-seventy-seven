'use client'

import { useSelectedTicket } from '@/hooks/use-selected-ticket'
import type { TicketsFindMany } from '@/queries/tickets'
import { Badge } from '@seventy-seven/ui/badge'
import { Icon } from '@seventy-seven/ui/icon'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@seventy-seven/ui/tooltip'
import { cn } from '@seventy-seven/ui/utils'
import { format, formatDistance, isToday } from 'date-fns'
import { Avatar } from './avatar'

type Props = {
  ticket: TicketsFindMany[number]
}

export const TicketListItem = ({ ticket }: Props) => {
  const { ticketId, setTicketId } = useSelectedTicket()

  const isActive = ticket.id === ticketId.ticketId
  const lastMessage = ticket.messages.at(-1)

  const avatarName = lastMessage?.handler ? lastMessage.handler.full_name : lastMessage?.sent_from_full_name ?? ''
  const avatarImageUrl = lastMessage?.handler
    ? lastMessage.handler.image_url ?? undefined
    : lastMessage?.sent_from_avatar_url ?? undefined
  const name = lastMessage?.handler ? lastMessage.handler.full_name : lastMessage?.sent_from_full_name ?? ''

  if (!lastMessage) {
    return <p>Message could not be found</p>
  }

  return (
    <button
      type="button"
      // href={`?ticketId=${ticket.id}`}
      onClick={() => setTicketId({ ticketId: ticket.id })}
      className={cn('text-left relative hover:bg-muted/5 dark:hover:bg-muted/30 p-4 rounded-md', {
        'bg-muted/5 dark:bg-muted/30': isActive,
      })}
    >
      {(ticket.snoozed_until || ticket.starred_at || ticket.closed_at || ticket.isUnhandled) && (
        <div className="absolute top-2 right-2 flex items-center gap-2">
          {ticket.snoozed_until && (
            <Badge variant="outline" className="gap-2 font-normal items-center text-muted-foreground">
              {format(ticket.snoozed_until, isToday(ticket.snoozed_until) ? 'HH:mm' : 'MMM dd (HH:mm)')}
              <Icon name="alarmClock" className="size-4 text-orange-500" />
            </Badge>
          )}

          {ticket.starred_at && <Icon name="star" className="size-4 text-amber-500" />}
          {ticket.closed_at && <Icon name="checkCircle" className="size-4 text-destructive" />}
          {ticket.isUnhandled && <Icon name="circleDashed" className="size-4 text-blue-500" />}
        </div>
      )}

      {ticket.assigned_to_user && (
        <div className="absolute bottom-2 right-2 flex items-center gap-2">
          <TooltipProvider delayDuration={0}>
            <Tooltip>
              <TooltipTrigger asChild>
                <span>
                  <Avatar
                    name={ticket.assigned_to_user.full_name}
                    imageUrl={ticket.assigned_to_user.image_url ?? undefined}
                    className="size-4"
                  />
                </span>
              </TooltipTrigger>
              <TooltipContent asChild>
                <span className="text-xs">{ticket.assigned_to_user.full_name}</span>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      )}

      <div className="flex items-center gap-2">
        <Avatar name={avatarName} imageUrl={avatarImageUrl} className="size-7" />
        <span className="font-medium">{name}</span>

        <TooltipProvider delayDuration={200}>
          <Tooltip>
            <TooltipTrigger asChild>
              <time className="block text-muted font-normal text-xs" dateTime={lastMessage.created_at.toISOString()}>
                {formatDistance(lastMessage.created_at, new Date(), { addSuffix: true })}
              </time>
            </TooltipTrigger>

            <TooltipContent asChild>
              <span className="text-xs font-normal flex items-center gap-2">
                <Icon name="calendar" strokeWidth={2} className="size-3" />
                {format(lastMessage.created_at, 'PPpp')}
              </span>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <p className="mt-2">{ticket.subject}</p>
      <p className="mt-2 text-muted line-clamp-1 text-sm">{lastMessage.body}</p>
    </button>
  )
}
