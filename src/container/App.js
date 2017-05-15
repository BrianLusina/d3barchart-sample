import React, { Component } from 'react';
import Chart from '../components/chart';
import fetchData from '../api/api';
import * as constants from '../constants/constants';

/**
 * Container of application that will host and render children components
 * responsible for passing down props to other children in the application tree
 * This is the root of the application
 * */
class App extends Component {
    constructor(){
        super();
        this.state = {

        }
    }

    /**/
    componentWillMount(){

    }

    render() {
        return (
            <div className="card">
                <h3 className="title">Gross Domestic Product</h3>
                <Chart/>
                <div className="notes">

                </div>
            </div>
        );
    }

    /**
     * Called after render, best place to fetch data from API
     * */
    componentDidMount(){
        let data = fetchData(constants.URL);

        data.then(function(obj){
            console.log("obj", obj)
        }).catch(function(err){
           console.error(err);
        });
    }
}

export default App;
