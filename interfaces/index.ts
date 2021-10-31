export interface CreateAuctionForm {
    itemDataId: number,
    itemLevel: number,
    itemAmount: number,
    itemDurability: number,
    itemExp: number,
    itemLockRemainsDuration: number,
    itemExpireTime: number,
    itemRandomSeed: number,
    itemSockets: string,
    startPrice: number,
    buyoutPrice: number,
    sellerId: string,
    sellerName: string,
}

export interface BidForm {
    characterId: string,
    characterName: string,
    id: number,
    price: number,
}

export interface BuyoutForm {
    characterId: string,
    characterName: string,
    id: number,
}