import React from 'react';
import styles from './Cart.module.scss';
import ProductInCart from './ProductInCart';
import { connect } from 'react-redux';
import { calcQuantity, calcTotal } from '../../redux/cartSlice';

class Cart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
    };
  }

  componentDidMount() {
    this.setState({
      products: this.props.cart.productsInCart,
    });
    this.props.dispatch(calcTotal(this.props.currency.label));
    this.props.dispatch(calcQuantity());
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.cart.productsInCart !== prevProps.cart.productsInCart) {
      this.setState({
        products: this.props.cart.productsInCart,
      });
      this.props.dispatch(calcTotal(this.props.currency.label));
      this.props.dispatch(calcQuantity());
    }
  }

  render() {
    return (
      <ul className={styles.cart + ' container'}>
        <h2 className={styles.cartName}>CART</h2>
        <div className={styles.line}></div>
        {this.state.products.map((product) => (
          <li
            key={product.id + JSON.stringify(product.selectedParams)}
            className={styles.products}
          >
            <ProductInCart product={product} />
          </li>
        ))}

        <li className={styles.cartFooter}>
          <div className={styles.cartTotal}>
            <p>Tax 21%:</p>
            <p>
              {this.props.currency.symbol +
                (this.props.cart.total * 0.21).toFixed(2)}
            </p>
            <p>Quantity:</p>
            <p>{this.props.cart.quantity}</p>
            <p>Total:</p>
            <p>
              {this.props.currency.symbol + this.props.cart.total.toFixed(2)}
            </p>
          </div>
          <button>ORDER</button>
        </li>
      </ul>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    cart: state.cart,
    currency: state.activeModal.currency,
  };
};

export default connect(mapStateToProps)(Cart);
