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
      <div className="ven-lst">
       <ul className="">
          {this.props.venues.map(venLst => (
            <li
              className=""
              role="menuitem"
              onClick={() => {
                this.getMarker(venLst.venue.id);
              }}
              aria-label={venLst.venue.name}
              tabIndex="0"
              id={venLst.venue.id}
              key={venLst.venue.id}
            >
              {venLst.venue.name}
            </li>
            ))}
        </ul>
      </div>
    );
  }
}

export default VenueList;