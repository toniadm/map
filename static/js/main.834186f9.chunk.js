(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{17:function(e,t,n){e.exports=n(46)},22:function(e,t,n){},24:function(e,t,n){e.exports=n.p+"static/media/logo.5d5d9eef.svg"},25:function(e,t,n){},46:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),o=n(8),i=n.n(o),s=(n(22),n(2)),c=n(3),u=n(5),l=n(4),m=n(6),d=(n(24),n(25),function(e){function t(e){var n;return Object(s.a)(this,t),(n=Object(u.a)(this,Object(l.a)(t).call(this,e))).state={value:""},n}return Object(m.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){var e=this;return r.a.createElement("input",{className:"searchbx",type:"text",tabIndex:"1",placeholder:"Venue Search","aria-label":"Search text",value:this.props.query,onChange:function(t){return e.props.searchQuery(t.target.value)}})}}]),t}(a.Component)),p=function(e){function t(){var e,n;Object(s.a)(this,t);for(var a=arguments.length,r=new Array(a),o=0;o<a;o++)r[o]=arguments[o];return(n=Object(u.a)(this,(e=Object(l.a)(t)).call.apply(e,[this].concat(r)))).getMarker=function(e){n.props.markers.forEach(function(t){n.setState({query:""}),t.id===e&&window.google.maps.event.trigger(t,"click")})},n}return Object(m.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){var e=this;return r.a.createElement("ul",{className:""},this.props.venues.map(function(t){return r.a.createElement("li",{className:"",role:"menuitem",onClick:function(){e.getMarker(t.venue.id)},tabIndex:"1",id:t.venue.id,key:t.venue.id,"aria-label":t.venue.name},t.venue.name)}))}}]),t}(a.Component),f=n(15),v=n.n(f),h=n(16),g=n.n(h);var w=function(e){function t(e){var n;return Object(s.a)(this,t),(n=Object(u.a)(this,Object(l.a)(t).call(this,e))).getMap=function(){!function(e){var t=window.document.getElementsByTagName("script")[0],n=window.document.createElement("script");n.src=e,n.async=!0,n.defer=!0,t.parentNode.insertBefore(n,t)}("https://maps.googleapis.com/maps/api/js?key=AIzaSyBQ6zsiorJiComOV7nE9SBs3I43yLrpet4&callback=initMap"),window.initMap=n.initMap},n.obtVenue=function(e){v.a.get("https://api.foursquare.com/v2/venues/explore?"+new URLSearchParams({client_id:"3BFFDXDSP4324WBGN02YMWZADLY1C0FIMIMBRMBI240DTTUO",client_secret:"1A0PH415M44JSPIXVPNDC3T3XE40MDVYAU3FR5IFYBYF505C",query:"resorts",near:"Palm Desert",ll:"33.737627,-116.3751197",limit:5,v:"20183012"})).then(function(e){n.setState({venues:e.data.response.groups[0].items,allVenues:e.data.response.groups[0].items},n.getMap())}).catch(function(e){alert("Unable to get data from Foursquare"),console.log("There is an error from Foursquare"+e)})},n.initMap=function(e){var t=new window.google.maps.Map(document.getElementById("gmap"),{center:{lat:36.737627,lng:-114.3751197},zoom:10,mapTypeControl:!1}),a=new window.google.maps.InfoWindow({maxWidth:150});n.state.venues.map(function(e){var r=e.venue.id,o=e.venue.name,i=e.venue.location.formattedAddress[0],s=e.venue.location.formattedAddress[1],c="".concat(o," <br> ").concat(i," <br> ").concat(s," <br> <b>").concat("Data obtained from Foursquare"),u=new window.google.maps.Marker({position:{lat:e.venue.location.lat,lng:e.venue.location.lng},map:t,title:o,id:r,icon:{url:"https://unpkg.com/leaflet@1.3.1/dist/images/marker-icon.png",scaledSize:new window.google.maps.Size(25,41)}});n.state.markers.push(u),u.addListener("click",function(){a.setContent(c),u.setAnimation(window.google.maps.Animation.BOUNCE),setTimeout(function(){u.setAnimation(5)},750),a.open(t,u)})})},n.searchQuery=function(e){var t,a;if(n.setState({query:e}),n.state.markers.map(function(e){return e.setVisible(!0)}),e){var r=new RegExp(g()(e),"i");a=n.state.venues.filter(function(e){return r.test(e.venue.name)}),n.setState({venues:a}),(t=n.state.markers.filter(function(e){return a.every(function(t){return t.venue.name!==e.title})})).forEach(function(e){return e.setVisible(!1)}),n.setState({hideMarkers:t})}else n.setState({venues:n.state.allVenues}),n.state.markers.forEach(function(e){return e.setVisible(!0)})},n.state={venues:[],markers:[],hideMarkers:[],allVenues:[],query:""},n}return Object(m.a)(t,e),Object(c.a)(t,[{key:"componentDidMount",value:function(){this.obtVenue()}},{key:"render",value:function(){var e=this;return r.a.createElement("main",null,r.a.createElement("div",{className:"searchbar"},r.a.createElement(d,{venues:this.state.allVenues,markers:this.state.markers,query:this.state.query,searchQuery:function(t){return e.searchQuery(t)}}),r.a.createElement(p,{venues:this.state.venues,markers:this.state.markers})),r.a.createElement("div",{id:"gmap",role:"application"}))}}]),t}(r.a.Component),b=Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));function k(e,t){navigator.serviceWorker.register(e).then(function(e){e.onupdatefound=function(){var n=e.installing;null!=n&&(n.onstatechange=function(){"installed"===n.state&&(navigator.serviceWorker.controller?(console.log("New content is available and will be used when all tabs for this page are closed. See http://bit.ly/CRA-PWA."),t&&t.onUpdate&&t.onUpdate(e)):(console.log("Content is cached for offline use."),t&&t.onSuccess&&t.onSuccess(e)))})}}).catch(function(e){console.error("Error during service worker registration:",e)})}i.a.render(r.a.createElement(w,null),document.getElementById("root")),function(e){if("serviceWorker"in navigator){if(new URL("/map",window.location.href).origin!==window.location.origin)return;window.addEventListener("load",function(){var t="".concat("/map","/service-worker.js");b?(function(e,t){fetch(e).then(function(n){var a=n.headers.get("content-type");404===n.status||null!=a&&-1===a.indexOf("javascript")?navigator.serviceWorker.ready.then(function(e){e.unregister().then(function(){window.location.reload()})}):k(e,t)}).catch(function(){console.log("No internet connection found. App is running in offline mode.")})}(t,e),navigator.serviceWorker.ready.then(function(){console.log("This web app is being served cache-first by a service worker. To learn more, visit http://bit.ly/CRA-PWA")})):k(t,e)})}}()}},[[17,2,1]]]);
//# sourceMappingURL=main.834186f9.chunk.js.map