import React, { Component } from 'react';
import Gmap from './Gmap';


class Search extends Component {

    render() {

    return (
      <div className="sidebar">
        <section className="search">
          <form>
            <input className="searchbx" 
              type="text"
              placeholder="Search" 
            />
          </form>
            <ul className="venue-list">
              <li>{this.props.name}</li>
            </ul>
        </section>
      </div>
    );
  }
}

export default Search;
