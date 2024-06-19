import type { IRank } from '@/types/user';

export interface TeamsResponse {
  data: ITeam[]
  pages_count: number
  current_page: number
}

export interface ITeam {
  id: number
  name: string
  description: string
  avatar_path: string
  participants_count: number
  points: number
  rating_position: number
}

export interface TeamsParticipantsResponse {
  data: TeamParticipants[]
  pages_count: number
  current_page: number
}

export interface TeamParticipants {
  points: number
  first_name: string
  last_name: string
  avatar_path: string
  rank: IRank
}