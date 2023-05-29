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
        <Outlet/>
      </main>
    </Container>
  )
}

export default Layout
