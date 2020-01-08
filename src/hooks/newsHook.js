import { graphql, useStaticQuery } from "gatsby"

const useNews = () => {
  const data = useStaticQuery(graphql`
    query MyQuery {
      allNewsApiPost {
        nodes {
          author
          description
          title
          url
        }
      }
    }
  `)

  return data.allNewsApiPost.nodes
}

export default useNews
