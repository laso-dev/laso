import { PrismaClient } from '../../generated/prisma'

declare global {
  // Avoid multiple instances when hot-reloading
  var prismaClient: PrismaClient
}

globalThis.prismaClient ??= new PrismaClient()

export const prisma = globalThis.prismaClient
