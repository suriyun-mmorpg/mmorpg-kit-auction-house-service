import { FastifyRequest, FastifyReply } from 'fastify'
import { PrismaClient as AuctionClient } from '../../prisma/generated/auction-client'
import { PrismaClient as MailClient } from '../../prisma/generated/mail-client'
import { CreateAuctionForm, BidForm, BuyoutForm, CancelAuctionForm, AuctionConfig } from '../interfaces'
import { DateTime } from 'luxon'

export class AuctionService {
    auctionConfig: AuctionConfig
    auctionClient: AuctionClient;
    mailClient: MailClient;
    updatingAuctions: { [id: number] : any } = {}
    
    constructor(auctionConfig: AuctionConfig, auctionClient: AuctionClient, mailClient: MailClient)
    {
        this.auctionConfig = auctionConfig
        this.auctionClient = auctionClient
        this.mailClient = mailClient
    }

    public async auctionUpdateLoopInitialze()
    {
        const auctions = await this.auctionClient.auction.findMany({
            where: {
                isEnd: false,
            }
        })
        auctions.forEach(auction => {
            this.addUpdatingAuction.bind(this)(auction)
        });
        this.auctionUpdateLoop.bind(this)()
        setInterval(this.auctionUpdateLoop.bind(this), 5000)
    }

    private auctionUpdateLoop()
    {
        // Loop to update auction ending
        const currentDate = DateTime.local().toJSDate()
        for (const id in this.updatingAuctions) {
            if (!Object.prototype.hasOwnProperty.call(this.updatingAuctions, id)) {
                continue
            }
            const updatingAuction = this.updatingAuctions[id];
            if (currentDate > updatingAuction.endedAt) {
                // Auction ended
                this.auctionClient.auction.updateMany({
                    where: {
                        id: Number(id),
                        isEnd: false,
                    },
                    data: {
                        isEnd: true,
                        endedAt: currentDate,
                    }
                }).then((result) => {
                    if (result.count === 0) {
                        return
                    }
                    this.sendItem.bind(this)(Number(id))
                })
                delete this.updatingAuctions[id]
            }
        }
    }

    private addUpdatingAuction(auction: any)
    {
        this.updatingAuctions[auction.id] = auction
    }

    public async getListApi(request: FastifyRequest, reply: FastifyReply)
    {
        const query: any = request.query
        const limit = Number(query.limit ? query.limit : 20)
        const page = Number(query.page ? query.page : 1)
        const list: any[] = await this.auctionClient.auction.findMany({
            where: {
                isEnd: false
            },
            skip: (page - 1) * limit,
            take: limit,
        })
        const count = await this.auctionClient.auction.count({
            where: {
                isEnd: false
            }
        })
        for (let i = 0; i < list.length; ++i) {
            list[i].timeLeft = this.findTimeLeft.bind(this)(DateTime.fromJSDate(list[i].endedAt).toLocal())
        }
        const totalPage = Math.ceil(count / limit);
        reply.code(200).send({
            list,
            limit,
            page,
            totalPage,
        })
    }

    public async getEntryApi(request: FastifyRequest, reply: FastifyReply)
    {
        const params: any = request.params
        const id = Number(params.id)
        const auction: any = await this.auctionClient.auction.findUnique({
            where: {
                id: id
            }
        })
        if (!auction) {
            reply.code(400).send()
            return
        }
        auction.timeLeft = this.findTimeLeft.bind(this)(DateTime.fromJSDate(auction.endedAt).toLocal())
        reply.code(200).send(auction)
    }

    public async getSellHistoryApi(request: any, reply: FastifyReply)
    {
        const query: any = request.query
        const limit = Number(query.limit ? query.limit : 20)
        const page = Number(query.page ? query.page : 1)
        const userId = request.userId
        const list: any[] = await this.auctionClient.auction.findMany({
            where: {
                sellerId: userId,
            },
            skip: (page - 1) * limit,
            take: limit,
        })
        const count = await this.auctionClient.auction.count({
            where: {
                sellerId: userId,
            }
        })
        for (let i = 0; i < list.length; ++i) {
            list[i].timeLeft = this.findTimeLeft.bind(this)(DateTime.fromJSDate(list[i].endedAt).toLocal())
        }
        const totalPage = Math.ceil(count / limit);
        reply.code(200).send({
            list,
            limit,
            page,
            totalPage,
        })
    }

    public async getBuyHistoryApi(request: any, reply: FastifyReply)
    {
        const query: any = request.query
        const limit = Number(query.limit ? query.limit : 20)
        const page = Number(query.page ? query.page : 1)
        const userId = request.userId
        const list: any[] = await this.auctionClient.auction.findMany({
            where: {
                buyerId: userId,
            },
            skip: (page - 1) * limit,
            take: limit,
        })
        const count = await this.auctionClient.auction.count({
            where: {
                sellerId: userId,
            }
        })
        for (let i = 0; i < list.length; ++i) {
            list[i].timeLeft = this.findTimeLeft.bind(this)(DateTime.fromJSDate(list[i].endedAt).toLocal())
        }
        const totalPage = Math.ceil(count / limit);
        reply.code(200).send({
            list,
            limit,
            page,
            totalPage,
        })
    }

