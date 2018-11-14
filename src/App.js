import React, { Component } from 'react';
import '../src/styles/App.css';
import Map from './components/Map';
import SquareAPI from './API/FourSquareAPI';
import SideBar from './components/SideBar';

class App extends Component {

  constructor() {
    super();
    this.state = {
      venues: [],
      markers: [],
      center: [],
      zoom: 12,
      updateSuperState: obj => {
        this.setState(obj);
      }
    };
  }

  componentDidMount() {
    SquareAPI.search({
      near: "Houston, TX",
      query: "burgers",
      limit: 20 
    }).then(results => {
      const {venues} = results.response;
      const {center} = results.response.geocode.feature.geometry;
      const markers = venues.map(venue => {
        return {
          lat: venue.location.lat,
          lng: venue.location.lng,
          isOpen: false,
          isVisible: true,
          id: venue.id

        };
      });
      this.setState({venues, center, markers});
    });
  }

  onMarkerClick = (marker) => {
    this.closeMarkers();
    console.log(marker);
    marker.isOpen = true;
    this.setState({markers: Object.assign(this.state.markers, marker)});
    const venue = this.state.venues.find(venue => venue.id === marker.id);
    SquareAPI.getVenueDetails(marker.id).then(res => {
      const newVenue = Object.assign(venue, res.response.venue);
      this.setState({venues: Object.assign(this.state.venues, newVenue)})
      console.log(newVenue);
    });
  }

  onListItemClick = venue => {
    const marker = this.state.markers.find(marker => marker.id === venue.id);
    this.onMarkerClick(marker);
  }

  closeMarkers = () => {
    const markers = this.state.markers.map(marker => {
      marker.isOpen = false;
      return marker;
    })
    this.setState({markers: Object.assign(this.state.markers, markers)});
  }

  render() {
    return (
      <div className="App">
        <SideBar 
          {...this.state} 
          onListItemClick={this.onListItemClick}
        />
        <Map 
          {...this.state} 
          onMarkerClick={this.onMarkerClick}
        />
      </div>
    );
  }
}

export default App;
