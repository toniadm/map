import React, { Component } from 'react';

class Search extends Component {

  constructor(props) {
    super(props);
    this.state = {value: ''};
    this.handleChange = this.handleChange.bind(this);
  }


  handleChange(event) {
    event.preventDefault();
    this.props.onChange(this.state.value);
    this.setState({value: event.target.value});
  }

  render() {
    return (
        <input className="searchbx" onChange={this.handleChange} value={this.state.value} placeholder="Search..." />
    );
  }
}

export default Search;