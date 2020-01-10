import React from "react"
import useForexData from "../hooks/forexDataHook.js"
import Layout from '../components/layout.js'
import {css} from "@emotion/core"

const ForexList = () => {
  const data = useForexData()
  console.log(data)

  return (
		<Layout>
			<div>
			<ul css={css`
				display: flex;
				flex-wrap: wrap;
				padding-left: 0;
				justify-content: space-between;
				width: 100%;
			`}>
				{data.map(x => {
						return (
								<li key={x.id} css={css`
									font-size: 2rem;
									width: 25%;
									list-style: none;
									text-align: center;
									margin: 15px;
									border: 1px solid black;
								`}>{x.pair}</li>
								)
						})}
				</ul>
			</div>
		</Layout>
  )
}

export default ForexList
