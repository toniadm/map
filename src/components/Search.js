import React, { Component } from 'react';

class Search extends Component {

  constructor(props) {
    super(props);
    this.state = {
      value: ''
    };
  }


  render() {
    return (
          <input
          className="searchbx"
          type="text"
          autoFocus
          placeholder="Venue Search"
          aria-label="Search text"
          value={this.props.query}
          onChange={event => this.props.searchQuery(event.target.value)}
          />
    );
  }
}

export default Search;