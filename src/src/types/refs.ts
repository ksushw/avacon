import type { IRank } from '@/types/user'

export interface RefsTotal {
  invited_count: number
  reward_sum: number
}

export interface RefsResponse {
  current_page: number
  pages_count: number
  data: ReferralItem[]
}

export interface ReferralItem {
  points_reward: number
  usdt_ref_reward?: number
  position?: number
  tokens_reward?: number
  referral: {
    avatar_path: string
    created_at: string
    first_name: string
    last_name: string
    telegram_id: string
    points: number
    rank?: IRank
    is_email_verified: boolean
    is_channel_verified: boolean
  }
}