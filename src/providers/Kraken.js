import OracleProvider from './OracleProvider.js'
import debug from 'debug'
// import config from '../meta/config.js'

const log = debug('oracle:provider:kraken')

export default class Kraken extends OracleProvider {
  constructor () {
    super()
    log('Hi')
  }

  async get () {
    try {
      const data = await this.getJSON('https://api.kraken.com/0/public/Ticker?pair=XRPUSD')
      const XrpUsd = Number(data?.result?.XXRPZUSD?.c[0]) || undefined
      log(`Calling, result: ${XrpUsd}`)
      return XrpUsd
    } catch (e) {
      log('Error', e.message)
      return undefined
    }
  }
}
