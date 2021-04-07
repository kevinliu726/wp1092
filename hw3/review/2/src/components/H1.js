import React, { Component } from "react";

const style={
    textDecoration:"line-through",
    opacity :0.5
}

class main extends Component{
    constructor(props){
        super(props);
    }

    render(){
        if (this.props.clicked)
            return(<h1 className="todo-app__item-detail" style={style}>{this.props.text}</h1>);
        else{
            return(<h1 className="todo-app__item-detail" >{this.props.text}</h1>);
        }    
    }
}
export default main