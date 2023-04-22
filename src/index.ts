import fastify, { FastifyListenOptions } from 'fastify'
import authPlugin from '@fastify/auth'
import bearerAuthPlugin from '@fastify/bearer-auth'
import { PrismaClient as AuctionClient } from '../prisma/generated/auction-client'
import { PrismaClient as MailClient } from '../prisma/generated/mail-client'
import * as dotenv from 'dotenv'
import { nanoid } from 'nanoid'
import { CreateAuctionForm, BidForm, BuyoutForm, CancelAuctionForm, AuctionConfig } from './interfaces'
import { AuctionService } from './functions'

dotenv.config()
const secretKeys: string = process.env['SECRET_KEYS']!
const auctionConfig = require('../auction-conf.json') as AuctionConfig
const auctionClient = new AuctionClient()
const mailClient = new MailClient()
const userAccessToken: { [id: string]: string } = {}

const validateUserAccess = async(request: any, reply: any, done: (err?: Error) => void) =>
{
    const header = request.headers.authorization!
    const key = header.substring("Bearer".length).trim()
    if (!Object.prototype.hasOwnProperty.call(userAccessToken, key)) {
        done(new Error('Wrong access token'))
        return
    }
    request.userId = userAccessToken[key]
}
const functions = new AuctionService(auctionConfig, auctionClient, mailClient)
const server = fastify({ logger: true })
    .register(authPlugin)
    .register(bearerAuthPlugin, {
        keys: JSON.parse(secretKeys),
        addHook: false,
    })
    .after(() => {
        server.get('/', functions.getListApi.bind(functions))

        server.get('/:id', functions.getEntryApi.bind(functions))

        server.get('/sell-history', {
            preHandler: server.auth([
                validateUserAccess
            ]),
        }, functions.getSellHistoryApi.bind(functions))

        server.get('/buy-history', {
            preHandler: server.auth([
                validateUserAccess
            ]),
        }, functions.getBuyHistoryApi.bind(functions))

        server.get('/duration-options', functions.getDurationOptionsApi.bind(functions))

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
        }, functions.postAuctionApi.bind(functions))

        server.post<{ Body: CancelAuctionForm }>('/internal/cancel-auction', {
            preHandler: server.auth([
                server.verifyBearerAuth!
            ]),
        }, functions.postCancelAuctionApi.bind(functions))

        server.post<{ Body: BidForm }>('/internal/bid', {
            preHandler: server.auth([
                server.verifyBearerAuth!
            ]),
        }, functions.postBidApi.bind(functions))

        server.post<{ Body: BuyoutForm }>('/internal/buyout', {
            preHandler: server.auth([
                server.verifyBearerAuth!
            ]),
        }, functions.postBuyoutApi.bind(functions))
    })


const options: FastifyListenOptions = {
    host: String(process.env['ADDRESS']),
    port: Number(process.env['PORT']),
}
server.listen(options, (err, address) => {
    if (err) {
        console.error(err)
        process.exit(1)
    }
    console.log(`Server listening at ${address}`)
    functions.auctionUpdateLoopInitialze.bind(functions)()
})