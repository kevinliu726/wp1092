import React, { Component } from "react";
import H1 from "../components/H1"

/*
function Inner(props){
    console.log(props);
    
        return (<>
        <div className="todo-app__checkbox">
            <input type="checkbox" id={props.id} onclick={this.clicked(props.id)}></input>
            <label for={props.id}></label>
        </div>
        <h1 className="todo-app__item-detail" style={this.state.clicked?"text-decoration: line-through; opacity: 0.5;":""}></h1>
        <img src="./img/x.png" className="todo-app__item-x" onClick={props.del}></img>
        </>)
    
}
*/

class Item extends Component{
    constructor(props){
        super(props);
    }
    
    

   
    onclick=(e)=>{
        this.props.click(this.props.id)
    }

    ondel=(e)=>{
        this.props.del(this.props.id)
    }

    render(){ 
        return(

            <li className="todo-app__item">
                <div className="todo-app__checkbox">
                    <input type="checkbox" id={this.props.id} onChange={this.onclick} checked={this.props.done}></input>
                    <label htmlFor={this.props.id}></label>
                </div>
                <H1 clicked={this.props.done} text={this.props.text}></H1>
                <img src="./img/x.png" className="todo-app__item-x" onClick={this.ondel}></img>
                
            </li>)
    }
}

export default Item;