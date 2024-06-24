import type { ITeam } from '@/types/team'
import type { ISelectedSkin } from './skin'

export interface IUser {
  last_points_update: string
  username: string
  first_name: string
  crypto_address: string
  crypto_address_1: string
  last_name: string
  avatar_path: string
  referral_url: string
  created_at: string
  points: number
  coins: number
  golds: number
  golds_stamp: number
  usdt: number
  usdt_ref: number
  rank: any
  team: ITeam
  owned_team: ITeam
  wallet_address: string
  golds_withdrawal_available: boolean
  is_channel_verified: boolean
  is_email_verified: boolean
  id: number
  coins_legit: number
  private_investment_volume: number
  current_coin_skin: ISelectedSkin | null
  tokens: number
}

export interface IRank {
  id: number
  name: string
  points_level_receiving: number
  referrer_rank_reward: {
    points: number
  }
  rank_reward: {
    points: number
  }
}

export interface ErrorResponse {
  response: {
    data: {
      detail: string
    }
  }
}
