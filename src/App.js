import React, { Component } from 'react';
import '../src/styles/App.css';
import Map from './components/Map';
import SquareAPI from './API/FourSquareAPI';
import SideBar from './components/SideBar';
import {slide as Menu} from 'react-burger-menu';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      venues: [],
      markers: [],
      center: [],
      zoom: 12,
      menuOpen: false,
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
          id: venue.id,
        };
      });
      this.setState({venues, center, markers});
    });
  }

  handleStateChange (state) {
    this.setState({menuOpen: state.isMenuOpen})  
  }

  toggleMenu () {
    this.setState({menuOpen: !this.state.menuOpen})
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
        <Menu onStateChange={(state) => this.handleStateChange(state)}>
            <SideBar 
              {...this.state} 
              onListItemClick={this.onListItemClick}
            />
          </Menu>
        <Map 
          {...this.state} 
          onMarkerClick={this.onMarkerClick}
        />
        <a id="nav-toggle" aria-label="Home" tabIndex="1" onClick={this.toggleMenu}>&#9776;</a>
      </div>
    );
  }
}

export default App;
