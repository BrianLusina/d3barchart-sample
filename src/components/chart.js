/**
 * @author lusinabrian on 15/05/17.
 * @notes: Chart component, displays chart data from json
 */
import React, { Component } from 'react';
import * as d3 from 'd3';
import PropTypes from 'prop-types';

export default class Chart extends Component{
    constructor(){
        super();
        this.state = {
            barWidth: 0,
            months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
            formatCurrency: d3.format("$,.2f"),
            data: [],
            minDate:"",
            maxDate:""
        };

        this.margin = {
                top: 5,
                right: 10,
                bottom: 30,
                left: 75
            };
        this.width = 1000 - this.margin.left - this.margin.right;
        this.height = 500 - this.margin.top - this.margin.bottom;

        this._extractData = this._extractData.bind(this);
    }

    /**
     * Called when a component will receive props
     * */
    componentWillReceiveProps(nextProps){
        this.setState({
            barWidth: Math.ceil(this.width / nextProps.data.length),
            data: nextProps.data,
            minDate: new Date(nextProps.minDate),
            maxDate: new Date(nextProps.maxDate)
        });
    }

    render(){
        return(
            <svg>

            </svg>
        )
    }

    /**
     * Extracts data from object received in props
     * */
    _extractData(){
        let x = d3.time.scale().domain([this.state.minDate, this.state.maxDate])
            .range([0, this.width]);

        var y = d3.scale.linear()
            .range([this.height, 0])
            .domain([0, d3.max(this.state.data, function(d) {
                return d[1];
            })]);

    }
}

/**
 * This chart component will require prop types for rendering data to the Dom
 * */
Chart.propTypes = {
    data: PropTypes.array.isRequired,
    minDate: PropTypes.string.isRequired,
    maxDate: PropTypes.string.isRequired
};