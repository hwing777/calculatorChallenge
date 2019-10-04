import React from 'react';
import Grid from './Board.js';
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
      return (<Screen value={i}/>);
    }

    addNumbers(i, value, calculation, saved, replaceScreen){
        if(!replaceScreen && value != "0" && i != "π"){
            if (value.length < 9){
                this.setState({
                    value: value.concat(i),
                    calculation: calculation,
                    saved: saved,
                    replaceScreen: replaceScreen
                });
            } 
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

    clear(){
        this.setState({
            value: 0,
            calculation: "none",
            saved: 0,
            replaceScreen: true
        });
    }

    changeSign(value, calculation, saved){
        this.setState({
            value: -1*value,
            calculation: calculation,
            saved: saved,
            replaceScreen: false
        });
    }

    delete(value, calculation, saved, replaceScreen){
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

    sqrt(value){
        var answer = Math.sqrt(parseFloat(value));
        var strAnswer = answer.toString();
        if (strAnswer.length > 8){
            if (answer < 10){
                answer = answer.toFixed(8);
            }
            else{
                answer = answer.toExponential(4);
            }
        }

        this.setState({
            value: answer,
            calculation: "none",
            saved: 0,
            replaceScreen: true
        });
    }

    factorial(value){
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

    percent(value){
        var answer = 0.01*(parseFloat(value));
        this.setState({
            value: answer,
            calculation: "none",
            saved: 0,
            replaceScreen: true
        });
    }

    saveOperator(i, value){
        this.setState({
            calculation: i,
            saved: value,
            replaceScreen: true
        });
    }

    performCalculation(saved, calculation, value){
        var answer;
        if(calculation == "/"){
            answer = parseFloat(saved)/parseFloat(value);
        }
        else if(calculation == "x"){
            answer = parseFloat(value)*parseFloat(saved);
        }
        else if(calculation == "-"){
            answer = parseFloat(saved)-parseFloat(value);
        }
        else if(calculation == "+"){
            answer = parseFloat(saved)+parseFloat(value);
        }
        else if(calculation == "^"){
            answer = Math.pow(parseFloat(saved),parseFloat(value));
        }
        
        var strAnswer = answer.toString();
        if (strAnswer.length > 8){
            if (answer < 10){
                answer = answer.toFixed(8);
            }
            else{
                answer = answer.toExponential(4);
            }
        }
        answer = answer.toString();

        this.setState({
            value: answer,
            saved: answer,
            replaceScreen: true
        });
    }

    equals(){
        this.setState({
            calculation: "none",
            saved: "0",
            replaceScreen: true
        });
    }
  
    handleClick(i) {
        const value = this.state.value;
        const calculation = this.state.calculation;
        const saved =  this.state.saved;
        const replaceScreen = this.state.replaceScreen;
        const numbers = ["0","1","2","3","4","5","6","7","8","9",".","π"];
        const operators = ["^","/","x","-","+"];
        
        // if number
        if(numbers.includes(i)){
            this.addNumbers(i, value, calculation, saved, replaceScreen);
        }
        // if operator
        else {
            // clear
            if(i == "C"){ this.clear(); }
            // change signs
            if(i == "±"){ this.changeSign(value, calculation, saved); }
            // delete
            else if(i == "del"){ this.delete(value, calculation, saved, replaceScreen); }
            // sqrt
            else if(i == "√"){ this.sqrt(value); }
            // factorial
            else if(i == "!"){ this.factorial(value); }
            // percent
            else if(i == "%"){ this.percent(value); }
            // else perform operations
            else{
                // if you have an operator, save and store prev value
                if(operators.includes(i)){ this.saveOperator(i, value); }
                // perform calculation if any operator is pushed
                if(operators.includes(calculation)){ this.performCalculation(saved, calculation, value); }
                // if equal sign, clear everything and reset
                if(i == "="){ this.equals(); }
            }
        }
    }
  
    render() {
      return (
        <div>
            <Screen value = {this.state.value} />
          <div className="board">
            <Grid  
              onClick={i => this.handleClick(i)}
            />
          </div>
        </div>
      );
    }
  }

export default Calculator;