import React, { Component } from "react";
import Item from "../containers/Item";


function SelectItem(props){
    switch (props.state.filter) {
        case 0:
            return (props.state.array.map(ex =>(<Item id={ex.id} text={ex.text} done={ex.done} click={props.click} del={props.del}></Item>)))
            
        case 1:
            var undonearray= props.state.array.filter((value)=>(!(value.done)));
            return (undonearray.map(ex =>(<Item id={ex.id} text={ex.text} done={ex.done}  click={props.click} del={props.del}></Item>)))    
            
        case 2:
            var donearray= props.state.array.filter((value)=>((value.done)));
            return (donearray.map(ex =>(<Item id={ex.id} text={ex.text} done={ex.done}  click={props.click} del={props.del}></Item>)))    
            
    }
   
}

class List extends Component{
 
    constructor(props){
        super(props);
    }

    

    render(){
        if(this.props.state.array.length>0)
            return(
            <ul className="todo-app__list" id="todo-list">
                <SelectItem click={this.props.click}  del={this.props.del} state={this.props.state}></SelectItem>
            </ul>
        )
        else
        return(<></>)
    }
}

export default List