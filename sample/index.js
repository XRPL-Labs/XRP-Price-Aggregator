import oracle from '../src/index.js'

;(async () => {
  const data = await oracle
  console.log(data.filteredMedian)
})()
