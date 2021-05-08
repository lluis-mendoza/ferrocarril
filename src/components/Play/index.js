import React, {Component} from 'react';
import './index.css';
import { connect } from 'react-redux';
import { Link} from "react-router-dom";
import { find, create} from '../../redux/actions/userActions';
import Modal from 'react-awesome-modal';

class Play extends Component {
  constructor(props){
    super(props);
    this.state = {
      numSelect: 1,
      name: "",
      selected: [""],
      visibleModal: false
    }
  }
  componentDidMount(){
    this.props.find();
  }
  onChange = (e) => {
    this.setState({ [e.currentTarget.id]: e.target.value });
  };
  createUser(){
    const User = {
      name: this.state.name,
    }
    this.props.create(User);
    this.closeModal();
    this.props.find();
  }
  openModal() {
    this.setState({
      visibleModal : true
    });
  }

  closeModal() {
      this.setState({
        visibleModal : false
      });
  }
  renderUsers(index){
    if (this.props.users !== undefined){
      let items = []
      for(let i = 0; i<this.props.users.length; ++i){
        const val = this.props.users[i].name;
        if (!this.state.selected.includes(val) || this.state.selected.indexOf(val) == index){
          items.push(<option value={val}>{val}</option>);
        }
      }
      return items;
      
    }
    return null;
  }
  changeSelectOptionHandler(event){
    let newSelected = this.state.selected;
    newSelected[parseInt(event.target.id)] = event.target.value;
    this.setState({selected: newSelected})
  }
  renderSelection(){
    let select = [];
    for(let i = 0; i<this.state.numSelect;++i){
      select.push(
        <div className="content-select">
          <select value={this.state.selected[i] != "" ? this.state.selected[i]: null} id={i} onChange={(e) => this.changeSelectOptionHandler(e)}>
            <option disabled selected value> -- select an option -- </option>
            {this.renderUsers(i)}
          </select>
          <i></i>
        </div>);
    }
    return select;
  }
  addUser() {
    if (this.state.numSelect < 8){
      let newNumSelect = this.state.numSelect + 1;
      let newSelected = this.state.selected;
      newSelected.push("");
      this.setState({numSelect: newNumSelect, selected: newSelected});
    }
  }
  removeUser() {
    if (this.state.numSelect > 1){
      let newNumSelect = this.state.numSelect - 1;
      let newSelected = this.state.selected;
      newSelected.pop();
      this.setState({numSelect: newNumSelect, selected: newSelected});
    }

  }
  render(){
      return(
        <div class="play">
          <div className="playButtons">
            <input className="btn playButton" type="button" value="Add User" onClick={() => this.addUser()} />
            <input className="btn playButton" type="button" value="Remove User" onClick={() => this.removeUser()} />
            <input className="btn playButton" type="button" value="Create User" onClick={() => this.openModal()} />
          </div>
          <div className="selections">
            {this.renderSelection()}
          </div>
          <Modal visible={this.state.visibleModal} width="400" height="300" effect="fadeInUp" onClickAway={() => this.closeModal()}>
                      <div>
                          <div class="titleModal">
                            <p>Create user</p>
                          </div>
                          
                          <a href="javascript:void(0);" onClick={() => this.closeModal()}>Close</a>
                          <div className="inputModalDiv"
                          onChange={this.onChange}
                          value={this.state.name}
                          id="name">
                            <input className="inputModal" type="text" className="form-input" placeholder="Name" />
                          </div>
                          <input type="button" value="Create" onClick={() => this.createUser()} />
                          
                      </div>
          </Modal>
          <div className="startContainer">
            <Link to={{pathname: "/game", state: { players: this.state.selected}}}>
              <button className="btn startButton">
                  Start
              </button>
            </Link>
          </div>

      </div>
      );
  }
}


const mapState = state =>{
  return {users: state.userReducer.users};
}
export default connect(mapState, {find, create})(Play);