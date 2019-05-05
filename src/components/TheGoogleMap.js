import React from 'react';

const mapStyle = [
     {elementType: 'geometry', stylers: [{color: '#242f3e'}]},
     {elementType: 'labels.text.stroke', stylers: [{color: '#242f3e'}]},
     {elementType: 'labels.text.fill', stylers: [{color: '#746855'}]},
     {
       featureType: 'administrative.locality',
       elementType: 'labels.text.fill',
       stylers: [{color: '#d59563'}]
     },
     {
       featureType: 'poi',
       elementType: 'labels.text.fill',
       stylers: [{color: '#d59563'}]
     },
     {
       featureType: 'poi.park',
       elementType: 'geometry',
       stylers: [{color: '#263c3f'}]
     },
     {
       featureType: 'poi.park',
       elementType: 'labels.text.fill',
       stylers: [{color: '#6b9a76'}]
     },
     {
       featureType: 'road',
       elementType: 'geometry',
       stylers: [{color: '#38414e'}]
     },
     {
       featureType: 'road',
       elementType: 'geometry.stroke',
       stylers: [{color: '#212a37'}]
     },
     {
       featureType: 'road',
       elementType: 'labels.text.fill',
       stylers: [{color: '#9ca5b3'}]
     },
     {
       featureType: 'road.highway',
       elementType: 'geometry',
       stylers: [{color: '#746855'}]
     },
     {
       featureType: 'road.highway',
       elementType: 'geometry.stroke',
       stylers: [{color: '#1f2835'}]
     },
     {
       featureType: 'road.highway',
       elementType: 'labels.text.fill',
       stylers: [{color: '#f3d19c'}]
     },
     {
       featureType: 'transit',
       elementType: 'geometry',
       stylers: [{color: '#2f3948'}]
     },
     {
       featureType: 'transit.station',
       elementType: 'labels.text.fill',
       stylers: [{color: '#d59563'}]
     },
     {
       featureType: 'water',
       elementType: 'geometry',
       stylers: [{color: '#17263c'}]
     },
     {
       featureType: 'water',
       elementType: 'labels.text.fill',
       stylers: [{color: '#515c6d'}]
     },
     {
       featureType: 'water',
       elementType: 'labels.text.stroke',
       stylers: [{color: '#17263c'}]
     }
   ];

class TheGoogleMap extends React.Component {
  componentDidMount() {
     // Connect the initMap() function within this class to the global window context,
     // so Google Maps can invoke it
     window.initMap = this.initMap;
     // Asynchronously load the Google Maps script, passing in the callback reference
     loadGoogleMapsScript(`https://maps.googleapis.com/maps/api/staticmap?center=Brooklyn+Bridge,New+York,NY&zoom=13&size=600x300&maptype=roadmap&markers=color:blue%7Clabel:S%7C40.702147,-74.015794&markers=color:green%7Clabel:G%7C40.711614,-74.012318&markers=color:red%7Clabel:C%7C40.718217,-73.998284&key=AIzaSyDJWknmaOWpg2xv4tD0tdRGTJ4xG067iHY&callback=initMap`)
   }
   componentWillReceiveProps() {
     try {
       const activeBarIdx = this.props.activityState.activeBar;
       if(activeBarIdx !== null) {
         const { latitude, longitude } = this.props.searchState.searchData[activeBarIdx].coordinates;
         this.map.panTo({lat: latitude, lng: longitude});
         this.map.setZoom(17);
       } else {
         this.setGeolocation();
         this.setMarkers();
         this.map.setZoom(13);
       }
     } catch(err) {
       console.log(err);
     }
   }
   initMap = () => {
     //set default lat and lng to first bar coordinates if something goes wrong with geolocation
     try {
       const latitude = 50.76835;
       const longitude = 16.1652735;
       this.map = new window.google.maps.Map(this.refs.map, {
         center:   {
           lat: latitude,
           lng: longitude
         },
         zoom: 13,
         styles: mapStyle
       });
       // this.setMarkers();
       // this.setGeolocation();
     } catch(err) {
       console.log(err);
     }
   }
   setMarkers = () => {
       let markers = [];
       this.props.searchState.searchData.forEach( bar => {
       const { latitude, longitude } = bar.coordinates;
       markers.push(new window.google.maps.Marker({
            position: {lat: latitude, lng: longitude},
            map: this.map,
            title: bar.name
          }));
     });
   }
   setGeolocation = () => {
     const geocoder = new window.google.maps.Geocoder();
     this.geocodeAddress(geocoder, this.map);
   }
   geocodeAddress = (geocoder, resultsMap) => {
       const address = this.props.searchState.inputValue;
       geocoder.geocode({'address': address}, function(results, status) {
         if (status === 'OK') {
           resultsMap.setCenter(results[0].geometry.location);
         } else {
           console.log('Geocode was not successful for the following reason: ' + status);
         }
       });
     }
  render() {
    return (
      <div className="map" ref="map"></div>
    )
  }
}

function loadGoogleMapsScript(src) {
  var ref = window.document.getElementsByTagName("script")[0];
  var script = window.document.createElement("script");
  script.src = src;
  script.async = true;
  ref.parentNode.insertBefore(script, ref);
}

 export default TheGoogleMap
