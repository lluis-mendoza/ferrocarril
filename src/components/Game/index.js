import React, {Component} from 'react';
import { update } from '../../redux/actions/userActions';
import Keypad from './keypad';
import { connect } from 'react-redux';
import Button from './button';
import AnimatedNumber from "animated-number-react";
import './index.css';
class Game extends Component {
  constructor(props){
    super(props);
    let aux = this.props.location.state.players;
    let players = []
    for(let i = 0; i<aux.length; ++i){
      players.push({name:aux[i], numCompras: 0, score: [0], lastActions: []});
    }
    this.state = {
      players: players,
      selectedId: -1,
      showKeypad: false,
    }
  }
  componentDidMount(){

  }
  renderNames(){
    //let items = this.state.players.map((r) =>{ return <th>{r.name}</th>});
    let items = [];
    for(let i = 0; i< this.state.players.length; ++i){
      items.push(<th onClick={(e) => this.onClickName(i)}>{this.state.players[i].name}</th>);
    }
    return items;
  }
  formatValue = value => `${Number(value).toFixed(0)}`;
  onClickName(i){
    console.log(i);
    this.setState({selectedId: i,
                  showKeypad: true});

  }
  renderScore(i){
    let items = [];
    for(let j = 0; j< this.state.players.length; ++j){
      let winner = false;
      if (i == 0) winner = this.state.players[j].score[i] < 0;
      else winner = this.state.players[j].score[i] < this.state.players[j].score[i-1];
      items.push(<td className={winner ? 'winner' : null} onClick={(e) => this.onClickName(j)}><AnimatedNumber
        value={this.state.players[j].score[i]}
        formatValue={this.formatValue}
        duration={300}
      /> </td>);
    }

    return items;
  }
  renderScores(){
    let items = [];
    for(let i = 0; i<this.state.players[0].score.length; ++i){
      items.push(<tr>{this.renderScore(i)}</tr>);
    }
    return items;
  }
  renderCompras(){
    let items = [];
    for(let i = 0; i< this.state.players.length; ++i){
      items.push(<td onClick={(e) => this.onClickName(i)}>Compras: <AnimatedNumber
        value={this.state.players[i].numCompras}
        formatValue={this.formatValue}
        duration={100}
      /> </td>);
    }
    return items;
  }
  renderDisplay(){
    return (<div className="tableDiv">
        <p className="name">{this.state.players[this.state.selectedId].name}</p>
        <p className="text">Compras: <AnimatedNumber
        value={this.state.players[this.state.selectedId].numCompras}
        formatValue={this.formatValue}
        duration={300}
        /></p>
        <p className="text">Puntuación: <AnimatedNumber
        value={this.state.players[this.state.selectedId].score[this.state.players[this.state.selectedId].score.length-1]}
        formatValue={this.formatValue}
        duration={300}
        /></p>
    </div>);
  }
  finishGame(){
    let minValue = this.state.players[0].score[6];
    let index = 0;
    for(let i = 1; i<this.state.players.length; ++i){
        if (this.state.players[i].score[6] < minValue){
          minValue = this.state.players[i].score[6];
          index = i;
        }
    }
    const User = {
      name: this.state.players[index].name,
    }
    this.props.update(User);
  }
  handleButtonClick(event){
    let newPlayer = this.state.players;
    const value = event.target.id;
    console.log(value);
    switch(value){
      case "restar":
        if (newPlayer[this.state.selectedId].lastActions.length > 0){
          let lastAction = newPlayer[this.state.selectedId].lastActions[newPlayer[this.state.selectedId].lastActions.length-1]
          if (lastAction == 'compra'){
            newPlayer[this.state.selectedId].numCompras -= 1;
          }
          else newPlayer[this.state.selectedId].score[newPlayer[this.state.selectedId].score.length-1] -= parseInt(lastAction);
          newPlayer[this.state.selectedId].lastActions.pop();
        }
        break;
      case "comodin":
        newPlayer[this.state.selectedId].score[newPlayer[this.state.selectedId].score.length-1] += 50;
        newPlayer[this.state.selectedId].lastActions.push('50');
        break;
      case "figura":
        newPlayer[this.state.selectedId].score[newPlayer[this.state.selectedId].score.length-1] += 10;
        newPlayer[this.state.selectedId].lastActions.push('10');
        break;
      case "compra":
        newPlayer[this.state.selectedId].numCompras += 1;
        newPlayer[this.state.selectedId].lastActions.push('compra');
        break;
      case "ganador":
        let val = newPlayer[this.state.selectedId].score.length*10;
        newPlayer[this.state.selectedId].score[newPlayer[this.state.selectedId].score.length-1] -= val;
        newPlayer[this.state.selectedId].lastActions.push((-val).toString());
        break;
      case "acabar":
        if (newPlayer[0].score.length < 7){
          for(let i = 0; i< newPlayer.length; ++i){
            newPlayer[i].score.push(newPlayer[i].score[newPlayer[i].score.length-1]);
          }
        }
        else this.finishGame();
        break;
      case "ok":
        this.setState({showKeypad: false});
        break;
      case "clear":
        let clearNum = newPlayer[this.state.selectedId].score[newPlayer[this.state.selectedId].score.length-1];
        if (newPlayer[this.state.selectedId].score.length > 1){
          newPlayer[this.state.selectedId].score[newPlayer[this.state.selectedId].score.length-1] = newPlayer[this.state.selectedId].score[newPlayer[this.state.selectedId].score.length-2];
        }
        else newPlayer[this.state.selectedId].score[newPlayer[this.state.selectedId].score.length-1] = 0
        newPlayer[this.state.selectedId].lastActions.push(-clearNum)
        break;
      default:
        newPlayer[this.state.selectedId].score[newPlayer[this.state.selectedId].score.length-1] += parseInt(value);
        newPlayer[this.state.selectedId].lastActions.push(value);
    }
    this.setState({players: newPlayer});
  }
  render(){
      return(
          <div className="game">
            {!this.state.showKeypad && <div className="tableDiv">
              <table>
                <thead>
                  <tr>
                    {this.renderNames()}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    {this.renderCompras()}
                  </tr>
                  {this.renderScores()}
                </tbody>
              </table>
            </div>}
            {this.state.showKeypad && this.renderDisplay()}
            {this.state.showKeypad && <Keypad>
              <button className="btn key"><img onClick={(e) => this.handleButtonClick(e)} id="compra" className="cover" src="./buy.png"/></button>
              <button className="btn key"><img onClick={(e) => this.handleButtonClick(e)} id="comodin" className="cover" src="./joker.png"/></button>
              <button className="btn key"><img onClick={(e) => this.handleButtonClick(e)} id="figura" className="cover" src="./queen.png"/></button>
              <button className="btn key"><img onClick={(e) => this.handleButtonClick(e)} id="restar" className="cover" src="./undo.png"/></button>

              <button className="btn key btnTxt" onClick={(e) => this.handleButtonClick(e)} id="7">7</button>
              <button className="btn key btnTxt" onClick={(e) => this.handleButtonClick(e)} id="8">8</button>
              <button className="btn key btnTxt" onClick={(e) => this.handleButtonClick(e)} id="9">9</button>
              <button className="btn key btnTxt" onClick={(e) => this.handleButtonClick(e)} id="clear">C</button>

              <button className="btn key btnTxt" onClick={(e) => this.handleButtonClick(e)} id="4">4</button>
              <button className="btn key btnTxt" onClick={(e) => this.handleButtonClick(e)} id="5">5</button>
              <button className="btn key btnTxt" onClick={(e) => this.handleButtonClick(e)} id="6">6</button>
              <button className="btn key"><img onClick={(e) => this.handleButtonClick(e)} id="ganador" className="cover" src="./winner.png"/></button>

              <button className="btn key btnTxt" onClick={(e) => this.handleButtonClick(e)} id="1">1</button>
              <button className="btn key btnTxt" onClick={(e) => this.handleButtonClick(e)} id="2">2</button>
              <button className="btn key btnTxt" onClick={(e) => this.handleButtonClick(e)} id="3">3</button>
              <button className="btn key btnTxt" onClick={(e) => this.handleButtonClick(e)} id="ok">ok</button>
            </Keypad>}
            {!this.state.showKeypad && <div className="acabarDiv">
            <button className="btn acabarBtn" onClick={(e) => this.handleButtonClick(e)} id="acabar">Acabar ronda</button>
              </div>}
          </div>
      );
  }
}
const mapState = state =>{
  return {};
}
export default connect(mapState, {update})(Game);