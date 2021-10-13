import OracleProvider from './OracleProvider.js'
import debug from 'debug'

const log = debug('oracle:provider:binance')

export default class Binance extends OracleProvider {
  constructor () {
    super()
    log('Hi')
  }

  async get () {
    try {
      const data = await this.getJSON('https://api.binance.com/api/v3/ticker/price?symbol=XRPUSDT')
      const XrpUsd = Number(data?.price) || undefined
      log(`Calling, result: ${XrpUsd}`)
      return XrpUsd
    } catch (e) {
      log('Error', e.message)
      return undefined
    }
  }
}
