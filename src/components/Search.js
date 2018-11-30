import React, { Component } from 'react';
import Gmap from './Gmap';


class Search extends Component {

constructor(props) {
    super(props);
    this.state = {value: ''};
    this.handleChange = this.inputChange.bind(this);
  }


  inputChange(event) {
    this.setState({value: event.target.value});
  }

  render() {
    return (
      <input className="searchbx" onChange={this.inputChange} value={this.state.value} placeholder="Search Venues" />
    );
  }
}
export default Search;
