import React, { Component, Fragment } from "react";
export default class Header extends Component{
    onBottom(e,eid){
        this.props.onBottom(e,eid)
    }

    render(){
        return(
            <Fragment>
                <div className="left-header">
                    <button className="gg-add-r" id="left-add" onClick={(e)=>this.onBottom(e,1)}>+</button>
                    <button className="gg-minus-r" id="left-minus" onClick={(e)=>this.onBottom(e,2)}>-</button>
                </div>
                <div className="top-header">
                    <button className="gg-add-r" id="top-add" onClick={(e)=>this.onBottom(e, 3)}>+</button>
                    <button className="gg-minus-r" id="top-minus" onClick={(e)=>this.onBottom(e, 4)}>-</button>
                </div>
            </Fragment>
        )
    }
}