import React, { Component} from "react";
import Header from "../components/Header";
import { TodoInput } from "../components/TodoInput";
import {List} from "../components/List";
import {Button} from "../components/Button"

class TodoApp extends Component {
    constructor(props){
        super(props);
        this.state = {
            all_list: [],
            item_list: [],
            unfinished_list: [],
            finished_list: [],
            footer_show: "hidden",
            clear_completed_show: "hidden",
        };
        this.idx = 0;
        this.list_type = "all";
    }

    clearDefault = event => {
        event.target.value = ''
    }

    handleInput = event => {
        if(event.keyCode === 13 && event.target.value !== ''){
            let string = event.target.value;
            const list_id = this.idx;
            let list = this.create_new_list(string, false, list_id);
            this.setState(state => {
                return({
                    all_list: [...state.all_list, {node: list, completed: false, idx: list_id, todo_string: string}],
                })
            }, () => {this.refresh_list_array();})
            event.target.value = "";
            this.idx++;
        }
    }

    handle_finish = event => {
        let id = parseInt(event.target.id, 10);
        let item = this.state.all_list.find(element => element.idx === id);
        item.completed = !item.completed;
        item.node = this.create_new_list(item.todo_string, item.completed, item.idx);
        this.refresh_list_array();
    }

    handle_delete = event => {
        let index = parseInt(event.target.id, 10);
        this.setState(state => {
            return {all_list: state.all_list.filter(e => {
                return e.idx !== index;
            })}
        }, () => this.refresh_list_array());
    }

    create_new_list(todo_string, completed, index){
        let style;
        if(completed)  style = {textDecoration: "line-through", opacity: 0.5};
        else           style = {textDecoration: "none", opacity: 1};   
        return <List idx = {index} todo_string = {todo_string} completed = {completed} style = {style} finish = {this.handle_finish} delete = {this.handle_delete} />
    }

    get_fillter_array(type){
        return this.state.all_list.filter(e => {
            return e.completed === type;
        }).map(e => {
            return e.node;
        })
    }

    handle_button = event => {
        document.getElementById('all').disabled = false;
        document.getElementById('active').disabled = false;
        document.getElementById('completed').disabled = false;
        document.getElementById(event.target.id).disabled = true;
        this.list_type = event.target.id;
        this.refresh_list_array();
        return;
    }

    handle_clear_completed = event => {
        this.setState(state => {
            return {
                all_list: state.all_list.filter(e => {
                    return !e.completed;
                }),
        }
        }, () => this.refresh_list_array());
    }

    refresh_list_array(){
        let list, finished_list, unfinished_list;
        list = this.state.all_list.map(e => {
            return e.node;
        })
        finished_list = this.get_fillter_array(true);
        unfinished_list = this.get_fillter_array(false);
        if(this.list_type === "active")   list = unfinished_list;
        if(this.list_type === "completed")   list = finished_list;
        let footer_show = "";
        let clear_completed_show = "";
        if(this.state.all_list.length === 0)   footer_show = "hidden";
        if(this.state.all_list.find(element => element.completed === true) === undefined)   clear_completed_show = "hidden";
        this.setState({
            item_list: list,
            finished_list: finished_list,
            unfinished_list: unfinished_list,
            footer_show: footer_show,
            clear_completed_show: clear_completed_show
        })
        return;
    }

    render() {
        return (
            <>
                <Header text="todos" />
                <TodoInput handleInput = {this.handleInput}/>
                <ul className = "todo-app__list" id = "todo-list">{this.state.item_list}</ul>
                <footer className = "todo-app__footer" id = "todo-footer" style = {{visibility: this.state.footer_show}}>
                    <div className = "todo-app__total" id = "total">{this.state.unfinished_list.length + " left"}</div>
                    <ul className = "todo-app__view-buttons" id = "buttons">
                        <Button className = "todo-app__view-button" id = "all" text = "All" onclick = {this.handle_button} />
                        <Button className = "todo-app__view-button" id = "active" text = "Active" onclick = {this.handle_button} />
                        <Button className = "todo-app__view-button" id = "completed" text = "Completed" onclick = {this.handle_button}/>
                    </ul>
                    <div className = "todo-app__clean" id = "clear" style = {{visibility: this.state.clear_completed_show}} >
                        <button onClick = {this.handle_clear_completed}>Clear completed</button>
                    </div>
                </footer>
            </>
        );
    }
}

export default TodoApp;