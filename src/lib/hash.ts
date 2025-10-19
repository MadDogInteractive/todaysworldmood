import { createHash } from 'crypto'

export function hashIpForDay(ip: string, dayISO: string, secret: string) {
  return createHash('sha256').update(`${ip}|${dayISO}|${secret}`).digest('hex')
}
