import OracleProvider from './OracleProvider.js'
import debug from 'debug'
import dotenv from 'dotenv'

const log = debug('oracle:provider:cryptowatch')

export default class Cryptowatch extends OracleProvider {
  constructor () {
    super()

    log('Hi')

    dotenv.config()
  }

  async get () {
    try {
      const auth = typeof process.env.CRYPTOWATCH_APIKEY === 'string'
        ? `?apikey=${process.env.CRYPTOWATCH_APIKEY}`
        : ''
      const data = await this.getJSON(`https://api.cryptowat.ch/markets/kraken/xrpusd/price${auth}`)
      const XrpUsd = Number(data.result.price) || undefined
      log(`Calling, result: ${XrpUsd}`)
      return XrpUsd
    } catch (e) {
      log('Error', e.message)
      return undefined
    }
  }
}
