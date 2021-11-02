import fastify from 'fastify'
import authPlugin from 'fastify-auth'
import { PrismaClient as AuctionClient } from './prisma/generated/auction-client'
import { PrismaClient as MailClient } from './prisma/generated/mail-client'
import * as dotenv from 'dotenv'
import { CreateAuctionForm, BidForm, BuyoutForm } from './interfaces'
import { DateTime } from 'luxon';

const auctionClient = new AuctionClient()
const mailClient = new MailClient()
dotenv.config()

const server = fastify()
    .register(authPlugin)
    .after(() => {
        server.get('/', {
            preHandler: server.auth([

            ]),
        }, async (request, reply) => {
            const query: any = request.query
            const limit = query.limit ? query.limit : 20
            const page = query.page ? query.page : 1
            const list = await auctionClient.auction.findMany({
                where: {
                    isEnd: false
                },
                skip: (page - 1) * limit,
                take: limit,
            })
            reply.code(200).send({
                list,
                limit,
                page,
            })
        })

        server.get('/:id', {
            preHandler: server.auth([

            ]),
        }, async (request, reply) => {
            const params: any = request.params
            const id = params.id
            const auction: any = await auctionClient.auction.findUnique({
                where: {
                    id: id
                }
            })
            if (!auction) {
                reply.code(400)
                return
            }
            reply.code(200).send(auction)
        })

        server.get('/history', {
            preHandler: server.auth([

            ]),
        }, async (request, reply) => {
            const query: any = request.query
            const limit = query.limit ? query.limit : 20
            const page = query.page ? query.page : 1
            const userId = "" // TODO: Implement this
            const list = await auctionClient.auction.findMany({
                where: {
                    isEnd: false,
                    sellerId: userId,
                },
                skip: (page - 1) * limit,
                take: limit,
            })
            reply.code(200).send({
                list,
                limit,
                page,
            })
        })

        server.post<{ Body: CreateAuctionForm }>('/internal/auction', {
            preHandler: server.auth([
                
            ]),
        }, async (request, reply) => {
            const form: CreateAuctionForm = request.body
            const newAuction = await auctionClient.auction.create({
                data: {
                    buyoutPrice: form.buyoutPrice,
                    bidPrice: form.startPrice,
                    startBidPrice: form.startPrice,
                    sellerId: form.sellerId,
                    sellerName: form.sellerName,
                    itemData: form.itemData,
                    // Set ended at value
                }
            })
            if (!newAuction) {
                reply.code(500)
                return
            }
            addUpdatingAuction(newAuction)
            reply.code(200)
        })

        server.post<{ Body: BidForm }>('/internal/bid', {
            preHandler: server.auth([
                
            ]),
        }, async (request, reply) => {
            const form: BidForm = request.body
            const auction: any = await auctionClient.auction.findUnique({
                where: {
                    id: form.id
                }
            })
            if (!auction) {
                reply.code(400)
                return
            }
            const returnBuyerId = auction.buyerId;
            const returnCurrency = auction.bidPrice
            const updateResult = await auctionClient.auction.updateMany({
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
                reply.code(500)
                return
            }
            await returnGold(returnBuyerId, returnCurrency)
            reply.code(200)
        })

        server.post<{ Body: BuyoutForm }>('/internal/buyout', {
            preHandler: server.auth([
                
            ]),
        }, async (request, reply) => {
            const form: BuyoutForm = request.body
            const auction: any = await auctionClient.auction.findUnique({
                where: {
                    id: form.id
                }
            })
            if (!auction) {
                reply.code(400)
                return
            }
            const returnBuyerId = auction.buyerId;
            const returnCurrency = auction.bidPrice
            const updateResult = await auctionClient.auction.updateMany({
                where: {
                    id: form.id,
                    isEnd: false,
                },
                data: {
                    buyerId: form.userId,
                    buyerName: form.characterName,
                    isBuyout: true,
                    isEnd: true,
                    endedAt: DateTime.local().toJSDate(),
                }
            })
            if (updateResult.count === 0) {
                reply.code(500)
                return
            }
            await sendItem(form.id)
            await returnGold(returnBuyerId, returnCurrency)
            reply.code(200)
        })
    })

const updatingAuctions: { [id: number] : any } = {}

const auctionUpdateLoopInitialze = async () => {
    const auctions = await auctionClient.auction.findMany({
        where: {
            isEnd: false,
        }
    })
    auctions.forEach(auction => {
        addUpdatingAuction(auction)
    });
    auctionUpdateLoop()
}

const auctionUpdateLoop = () => {
    setTimeout(auctionUpdateLoop, 5000)
    // Loop to update auction ending
    const currentDate = DateTime.local().toJSDate()
    const currentMilliseconds = currentDate.getMilliseconds()
    for (const id in updatingAuctions) {
        if (!Object.prototype.hasOwnProperty.call(updatingAuctions, id)) {
            continue
        }
        const updatingAuction = updatingAuctions[id];
        if (currentMilliseconds > updatingAuction.endedAt) {
            // Auction ended
            auctionClient.auction.updateMany({
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
                sendItem(Number(id))
            })
            delete updatingAuctions[id]
        }
    }
}

const addUpdatingAuction = (auction: any) => {
    updatingAuctions[auction.id] = auction
}

const sendItem = async (id: number) => {
    const auction = await auctionClient.auction.findUnique({
        where: {
            id: id
        }
    })
    if (!auction) {
        return
    }
    await mailClient.mail.create({
        data: {
            eventId: "",
            senderId: process.env['MAIL_SENDER_ID']!,
            senderName: process.env['MAIL_SENDER_NAME']!,
            receiverId: auction.buyerId,
            title: process.env['MAIL_BOUGHT_TITLE']!,
            content: process.env['MAIL_BOUGHT_CONTENT']!,
            currencies: "",
            items: auction.itemData,
        }
    })
    await mailClient.mail.create({
        data: {
            eventId: "",
            senderId: process.env['MAIL_SENDER_ID']!,
            senderName: process.env['MAIL_SENDER_NAME']!,
            receiverId: auction.sellerId,
            title: process.env['MAIL_SOLD_TITLE']!,
            content: process.env['MAIL_SOLD_CONTENT']!,
            currencies: "",
            items: auction.itemData,
        }
    })
}

const returnGold = async (userId: string, gold: number) => {
    await mailClient.mail.create({
        data: {
            eventId: "",
            senderId: process.env['MAIL_SENDER_ID']!,
            senderName: process.env['MAIL_SENDER_NAME']!,
            receiverId: userId,
            title: process.env['MAIL_BID_CURRENCY_RETURN_TITLE']!,
            content: process.env['MAIL_BID_CURRENCY_RETURN_CONTENT']!,
            currencies: "",
            items: "",
            gold: gold,
        }
    })
}

server.listen(Number(process.env['PORT']), String(process.env['ADDRESS']), (err, address) => {
    if (err) {
        console.error(err)
        process.exit(1)
    }
    console.log(`Server listening at ${address}`)
    auctionUpdateLoopInitialze()
})