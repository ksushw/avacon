export interface AppsResponse {
  data: IApp[]
  pages_count: number
  current_page: number
}

export interface AppsCategoryResponse {
  data: IApp[]
  pages_count: number
  current_page: number
}

export interface IAppsCategory {
  count: number
  name: string
  type: string
  apps: IApp[]
}

export interface IApp {
  id: number
  name: string
  image_url: string
  description: string
  short_description: string
  url: string
  type: string
  gamers_count: number
  is_verified: boolean
  is_listed: boolean
  with_drop: boolean
  created_at: boolean
  socials: IAppSocial[]
}

export interface IAppSocial {
  subscribers_count: number
  type: string
  utl: string
}