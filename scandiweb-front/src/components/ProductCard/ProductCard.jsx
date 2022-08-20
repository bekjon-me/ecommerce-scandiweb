import React, { Component } from 'react';
import { cartSvg } from '../../assets/icons';
import './ProductCard.scss';
import { withRouter } from '../../Router/withRouter';
import { connect } from 'react-redux';
import { addToCart } from '../../redux/cartSlice';

class ProductCard extends Component {
  toPdp = (e) => {
    this.props.navigate(`${this.props.product.id}/description`);
  };

  handleAddToCart = (e) => {
    e.stopPropagation();
    let selectedParams = {};

    this.props.product.attributes.forEach((attribute) => {
      selectedParams[attribute.name] = attribute.items[0].value;
    });
    let merged = {
      ...this.props.product,
      selectedParams,
    };
    this.props.dispatch(addToCart(merged));
  };

  render() {
    return this.props.product.inStock ? (
      <div className="card productCard" onClick={() => this.toPdp()}>
        <img
          src={this.props.product.gallery[0]}
          alt="Img"
          className="cardImg"
        />
        <img
          src={cartSvg}
          alt="CartSvg"
          className="cart_svg"
          onClick={(e) => this.handleAddToCart(e)}
        />
        <div>
          <div
            className="content"
            dangerouslySetInnerHTML={{
              __html: this.props.product.brand + ' ' + this.props.product.name,
            }}
          ></div>
          <p className="price-regular">
            {this.props.product.prices?.map((price) => {
              if (
                price.currency.label === this.props.activeModal.currency.label
              ) {
                return price.currency.symbol + price.amount;
              }
              return '';
            })}
          </p>
        </div>
      </div>
    ) : (
      <div className="card productCard outOfStock" onClick={() => this.toPdp()}>
        <img
          src={this.props.product.gallery[0]}
          alt="Img"
          className="cardImg"
        />
        <div>
          <div
            className="content"
            dangerouslySetInnerHTML={{
              __html: this.props.product.brand + ' ' + this.props.product.name,
            }}
          ></div>
          <p className="price-regular">
            {this.props.product.prices?.map((price) => {
              if (
                price.currency.label === this.props.activeModal.currency.label
              ) {
                return price.currency.symbol + price.amount;
              }
              return '';
            })}
          </p>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    cart: state.cart,
    activeModal: state.activeModal,
  };
};

export default withRouter(connect(mapStateToProps)(ProductCard));
