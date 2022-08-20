import React, { Component } from 'react';
import './Category.scss';
import { ProductCard } from '../../components';
import { connect } from 'react-redux';
import { fetchAllProducts } from '../../redux/fetchDataSlice';
import { setToAll } from '../../redux/setActiveLink';

class Category extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: {},
    };
  }

  async componentDidMount() {
    this.props.dispatch(setToAll());
    if (this.props.all.status === 'idle') {
      await this.props.dispatch(fetchAllProducts());
    }
    this.setState({ products: this.props.all.products });
  }
  render() {
    return (
      <div>
        <div className="container">
          <div className="title">All Products</div>
          <div className="cards_div">
            {Object.keys(this.state.products).map((product) => {
              return (
                <ProductCard
                  key={this.state.products[product]?.id}
                  product={this.state.products[product]}
                />
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    all: state.all,
  };
};

export default connect(mapStateToProps)(Category);
