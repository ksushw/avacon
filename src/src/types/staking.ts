
export interface IMyStaking {
  sum: number
  all_time_sum: number
  not_taken: number
  staked_at: string
}

export interface IStakingStats{
  percent: number
  all_stakes_sum: number
  day_drop_sum: number
  stakers_count: number
  my_percent: number | null
}