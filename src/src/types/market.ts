export interface OrdersCountDto {
    count: number
    subject: 'golds' | 'golds_stamp'
}

interface RankType {
    id: number,
    points_level_receiving: number,
    name: string,
    description: string,
    rank_reward: {
        coins: number,
        golds: number,
        points: number,
        coin_skin: string,
        click_multiplier: number,
        functionality: [
            string
        ]
    },
    referrer_rank_reward: {
        coins: number,
        golds: number,
        points: number,
        coin_skin: string,
        click_multiplier: number,
        functionality: [
            string
        ]
    }
}

interface PersonType {
    created_at: string,
    first_name: string,
    last_name: string,
    avatar_path: string,
    rank: RankType,
    is_channel_verified: boolean,
    is_email_verified: boolean
}


export interface OrderType {
    id: number,
    subject: string,
    price: number,
    start_volume: number,
    volume: number,
    status: string,
    seller: PersonType
    created_at: string
}
export interface DealsType  {
    id: number,
    ad: {
        id: number,
        subject: string,
        price: number,
        start_volume: number,
        volume: number,
        status: string,
        seller: PersonType
        created_at: string
    },
    buyer: PersonType
    volume: number
    created_at: string
}

export interface OrderDto {
    data: OrderType[],
    pages_count: number,
    current_page: number
}

export interface DealsDto {
    data: DealsType[],
    pages_count: number,
    current_page: number
}