import React, { Component } from 'react';
import './assets/main.scss';
import { connect } from 'react-redux';
import AppRouter from './Router/AppRouter';
import { fetchAllProducts } from './redux/fetchDataSlice';
import { fetchAllTechProducts } from './redux/fetchTechProducts';
import { fetchAllClothesProducts } from './redux/fetchClothes';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeData: null,
    };
  }

  componentDidMount(){
    window.onbeforeunload = function() {
        console.log("refresh");
    };
  }

  render() {
    return <AppRouter />;
  }
}

const mapStateToProps = (state) => {
  return {
    all: state.all,
    tech: state.tech,
    clothes: state.clothes,
    activeLink: state.activeLink,
  };
};

const mapDispatchToProps = {
  fetchAllClothesProducts,
  fetchAllProducts,
  fetchAllTechProducts,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
