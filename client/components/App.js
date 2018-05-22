//client/components/App.js
import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Add from './Add'
export default class App extends React.Component {
  constructor() {
    super();
    this.state = {};
  }
  componentDidMount() {
  }
  componentWillReceiveProps(nextProps) {
  }
  render() {
    return (
      <div>
        <Add />
      </div>
    );
  }
}