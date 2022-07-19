import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addToCart, removeFromCart } from '../../redux/cartSlice';
import styles from './ProductInCart.module.scss';

class ProductInCard extends Component {
  render() {
    return (
      <div className={styles.card}>
        <div className={styles.mainDiv}>
          <div className={styles.left}>
            <h2 className={styles.productBrand}>{this.props.product.brand}</h2>
            <p className={styles.productName}>{this.props.product.name}</p>
            <p className={styles.productPrice}>
              {this.props.product.prices.map((price) => {
                if (price.currency.label === this.props.currency.label) {
                  return `${price.currency.symbol} ${price.amount}`;
                }
                return '';
              })}
            </p>
            {this.props.product.attributes.map((item) => (
              <div
                key={item.name}
                style={{
                  display: 'grid',
                  rowGap: '10px',
                  gridTemplateColumns: 'auto',
                  height: 'fit-content',
                  marginTop: '8px',
                  fontFamily: 'Roboto Condensed, sans-serif',
                  fontStyle: 'normal',
                  fontWeight: 700,
                  fontSize: '14px',
                  lineHeight: '16px',
                  color: '#1D1F22',
                }}
              >
                <span style={{ cursor: 'auto' }}>{item.name}</span>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    columnGap: '8px',
                  }}
                >
                  {item.items.map((option) => (
                    <button
                      key={option.value}
                      className={styles.options}
                      style={{
                        backgroundColor:
                          item.name === 'Color'
                            ? option.value
                            : this.props.product.selectedParams[item.name] ===
                              option.value
                            ? '#1D1F22'
                            : '#fff',
                        border:
                          item.name === 'Color'
                            ? this.props.product.selectedParams[item.name] ===
                              option.value
                              ? '1px solid #1D1F22'
                              : 'none'
                            : '1px solid #1D1F22',
                        color:
                          item.name === 'Color'
                            ? '#fff'
                            : this.props.product.selectedParams[item.name] ===
                              option.value
                            ? '#fff'
                            : '#1D1F22',
                        height:
                          item.name === 'Color'
                            ? this.props.product.selectedParams['Color'] ===
                              option.value
                              ? '38px'
                              : '32px'
                            : 'fit-content',
                        width:
                          item.name === 'Color'
                            ? this.props.product.selectedParams['Color'] ===
                              option.value
                              ? '38px'
                              : '32px'
                            : 'fit-content',
                      }}
                    >
                      {item.name === 'Color' ? '' : option.displayValue}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className={styles.right}>
            <button
              className="addRemoveProduct"
              onClick={() => {
                this.props.dispatch(addToCart(this.props.product));
              }}
            >
              +
            </button>
            <span>{this.props.product.amount}</span>
            <button
              className="addRemoveProduct"
              onClick={() =>
                this.props.dispatch(removeFromCart(this.props.product))
              }
            >
              -
            </button>
          </div>
        </div>
        <img src={this.props.product.gallery[0]} alt="product Img" />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    currency: state.activeModal.currency,
    cart: state.cart,
  };
};

export default connect(mapStateToProps)(ProductInCard);
