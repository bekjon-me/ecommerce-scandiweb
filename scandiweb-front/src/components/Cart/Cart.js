import React from "react";
import styles from "./Cart.module.scss";
import { ProductInCart } from "../../components";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { setToNull } from "../../redux/cartCurrencyModal";
import cartBg from "../../assets/icons/emtyCart.webp";

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
  }

  componentDidUpdate(prevProps) {
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
            this.props.activeModal.activeModal === "cart" ? "block" : "none",
        }}
      >
        <li>My Bag, {this.props.cart.quantity} items</li>
        {this.props.cart.quantity > 0 ? (
          this.state.products?.map((product) => (
            <li
              key={product.id + JSON.stringify(product.selectedParams)}
              className={styles.products}
            >
              <ProductInCart product={product} />
            </li>
          ))
        ) : (
          <>
            <img className={styles.cartBg} src={cartBg} alt="CartBackground" />
            <h2 className={styles.emptyh2}>Your cart is empty</h2>
          </>
        )}

        <li className={styles.cartFooter}>
          <div className={styles.total}>
            <span>Total:</span>
            <span>
              {this.props.activeModal.currency.symbol +
                this.props.cart.total.toFixed(2)}
            </span>
          </div>
          <div className={styles.actions}>
            <Link className={styles.toCart} to="/cart">
              <button onClick={() => this.props.dispatch(setToNull())}>
                VIEW BAG
              </button>
            </Link>
            <button>CHECK OUT</button>
          </div>
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
