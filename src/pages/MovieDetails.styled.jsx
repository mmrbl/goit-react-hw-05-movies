import styled from "styled-components";



export const Button = styled.button`
  height: 35px; 
  border: 2px solid black;
  border-radius: 6px;
  font-weight: 600;
  font-size: 24px;
  margin-left: 15px;

  &:hover{
    cursor: pointer;
    background-color: orange;
  }
`

export const Container = styled.div`
display: flex;
margin-top: 15px;
`

export const MovieInfo = styled.div`
margin-left: 15px;
`