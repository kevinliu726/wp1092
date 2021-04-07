import React, { Component } from "react";
import Input from "../components/Input";

class main extends Component{
    render(){
        return(<section className="todo-app__main">
        <Input placeholder="What needs to be done?" />

    </section>)
    }
}
export default main