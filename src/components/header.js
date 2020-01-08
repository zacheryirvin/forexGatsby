import React from "react"
import { css } from "@emotion/core"
import styled from "@emotion/styled"
import { Link } from "gatsby"

const HeaderLink = styled(Link)`
  text-decoration: none;
  font-size: 2rem;
  font-weight: bold;
`

const Header = () => {
  return (
    <>
      <header
        css={css`
          width: 100%;
          height: 100px;
          border: 1px solid black;
        `}
      >
        <nav
          css={css`
            display: flex;
            flex-wrap: wrap;
            width: 60%;
            max-width: 1000px;
            margin: 0 auto;
            justify-content: space-between;
          `}
        >
          <div
            css={css`
              display: flex;
              flex-wrap: wrap;
              width: 60%;
              height: 100px;
              max-width: 300px;
              justify-content: space-between;
              align-items: flex-end;
            `}
          >
            <HeaderLink to="/"> Home </HeaderLink>
            <HeaderLink to="/trades"> Trades </HeaderLink>
            <HeaderLink to="/charts"> Charts</HeaderLink>
          </div>
          <div>
            <HeaderLink to="/login">Login</HeaderLink>
          </div>
        </nav>
      </header>
    </>
  )
}

export default Header
