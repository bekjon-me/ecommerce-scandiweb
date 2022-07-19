import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setCurrency, setToNull } from '../../redux/cartCurrencyModal';
import styles from './Currency.module.scss';

const currencies = [
  {
    currency: {
      label: 'USD',
      symbol: '$',
    },
  },
  {
    currency: {
      label: 'GBP',
      symbol: '£',
    },
  },
  {
    currency: {
      label: 'AUD',
      symbol: 'A$',
    },
  },
  {
    currency: {
      label: 'JPY',
      symbol: '¥',
    },
  },
  {
    currency: {
      label: 'RUB',
      symbol: '₽',
    },
  },
];
class Currency extends Component {
  render() {
    return (
      <ul
        className={styles.currency}
        style={{
          display:
            this.props.activeModal.activeModal === 'currency'
              ? 'block'
              : 'none',
        }}
      >
        {currencies.map((currency) => (
          <li
            key={currency.currency.label}
            className={styles.mainDiv}
            onClick={() => {
              this.props.dispatch(
                setCurrency({
                  label: currency.currency.label,
                  symbol: currency.currency.symbol,
                })
              );
              this.props.dispatch(setToNull());
            }}
          >
            <div className={styles.tooltip}>{currency.currency.label}</div>
            <div className={styles.value}>{`${currency.currency.symbol}`}</div>
          </li>
        ))}
      </ul>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    activeModal: state.activeModal,
  };
};

export default connect(mapStateToProps)(Currency);
