import React from "react";
import Styles from "styled-components";

export const Button = Styles.button`
    background-color: ${(props) => props.bg};
`;

export const Container = Styles.div`
    flex: ${(props) => props.flex};
`;
