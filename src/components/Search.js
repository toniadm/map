import React, { Component } from 'react';


class Search extends Component {

constructor(props) {
    super(props);
    this.state = {value: ''};
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.onSubmit(this.state.value);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  render() {
    return (
      <form onChange={this.handleSubmit}>
        <input className="searchBx" onChange={this.handleChange} value={this.state.value} placeholder="Search Venues" />
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

export default Search;
