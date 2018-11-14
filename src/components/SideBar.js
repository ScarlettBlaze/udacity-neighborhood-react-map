import React, {Component} from 'react';
import PlaceList from './PlaceList';

export default class SideBar extends Component {
    render() {
        return(
            <div className="sideBar">
                <input type={"search"} id={"search"} placeholder={"Search Venues"} />
                <PlaceList {...this.props} onListItemClick={this.props.onListItemClick}/>
            </div>
        );
    }
}