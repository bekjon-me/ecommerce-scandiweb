import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setCurrency, setToNull } from '../../redux/cartCurrencyModal';
import {fetchCurrencies} from '../../redux/fetchCurrencies';
import styles from './Currency.module.scss';


class Currency extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currencies: null,
    };
  }
  
  async componentDidMount() {
    await this.props.dispatch(fetchCurrencies())
    this.setState({currencies: this.props.currencies.currencies})
  }
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
        {this.state.currencies?.map((currency) => (
          <li
            key={currency.label}
            className={styles.mainDiv}
            onClick={() => {
              this.props.dispatch(
                setCurrency({
                  label: currency.label,
                  symbol: currency.symbol,
                })
              );
              this.props.dispatch(setToNull());
            }}
          >
            <div className={styles.tooltip}>{currency.label}</div>
            <div className={styles.value}>{`${currency.symbol}`}</div>
          </li>
        ))}
      </ul>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    activeModal: state.activeModal,
    currencies: state.currencies,
  };
};

export default connect(mapStateToProps)(Currency);
