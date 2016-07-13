import React, { Component } from 'react';


class StringField extends Component {

  constructor(props) {
    super(props);

    this.state = {
      value: '',
    };
  }

  componentWillMount() {
    if (this.props.value) {
      this.setState({ value: this.props.value });
    }
  }

  render() {
    console.log(this.state.value);

    return (
      <li className="list-group-item">
        {!this.props.value ? 
          (<input className="form-control" type="text" placeholder="enter a string" />) :
          (<p>{this.props.value}</p>)
      }
      </li>
    );
  }
}

StringField.propTypes = {
  value: React.PropTypes.string,
};

export default StringField;
