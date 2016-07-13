import React, { Component } from 'react';

class NumberField extends Component {

  constructor(props) {
    super(props);

    this.state = {
      value: -1,
    };

    this.onChange = this.onChange.bind(this);
  }

  componentWillMount() {
    if (this.props.value) {
      this.setState({ value: this.props.value });
    }
  }

  onChange(e) {
    const { value } = e.target;

    if (!isNaN(parseFloat(value)) && isFinite(value) && value >= 0) {
      this.setState({ value });
    } else if (value === '') {
      this.setState({ value });
    } else {
      // Do nothing
    }
  }

  render() {
    return (
      <li className="list-group-item">
        {!this.props.value ?
          (<input
            className="form-control"
            type="number"
            placeholder="enter a string"
            onChange={() => this.onChange}
          />) :
          (<p>{this.props.value}</p>)
      }
      </li>
    );
  }
}

NumberField.propTypes = {
  value: React.PropTypes.number,
};

export default NumberField;
