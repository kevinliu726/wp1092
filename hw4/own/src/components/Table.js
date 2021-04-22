import React, {Component} from "react";
import Cell from "../components/Cell"

export default class Table extends Component{
    constructor(props){
        super(props)
        this.state = {
            data: new Array(100).fill().map(()=>Array(27).fill()),
            crow: -1,
            ccol: -1,
            numrow: 100,
            numcol: 27,
            equation: []
        }
        for(var i = 0; i < 100; i++){
            for(var j = 0; j < 27; j++){
                if(j !== 0)
                    this.state.data[i][j] = {rowid: i+1, colid: j, value:'none', header:false, editting: false, chosen: false, overwrite: false}
                else 
                    this.state.data[i][j] = {rowid: i+1, colid: j, value: i+1, header:true, editting: false, chosen: false, overwrite: false}
            }
        }
        this.handleInput = this.handleInput.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleDClick = this.handleDClick.bind(this)
        this.handleClick = this.handleClick.bind(this)
        this.handleOverWrite = this.handleOverWrite.bind(this)
        this.handleDelete = this.handleDelete.bind(this)
    }
    handleDelete(e, rowid, colid){
        if(e.key === 'Backspace'){
            let data = this.state.data
            let equation = this.state.equation
            for(var i = 0; i < equation.length; i++){
                let eqa = equation[i]
                if(eqa[4] === 3 && rowid >= eqa[0] && rowid <= eqa[2] && colid >= eqa[1] && colid <= eqa[3])
                    equation[i][0] = -1 
                if(eqa[0] === rowid && eqa[1] === colid)
                    equation[i][0] = -1
                if(eqa[2] === rowid && eqa[3] === colid)
                    equation[i][0] = -1 
                if(eqa[5] === rowid && eqa[6] === colid)
                    equation[i][0] = -1
            }
            data[rowid-1][colid].value = ""
            this.setState({
                data: data,
                equation: equation,
            })
        }
    }

    handleOverWrite(e, rowid, colid){
        let data = this.state.data 
        data[rowid-1][colid].overwrite = true 
        data[rowid-1][colid].editting = true 
        this.setState({
            data: data 
        })
    }

    handleInput(e, rowid, colid){
        let data = this.state.data 
        data[rowid-1][colid].value = e.target.value
        this.setState({
            data: data
        })
    }

    handleSubmit(e, rowid, colid){
        let data = this.state.data
        if(e.key === 'Enter'){
            data[rowid-1][colid].editting = false
            var newrow = (rowid-1 < 99)? rowid+1:rowid 
            data[rowid-1][colid].chosen = false
            data[newrow-1][colid].chosen = true
            this.setState({
                data: data, 
                crow: newrow,
            })
        }
    }

    handleDClick(e, rowid, colid){
        let data = this.state.data  
        data[rowid-1][colid].editting = true 
        this.setState({
            data: data
        })
    }

    handleClick(e, rowid, colid){
        let data = this.state.data
        if(this.state.crow !== -1 && this.state.ccol !== -1){
            data[this.state.crow-1][this.state.ccol].chosen = false
            data[this.state.crow-1][this.state.ccol].editting = false
            data[this.state.crow-1][this.state.ccol].overwrite = false
        }
        data[rowid-1][colid].chosen = true
        this.setState({
            data: data,
            crow: rowid,
            ccol: colid,
        })
    }

