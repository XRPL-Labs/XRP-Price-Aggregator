import fetch from 'node-fetch'
import debug from 'debug'

const log = debug('oracle:provider')

export default class OracleProvider {
  constructor () { 
  }

  async getJSON (endpoint) {
    const call = await fetch(endpoint, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json; Charset=UTF-8'
      },
      redirect: 'follow',
      follow: 3,
      timeout: 5000
    })
    return await call.json()
  }

  async delay (delayMs) {
    return await new Promise(resolve => {
      setTimeout(resolve, Number(delayMs))
    })
  }

  async getWithTimeout (timeoutMs) {
    return await Promise.race([
      this.get(),
      this.delay(timeoutMs)
    ])
  }

  async getMultiple (count = 5, delayMs = 1000, timeoutMs = 3000) {
    return (await Array(Number(count)).fill('').reduce(async Arr => {
      ;(await Arr).push(await (async () => {
        await this.delay(delayMs)
        return await this.getWithTimeout(timeoutMs)
      })())
      return await Arr
    }, [])).filter(r => r !== undefined)
  }
}
