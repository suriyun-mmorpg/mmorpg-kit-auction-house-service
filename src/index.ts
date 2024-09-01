import fastify, { FastifyListenOptions } from 'fastify'
import authPlugin from '@fastify/auth'
import * as dotenv from 'dotenv'
import { PrismaClient as AuctionClient } from '../prisma/generated/auction-client'
import { PrismaClient as MailClient } from '../prisma/generated/mail-client'
import { CreateAuctionForm, BidForm, BuyoutForm, CancelAuctionForm, AuctionConfig } from './interfaces'
import { AuctionService } from './functions'

dotenv.config()
const secretKeys: string = process.env.SECRET_KEYS ? process.env.SECRET_KEYS : "[\"secret\"]"
const auctionConfig = require('../auction-conf.json') as AuctionConfig
const auctionClient = new AuctionClient()
const mailClient = new MailClient()

const validateUserAccess = async(request: any, reply: any, done: (err?: Error) => void) =>
{
    const header = request.headers.authorization!
    const key = header.substring("Bearer".length).trim()
    const str = atob(key);
    const splitedStr = str.split('_')
    if (splitedStr.length <= 0) {
        done(new Error('Invalid access token'))
        return
    }
    // TODO: May validate with database
    request.userId = splitedStr[0]
}

const validateAppAccess = async(request: any, reply: any, done: (err?: Error) => void) =>
{
    const header = request.headers['x-api-key']!
    if (!header) {
        done(new Error('No secret key'))
        return
    }
    const keys = JSON.parse(secretKeys)
    if (keys.indexOf(header) < 0) {
        done(new Error('Invalid secret key'))
        return
    }
}

const functions = new AuctionService(auctionConfig, auctionClient, mailClient)
const server = fastify({ logger: true })
    .register(authPlugin)
    .after(() => {
        server.get('/', functions.getListApi)

        server.get('/:id', functions.getEntryApi)

        server.get('/sell-history', {
            preHandler: server.auth([
                validateUserAccess
            ]),
        }, functions.getSellHistoryApi)

        server.get('/buy-history', {
            preHandler: server.auth([
                validateUserAccess
            ]),
        }, functions.getBuyHistoryApi)

        server.get('/duration-options', functions.getDurationOptionsApi)

        server.post<{ Body: CreateAuctionForm }>('/internal/auction', {
            preHandler: server.auth([
                validateAppAccess
            ]),
        }, functions.postAuctionApi)

        server.post<{ Body: CancelAuctionForm }>('/internal/cancel-auction', {
            preHandler: server.auth([
                validateAppAccess
            ]),
        }, functions.postCancelAuctionApi)

        server.post<{ Body: BidForm }>('/internal/bid', {
            preHandler: server.auth([
                validateAppAccess
            ]),
        }, functions.postBidApi)

        server.post<{ Body: BuyoutForm }>('/internal/buyout', {
            preHandler: server.auth([
                validateAppAccess
            ]),
        }, functions.postBuyoutApi)
    })


const options: FastifyListenOptions = {
    host: String(process.env.ADDRESS ? process.env.ADDRESS : "0.0.0.0"),
    port: Number(process.env.PORT ? process.env.PORT : 80),
}
server.listen(options, (err, address) => {
    if (err) {
        console.error(err)
        process.exit(1)
    }
    console.log(`Server listening at ${address}`)
    functions.auctionUpdateLoopInitialze()
})