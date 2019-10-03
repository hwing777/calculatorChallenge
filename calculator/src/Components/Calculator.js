import React from 'react';
import Board from './Board.js';
import './Components.css';


function Screen(props) {
    return (
      <div className = "screen">
        {props.value}
      </div>
    )
  }

class Calculator extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        value: "0",
        calculation: "none",
        saved: "0",
        replaceScreen: true
      };
    }
  
    renderScreen(i) {
      return (
        <Screen
          value={i}
        />
      );
    }
  
    handleClick(i) {
        const value = this.state.value;
        const calculation = this.state.calculation;
        const saved =  this.state.saved;
        const replaceScreen = this.state.replaceScreen;
        const numbers = ["0","1","2","3","4","5","6","7","8","9",".","π"];
        const operators = ["^","/","x","-","+"];
        
        // numbers
        if(numbers.includes(i)){
            if(!replaceScreen && value != "0" && i != "π"){
                this.setState({
                    value: value.concat(i),
                    calculation: calculation,
                    saved: saved,
                    replaceScreen: replaceScreen
                });
            }
            else if(i == "π"){
                this.setState({
                    value: "3.1415926",
                    calculation: calculation,
                    saved: saved,
                    replaceScreen: replaceScreen
                });
            }
            else{
                this.setState({
                    value: i,
                    calculation: calculation,
                    saved: saved,
                    replaceScreen: false
                });
            }
        }
        // operators
        else {
            // clear
            if(i == "C"){
                this.setState({
                    value: 0,
                    calculation: "none",
                    saved: 0,
                    replaceScreen: true
                });
            }
            // delete
            else if(i == "<-"){
                if(value.length == 1){
                    this.setState({
                        value: "0",
                        calculation: calculation,
                        saved: saved,
                        replaceScreen: true
                    });
                }
                else{
                    this.setState({
                        value: value.substring(0,value.length-1),
                        calculation: calculation,
                        saved: saved,
                        replaceScreen: replaceScreen
                    });
                }
            }
            // sqrt
            else if(i == "√"){
                this.setState({
                    value: (Math.sqrt(parseFloat(value))).toFixed(7),
                    calculation: "none",
                    saved: 0,
                    replaceScreen: true
                });
            }
            // factorial
            else if(i == "!"){
                var answer = parseInt(value);
                for(var i=answer-1; i>0; i--){
                    answer = answer*i;
                }
                this.setState({
                    value: answer,
                    calculation: "none",
                    saved: 0,
                    replaceScreen: true
                });
            }

            else{
                //if you have an operator
                if(operators.includes(i)){
                    this.setState({
                        calculation: i,
                        saved: value,
                        replaceScreen: true
                    });
                }

                //NORMAL CALCULATIONS: calculate if any button is pushed
                if(calculation == "/"){
                    const answer = (parseFloat(saved)/parseFloat(value)).toString();
                    this.setState({
                        value: answer,
                        saved: answer,
                        replaceScreen: true
                    });
                }
                else if(calculation == "x"){
                    const answer = (parseFloat(value)*parseFloat(saved)).toString();
                    this.setState({
                        value: answer,
                        saved: answer,
                        replaceScreen: true
                    });
                }
                else if(calculation == "-"){
                    const answer = (parseFloat(saved)-parseFloat(value)).toString();
                    this.setState({
                        value: answer,
                        saved: answer,
                        replaceScreen: true
                    });
                }
                else if(calculation == "+"){
                    const answer = (parseFloat(saved)+parseFloat(value)).toString();
                    this.setState({
                        value: answer,
                        saved: answer,
                        replaceScreen: true
                    });
                }
                else if(calculation == "^"){
                    const answer = (Math.pow(parseFloat(saved),parseFloat(value))).toString();
                    this.setState({
                        value: answer,
                        saved: answer,
                        replaceScreen: true
                    });
                }

                //If equal, clear everything and reset
                if(i == "="){
                    this.setState({
                        calculation: "none",
                        saved: "0",
                        replaceScreen: true
                    });
                }
            }
        }
    }
  
    render() {
      return (
        <div>
          <div className="screen">
            <Screen
              value = {this.state.value}
            />
          </div>
          <div className="board">
            <Board  
              onClick={i => this.handleClick(i)}
            />
          </div>
          <div>{"value: "+this.state.value}</div>
          <div>{"saved: "+this.state.saved}</div>
          <div>{"calculation: "+this.state.calculation}</div>
        </div>
      );
    }
  }

export default Calculator;