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

  const wait = () => {
    return new Promise(function(res, rej) {
      setTimeout(res, 5000)
    })
  }

  const asyncCall = async url => {
    try {
      let response = await fetch(url)
      let data = await response.json()
      return data
    } catch (err) {
      console.log(err)
    }
  }

  const dataOne = async () => {
    const filtered = apiUrls.filter((x, i) => {
      if (i <= 3) {
        return x
      }
    })
    const secondFilter = apiUrls.filter((x, i) => {
      if (i > 3) {
        return x
      }
    })
    const firstCall = Promise.all(
      filtered.map(async x => {
        return asyncCall(x)
      })
    )

    const secondCall = Promise.all(
      secondFilter.map(async x => {
        return asyncCall(x)
      })
    )

    const data = await firstCall
    console.log("before")
    let timeout = await wait()
    console.log("after")
    const dataTwo = await secondCall
    data.push(dataTwo)
    return data
  }
  const final = await dataOne()
  // console.log(final[2]["Meta Data"])
  final.forEach(x => {
    console.log(x["Meta Data"])
  })
}
