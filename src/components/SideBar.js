import React, {Component} from 'react';
import PlaceList from './PlaceList';
//import '../styles/SideBar.css';


export default class SideBar extends Component {
    constructor() {
        super();
        this.state = {
            query: '',
            venues: []
        };
    }

    manageSearchVenues = () => {
        if(this.state.query.trim !== "") {
            const venues = this.props.venues.filter(venue => venue.name
                .toLowerCase()
                .includes(this.state.query.toLowerCase())
            );
            return venues;
        }
        return this.props.venues;
    };

    onChange = e => {
        this.setState({query: e.target.value});
        const markers = this.props.venues.map(venue => {
            const isMatched = venue.name.toLowerCase().includes(e.target.value.toLowerCase());
            const marker = this.props.markers.find(marker => marker.id === venue.id);
            if(isMatched) {
                marker.isVisible = true;
            }
            else {
                marker.isVisible = false;
            }
            return marker;
        });
        this.props.updateSuperState({markers});
    };
    render() {
        return(
            <div className="sideBar">
                <input type={"search"} id={"search"} placeholder={"Search Venues"} onChange={this.onChange}/>
                <PlaceList {...this.props} venues={this.manageSearchVenues()} onListItemClick={this.props.onListItemClick}/>
            </div>
        );
    }
}