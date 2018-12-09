// eslint-disable-next-line
import React from 'react';
// eslint-disable-next-line
import * as ReactDOM from "react-dom";
// eslint-disable-next-line
import logo from './logo.svg';
import './App.css';
// eslint-disable-next-line
import Search from './components/Search';
// eslint-disable-next-line
import VenueList from './components/VenueList';
import axios from 'axios';
import escapeRegExp from 'escape-string-regexp';




class App extends React.Component {

  constructor(props) {

    super(props);
    this.state = {
      venues: [],
      markers: [],
      cantSeeMarkers: [],
      allVenues: [],
      query: '',
    };

  }


  componentDidMount() {
    this.obtVenue();
  }


/*
 * Get map api key
 */
  getMap = () => {
    getScript("https://maps.googleapis.com/maps/api/js?key=AIzaSyBQ6zsiorJiComOV7nE9SBs3I43yLrpet4&callback=initMap")
    window.initMap = this.initMap
  }

/*
 * Get venues from Foursquare using Axios
 * Parameters obtained from Foursquare configuration docs
 */
  obtVenue = (query) => {
    const apiLoc = "https://api.foursquare.com/v2/venues/explore?"
    const params = {
      client_id: "3BFFDXDSP4324WBGN02YMWZADLY1C0FIMIMBRMBI240DTTUO",
      client_secret: "1A0PH415M44JSPIXVPNDC3T3XE40MDVYAU3FR5IFYBYF505C",
      query: 'food',
      near: "Palm Desert",
      ll: "33.737627,-116.3751197",
      limit:10,
      v: "20183012"
    }
    axios.get(apiLoc + new URLSearchParams(params))
      .then(response => {
        this.setState({
          venues: response.data.response.groups[0].items,
          allVenues: response.data.response.groups[0].items
        }, this.getMap())
      })
      .catch(err => {
        console.log("Alert: There is an error" + err)
      })
  }


/*
 * Initialize Google map
 * using Google Maps info window and marker documentation
 */
  initMap = (query) => {
    const map = new window.google.maps.Map(document.getElementById('gmap'), {
      center: {lat: 33.737627, lng: -116.3751197},
      zoom: 10
    });

      /*
       * Info window creation
       */
      let infoWindow = new window.google.maps.InfoWindow()
      let getMyMap = this.state.venues

      // eslint-disable-next-line
      getMyMap.map(pspVenue => {

        // eslint-disable-next-line
        let venId = pspVenue.venue.id
        let venName = pspVenue.venue.name
        let venLoc = pspVenue.venue.location.formattedAddress[0]
        let venCity = pspVenue.venue.location.formattedAddress[1]
        let contentString = `${venName} <br> ${venLoc} <br> ${venCity}`

        /*
         * Marker creation
         */
        let marker = new window.google.maps.Marker({
          position: {lat: pspVenue.venue.location.lat, lng: pspVenue.venue.location.lng},
          map: map,
          title: venName,
          id: venId,
          icon: {url: "https://unpkg.com/leaflet@1.3.1/dist/images/marker-icon.png",scaledSize: new window.google.maps.Size(25, 41)}
        })

        this.state.markers.push(marker)


        /*
         * Show info window by clicking a marker
         * Animate marker
         * Google Maps Marker Animation document
         */

        marker.addListener('click', function() {
          infoWindow.setContent(contentString)
          marker.setAnimation(window.google.maps.Animation.BOUNCE);
          setTimeout(function(){ marker.setAnimation(null); }, 1000)
          infoWindow.open(map, marker);
        })
      })

    }


  searchQuery = (query) => {
    this.setState({ query })
    this.state.markers.map(marker => marker.setVisible(true))
    let filterVenues
    let cantSeeMarkers

    if (query) {
      const match = new RegExp(escapeRegExp(query), "i")
      filterVenues = this.state.venues.filter(pspVenue =>
        match.test(pspVenue.venue.name)
      )
      this.setState({ venues: filterVenues })
      cantSeeMarkers = this.state.markers.filter(marker =>
        filterVenues.every(pspVenue => pspVenue.venue.name !== marker.title)
      )

      /*
       * Hiding the markers for venues not included in the filtered venues
      */
      cantSeeMarkers.forEach(marker => marker.setVisible(false))

      this.setState({ cantSeeMarkers })
    } else {
      this.setState({ venues: this.state.allVenues })
      this.state.markers.forEach(marker => marker.setVisible(true))
    }
  }


  render() {

    return (
      <div className="container">

        <div className="left-side">
          <Search
            venues={this.state.allVenues}
            markers={this.state.markers}
            searchedVenues={this.searchedVenues}
            query={this.state.query}
            searchQuery={work => this.searchQuery(work)}
          />

          <VenueList
            venues={this.state.venues}
            markers={this.state.markers}
          />
        </div>
        <div id="gmap" role="application"></div>
      </div>
      );
    }

}

/*
 * Create script tag
 */

function getScript(url) {
  let index = window.document.getElementsByTagName("script")[0]
  let scripTag = window.document.createElement("script")
  scripTag.src = url
  scripTag.async = true
  scripTag.defer = true
  index.parentNode.insertBefore(scripTag, index)
}

export default App;