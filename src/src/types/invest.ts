
export interface IInvest {
  id: number
  name: string
  price: number
  invest_license: IInvestLicense
  profit: number
  profit_rate: number
  month_profit: number
  volume_mine: number
  buyed_at: string | null
  image_url: string | null
  current_profit: number
}

export interface IInvestLicense {
  id: number
  name: string
  price: number
}

export interface IAvailableInvestment {
  available_until: string
  invest_license: {
    id: number
    name: string
    price: number
    image_url: string | null
  }
}