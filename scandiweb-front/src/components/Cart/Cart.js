import React from 'react';
import styles from './Cart.module.scss';
import { ProductInCart } from '../../components';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { setToNull } from '../../redux/cartCurrencyModal';

class Cart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.cart !== prevProps.cart) {
      this.setState({
        products: this.props.cart.productsInCart,
      });
    }
  }

  render() {
    return (
      <ul
        className={styles.cart}
        style={{
          display:
            this.props.activeModal.activeModal === 'cart' ? 'block' : 'none',
        }}
      >
        <li>My Bag, 3items</li>
        {this.state.products?.map((product) => (
          <li
            key={product.id + JSON.stringify(product.selectedParams)}
            className={styles.products}
          >
            <ProductInCart product={product} />
          </li>
        ))}
        <li className={styles.cartFooter}>
          <Link className={styles.toCart} to="/cart">
            <button onClick={() => this.props.dispatch(setToNull())}>
              VIEW BAG
            </button>
          </Link>
          <button>CHECK OUT</button>
        </li>
      </ul>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    activeModal: state.activeModal,
    cart: state.cart,
  };
};

export default connect(mapStateToProps)(Cart);
