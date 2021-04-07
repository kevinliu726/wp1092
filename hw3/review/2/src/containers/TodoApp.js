import React, { Component } from "react";
import Header from "../components/Header";
import Input from "../components/Input";
import List from "../containers/List";
import Footer from "../containers/Footer"

var count=0;





class TodoApp extends Component {
    constructor(props){
        super(props)
        this.state={array:[],filter:0}
        
}
    
    add=(e)=>{

        this.setState(state =>({array:[...state.array,{"id":count ,"text":e,"done":false}],filter:state.filter}));
        count++;
        console.log(this.state.array);
    }
    del=(id)=>{
        
        var newarray= this.state.array.filter(function(value){ 
            if(value.id !== id)
                return value
            })

        this.setState(state=>({array:newarray,filter:state.filter}))    
        
        

    }
    click=(id)=>{

        
        var newarray= this.state.array.filter(function(value){ 
            if(value.id !== id){
                return value
            }else{
                value.done=!(value.done)
                return value
            }       
        });
        this.setState(state=>({array:newarray,filter:state.filter}))
        
    }

    clearcompleted=()=>{
        var undonearray= this.state.array.filter((value)=>(!(value.done)));
        this.setState(state=>({array:undonearray,filter:state.filter}))
    }

    changefilter=(num)=>{
        this.setState(state=>({array:state.array,filter:num}))
    }

    

    render(){
        return (
            <div className="todo-app__root">
                <Header text="todos" />
                <section className="todo-app__main">
                    <Input callback={this.add}  placeholder="What needs to be done?" />
                    <List click={this.click}  del={this.del} state={this.state}></List>
                </section>
            <Footer state={this.state} change={this.changefilter} clear={this.clearcompleted}></Footer>    
            </div>
        );
    }
}

export default TodoApp;
