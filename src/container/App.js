import React, { Component } from 'react';
import '../styles/App.css';
import Chart from '../components/chart';

class App extends Component {
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
}

export default App;
