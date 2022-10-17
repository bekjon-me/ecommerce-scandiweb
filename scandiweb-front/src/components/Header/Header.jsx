import React, { Component } from "react";
import "./Header.scss";
import { BrandSvg } from "../../assets/icons";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { calcQuantity, calcTotal } from "../../redux/cartSlice";
import Actions from "../Actions/Actions";
import { setToAll, setToClothes, setToTech } from "../../redux/setActiveLink";

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
      this.props.dispatch(calcTotal(this.props.currency.label));
    }
  }

  setActiveLink(link) {
    if (link === "all") {
      this.props.dispatch(setToAll());
    } else if (link === "clothes") {
      this.props.dispatch(setToClothes());
    } else if (link === "tech") {
      this.props.dispatch(setToTech());
    }
  }

  render() {
    return (
      <div className="container">
        <nav className="header">
          <div className="navigation">
            <div className="header_navigation">
              <div className="link" onClick={() => this.setActiveLink("all")}>
                <Link
                  to="/all"
                  className={
                    this.props.activeLink.activeLink === "all"
                      ? "nav-link active"
                      : "nav-link"
                  }
                >
                  All
                </Link>
              </div>
              <div
                className="link"
                onClick={() => this.setActiveLink("clothes")}
              >
                <Link
                  to="/clothes"
                  className={
                    this.props.activeLink.activeLink === "clothes"
                      ? "nav-link active"
                      : "nav-link"
                  }
                >
                  Clothes
                </Link>
              </div>
              <div className="link" onClick={() => this.setActiveLink("tech")}>
                <Link
                  to="/tech"
                  className={
                    this.props.activeLink.activeLink === "tech"
                      ? "nav-link active"
                      : "nav-link"
                  }
                >
                  Tech
                </Link>
              </div>
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
