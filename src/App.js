import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

class App extends Component {

  state = {
    venues: []
  }

  componentDidMount() {
    this.obtVenue()
  }

/*
 * Get map api key
 */
  getMap = () => {
    getScript("https://maps.googleapis.com/maps/api/js?key=AIzaSyD-6gr4LhtobKgtRgExCn6xm2tE2FmLLX4&callback=initMap")
    window.initMap = this.initMap
  }

/*
 * Get venues from Foursquare using Axios
 * Parameters obtained from Foursquare configuration docs
 */
  obtVenue = () => {
    const apiLoc = "https://api.foursquare.com/v2/venues/explore?"
    const params = {
      client_id: "3BFFDXDSP4324WBGN02YMWZADLY1C0FIMIMBRMBI240DTTUO",
      client_secret: "1A0PH415M44JSPIXVPNDC3T3XE40MDVYAU3FR5IFYBYF505C",
      query: "food",
      near: "Palm Springs",
      v: "20183012"
    }
    axios.get(apiLoc + new URLSearchParams(params))
      .then(response => {
        this.setState({
          venues: response.data.response.groups[0].items
        }, this.getMap())
      })
      .catch(err => {
        console.log("Alert: There is an error" + err)
      })
  }

/*
 * Initialize Google map
 */
  initMap = () => {
    const map = new window.google.maps.Map(document.getElementById('map'), {
      center: {lat: 33.8302961, lng: -116.54529209999998},
      zoom: 14
    });

    this.state.venues.map(pspVenue => {
      var marker = new window.google.maps.Marker({
        position: {lat: pspVenue.venue.location.lat, lng: pspVenue.venue.location.lng},
        map: map,
        title: pspVenue.venue.name
      })
    })

  }

  render() {
    return (
      <main>
        <div id="map"></div>
      </main>
    )
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
