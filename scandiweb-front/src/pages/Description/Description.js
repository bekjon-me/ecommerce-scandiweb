import React, { Component } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router";
import { addToCart } from "../../redux/cartSlice";
import styles from "./Description.module.scss";
import { fetchViewingProduct } from "../../redux/viewingProduct";
import { Audio } from "react-loader-spinner";

function withParams(Component) {
  return (props) => <Component {...props} params={useParams()} />;
}

class Description extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product: null,
      img: null,
      selectedParams: {},
    };
  }

  async componentDidMount() {
    const { params } = this.props;
    const { id } = params;
    await this.props.dispatch(fetchViewingProduct(id));
    this.setState({
      product: this.props.viewingProduct.product,
      img: this.props.viewingProduct.product.gallery[0],
    });
  }

  addToCartHandle = () => {
    if (this.state.product.inStock) {
      if (
        this.state.product.attributes.length >
        Object.keys(this.state.selectedParams).length
      ) {
        alert("Выберите все параметры");
        return;
      }
      let merged = {
        ...this.state.product,
        selectedParams: { ...this.state.selectedParams },
      };
      this.props.dispatch(addToCart(merged));
    } else {
      alert("Not available for sale");
    }
  };

  render() {
    return this.state.product ? (
      <div className={`${styles.descriptionDiv} container`}>
        <div className={styles.images}>
          {this.state.product.gallery.map((image) => (
            <img
              src={image}
              alt="product"
              className={styles.descriptionImg}
              onClick={() => this.setState({ img: image })}
              key={image}
            />
          ))}
        </div>
        <div className={styles.focusedImg}>
          <img src={this.state.img} alt="Focused Img" />
        </div>
        <div className={styles.information}>
          <h2>{this.state.product.name}</h2>
          {this.state.product.attributes.map((item) => (
            <div
              key={item.name}
              style={{
                display: "grid",
                rowGap: "10px",
                gridTemplateColumns: "auto",
                height: "fit-content",
                marginTop: "24px",
                fontFamily: "Roboto Condensed, sans-serif",
                fontStyle: "normal",
                fontWeight: 700,
                fontSize: "18px",
                lineHeight: "18px",
                color: "#1D1F22",
              }}
            >
              <span>{item.name}</span>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  columnGap: "10px",
                }}
              >
                {item.items.map((option) => (
                  <button
                    key={option.value}
                    className={styles.options}
                    style={{
                      backgroundColor:
                        item.name === "Color"
                          ? option.value
                          : this.state.selectedParams[item.name] ===
                            option.value
                          ? "#1D1F22"
                          : "#fff",
                      border:
                        item.name === "Color"
                          ? this.state.selectedParams[item.name] ===
                            option.value
                            ? "3px solid #1D1F22"
                            : option.value === "#FFFFFF"
                            ? "1px solid #1D1F22"
                            : "none"
                          : "1px solid #1D1F22",
                      cursor: "pointer",
                      color:
                        item.name === "Color"
                          ? "#fff"
                          : this.state.selectedParams[item.name] ===
                            option.value
                          ? "#fff"
                          : "#1D1F22",
                      height:
                        item.name === "Color"
                          ? this.state.selectedParams["Color"] === option.value
                            ? "38px"
                            : "32px"
                          : "fit-content",
                      width:
                        item.name === "Color"
                          ? this.state.selectedParams["Color"] === option.value
                            ? "38px"
                            : "32px"
                          : "fit-content",
                    }}
                    onClick={() =>
                      this.setState({
                        selectedParams: {
                          ...this.state.selectedParams,
                          [item.name]: option.value,
                        },
                      })
                    }
                  >
                    {item.name === "Color" ? "" : option.value}
                  </button>
                ))}
              </div>
            </div>
          ))}
          <div className={styles.price}>
            <span>Price:</span>
            <span>
              {this.state.product.prices.map((value) => {
                if (
                  value.currency.symbol ===
                  this.props.activeModal.currency.symbol
                ) {
                  return (
                    <span key={value}>
                      {value.currency.symbol + " " + value.amount}
                    </span>
                  );
                }
                return "";
              })}
            </span>
          </div>
          <button
            className={styles.addBtn}
            type="button"
            onClick={this.addToCartHandle}
          >
            ADD TO CART
          </button>
          <div
            dangerouslySetInnerHTML={{ __html: this.state.product.description }}
            className={styles.description}
          ></div>
        </div>
      </div>
    ) : (
      <div className={styles.loader}>
        <Audio
          height="80"
          width="80"
          radius="9"
          color="green"
          ariaLabel="loading"
          wrapperStyle
          wrapperClass
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    all: state.all,
    tech: state.tech,
    clothes: state.clothes,
    viewingProduct: state.viewingProduct,
    productsInCart: state.cart.productsInCart,
    activeModal: state.activeModal,
  };
};

export default connect(mapStateToProps)(withParams(Description));
