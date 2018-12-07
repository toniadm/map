import React, { Component } from 'react';

class Search extends Component {

  constructor(props) {
    super(props);
    this.state = {value: ''};
  }

<<<<<<< Updated upstream
=======
handleChange(event) {
    event.preventDefault();
    this.props.onChange(this.state.value);
    this.setState({value: event.target.value});
  }
>>>>>>> Stashed changes

  render() {
    return (
          <input
          className="searchbx"
          type="text"
          autoFocus
          placeholder="Search for venues"
          aria-label="Search"
          value={this.props.query}
          onChange={event => this.props.updateQuery(event.target.value)}
          />
    );
  }
}

export default Search;