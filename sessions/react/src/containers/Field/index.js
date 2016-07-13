import React, { Component } from 'react';

import StringField from '../../components/StringField';
import TextField from '../../components/TextField';
import NumberField from '../../components/NumberField';

class Field extends Component {

  renderSelection() {
    const { type } = this.props;

    // Check to see what type of field this is
    switch (type) {
      case 'string':
        return (
          <StringField value={"This is a string field"} />
        );
      case 'text':
        return (
          <TextField value={"This is a text field"} />
        );
      case 'number':
          return (
            <NumberField value={12} />
          );
      default:
        return null;
    }
  }


  render() {
    const { title } = this.props;

    return (
      <li className="list-group-item">
        <ul className="list-group">
          <li className="list-group-item">
            <h3 className="list-group-item-heading">{title}</h3>
          </li>
          {this.renderSelection()}
        </ul>
      </li>
    );
  }
}


Field.propTypes = {
  title: React.PropTypes.string,
  type: React.PropTypes.string,
};

export default Field;
