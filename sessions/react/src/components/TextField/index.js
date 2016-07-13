import React, { Component } from 'react';

class TextField extends Component {

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
    return (
      <li className="list-group-item">
        {!this.props.value ?
          (<textarea className="form-control" />) :
          (<p className="list-group-item-text">{this.props.value}</p>)
        }
      </li>
    );
  }
}

TextField.propTypes = {
  value: React.PropTypes.string,
};

export default TextField;
