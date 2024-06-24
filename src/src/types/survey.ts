interface IPoint {
    id: number,
    title: string,
    is_completed: boolean
}

export interface ISurvey {
    id: number,
    name: string,
    image_url: string,
    description: string,
    short_description: string,
    begin_at: string,
    end_at: string,
    points: IPoint[]
}