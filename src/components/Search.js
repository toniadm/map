import React, { Component } from 'react';


class Search extends Component {

    render() {

    return (
      <div className="sidebar">
        <div id="search">
          <input className="searchbx" type="text" placeholder="Search" />
        </div>
      </div>
    )
  }
}

export default Search;
