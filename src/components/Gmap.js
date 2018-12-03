import React, {Component} from 'react';
import Search from './Search';
import axios from 'axios';


class Gmap extends Component {

  state = {
    venues: [],
    query: '',
    lastMarker: ''
  }

  handleSubmit(venues) {
    this.obtVenue(venues);
  }

  componentDidMount() {
    this.obtVenue()
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
 * using Google Maps info window and marker documentation
 */
  initMap = () => {
    const map = new window.google.maps.Map(document.getElementById('gmap'), {
      center: {lat: 33.8302961, lng: -116.54529209999998},
      zoom: 14
    });

      /*
       * Info window creation
       */

      let infoWindow = new window.google.maps.InfoWindow()
      let getMyMap = this.state.venues
      getMyMap.map(pspVenue => {

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
          animation: window.google.maps.Animation.DROP
        })

        /*
         * Show info window by clicking a marker
         */

        marker.addListener('click', function() {
          infoWindow.setContent(contentString)
          infoWindow.open(map, marker);
        })
      })

    }


    render() {

      let venueList = this.state.venues.map((item,i) =>
        <li key={i}>{item.venue.name}</li>
      );

      return (
        <div>
          <Search onChange={(value)=>this.handleSubmit(value)}/>
          <ul >
            {venueList}
          </ul>

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

export default Gmap;