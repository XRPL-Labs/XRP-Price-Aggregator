import OracleProvider from './OracleProvider.js'
import debug from 'debug'

const log = debug('oracle:provider:hitbtc')

export default class Hitbtc extends OracleProvider {
  constructor () {
    super()
    log('Hi')
  }

  async get () {
    try {
      const data = await this.getJSON('https://api.hitbtc.com/api/2/public/ticker/XRPUSDT')
      const XrpUsd = Number(data?.last) || undefined
      log(`Calling, result: ${XrpUsd}`)
      return XrpUsd
    } catch (e) {
      log('Error', e.message)
      return undefined
    }
  }
}
