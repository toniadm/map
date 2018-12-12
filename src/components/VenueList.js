import React, { Component } from 'react';

class VenueList extends Component {

  getMarker = (venId) => {
    this.props.markers.forEach(marker => {
      this.setState({ query: '' })
      if (marker.id === venId) {
        window.google.maps.event.trigger(marker, 'click');
      }
    });
  };


  render() {

    return (
       <ul className="">
          {this.props.venues.map(venLst => (
            <li
              className=""
              role="menuitem"
              onClick={() => {
                this.getMarker(venLst.venue.id);
              }}
              tabIndex="1"
              id={venLst.venue.id}
              key={venLst.venue.id}
              aria-label={venLst.venue.name}
            >
              {venLst.venue.name}
            </li>
            ))}
        </ul>
    );
  }
}

export default VenueList;