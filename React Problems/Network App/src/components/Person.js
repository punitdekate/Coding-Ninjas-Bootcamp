import { Component } from "react";

class Person extends Component {
  // Define appropriate lifecycle method to show alert here
  componentWillUnmount(){
    return alert()
  }
  render() {
    const { img, email, show} = this.props.person;
    return (
      <div className="person">
        <b onClick={()=>this.props.handleRemove(this.props.index)}>X</b>
        <img alt={email} src={img} />
        <p>{email}</p>
      </div>
    );
  }
}

export default Person;
