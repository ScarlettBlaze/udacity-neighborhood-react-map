import React, {Component} from 'react';
import PlaceList from './PlaceList';
import {slide as Menu} from 'react-burger-menu'

export default class SideBar extends Component {
    render() {
        return(
            <Menu className="sideBar">
                <input type={"search"} id={"search"} placeholder={"Search Venues"} />
                <PlaceList {...this.props} onListItemClick={this.props.onListItemClick}/>
            </Menu>
        );
    }
}