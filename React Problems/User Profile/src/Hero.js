// Create component here to display the Basic information such as
// Name: Email: Phone: Address:
// Make sure to include these in your code with semicolon

import { Component } from "react";

export default class Hero extends Component {
  constructor() {
    super();
  }
  render() {
    return (
      <>
        <h4>Name: Pranav Sharad</h4>
        <p>Email: pranav@google.com</p>
        <p>Phone: 8546465544</p>
        <p>Address: ABC, xyz street</p>
      </>
    );
  }
}
