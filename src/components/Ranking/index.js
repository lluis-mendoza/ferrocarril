import React, {Component} from 'react';
import { connect } from 'react-redux';
import { find } from '../../redux/actions/userActions';

class Ranking extends Component {
    constructor(props){
        super(props);
    }
    componentDidMount(){
        this.props.find();
    }
    renderUsers(){
        if (this.props.users !== undefined){
            let items = []
            for(let i = 0; i<this.props.users.length; ++i){
                items.push(<tr><td>{this.props.users[i].name}</td><td>{this.props.users[i].numWins}</td></tr>);
            }
            return items;
            
        }
        return null;
    }
    render(){
        return(
            <div className="home">
                <div className="tableDiv">
                    <table className="tableRanking">
                        <thead>
                            <th>Jugadores</th>
                            <th>Partidas ganadas</th>
                        </thead>
                        <tbody>
                            {this.renderUsers()}
                        </tbody>
                    </table>
                </div>


            </div>
        );
    }
}
const mapState = state =>{
    return {users: state.userReducer.users};
}
export default connect(mapState, {find})(Ranking);