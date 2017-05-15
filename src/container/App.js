import React, { Component } from 'react';
import '../styles/App.css';
import Chart from '../components/chart';
import fetchData from '../api/api';

/**
 * Container of application that will host and render children components
 * responsible for passing down props to other children in the application tree
 * This is the root of the application
 * */
class App extends Component {
    constructor(){
        super();
        this.state = {
            url: 'https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/GDP-data.json'
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
        fetchData(this.state.url);
    }
}

export default App;
