import type { TEAM_ROLE_ENUM } from '@seventy-seven/orm/prisma'
import { assertUnreachable } from './assertUnreachable'

export const teamRoleEnumToWord = (teamRole: TEAM_ROLE_ENUM) => {
  switch (teamRole) {
    case 'MEMBER':
      return 'Member'
    case 'OWNER':
      return 'Owner'
    default:
      assertUnreachable(teamRole)
  }
}