    public async getDurationOptionsApi(request: FastifyRequest, reply: FastifyReply)
    {
        reply.code(200).send({
            durationOptions: this.auctionConfig.auction_options
        })
    }
    
    public async postAuctionApi(request: FastifyRequest, reply: FastifyReply)
    {
        const form: CreateAuctionForm = request.body as CreateAuctionForm
        const newAuction = await this.auctionClient.auction.create({
            data: {
                buyoutPrice: form.buyoutPrice,
                bidPrice: form.startPrice,
                startBidPrice: form.startPrice,
                sellerId: form.sellerId,
                sellerName: form.sellerName,
                itemData: form.itemData,
                metaName: form.metaName,
                metaLevel: form.metaLevel,
                endedAt: DateTime.local().plus({ hours: this.auctionConfig.auction_options[form.durationOption].hours }).toJSDate(),
            }
        })
        if (!newAuction) {
            reply.code(500).send()
            return
        }
        this.addUpdatingAuction.bind(this)(newAuction)
        reply.code(200).send()
    }

    public async postCancelAuctionApi(request: FastifyRequest, reply: FastifyReply)
    {
        const form: CancelAuctionForm = request.body as CancelAuctionForm
        const auction: any = await this.auctionClient.auction.findUnique({
            where: {
                id: form.id
            }
        })
        if (!auction) {
            // No auction data
            reply.code(404).send()
            return
        }
        if (auction.isEnd) {
            // Auction ended
            reply.code(403).send()
            return;
        }
        if (form.userId != auction.sellerId) {
            // Non-seller cannot cancel
            reply.code(403).send()
            return;
        }
        if (auction.buyerId) {
            // Don't allow to cancel if it has someone make a bid
            reply.code(403).send()
            return;
        }
        const updateResult = await this.auctionClient.auction.updateMany({
            where: {
                id: form.id,
                isEnd: false,
            },
            data: {
                isBuyout: false,
                isEnd: true,
                endedAt: DateTime.local().toJSDate(),
            }
        })
        if (updateResult.count === 0) {
            reply.code(500).send()
            return
        }
        await this.sendItemForCancelledSeller.bind(this)(form.id)
        reply.code(200).send()
    }

    public async postBidApi(request: FastifyRequest, reply: FastifyReply)
    {
        const form: BidForm = request.body as BidForm
        const auction = await this.auctionClient.auction.findUnique({
            where: {
                id: form.id
            }
        })
        if (!auction) {
            // No auction data
            reply.code(404).send()
            return
        }
        if (auction.isEnd) {
            // Auction ended
            reply.code(403).send()
            return;
        }
        if (form.userId == auction.sellerId) {
            // Seller cannot bid
            reply.code(403).send()
            return;
        }
        if (form.userId == auction.buyerId) {
            // Bidder cannot over bid themself
            reply.code(403).send()
            return;
        }
        if (form.price <= auction.bidPrice) {
            // Cannot bid
            reply.code(400).send()
            return;
        }
        if (auction.buyoutPrice > 0 && form.price >= auction.buyoutPrice) {
            // Cannot bid
            reply.code(400).send()
            return;
        }
        const returnBuyerId = auction.buyerId
        const returnCurrency = auction.bidPrice
        const updateResult = await this.auctionClient.auction.updateMany({
            where: {
                id: form.id,
                bidPrice: {
                    lt: form.price,
                },
                isEnd: false,
            },
            data: {
                bidPrice: form.price,
                buyerId: form.userId,
                buyerName: form.characterName
            }
        })
        if (updateResult.count === 0) {
            reply.code(500).send()
            return
        }
        this.auctionClient.auction_bid_logs.create({
            data: {
                auctionId: form.id,
                buyerId: form.userId,
                buyerName: form.characterName,
                bidPrice: form.price,
                isBuyout: false
            }
        })
        await this.returnGold.bind(this)(returnBuyerId, returnCurrency)
        reply.code(200).send()
    }

    public async postBuyoutApi(request: FastifyRequest, reply: FastifyReply)
    {
        const form: BuyoutForm = request.body as BuyoutForm
        const auction: any = await this.auctionClient.auction.findUnique({
            where: {
                id: form.id
            }
        })
        if (!auction) {
            // No auction data
            reply.code(404).send()
            return
        }
        if (auction.isEnd) {
            // Auction ended
            reply.code(403).send()
            return;
        }
        if (form.userId == auction.sellerId) {
            // Seller cannot buy
            reply.code(403).send()
            return;
        }
        if (auction.buyoutPrice <= 0) {
            // Cannot buy
            reply.code(403).send()
            return;
        }
        const returnBuyerId = auction.buyerId;
        const returnCurrency = auction.bidPrice
        const updateResult = await this.auctionClient.auction.updateMany({
            where: {
                id: form.id,
                isEnd: false,
            },
            data: {
                buyerId: form.userId,
                buyerName: form.characterName,
                bidPrice: auction.buyoutPrice,
                isBuyout: true,
                isEnd: true,
                endedAt: DateTime.local().toJSDate(),
            }
        })
        if (updateResult.count === 0) {
            reply.code(500).send()
            return
        }
        await this.sendItemForBuyout.bind(this)(form.id)
        this.auctionClient.auction_bid_logs.create({
            data: {
                auctionId: form.id,
                buyerId: form.userId,
                buyerName: form.characterName,
                bidPrice: auction.buyoutPrice,
                isBuyout: true
            }
        })
        await this.returnGold.bind(this)(returnBuyerId, returnCurrency)
        reply.code(200).send()
    }

