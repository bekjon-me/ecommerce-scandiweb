import React, { Component } from 'react';
import './Header.scss';
import { BrandSvg, EmptyCart, dropDownSvg } from '../../assets/icons';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Cart, Currency } from '../../components';
import {
  setToCurrency,
  setToCart,
  setToNull,
} from '../../redux/cartCurrencyModal';
import { calcQuantity } from '../../redux/cartSlice';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeModal: null,
    };
  }

  setModal(e) {
    if (this.state.activeModal === e) {
      this.props.dispatch(setToNull());
      this.setState({ activeModal: null });
    } else if (e === 'cart') {
      this.props.dispatch(setToCart());
      this.setState({ activeModal: e });
    } else {
      this.props.dispatch(setToCurrency());
      this.setState({ activeModal: e });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.cart.productsInCart !== prevProps.cart.productsInCart) {
      this.props.dispatch(calcQuantity());
    }
  }

  render() {
    return (
      <div className="container">
        <nav className="header">
          <div className="navigation">
            <div className="header_navigation">
              <Link
                to="/all"
                className={
                  this.props.activeLink.activeLink === 'all'
                    ? 'nav-link active'
                    : 'nav-link'
                }
              >
                All
              </Link>
              <Link
                to="/clothes"
                className={
                  this.props.activeLink.activeLink === 'clothes'
                    ? 'nav-link active'
                    : 'nav-link'
                }
              >
                <div>Clothes</div>
              </Link>
              <Link
                to="/tech"
                className={
                  this.props.activeLink.activeLink === 'tech'
                    ? 'nav-link active'
                    : 'nav-link'
                }
              >
                <div>Tech</div>
              </Link>
            </div>
          </div>
          <div className="brand">
            <img src={BrandSvg} alt="" />
          </div>
          <div className="actions">
            <div
              className="setCurrency"
              onClick={() => this.setModal('currency')}
            >
              <span>{this.props.activeModal.currency.symbol}</span>
              <img
                src={dropDownSvg}
                alt="Vector"
                style={{ margin: '0 22px 0 10px' }}
              />
            </div>
            <Currency />

            <div
              onClick={() => this.setModal('cart')}
              className={'cartIconDiv'}
            >
              <img src={EmptyCart} alt="Empty Cart" />
              {this.props.cart.quantity > 0 ? (
                <span>{this.props.cart.quantity}</span>
              ) : (
                ''
              )}
            </div>
            <Cart />
          </div>
        </nav>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    all: state.all,
    activeLink: state.activeLink,
    cart: state.cart,
    activeModal: state.activeModal,
  };
};

export default connect(mapStateToProps)(Header);
