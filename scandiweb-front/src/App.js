import React, { Component } from 'react';
import './assets/main.scss';
import { connect } from 'react-redux';
import { gql } from '@apollo/client';
import AppRouter from './Router/AppRouter';
import { fetchAllProducts } from './redux/fetchDataSlice';
import { fetchAllTechProducts } from './redux/fetchTechProducts';
import { fetchAllClothesProducts } from './redux/fetchClothes';

export const PRODUCTS = gql`
  {
    categories {
      name
      products {
        id
        name
        inStock
        gallery
        description
        category
        attributes {
          id
          name
          type
          items {
            displayValue
            value
            id
          }
        }
        prices {
          amount
          currency {
            label
            symbol
          }
        }
        brand
      }
    }
  }
`;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeData: null,
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
