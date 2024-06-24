
export interface IAvaBet {
  id: number
  name: string
  image_url: string
  description: string
  short_description: string
  begin_at: string
  end_at: string
  status: BetStatus
  winned_bet_point_id: null | number
  points: IBetPoint[]
}

export interface IBetPoint {
  id: number
  title: string
  image_url: string
  coefficent: number
  bet_event_id: number
  win_events_count: number
  is_completed: boolean
  amount: null | number
}

export interface IStat {
  total_wins_sum: number
  total_bets: number
  total_wins: number
  total_loses: number
  total_in_game: number
}

export type BetStatus = 'no_bet' | 'in_game' | 'win' | 'lose'