    private findTimeLeft(endedAt: DateTime): number
    {
        const currentTime = DateTime.local()
        const diff = endedAt.diff(currentTime, ["milliseconds"])
        return Number(diff.toObject()['milliseconds'])
    }

    private async sendItem(id: number)
    {
        const auction = await this.auctionClient.auction.findUnique({
            where: {
                id: id
            }
        })
        if (!auction) {
            return
        }
        if (!auction.buyerId || auction.buyerId.length == 0)
        {
            // Send item to seller
            await this.mailClient.mail.create({
                data: {
                    eventId: "",
                    senderId: this.auctionConfig.mail_sender_id,
                    senderName: this.auctionConfig.mail_sender_name,
                    receiverId: auction.sellerId,
                    title: this.auctionConfig.mail_sold_title,
                    content: this.auctionConfig.mail_sold_content,
                    currencies: "",
                    items: auction.itemData,
                    gold: 0,
                }
            })
        }
        else
        {
            // Send item to buyer
            await this.mailClient.mail.create({
                data: {
                    eventId: "",
                    senderId: this.auctionConfig.mail_sender_id,
                    senderName: this.auctionConfig.mail_sender_name,
                    receiverId:  auction.buyerId,
                    title: this.auctionConfig.mail_bought_title,
                    content: this.auctionConfig.mail_bought_content,
                    currencies: "",
                    items: auction.itemData,
                    gold: 0,
                }
            })
            // Send gold to seller
            await this.mailClient.mail.create({
                data: {
                    eventId: "",
                    senderId: this.auctionConfig.mail_sender_id,
                    senderName: this.auctionConfig.mail_sender_name,
                    receiverId: auction.sellerId,
                    title: this.auctionConfig.mail_sold_title,
                    content: this.auctionConfig.mail_sold_content,
                    currencies: "",
                    items: "",
                    gold: auction.bidPrice,
                }
            })
        }
    }

    private async sendItemForCancelledSeller(id: number)
    {
        const auction = await this.auctionClient.auction.findUnique({
            where: {
                id: id
            }
        })
        if (!auction) {
            return
        }
        // Send item to seller
        await this.mailClient.mail.create({
            data: {
                eventId: "",
                senderId: this.auctionConfig.mail_sender_id,
                senderName: this.auctionConfig.mail_sender_name,
                receiverId:  auction.sellerId,
                title: this.auctionConfig.mail_auction_cancelled_title,
                content: this.auctionConfig.mail_auction_cancelled_content,
                currencies: "",
                items: auction.itemData,
                gold: 0,
            }
        })
    }

    private async sendItemForBuyout(id: number)
    {
        const auction = await this.auctionClient.auction.findUnique({
            where: {
                id: id
            }
        })
        if (!auction) {
            return
        }
        // Send item to buyer
        await this.mailClient.mail.create({
            data: {
                eventId: "",
                senderId: this.auctionConfig.mail_sender_id,
                senderName: this.auctionConfig.mail_sender_name,
                receiverId:  auction.buyerId,
                title: this.auctionConfig.mail_bought_title,
                content: this.auctionConfig.mail_bought_content,
                currencies: "",
                items: auction.itemData,
                gold: 0,
            }
        })
        // Send gold to seller
        await this.mailClient.mail.create({
            data: {
                eventId: "",
                senderId: this.auctionConfig.mail_sender_id,
                senderName: this.auctionConfig.mail_sender_name,
                receiverId: auction.sellerId,
                title: this.auctionConfig.mail_sold_title,
                content: this.auctionConfig.mail_sold_content,
                currencies: "",
                items: "",
                gold: auction.buyoutPrice,
            }
        })
    }

    private async returnGold(userId: string, gold: number)
    {
        if (!userId || userId.length == 0) {
            return
        }
        await this.mailClient.mail.create({
            data: {
                eventId: "",
                senderId: this.auctionConfig.mail_sender_id,
                senderName: this.auctionConfig.mail_sender_name,
                receiverId: userId,
                title: this.auctionConfig.mail_bid_currency_return_title,
                content: this.auctionConfig.mail_bid_currency_return_content,
                currencies: "",
                items: "",
                gold: gold,
            }
        })
    }
}