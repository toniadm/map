import React from 'react';
import * as ReactDOM from "react-dom";
import logo from './logo.svg';
import './App.css';
import Map from './components/Map';
import Search from './components/Search';
import axios from 'axios';

class App extends React.Component {

  render() {
    return (
      <div className="app">
        <Search />
        <Map />
      </div>
      )
    }

}
  export default App;