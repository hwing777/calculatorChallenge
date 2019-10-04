import React from 'react';
import './Components.css';

function Square(props) {
    return (
      <button className="square" onClick={props.onClick}>
        {props.value}
      </button>
    );
  }

function Rectagle(props) {
    return (
        <button className="rectangle" onClick={props.onClick}>
            {props.value}
        </button>
    );
}
  
class Grid extends React.Component {

    renderSquare(i) {
        return (
        <Square
            value={i}
            onClick={() => this.props.onClick(i)}
        />
        );
    }

    render() {
        return (
        <div>
            <div className="row">
                {this.renderSquare("±")}
                {this.renderSquare("^")}
                {this.renderSquare("C")}
                {<Rectagle value={"del"} onClick={() => this.props.onClick("del")}/>}
            </div>
            <div className="row">
                {this.renderSquare("7")}
                {this.renderSquare("8")}
                {this.renderSquare("9")}
                {this.renderSquare("/")}
                {this.renderSquare("√")}
            </div>
            <div className="row">
                {this.renderSquare("4")}
                {this.renderSquare("5")}
                {this.renderSquare("6")}
                {this.renderSquare("x")}
                {this.renderSquare("%")}
            </div>
            <div className="row">
                {this.renderSquare("1")}
                {this.renderSquare("2")}
                {this.renderSquare("3")}
                {this.renderSquare("-")}
                {this.renderSquare("π")}
            </div>
            <div className="row">
                {this.renderSquare("0")}
                {this.renderSquare(".")}
                {this.renderSquare("=")}
                {this.renderSquare("+")}
                {this.renderSquare("!")}
            </div>
        </div>
        );
    }
}

export default Grid;