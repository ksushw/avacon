import type { IRank } from '@/types/user';

export interface RatingsResponse {
  current_page: number
  data: IRatingItem[]
  pages_count: number
}

export interface IRatingItem {
  id?: number
  avatar_path: string
  first_name?: string
  last_name?: string
  name?: string
  points: number
  participants_count?: number
  rank?: IRank
}