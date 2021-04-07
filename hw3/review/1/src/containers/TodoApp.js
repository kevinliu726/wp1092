import React, { Component } from "react";
import Header from "../components/Header";

class TodoApp extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            all: [], 
            temp: [],
            list: [],
            s:[],
            ls:[],
            r: 0
        }
    }

    HandleKeyPress = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault()
            if(event.target.value !== ""){
                this.state.all.push(event.target.value)
                this.state.s.push(false)
                //console.log(this.state.s)
                this.setState({list: this.state.all, r: this.state.r+1, ls: this.state.s})
                event.target.value = ""
            }
        }
    }

    footerclass(){
        //console.log("foot")
        if(this.state.all.length !== 0){
            if(this.state.all.length>this.state.r){
                return(
                <footer class="todo-app__footer" id="todo-footer">
                    <div class="todo-app__total">
                        {this.state.r} left
                    </div>
                    <ul class="todo-app__viewbuttons">
                        <button id="All" onClick={()=>this.show_all()}>All</button>
                        <button id="Active" onClick={()=>this.show_active()}>Active</button>
                        <button id="Completed" onClick={()=>this.show_completed()}>Completed</button>
                    </ul>
                    <div class="todo-app__clean">
                        <button id="Clear" onClick={()=>this.clear()}>Clear completed</button>
                    </div>
                </footer>
                )
            }
            else{
                return(
                    <footer class="todo-app__footer" id="todo-footer">
                        <div class="todo-app__total">
                            {this.state.r} left
                        </div>
                        <ul class="todo-app__viewbuttons">
                            <button id="All" onClick={()=>this.show_all()}>All</button>
                            <button id="Active" onClick={()=>this.show_active()}>Active</button>
                            <button id="Completed" onClick={()=>this.show_completed()}>Completed</button>
                        </ul>
                        <div class="todo-app__clean"></div>
                </footer>
                    )
            }
        }
    }

    complete(i){
        if(this.state.s.length === this.state.ls.length){
            this.state.s[i]=!this.state.s[i]
            //console.log(this.state.s)
            if(this.state.s[i]){
                this.setState({r: this.state.r-1})
            }
            else{
                this.setState({r: this.state.r+1})
            }
            //console.log(this.state.all)
        }
    }

    remove(i){
        console.log("r")
        this.state.all.splice(i,1)
        var removed = this.state.s.splice(i,1)  
        if(!removed[0]){
            this.setState({r: this.state.r-1})
        }
        else{
            this.setState({r: this.state.r})
        }
    }

    show_all(){
        //console.log(this.state.all)
        this.setState({list: this.state.all, ls: this.state.s})
        //console.log(this.state.list)
    }

    show_active(){
        this.state.ls = []
        for(var i=0; i<this.state.all.length; i++){
            if(!this.state.s[i]){
                this.state.temp.push(this.state.all[i])
                this.state.ls.push(this.state.s[i])
            }
        }
        //console.log(this.state.temp)
        this.setState({list: this.state.temp, temp: []})
        //console.log(this.state.list)
    }

    show_completed(){
        this.state.ls = []
        for(var i=0; i<this.state.all.length; i++){
            if(this.state.s[i]){
                this.state.temp.push(this.state.all[i])
                this.state.ls.push(this.state.s[i])
            }
        }
        this.setState({list: this.state.temp, temp: []})
    }

    clear(){
        var i=0
        while(i<this.state.all.length){
            if(this.state.s[i]){
                this.remove(i)
            }
            else{
                i++
            }
        } 
    }

    render() {
        return (
            <div id="root" class="todo-app__root">
                <header class="todo-app__header">
                    <Header text="todos" />
                </header>
                <input class="todo-app__input" placeholder="What needs to be done?" onKeyPress={this.HandleKeyPress}/>
                <section class="todo-app__main">
                    <ul class="todo-app__list" id="todo-list">
                        {this.state.list.map((e, i) => 
                        <li class="todo-app__item">
                            <div class="todo-app__checkbox" key={i} id={"checkbox"+i} onClick={()=>this.complete(i)}>
                                <input type="checkbox" checked={this.state.ls[i]}></input>
                                <label for={i}></label>
                            </div>
                            <h1 class="todo-app__item-detail" id={"detail"+i} style={this.state.ls[i] ? 
                            { textDecoration: 'line-through', opacity: "0.5" } : 
                            { textDecoration: 'none' }} >
                                {e}
                            </h1>
                            <img src="./img/x.png" class="todo-app__item-x" onClick={()=>this.remove(i)}></img>
                        </li>
                        )}
                        
                    </ul>
                </section>
                {this.footerclass()}
            </div>
        );
    }
}


export default TodoApp;
