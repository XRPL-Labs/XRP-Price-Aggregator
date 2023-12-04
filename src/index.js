import debug from 'debug'
import stats from 'stats-analysis'

import Bitstamp from './providers/Bitstamp.js'
import Kraken from './providers/Kraken.js'
import Cryptowatch from './providers/Cryptowatch.js'
import Bitfinex from './providers/Bitfinex.js'
import Hitbtc from './providers/Hitbtc.js'
import Binance from './providers/Binance.js'

const Providers = {
  class: {Cryptowatch, Bitstamp, Kraken, Bitfinex, Hitbtc, Binance},
  instances: {}
}

const log = debug('oracle:main')

export default (async () => {  
  Object.assign(Providers.instances, Object.keys(Providers.class).reduce((a, providerKey) => {
    Object.assign(a, {
      [providerKey]: new Providers.class[providerKey]
    })
    return a
  }, {}))

  const results = await Promise.all(Object.keys(Providers.instances).map(async instanceName => {
    log(`  - Getting from ${instanceName}`)
    const data = await Providers.instances[instanceName].getMultiple(
      Number(process.env.ORACLE_PROVIDER_CALL_COUNT || 3),
      Number(process.env.ORACLE_PROVIDER_CALL_DELAY_SEC || 2) * 1000
    )
    log(`     - Got data from ${instanceName}`)
    return data
  }))

  const rawResultsNamed = results.reduce((a, b, i) => {
    Object.assign(a, {
      [Object.keys(Providers.instances)[i]]: b
    })
    return a
  }, {})
  
  const rawResults = results.reduce((a, b) => a.concat(b), [])
  const rawMedian = stats.median(rawResults)
  const rawStdev = stats.stdev(rawResults)

  const raw = {
    rawResultsNamed,
    rawResults,
    rawMedian,
    rawStdev
  }

  log(raw)

  const filteredResults = rawResults.filter(r => Math.abs(r - rawMedian) < rawStdev || rawStdev === 0)
  const filteredMedian = stats.median(filteredResults)
  const filteredMean = stats.mean(filteredResults)
  
  const filtered = {
    filteredResults,
    filteredMedian,
    filteredMean
  }

  log(filtered)

  return {
    ...raw,
    ...filtered
  }
})()
