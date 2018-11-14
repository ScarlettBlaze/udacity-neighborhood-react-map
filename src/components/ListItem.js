import React, {Component} from 'react';

export default class ListItem extends Component {
    render() {
        return (
            <li className="listItem" onClick={()=> this.props.onListItemClick(this.props)}>
               {this.props.name}
            </li>
        )
    }
}