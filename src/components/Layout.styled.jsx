import { NavLink } from "react-router-dom";
import styled from "styled-components";

export const Container = styled.div`
margin: 0 auto;
padding: 0 10px;
`

export const StyledLink = styled(NavLink)`
  color: black;
  text-decoration: none;
  margin-left: 15px;
  outline: 2px solid black;
  padding: 15px;
  font-size: 32px;
  font-weight: 700;
  border-radius: 6px;


  &.active {
    background-color: orange;
  }
`

export const NavContainer = styled.div`
display: flex;
position: sticky;
top: 0;
padding: 20px 0;
background-color: white;
border-bottom: 2px solid grey;
margin-bottom: 15px;
`

export const Main = styled.main`
margin-top: 60px;
` 