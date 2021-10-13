import OracleProvider from './OracleProvider.js'
import debug from 'debug'

const log = debug('oracle:provider:bitstamp')

export default class Bitstamp extends OracleProvider {
  constructor () {
    super()
    log('Hi')
  }

  async get () {
    try {
      const data = await this.getJSON('https://www.bitstamp.net/api/v2/ticker/xrpusd/')
      const XrpUsd = Number(data.last) || undefined
      log(`Calling, result: ${XrpUsd}`)
      return XrpUsd
    } catch (e) {
      log('Error', e.message)
      return undefined
    }
  }
}
