import styled from "styled-components";

// Complete the below given ButtonView style Component

export const ButtonView = styled.button`
  background-color: ${(props) => (props.filled ? props.bg : "transparent")};
  color: ${(props) => (props.filled ? props.color : props.color)};
  border: ${(props) => (props.filled ? "none" : `2px solid ${props.color}`)};
`;
