import React, {Component} from 'react';
import '../styles/BurgerIcon.css';

export default class BurgerIcon extends Component {
    
    handleChange = (x) => {
        x.classList.toggle("change");
    }

    render() {
        return (
            <div className="container" onClick={this.handleChange("change")}>
                <div className="bar1"></div>
                <div className="bar2"></div>
                <div className="bar3"></div>
            </div>
        )
    }
}