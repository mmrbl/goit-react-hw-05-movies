import styled from "styled-components";

export const Form = styled.form`
display: flex;
align-items: center;
`

export const Input = styled.input`
margin: 20px;
margin-right: 0px;
border: none;
outline: 2px solid black;
border-radius: 4px;
height: 30px;
width: 500px;
font-weight: 600;
font-size: 24px;

&:focus{
  border: none;
  outline: 2px solid orange;
}
`

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