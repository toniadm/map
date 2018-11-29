import React from 'react';
import * as ReactDOM from "react-dom";
import logo from './logo.svg';
import './App.css';
import Gmap from './components/Gmap';
import Search from './components/Search';
import Venue from './components/Venue';
import axios from 'axios';

class App extends React.Component {


  render() {

    return (
      <div className="app">
        <Search />
        <Gmap />
      </div>
      )
    }

}
  export default App;