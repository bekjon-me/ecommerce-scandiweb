import React, { Component } from 'react';
import styles from './ProductInCart.module.scss';
import backSvg from '../../assets/icons/back.svg';
import nextSvg from '../../assets/icons/next.svg';
import { connect } from 'react-redux';
import { addToCart, removeFromCart } from '../../redux/cartSlice';

class ProductInCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imgUrlIndex: 0,
    };
  }

  nextImage(e) {
    if (e === 'back' && this.state.imgUrlIndex > 0) {
      this.setState({
        imgUrlIndex: this.state.imgUrlIndex - 1,
      });
    } else if (e === 'back' && this.state.imgUrlIndex === 0) {
      this.setState({
        imgUrlIndex: this.props.product.gallery.length - 1,
      });
    } else if (
      e === 'next' &&
      this.state.imgUrlIndex < this.props.product.gallery.length - 1
    ) {
      this.setState({
        imgUrlIndex: this.state.imgUrlIndex + 1,
      });
    } else if (
      e === 'next' &&
      this.state.imgUrlIndex === this.props.product.gallery.length - 1
    ) {
      this.setState({
        imgUrlIndex: 0,
      });
    }
  }

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
                  marginTop: '24px',
                  fontFamily: 'Roboto Condensed',
                  fontStyle: 'normal',
                  fontWeight: 700,
                  fontSize: '18px',
                  lineHeight: '18px',
                  color: '#1D1F22',
                }}
              >
                <span
                  style={{
                    cursor: 'auto',
                    fontFamily: 'Raleway, sans-serif',
                    fontStyle: 'normal',
                    fontWeight: 400,
                    fontSize: '14px',
                    lineHeight: '16px',
                    color: '#1D1F22',
                  }}
                >
                  {item.name}
                </span>
                <div
                  style={{
                    display: 'flex',
                    columnGap: '10px',
                    alignItems: 'center',
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
                              ? '3px solid #1D1F22'
                              : option.value === '#FFFFFF' ? '1px solid #1D1F22' : "none"
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
                      {item.name === 'Color' ? '' : option.value}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className={styles.right}>
            <button
              className="addRemoveProduct"
              onClick={() => this.props.dispatch(addToCart(this.props.product))}
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
        <div className={styles.imgDiv}>
          <img
            src={this.props.product.gallery[this.state.imgUrlIndex]}
            alt="product Img"
          />
          <div className={styles.nextBack}>
            {this.props.product.gallery.length > 1 ? (
              <>
                <img
                  src={backSvg}
                  alt="Back"
                  onClick={() => this.nextImage('back')}
                />
                <img
                  src={nextSvg}
                  alt="Next"
                  onClick={() => this.nextImage('next')}
                />
              </>
            ) : (
              ''
            )}
          </div>
        </div>
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
