import React from "react";
import image from '../img/x.png';

export class List extends React.Component{
    render(){
        return(
            <li className = "todo-app__item">
                <div className = "todo-app__checkbox">
                    <input type = "checkbox" checked = {this.props.completed} id = {this.props.idx} onClick = {this.props.finish} />
                    <label htmlFor = {this.props.idx}/>
                </div>
                <h1 className = "todo-app__item-detail" id = {this.props.idx} style = {this.props.style}>{this.props.todo_string}</h1>
                <img src = {image} alt = "" className = "todo-app__item-x" id = {this.props.idx} onClick = {this.props.delete}/>
            </li>
        )
    }
}