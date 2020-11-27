import React, {Component} from "react";
import Button from "react-bootstrap/Button"
  // to display calendar picker as icon
  // react-datepicker custom input wants only class based component
  export default class DateCustomInput extends Component {
    render() {
      return (
        <Button variant={this.props.overdued && "danger"}
          type="button" onClick={this.props.onClick}>
          <i className="far fa-calendar-alt"></i>
        </Button>
      )
    }
  }  