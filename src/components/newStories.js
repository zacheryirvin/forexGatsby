import React from "react"
import { css } from "@emotion/core"
import styled from "@emotion/styled"
import useNews from "../hooks/newsHook.js"

const Post = styled("div")`
  width: 100%;
  h3 {
    font-size: 2.5rem;
    font-weight: bold;
  }
  h4 {
    font-size: 1.2rem;
  }
  p {
    font-size: 1.1rem;
  }
  a {
    text-decoration: none;
    font-size: 1.3rem;
    &:hover {
      font-weight: bold;
    }
  }
`

const HomePageNewsPreview = () => {
  const data = useNews()
  return (
    <div
      css={css`
        width: 60%;
        margin: 0 auto;
      `}
    >
      {data.map(x => {
        return (
          <Post>
            <h3>{x.title}</h3>
            <h4>{x.author}</h4>
            <p>{x.description}</p>
            <a href={x.url}>Read Article</a>
          </Post>
        )
      })}
    </div>
  )
}

export default HomePageNewsPreview
