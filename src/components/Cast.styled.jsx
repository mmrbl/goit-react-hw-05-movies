import styled from "styled-components";

export const CastList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  margin-top: calc(-1 * 15px);
  margin-left: calc(-1 * 15px);

  list-style: none;
`

export const CastItem = styled.li`
  margin-top: 15px;
  margin-left: 15px;
  flex-basis: calc(100% / 6 - 15px);
`