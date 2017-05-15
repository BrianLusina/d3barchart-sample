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
            description:"",
            frequency: "",
            fromDate: "",
            toDate: "",
            data:[],
            name: ""
        }
    }

    render() {
        return (
            <div className="card">
                <h3 className="title">{this.state.name}</h3>
                <Chart data={this.state.data} minDate={this.state.fromDate}
                       maxDate={this.state.toDate}/>
                <div className="notes">
                    {this.state.description}
                </div>
            </div>
        );
    }

    /**
     * Called after render, best place to fetch data from API
     * Binds to promise to allow for updating state of this container
     * */
    componentDidMount(){
        let data = fetchData(constants.URL);

        data.then(function(obj){
            this.setState({
                description: obj.description,
                frequency: obj.frequency,
                fromDate: obj.fromDate,
                toDate: obj.toDate,
                data: obj.data,
                name: obj.name
            });
        }.bind(this)).catch(function(err){
           console.error(err);
        });
    }
}

export default App;
