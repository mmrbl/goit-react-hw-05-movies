import { Suspense } from 'react'
import { RotatingSquare } from 'react-loader-spinner'
import { Outlet } from "react-router-dom"
import { Container, NavContainer, StyledLink } from "./Layout.styled"



const Layout = () => {
  return (
    <Container>
      <NavContainer>
        <StyledLink to="/">Home</StyledLink>
        <StyledLink to="/movies" >Movies</StyledLink>
      </NavContainer>

      <main>
        <Suspense fallback={<RotatingSquare color='orange'/>}>
          <Outlet />
        </Suspense>
      </main>
    </Container>
  )
}

export default Layout
