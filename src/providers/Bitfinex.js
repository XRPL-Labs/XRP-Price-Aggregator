import OracleProvider from './OracleProvider.js'
import debug from 'debug'

const log = debug('oracle:provider:bitfinex')

export default class Cryptowatch extends OracleProvider {
  constructor () {
    super()
    log('Hi')
  }

  async get () {
    try {
      const data = await this.getJSON('https://api-pub.bitfinex.com/v2/tickers?symbols=tXRPUSD')
      const XrpUsd = Number(data[0][7]) || undefined
      log(`Calling, result: ${XrpUsd}`)
      return XrpUsd
    } catch (e) {
      log('Error', e.message)
      return undefined
    }
  }
}
