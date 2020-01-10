const fetch = require("node-fetch")
const uuid = require("uuid/v4")

const pairs = [
  {
    from: "EUR",
    to: "USD",
  },
  {
    from: "USD",
    to: "JPY",
  },
  {
    from: "GBP",
    to: "USD",
  },
  {
    from: "USD",
    to: "CHF",
  },
  {
    from: "USD",
    to: "CAD",
  },
  {
    from: "AUD",
    to: "USD",
  },
  {
    from: "NZD",
    to: "USD",
  },
]

exports.sourceNodes = async (
  { actions, createNodeId, createContentDigest },
  configOptions
) => {
  const { createNode } = actions
  delete configOptions.plugins
  const apiUrls = pairs.map(x => {
    return `https://www.alphavantage.co/query?function=FX_DAILY&from_symbol=${x.from}&to_symbol=${x.to}&apikey=${configOptions.access_key}`
  })

  const timeout = ms => {
    return new Promise((res, rej) => {
      return setTimeout(res, ms)
    })
  }

  const asyncCall = async url => {
    try {
      console.log("ran")
      let response = await fetch(url)
      let data = await response.json()
      return data
    } catch (err) {
      console.log(err)
    }
  }

  let returnVal = []
  // for (let i = 0; i < apiUrls.length; i++) {
  //   const val = await Promise.all([asyncCall(apiUrls[i]), timeout(20011)])
  //   returnVal.push(val[0])
  // }

  for (let i = 0; i < apiUrls.length - 2; i++) {
    const val = await Promise.all([asyncCall(apiUrls[i])])
    returnVal.push(val[0])
  }

  returnVal.forEach(x => {
    const from = x["Meta Data"]["2. From Symbol"]
    const to = x["Meta Data"]["3. To Symbol"]
    const prices = x["Time Series FX (Daily)"]
    const convertedPrices = []
    for (let [key, value] of Object.entries(prices)) {
      const newValue = {
        date: key,
        ohlc: {
          open: Number(value["1. open"]),
          high: Number(value["2. high"]),
          low: Number(value["3. low"]),
          close: Number(value["4. close"]),
        },
      }
      convertedPrices.push(newValue)
    }

    const id = createNodeId(uuid())
    const nodeContent = JSON.stringify(x)
    const newNode = {
      id,
      pair: `${from} / ${to}`,
      prices: convertedPrices,
      parent: null,
      children: [],
      internal: {
        type: "ForexApiData",
        content: nodeContent,
        contentDigest: createContentDigest(x),
      },
    }
    createNode(newNode)
  })
}
