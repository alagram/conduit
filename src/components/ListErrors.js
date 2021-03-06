import React, { Component } from "react";

class ListErrors extends Component {
  render() {
    const errors = this.props.errors;

    if (errors) {
      return (
        <ul className="error-messages">
          {Object.keys(errors).map(key => (
            <li key={key}>
              {key} {errors[key].join(", ")}
            </li>
          ))}
        </ul>
      );
    } else {
      return null;
    }
  }
}

export default ListErrors;
