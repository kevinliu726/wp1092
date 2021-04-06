import React from 'react';

export class Button extends React.Component{
    render(){
        return(
            <li>
                <button className = {this.props.class} id = {this.props.id} onClick = {this.props.onclick}>
                    {this.props.text}
                </button>
            </li>
        )
    }
}