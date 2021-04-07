import React, { Component } from "react";
import Main from "../containers/Main"
class main extends Component{

    keydown=(e)=>{if(e.key=="Enter") {
        this.props.callback(e.target.value);
        e.target.value="";}
    }


    render(){
        return(<input  className="todo-app__input" onKeyUp={this.keydown} placeholder={ this.props.placeholder}></input>)
    }
}

export default main