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

        this._extractData = this._extractData.bind(this);
    }

    /**
     * Called when a component will receive props
     * */
    componentWillReceiveProps(nextProps){
        this._extractData(nextProps);
    }

    /**
     * Renders to the DOM*/
    render(){
        return(
            <svg className="chart">
            </svg>
        )
    }

    /**
     * Extracts data from object received in props
     * */
    _extractData(props){
        let formatCurrency = d3.format("$,.2f");
        let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July',
            'August', 'September', 'October', 'November', 'December'];

        let margin = {
            top: 5,
            right: 10,
            bottom: 30,
            left: 75
        };
        let width = 1000 - margin.left - margin.right;
        let height = 500 - margin.top - margin.bottom;
        
        let minDate = new Date(props.minDate);
        let maxDate = new Date(props.maxDate);

        let barWidth = Math.ceil(width / props.data.length);

        let x = d3.scaleTime()
            .domain([minDate, maxDate])
            .range([0, width]);

        let y = d3.scaleLinear()
            .domain([0, d3.max(props.data, function (d) {
                return d[1];
            })]).range([height, 0]);

        let xAxis = d3.axisBottom(x).ticks(5);

        let yAxis = d3.axisLeft(y).ticks(10, "");

        let div = d3.select(".card")
            .append("div")
            .attr("class", "tooltip")
            .style("opacity",0);

        let chart = d3.select(".chart")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        chart.append("g").attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis);

        chart.append("g").attr("class", "y axis").call(yAxis).append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 6)
            .attr("dy", "0.8em")
            .style("text-anchor", "end")
            .text("Gross Domestic Product, USA");

        chart.selectAll(".bar").data(props.data)
            .enter().append("rect")
            .attr("class", "bar")
            .attr("x", function(d) {
                return x(new Date(d[0]));
            })
            .attr("y", function(d) {
                return y(d[1]);
            })
            .attr("height", function(d) {
                return height - y(d[1]);
            })
            .attr("width", barWidth)
            .on("mouseover", function(d) {
                let rect = d3.select(this);
                rect.attr("class", "mouseover");
                let currentDateTime = new Date(d[0]);
                let year = currentDateTime.getFullYear();
                let month = currentDateTime.getMonth();
                let dollars = d[1];
                div.transition()
                    .duration(200)
                    .style("opacity", 0.9);
                div.html("<span class='amount'>" +
                    formatCurrency(dollars) + "&nbsp;Billion </span><br><span class='year'>" + year + ' - ' + months[month] + "</span>")
                    .style("left", (d3.event.pageX + 5) + "px")
                    .style("top", (d3.event.pageY - 50) + "px");
            })
            .on("mouseout", function() {
                let rect = d3.select(this);
                rect.attr("class", "mouseoff");
                div.transition()
                    .duration(500)
                    .style("opacity", 0);
            });
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