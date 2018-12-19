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
      hideMarkers: [],
      ourLocs: [],
      query: '',
      photo: [],
    };

  }


  componentDidMount() {
    this.obtVenue();
  }


  /*
  * Get map api key from Google Maps
  */
  getMap = () => {
    getScript("https://maps.googleapis.com/maps/api/js?key=AIzaSyBQ6zsiorJiComOV7nE9SBs3I43yLrpet4&callback=initMap")
    window.initMap = this.initMap
  }

  /*
  * Get venues from Foursquare using Axios
  * Parameters obtained from Foursquare configuration docs
  * Axios used to fetch API data
  */

  obtVenue = (query) => {
    const apiLoc = "https://api.foursquare.com/v2/venues/explore?"
    const params = {
      client_id: "3BFFDXDSP4324WBGN02YMWZADLY1C0FIMIMBRMBI240DTTUO",
      client_secret: "1A0PH415M44JSPIXVPNDC3T3XE40MDVYAU3FR5IFYBYF505C",
      query: 'restaurants',
      near: "Palm Desert",
      ll: "33.782313, -116.383663",
      v: "20183012",
      venuePhotos: 1

    }
    axios.get(apiLoc + new URLSearchParams(params))
      .then(response => {
        this.setState({
          venues: response.data.response.groups[0].items,
          ourLocs: response.data.response.groups[0].items
        }, this.getMap())
      })
      .catch(err => {
        alert("Unable to get data from Foursquare")
        console.log("There is an error from Foursquare" + err)
      })
  }

  /*
  * Initialize Google map
  * using Google Maps info window and marker documentation
  */

  initMap = (query) => {
    const map = new window.google.maps.Map(document.getElementById('gmap'), {
      center: {lat: 33.782313, lng: -116.383663},
      zoom: 16,
      mapTypeControl: false
    });


      /*
       * Info window creation
       */
      let infoWindow = new window.google.maps.InfoWindow({maxWidth: 150})
      let getMyMap = this.state.venues

      // eslint-disable-next-line
      getMyMap.map(pspVenue => {

        // eslint-disable-next-line
        let venId = pspVenue.venue.id
        let venName = pspVenue.venue.name
        let venLoc = pspVenue.venue.location.formattedAddress[0]
        let venCity = pspVenue.venue.location.formattedAddress[1]
        let dataAttr = "Data obtained from Foursquare"
        let contentString = `${venName} <br> ${venLoc} <br> ${venCity} <br> <b>${dataAttr}`

  /*
   * Create marker with custom marker
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
   *
   * Close infoWindow by clicking anywhere on map
   */

  window.google.maps.event.addListener(map,'click', function(){
    infoWindow.close(map, marker)
  })

  /*
   * Clicking marker or item in list displays info window
   * and animates marker
   * Google Maps Marker Animation document
   *
   */

  marker.addListener('click', function() {
    map.setCenter(this.getPosition())
    map.panBy(-100,-65)
    infoWindow.setContent(contentString)
    marker.setAnimation(window.google.maps.Animation.BOUNCE)
    setTimeout(function(){ marker.setAnimation(5); }, 750)
    infoWindow.open(map, marker)
      })
    })
  }

    /*
     *  Query to search for venues and select associated marker
     *
     */

  searchQuery = (query) => {
    this.setState({query})
    this.state.markers.map(marker => marker.setVisible(true))
    let hideMarkers
    let venuesSearch

    if (query) {
      const match = new RegExp(escapeRegExp(query), "i")
      venuesSearch = this.state.venues.filter(pspVenue =>
        match.test(pspVenue.venue.name)
      )
      this.setState({ venues: venuesSearch })
      hideMarkers = this.state.markers.filter(marker =>
        venuesSearch.every(pspVenue => pspVenue.venue.name !== marker.title)
      )

      hideMarkers.forEach(marker => marker.setVisible(false))
      this.setState({ hideMarkers })
    } else {
      this.setState({ venues: this.state.ourLocs })
      this.state.markers.forEach(marker => marker.setVisible(true))
    }
  }


  render() {

    return (
      <main>

        <aside className="searchbar">
          <Search
            venues={this.state.ourLocs}
            markers={this.state.markers}
            query={this.state.query}
            searchQuery={this.searchQuery}
          />

          <VenueList
            venues={this.state.venues}
            markers={this.state.markers}
          />
        </aside>

        <div id="gmap" role="application"></div>
      </main>
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
