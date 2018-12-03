import React, { Component } from 'react';
import Gmap from './Gmap';


class Search extends Component {

constructor(props) {
    super(props);
    this.state = {value: ''};
    this.handleChange = this.handleChange.bind(this);
  }


  handleChange(event) {
    this.setState({value: event.target.value});
  }

  render() {

    return (
      <input className="searchbx" onChange={this.handleChange} value={this.state.value} placeholder="Search Venues" />
    );
  }
}
export default Search;
