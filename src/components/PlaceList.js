import React, {Component} from 'react';
import ListItem from './ListItem';

export default class PlaceList extends Component {
    render() {
        return(
            <ol className="placeList">
                {this.props.venues && this.props.venues.map((venue, index) => <ListItem key={index} {...venue} onListItemClick={this.props.onListItemClick}/>)}
            </ol>
        );
    }
}