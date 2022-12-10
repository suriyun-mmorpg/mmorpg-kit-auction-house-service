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