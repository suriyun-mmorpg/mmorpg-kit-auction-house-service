import fastify from 'fastify'
import * as fastifyPackage from 'fastify'
import authPlugin from 'fastify-auth'
import bearerAuthPlugin from 'fastify-bearer-auth'
import { PrismaClient as AuctionClient } from '../prisma/generated/auction-client'
import { PrismaClient as MailClient } from '../prisma/generated/mail-client'
import * as dotenv from 'dotenv'
import { CreateAuctionForm, BidForm, BuyoutForm } from './interfaces'
import { DateTime } from 'luxon'
import { nanoid } from 'nanoid'

const auctionClient = new AuctionClient()
const mailClient = new MailClient()
dotenv.config()

const secretKeys: string = process.env['SECRET_KEYS']!
const durationOptions: [] = JSON.parse(process.env['AUCTION_DURATION_OPTIONS']!)
const userAccessToken: { [id: string]: string } = {}
const accessingUserId: { [id: string]: string } = {}

const validateUserAccess = async (request: fastifyPackage.FastifyRequest, reply: fastifyPackage.FastifyReply, done: (err?: Error) => void) => {
    const header = request.headers.authorization!
    const key = header.substring("Bearer".length).trim()
    if (!Object.prototype.hasOwnProperty.call(userAccessToken, key)) {
        done(new Error('Wrong access token'))
        return
    }
    accessingUserId[request.id] = userAccessToken[key]
}

const server = fastify({ logger: true })
    .register(authPlugin)
    .register(bearerAuthPlugin, {
        keys: JSON.parse(secretKeys),
        addHook: false,
    })
    .after(() => {
        server.get('/', async (request, reply) => {
            const query: any = request.query
            const limit = Number(query.limit ? query.limit : 20)
            const page = Number(query.page ? query.page : 1)
            const list = await auctionClient.auction.findMany({
                where: {
                    isEnd: false
                },
                skip: (page - 1) * limit,
                take: limit,
            })
            const count = await auctionClient.auction.count({
                where: {
                    isEnd: false
                }
            })
            const totalPage = Math.ceil(count / limit);
            reply.code(200).send({
                list,
                limit,
                page,
                totalPage,
            })
        })

        server.get('/:id', async (request, reply) => {
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

        server.get('/sell-history', {
            preHandler: server.auth([
                validateUserAccess
            ]),
        }, async (request, reply) => {
            const query: any = request.query
            const limit = Number(query.limit ? query.limit : 20)
            const page = Number(query.page ? query.page : 1)
            const userId = accessingUserId[request.id]
            const list = await auctionClient.auction.findMany({
                where: {
                    isEnd: false,
                    sellerId: userId,
                },
                skip: (page - 1) * limit,
                take: limit,
            })
            const count = await auctionClient.auction.count({
                where: {
                    isEnd: false,
                    sellerId: userId,
                }
            })
            const totalPage = Math.ceil(count / limit);
            reply.code(200).send({
                list,
                limit,
                page,
                totalPage,
            })
            delete accessingUserId[request.id]
        })

        server.get('/buy-history', {
            preHandler: server.auth([
                validateUserAccess
            ]),
        }, async (request, reply) => {
            const query: any = request.query
            const limit = Number(query.limit ? query.limit : 20)
            const page = Number(query.page ? query.page : 1)
            const userId = accessingUserId[request.id]
            const list = await auctionClient.auction.findMany({
                where: {
                    isEnd: false,
                    buyerId: userId,
                },
                skip: (page - 1) * limit,
                take: limit,
            })
            const count = await auctionClient.auction.count({
                where: {
                    isEnd: false,
                    sellerId: userId,
                }
            })
            const totalPage = Math.ceil(count / limit);
            reply.code(200).send({
                list,
                limit,
                page,
                totalPage,
            })
            delete accessingUserId[request.id]
        })

        server.get('/duration-options', async (request, reply) => {
            reply.code(200).send({
                durationOptions: durationOptions
            })
        })

        server.get('/internal/access-token', {
            preHandler: server.auth([
                server.verifyBearerAuth!
            ]),
        }, async (request, reply) => {
            const query: any = request.query
            const userId = query.userId
            const accessToken = nanoid(6)
            userAccessToken[accessToken] = userId
            reply.code(200).send({
                userId: userId,
                accessToken: accessToken,
            })
        })

        server.post<{ Body: CreateAuctionForm }>('/internal/auction', {
            preHandler: server.auth([
                server.verifyBearerAuth!
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
                    metaName: form.metaName,
                    metaLevel: form.metaLevel,
                    endedAt: DateTime.local().plus({ hours: Number(durationOptions[form.durationOption]) }).toJSDate(),
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
                server.verifyBearerAuth!
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
                server.verifyBearerAuth!
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