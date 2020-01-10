import { graphql, useStaticQuery } from "gatsby"

const useForexData = () => {
  const data = useStaticQuery(graphql`
    query Forex {
      allForexApiData {
        nodes {
          id
          pair
          prices {
            date
            ohlc {
              open
              high
              low
              close
            }
          }
        }
      }
    }
  `)

  return data.allForexApiData.nodes
}

export default useForexData
