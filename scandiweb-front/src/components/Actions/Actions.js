import React, { Component } from 'react';
import Cart from '../Cart/Cart';
import Currency from '../Currency/Currency';
import { EmptyCart, dropDownSvg } from '../../assets/icons';
import { connect } from 'react-redux';
import onclickOutside from 'react-onclickoutside';

import {
  setToCart,
  setToCurrency,
  setToNull,
} from '../../redux/cartCurrencyModal';

class Actions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeModal: null,
    };
  }

  handleClickOutside = () => {
    this.props.dispatch(setToNull());
  };

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
  render() {
    return (
      <div className="actions">
        <div className="setCurrency" onClick={() => this.setModal('currency')}>
          <span>{this.props.activeModal.currency.symbol}</span>
          <img
            src={dropDownSvg}
            alt="Vector"
            style={{ margin: '0 22px 0 10px' }}
          />
        </div>
        <Currency />

        <div onClick={() => this.setModal('cart')} className={'cartIconDiv'}>
          <img src={EmptyCart} alt="Empty Cart" />
          {this.props.cart.quantity > 0 ? (
            <span>{this.props.cart.quantity}</span>
          ) : (
            ''
          )}
        </div>
        <Cart />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    activeModal: state.activeModal,
    cart: state.cart,
  };
};

export default connect(mapStateToProps)(onclickOutside(Actions));
