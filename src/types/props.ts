import type { Component } from 'vue'

export interface AvaTabProps {
  title: string
  value: string | boolean | number
  disabled?: boolean
  soon?: boolean
}

export interface NotifyItem {
  message: string
  type: 'info' | 'danger' | 'warning'
  date?: number
}

export interface IListItem {
  avatar: string
  firstName: string
  lastName: string
  points: number | string
  reward?: number | string
  id?: number
  level?: string
  place?: number
  clickable?: boolean
  soon?: boolean
  new?: boolean
  usdtRefReward?: number
  position?: number
  link?: string
  isVerified?: boolean
  infoText?: string
  type?: string
}

export type ButtonType = 'primary' | 'warning' | 'info'

export interface ProfileItem {
  title: string | number
  subtitle: string
  icon: Component
  link: string
  additionalText?: string | number
  loading?: boolean
  soon?: boolean
}

export interface ItemHistoryProps {
  quantity: string
  price: string | number
  date: string
  status: string
  statusTitle?: string
  icon: string
  id: number
}
