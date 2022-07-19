import React, { Component } from 'react';
import './Category.scss';
import { ProductCard } from '../../components';
import { fetchAllClothesProducts } from '../../redux/fetchClothes';
import { connect } from 'react-redux';
import { setToClothes } from '../../redux/setActiveLink';

class ClothesCategory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: {},
    };
  }

  async componentDidMount() {
    this.props.dispatch(setToClothes());
    if (this.props.clothes.status === 'idle') {
      await this.props.dispatch(fetchAllClothesProducts());
    }
    this.setState({ products: this.props.clothes.products });
  }
  render() {
    return (
      <div>
        <div className="container">
          <div className="title">Clothes</div>
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
    clothes: state.clothes,
  };
};

export default connect(mapStateToProps)(ClothesCategory);
