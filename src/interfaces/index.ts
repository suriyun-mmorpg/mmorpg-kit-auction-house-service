export interface CreateAuctionForm {
    itemData: string,
    metaName: string,
    metaLevel: number,
    startPrice: number,
    buyoutPrice: number,
    sellerId: string,
    sellerName: string,
    durationOption: number,
}

export interface CancelAuctionForm {
    userId: string,
    id: number,
}

export interface BidForm {
    userId: string,
    characterName: string,
    id: number,
    price: number,
}

export interface CancelBidForm {
    userId: string,
    id: number,
}

export interface BuyoutForm {
    userId: string,
    characterName: string,
    id: number,
}

export interface AuctionOption {
    hours: number,
    price: number,
}

export interface AuctionConfig {
    mail_sender_id: string,
    mail_sender_name: string,
    mail_bought_title: string,
    mail_bought_content: string,
    mail_sold_title: string,
    mail_sold_content: string,
    mail_bid_currency_return_title: string,
    mail_bid_currency_return_content: string,
    mail_auction_cancelled_title: string,
    mail_auction_cancelled_content: string,
    auction_options: AuctionOption[],
}