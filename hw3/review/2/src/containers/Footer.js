import React, { Component } from "react";

class Footer extends Component{
    constructor(props){
        super(props)
    }

    leftnum(){
        var count=0;
        for (var i=0;i<this.props.state.array.length;i++){
            if(!(this.props.state.array[i].done))
            count++;
        }
        return count
    }

    All=()=>{
        this.props.change(0);
    }
    Active=()=>{
        this.props.change(1);
    }
    Completed=()=>{
        this.props.change(2);
    }
    Clear=()=>{
        this.props.clear();
    }

    render(){
        if(this.props.state.array.length>0)
        return(
        <footer className="todo-app__footer" id="todo-footer">
            <div className="todo-app__total">{this.leftnum()} left</div>
            <ul className="todo-app__view-buttons">
                <button onClick={this.All}>All</button>
                <button onClick={this.Active}>Active</button>
                <button onClick={this.Completed}>Completed</button>
            </ul>
            <div className="todo-app__clean">
                <button onClick={this.Clear} hidden={this.props.state.array.length-this.leftnum()<=0}>Clear Completed</button>
            </div>
        </footer>
        )
        else return(<></>)
    }
}

export default Footer