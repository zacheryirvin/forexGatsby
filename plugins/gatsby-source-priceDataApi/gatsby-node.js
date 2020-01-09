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
  for (let i = 0; i < apiUrls.length - 6; i++) {
    const val = await Promise.all([asyncCall(apiUrls[i])])
    returnVal.push(val)
  }
  returnVal.forEach(x => {
    console.log(x[0]["Meta Data"]["2. From Symbol"])
    console.log(x[0]["Time Series FX (Daily)"]["2020-01-08"])
  })

  returnVal.forEach(x => {
    const from = x[0]["Meta Data"]["2. From Symbol"]
    const to = x[0]["Meta Data"]["3. To Symbol"]
    const id = createNodeId(uuid())
    const nodeContent = JSON.stringify(x)
    const newNode = {
      id,
      pair: `${from} / ${to}`,
    }
  })
}
