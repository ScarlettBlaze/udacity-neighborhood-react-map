import React, {Component} from 'react';

export default class ListItem extends Component {
    render() {
        return (
            <li className="listItem" onClick={()=> this.props.onListItemClick(this.props)}>
               <img src={this.props.categories[0].icon.prefix+"45"+this.props.categories[0].icon.suffix} 
                alt={this.props.categories[0].name}/>
               <div className= "venueName"><span>{this.props.name}</span><br/>
               <span>{this.props.location.address}</span></div>
            </li>
        );
    }
}