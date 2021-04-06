import React from 'react'

export class TodoInput extends React.Component{
    render(){
        return(
            <section className = "todo-app__main">
                <input className = "todo-app__input" id = "todo-input" placeholder = "What needs to be done?" onfocus="this.placeholder = ''" onKeyUp = {this.props.handleInput}/>
            </section>
        );
    }
    
}