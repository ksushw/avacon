export interface ITask {
  id: number
  name: string
  image_url: string
  description: string
  reward: number
  reward_subject: string
  is_completed: boolean
  handler_kwargs: {
    external_link: string
  }
}

export interface IQuest {
  id: number
  name: string
  image_url: string
  description: string
  short_description: string
  begin_at: string | null
  tasks?: ITask[]
}