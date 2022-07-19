import React, { Component } from 'react';
import { cartSvg } from '../../assets/icons';
import './ProductCard.scss';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class ProductCard extends Component {
  render() {
    return (
      <Link to={`${this.props.id}/description`} className="productCard">
        <div className="card">
          <img src={this.props.img} alt="Img" className="cardImg" />
          <img src={cartSvg} alt="CartSvg" className="cart_svg" />
          <div>
            <div
              className="content"
              dangerouslySetInnerHTML={{ __html: this.props.content }}
            ></div>
            <p className="price-regular">
              {this.props.price?.map((price) => {
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
      </Link>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    cart: state.cart,
    activeModal: state.activeModal,
  };
};

export default connect(mapStateToProps)(ProductCard);
