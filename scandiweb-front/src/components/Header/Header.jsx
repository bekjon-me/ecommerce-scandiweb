import React, { Component } from 'react';
import './Header.scss';
import { BrandSvg } from '../../assets/icons';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { calcQuantity, calcTotal } from '../../redux/cartSlice';
import Actions from '../Actions/Actions';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeModal: null,
    };
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.cart.productsInCart !== prevProps.cart.productsInCart ||
      this.props.currency.label !== prevProps.currency.label
    ) {
      this.props.dispatch(calcQuantity());
      console.log(this.props.currency.label);
      this.props.dispatch(calcTotal(this.props.currency.label));
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

          <Actions />
        </nav>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    activeLink: state.activeLink,
    cart: state.cart,
    activeModal: state.activeModal,
    currency: state.activeModal.currency,
  };
};

export default connect(mapStateToProps)(Header);
