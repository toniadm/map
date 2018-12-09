import React, { Component } from 'react';

class Search extends Component {

  constructor(props) {
    super(props);
    this.state = {value: ''};
  }


  render() {
    return (
          <input
          className="searchbx"
          type="text"
          autoFocus
          placeholder="Search for venues"
          aria-label="Search"
          value={this.props.query}
          onChange={event => this.props.searchQuery(event.target.value)}
          />

      <div className="searchbar">
        <input
        className="searchbx"
        type="text"
        autoFocus
        placeholder="Search for venues"
        aria-label="Search"
        value={this.props.query}
        onChange={event => this.props.updateQuery(event.target.value)}
        />
      </div>
    );
  }
}

export default Search;