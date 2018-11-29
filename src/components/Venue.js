import React, { Component } from 'react';

class Venue extends Component {

    render() {

      return (
        <div className="venue-list">
          <ul>
            <li>{this.props.name}</li>
          </ul>
        </div>
    )
  }
}

export default Venue;
