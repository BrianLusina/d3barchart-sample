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
        this._extractData();
        return(
            <svg>

            </svg>
        )
    }

    /**
     * Extracts data from object received in props
     * */
    _extractData(){
        let x = d3.scaleTime().domain([this.state.minDate, this.state.maxDate])
            .range([0, this.width]);

        let y = d3.scaleLinear()
            .range([this.height, 0])
            .domain([0, d3.max(this.state.data, function(d) {
                return d[1];
            })]);

        let xAxis = d3.axisBottom(x).ticks(d3.timeYears, 5);

        let yAxis = d3.axisLeft(y).ticks(10, "");

        let div = d3.select(".card").append("div").attr("class", "tooltip").style("opacity",0);

        let chart = d3.select(".chart")
            .attr("width", this.width + this.margin.left + this.margin.right)
            .attr("height", this.height + this.margin.top + this.margin.bottom)
            .append("g")
            .attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")");


        chart.append("g").attr("class", "x axis")
            .attr("transform", "translate(0," + this.height + ")")
            .call(xAxis);

        chart.append("g").attr("class", "y axis").call(yAxis).append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 6)
            .attr("dy", "0.8em")
            .style("text-anchor", "end")
            .text("Gross Domestic Product, USA");

        chart.selectAll(".bar").data(this.state.data)
            .enter().append("rect")
            .attr("class", "bar")
            .attr("x", function(d) {
                return x(new Date(d[0]));
            })
            .attr("y", function(d) {
                return y(d[1]);
            })
            .attr("height", function(d) {
                return this.height - y(d[1]);
            })
            .attr("width", this.state.barWidth)
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
                div.html("<span class='amount'>" + this.state.formatCurrency(dollars) + "&nbsp;Billion </span><br><span class='year'>" + year + ' - ' + this.state.months[month] + "</span>")
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