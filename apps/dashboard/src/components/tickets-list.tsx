import { type Folder, ticketsQueries } from '@/queries/tickets'
import { TicketListItem } from './ticket-list-item'

type Props = {
  folder: Folder
}

export const TicketsList = async ({ folder }: Props) => {
  const tickets = await ticketsQueries.findMany(folder)

  if (tickets.length === 0) {
    return (
      <div className="h-full flex items-center justify-center">
        <p className="text-muted-foreground text-2xl">No tickets found</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-4">
      {tickets.map((ticket) => (
        <TicketListItem key={ticket.id} ticket={ticket} folder={folder} />
      ))}
    </div>
  )
}
