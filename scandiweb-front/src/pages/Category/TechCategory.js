import React, { Component } from 'react';
import './Category.scss';
import { ProductCard } from '../../components';
import {} from '../../redux/fetchDataSlice';
import { fetchAllTechProducts } from '../../redux/fetchTechProducts';
import { connect } from 'react-redux';
import { setToTech } from '../../redux/setActiveLink';

class TechCategory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: {},
    };
  }

  async componentDidMount() {
    this.props.dispatch(setToTech());
    if (this.props.tech.status === 'idle') {
      await this.props.dispatch(fetchAllTechProducts());
    }
    this.setState({ products: this.props.tech.products });
  }
  render() {
    return (
      <div>
        <div className="container">
          <div className="title">Tech Products</div>
          <div className="cards_div">
            {Object.keys(this.state.products).map((product) => {
              return (
                <ProductCard
                  key={this.state.products[product]?.id}
                  img={this.state.products[product]?.gallery[0]}
                  content={this.state.products[product]?.name}
                  id={this.state.products[product]?.id}
                  price={this.state.products[product]?.prices}
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
    tech: state.tech,
  };
};

export default connect(mapStateToProps)(TechCategory);
