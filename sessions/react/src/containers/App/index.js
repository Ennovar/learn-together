// Libary imports
import React, { Component } from 'react';
import Field from '../Field';

class App extends Component {

  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-8">
            <ul className="list-group">
              <Field title={"Title"} type={"string"} />
              <Field title={"Body"} type={"text"} />
              <Field title={"Expected Views"} type={"number"} />
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
