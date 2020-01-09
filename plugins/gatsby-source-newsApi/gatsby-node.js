const fetch = require("node-fetch")
const format = require("date-fns").format
const sub = require("date-fns").subDays
const uuid = require("uuid/v4")

const weekAgo = format(sub(new Date(), 14), "yyyy-dd-MM")
console.log("Week Ago:", weekAgo)

exports.sourceNodes = (
  { actions, createNodeId, createContentDigest },
  configOptions
) => {
  const { createNode } = actions
  delete configOptions.plugins
  const apiUrl = `https://newsapi.org/v2/everything?q=forex&from=${weekAgo}&sortBy=publishedAt&apiKey=${configOptions.token}`

  return fetch(apiUrl)
    .then(res => res.json())
    .then(data => {
      data.articles.forEach(x => {
        const id = createNodeId(uuid())
        const nodeContent = JSON.stringify(x)
        const newNode = {
          id,
          author: x.author,
          title: x.title,
          description: x.description,
          url: x.url,
          parent: null,
          children: [],
          internal: {
            type: "NewsApiPost",
            content: nodeContent,
            contentDigest: createContentDigest(x),
          },
        }
        createNode(newNode)
      })
    })
}
