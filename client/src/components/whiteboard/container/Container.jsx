import React from 'react';
import Board from '../board/Board';

import './style.css';

class Container extends React.Component
{
    constructor(props) {
        super(props);

        this.state = {
            color: "#000000",
            size: "5",
            bgcolor:"white",
            isclick:false
        }
    }

    changeColor(params) {
        this.setState({
            color: params.target.value
        })
    }

    changeSize(params) {
        this.setState({
            size: params.target.value
        })
    }
        setStatus(){
            this.setState({
                isclick:false
            }
            )
        }
        erase(){
            this.setState({color:"white",size:"50"})
        }
        pen(){
            this.setState({color:"black",size:"5"})
        }
        componentDidMount(){
            document.body.style.backgroundColor="rgb(123 166 237 / 50%)";
        }
        componentWillUnmount(){
            document.body.style.backgroundColor="white";
        }
    render() {

        return (
            <div className="container mx-auto my-10">
                <div className="grid grid-cols-5 sm:space-x-5  space-x-1 mb-4  tools-section sm:flex sm:justify-center items-center">
                    <div className="font-bold text-blue-900 sm:text-lg">
                        Pen Color : &nbsp; 
                        <input type="color" value={this.state.color} onChange={this.changeColor.bind(this)}/>
                    </div>

                    <div className="font-bold text-blue-900 sm:text-lg">
                        Pen Size : &nbsp; 
                        <select value={this.state.size} onChange={this.changeSize.bind(this)}>
                            <option> 5 </option>
                            <option> 10 </option>
                            <option> 15 </option>
                            <option> 20 </option>
                            <option> 25 </option>
                            <option> 30 </option>
                            <option>100</option>
                        </select>
                    </div>
                    <div>
                        <button onClick={()=>{this.setState({bgcolor:"white",isclick:true})}} className='text-blue-900 font-bold'>Clear</button>
                    </div>
                    <div className='text-blue-900 font-bold'>
                        <button onClick={this.erase.bind(this)} className=''>erase</button>
                    </div>
                    <div className='text-blue-900 font-bold'>
                        <button onClick={this.pen.bind(this)} className=''>Pen</button>
                    </div>
                </div>

                <div className="rounded-md ">
                    <Board color={this.state.color} size={this.state.size} bgcolor={this.state.bgcolor} setStatus={this.setStatus.bind(this)} isclick={this.state.isclick}></Board>
                </div>
            </div>
        )
    }
}

export default Container