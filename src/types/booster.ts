export interface IBooster {
  id: number
  name: string
  description: string
  type: string
  seconds_availability_period: number
  price: number
}

export interface IAvailableBooster {
  id: number
  booster_id: number
  available_until: string
  last_activated_at: string
  is_today_activated: boolean
}