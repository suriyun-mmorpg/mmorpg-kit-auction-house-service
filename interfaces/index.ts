export interface CreateAuctionForm {
    itemData: string,
    startPrice: number,
    buyoutPrice: number,
    sellerId: string,
    sellerName: string,
}

export interface BidForm {
    userId: string,
    characterName: string,
    id: number,
    price: number,
}

export interface BuyoutForm {
    userId: string,
    characterName: string,
    id: number,
}