import React, {Component} from 'react';
import { Link } from "react-router-dom";
import './index.css';
class Home extends Component {
    constructor(){
        super();
    }
    render(){
        return(
            <div className="home">
                <Link to="/play">
                    <button className="btn homeBtn">
                        Jugar
                    </button>
                </Link>
                <br></br>
                <Link to="/ranking">
                    <button className="btn homeBtn">
                        Ranking
                    </button>
                </Link>
            </div>
        );
    }
}

export default Home;