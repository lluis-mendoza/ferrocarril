import React, {Component} from 'react';
import "./button.css";

class Button extends Component {
    render(){
        return(
            <button 
                className="btn key"
                onClick={this.props.onClick}
                data-size={this.props.size}
                data-value={this.props.value}>
                    {this.props.label}
            </button>
        );
    }
}

export default Button;