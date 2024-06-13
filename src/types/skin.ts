export interface ISkin {
  id: number
  name: string
  description?: string
  big_description?: string

  background_color_hex: string

  price: number
  price_subject: 'usdt' | 'coins_legit'

  soon?: boolean
  new?: boolean
}

export interface ISelectedSkin {
  coin_skin: ISkin
  id: number
}