    handleButtonEvent(eid){
        let data = this.state.data
        let equation = this.state.equation
        let numcol = this.state.numcol
        let numrow = this.state.numrow
        let crow = this.state.crow
        let ccol = this.state.ccol
        if(eid === 1){
            if(crow === -1 && ccol === -1){
                let tmp = new Array(numcol).fill()
                for(var j = 0; j < numcol; j++){
                    if(j !== 0)
                        tmp[j] = {rowid: numrow+1, colid: j, value:'none', header:false, editting: false, chosen: false}
                    else 
                        tmp[j] = {rowid: numrow+1, colid: j, value: numrow+1, header:true, editting: false, chosen: false}
                }
                data.push(tmp)
                numrow += 1 
            }
            else{
                for(var i = 0; i < equation.length; i++){
                    let eqa = equation[i]
                    data[eqa[5]-1][eqa[6]].value = ""
                    if(eqa[4] === 3 && eqa[0] < crow && eqa[2] >= crow){
                        equation[i][1] = -1
                    }
                    if(eqa[0] >= crow)
                        equation[i][0] += 1 
                    if(eqa[2] >= crow)
                        equation[i][2] += 1 
                    if(eqa[5] >= crow)
                        equation[i][5] += 1 
                }
                let tmp = new Array(numcol).fill()
                for(j = 0; j < numcol; j++){
                    if(j !== 0)
                        tmp[j] = {rowid: crow, colid: j, value:'none', header:false, editting: false, chosen: false}
                    else 
                        tmp[j] = {rowid: crow, colid: j, value: crow, header:true, editting: false, chosen: false}
                }
                let data1 = data.slice(0,crow-1)
                data1.push(tmp)
                let data2 = data.slice(crow-1)
                for(i = 0; i < data2.length; i++)
                    for(j = 0; j < numcol; j++){
                        if(j === 0)
                            data2[i][j].value += 1
                        data2[i][j].rowid += 1 
                    }
                data = data1.concat(data2)
                crow += 1 
                numrow += 1 
            }
        }
        else if(eid === 2){
            if(crow !== -1 && ccol !== -1){
                for(i = 0; i < equation.length; i++){
                    let e = equation[i]
                    if(e[4] === 3 && e[0] <= crow && e[2] >= crow)
                        equation[i][1] = -1
                    if(e[0] === crow || e[2] === crow || e[5] === crow){
                        equation[i][0] = -1 
                        equation[i][2] = -1
                        if(e[5] === crow)
                            equation[i][5] = -1
                        else if(e[5] > crow)
                            equation[i][5] -= 1
                    }
                    else{
                        if(e[0] > crow)
                            equation[i][0] -= 1 
                        if(e[2] > crow)
                            equation[i][2] -= 1
                        if(e[5] > crow)
                            equation[i][5] -= 1
                    }
                }
                let data1 = data.slice(0,crow-1)
                let data2 = data.slice(crow)
                for(i = 0; i < data2.length; i++)
                    for(j = 0; j < numcol; j++){
                        if(j === 0)
                            data2[i][j].value -= 1
                        data2[i][j].rowid -= 1 
                    }
                data = data1.concat(data2)
                data[crow-1][ccol].chosen = true
                numrow -= 1 
            }
        }
        else if(eid === 3){
            if(crow === -1 && ccol === -1){
                for(i = 0; i < numrow; i++){
                    data[i].push({rowid: i+1, colid: numcol, value:'none', header:false, editting: false, chosen: false})
                }
                numcol += 1
            }
            else{
                for(i = 0; i < equation.length; i++){
                    let eqa = equation[i]
                    data[eqa[5]-1][eqa[6]].value = ""
                    if(eqa[4] === 3 && eqa[1] < ccol && eqa[3] >= ccol)
                        equation[i][0] = -1
                    if(eqa[1] >= ccol)
                        equation[i][1] += 1 
                    if(eqa[3] >= ccol)
                        equation[i][3] += 1 
                    if(eqa[6] >= ccol)
                        equation[i][6] += 1 
                }
                let newdata = []
                for(i = 0; i < numrow; i++){
                    let data1 = data[i].slice(0,ccol)
                    let data2 = data[i].slice(ccol)
                    for(j = 0; j < data2.length; j++)
                        data2[j].colid += 1
                    data1.push({rowid: i+1, colid: ccol, value:'none', header:false, editting: false, chosen: false})
                    let rdata = data1.concat(data2)
                    newdata.push(rdata)
                }
                data = newdata 
                numcol += 1 
                ccol += 1
            }
        }
        else if(eid === 4){
            if(crow !== -1 && ccol !== -1){
                for(i = 0; i < equation.length; i++){
                    let e = equation[i]
                    if(e[4] === 3 && e[1] <= ccol && e[3] >= ccol)
                        equation[i][0] = -1
                    if(e[1] === ccol || e[3] === ccol || e[6] === ccol){
                        equation[i][1] = -1 
                        equation[i][3] = -1
                        if(e[6] === ccol)
                            equation[i][6] = -1
                        else if(e[6] > ccol)
                            equation[i][6] -= 1
                    }
                    else{
                        if(e[1] > ccol)
                            equation[i][1] -= 1 
                        if(e[3] > ccol)
                            equation[i][3] -= 1
                        if(e[6] > ccol)
                            equation[i][6] -= 1
                    }
                }
                let newdata = []
                for(i = 0; i < numrow; i++){
                    let data1 = data[i].slice(0,ccol)
                    let data2 = data[i].slice(ccol+1)
                    for(j = 0; j < data2.length; j++)
                        data2[j].colid -= 1
                    let rowdata = data1.concat(data2)
                    newdata.push(rowdata)
                }
                newdata[crow-1][ccol].chosen = true
                data = newdata
                numcol -= 1
            }
        }
        this.setState({
            data: data,
            equation: equation,
            numcol: numcol,
            numrow: numrow,
            crow: crow,
            ccol: ccol,
        })
        this.props.deBottom()
    }

    NumtoLetter(number){
        var baseChar = ("A").charCodeAt(0), letters  = "";
        do {
          number -= 1;
          letters = String.fromCharCode(baseChar + (number % 26)) + letters;
          number = (number / 26) >> 0;
        } while(number > 0);
        return letters;
    }

    LettertoNumber(letter){
        let alpha = new Array(this.state.numcol-1).fill()
        for(var i = 0; i < alpha.length; i++)
            alpha[i] = this.NumtoLetter(i+1)  
        var cidx = -1;
        for(i = 0; i < alpha.length; i++)
            if(alpha[i] === letter){
                cidx = i+1
                break
            }
        return cidx 
    }

    isLetter(str){
        return str.length === 1 && str.match(/[a-z]/i);
    }

    isNumeric(str) {
        if (typeof str !== "string") return false 
        return !isNaN(str) && !isNaN(parseFloat(str)) 
    }

    render(){
        let alpha = new Array(this.state.numcol-1).fill()
        for(var i = 0; i < alpha.length; i++)
            alpha[i] = this.NumtoLetter(i+1)

        return(
            <div className='table-main'>
                <tr>
                    <th></th>
                    {alpha.map((letter,idx)=>(
                        (this.state.ccol!==idx+1)? <th>{letter}</th>: <th className='selected-header'>{letter}</th>
                    ))}
                </tr>
                {this.state.data.map(row=>(
                    <tr>
                        {row.map(data=>(
                            <Cell id={(this.state.numcol-1)*(data.rowid-1)+data.colid} crow={this.state.crow} 
                                handleOverWrite={this.handleOverWrite} handleKey={this.handleKey} 
                                handleClick={this.handleClick} handleDClick={this.handleDClick} 
                                handleInput={this.handleInput} handleSubmit={this.handleSubmit} 
                                handleDelete={this.handleDelete} data={data}/> 
                        ))}
                    </tr>
                ))}
            </div>
        )
    }
}