export interface CreateAuctionForm {
    itemDataId: Number,
    itemLevel: Number,
    itemAmount: Number,
    itemDurability: Number,
    itemExp: Number,
    itemLockRemainsDuration: Number,
    itemExpireTime: Number,
    itemRandomSeed: Number,
    itemSockets: String,
    startPrice: Number,
    buyoutPrice: Number,
    sellerId: String,
    sellerName: String,
}

export interface BidForm {
    id: Number,
    price: Number,
}

export interface BuyoutForm {
    id: Number,
}