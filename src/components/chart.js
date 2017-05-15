/**
 * @author lusinabrian on 15/05/17.
 * @notes: Chart component, displays chart data from json
 */
import React, { Component } from 'react';
import d3 from 'd3';

export default class Chart extends Component{
    constructor(){
        super();
    }

    render(){
        return(
            <svg>

            </svg>
        )
    }
}

/**
 * This chart component will require prop types for rendering data to the Dom
 * */
Chart.propTypes = {

};