import fastify from 'fastify'
import authPlugin from 'fastify-auth'
import { PrismaClient } from '@prisma/client'
import * as dotenv from 'dotenv'
import { DateTime } from 'luxon';

const prisma = new PrismaClient()
dotenv.config()

const server = fastify()
    .register(authPlugin)
    .after(() => {
        server.get('/', {
            preHandler: server.auth([

            ]),
        }, async (request, reply) => {
            
        })

        server.get('/:id', {
            preHandler: server.auth([

            ]),
        }, async (request, reply) => {
            
        })

        server.get('/history', {
            preHandler: server.auth([

            ]),
        }, async (request, reply) => {
            
        })

        server.post('/internal/auction', {
            preHandler: server.auth([
                
            ]),
        }, async (request, reply) => {
            
        })

        server.post('/internal/bid', {
            preHandler: server.auth([
                
            ]),
        }, async (request, reply) => {
            
        })

        server.post('/internal/buyout', {
            preHandler: server.auth([
                
            ]),
        }, async (request, reply) => {
            
        })
    })


server.listen(Number(process.env['PORT']), String(process.env['ADDRESS']), (err, address) => {
    if (err) {
        console.error(err)
        process.exit(1)
    }
    console.log(`Server listening at ${address}`)
})