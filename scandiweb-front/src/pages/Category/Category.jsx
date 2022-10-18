import React, { Component } from "react";
import "./Category.scss";
import { ProductCard } from "../../components";
import { connect } from "react-redux";
import { fetchAllProducts } from "../../redux/fetchDataSlice";
import { setToAll, setToClothes, setToTech } from "../../redux/setActiveLink";
import { fetchAllClothesProducts } from "../../redux/fetchClothes";
import { fetchAllTechProducts } from "../../redux/fetchTechProducts";
import { useParams } from "react-router";
import { Audio } from "react-loader-spinner";

function withParams(Component) {
  return (props) => <Component {...props} params={useParams()} />;
}

class Category extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: {},
    };
  }

  async componentDidMount() {
    const { params } = this.props;
    const activeLink = params.type;
    if (activeLink === "all") {
      this.props.dispatch(setToAll());
      if (this.props.all.status === "idle") {
        await this.props.dispatch(fetchAllProducts());
      }
      this.setState({ products: this.props.all.products });
    } else if (activeLink === "clothes") {
      this.props.dispatch(setToClothes());
      if (this.props.clothes.status === "idle") {
        await this.props.dispatch(fetchAllClothesProducts());
      }
      if (this.props.clothes.products)
        this.setState({ products: this.props.clothes.products });
    } else if (activeLink === "tech") {
      this.props.dispatch(setToTech());
      if (this.props.tech.status === "idle") {
        await this.props.dispatch(fetchAllTechProducts());
      }
      if (this.props.tech.products)
        this.setState({ products: this.props.tech.products });
    } else {
      this.props.dispatch(setToAll());
      if (this.props.all.status === "idle") {
        await this.props.dispatch(fetchAllProducts());
      }
      this.setState({ products: this.props.all.products });
    }
  }

  async componentDidUpdate(prevProps) {
    if (prevProps.activeLink !== this.props.activeLink) {
      let activeLink = this.props.activeLink.activeLink;
      if (activeLink === "all") {
        this.setState({ products: {} });
        if (this.props.all.status === "idle") {
          await this.props.dispatch(fetchAllProducts());
        }
        this.setState({ products: this.props.all.products });
      } else if (activeLink === "clothes") {
        this.setState({ products: {} });
        if (this.props.clothes.status === "idle") {
          await this.props.dispatch(fetchAllClothesProducts());
        }
        if (this.props.clothes.products)
          this.setState({ products: this.props.clothes.products });
      } else if (activeLink === "tech") {
        this.setState({ products: {} });
        if (this.props.tech.status === "idle") {
          await this.props.dispatch(fetchAllTechProducts());
        }
        if (this.props.tech.products)
          this.setState({ products: this.props.tech.products });
      }
    }
  }

  render() {
    return (
      <div>
        <div className="container">
          <div className="title">All Products</div>
          <div className="cards_div">
            {this.state.products && this.state.products.length > 0 ? (
              Object.keys(this.state.products).map((product) => {
                return (
                  <ProductCard
                    key={this.state.products[product]?.id}
                    product={this.state.products[product]}
                  />
                );
              })
            ) : (
              <div className="loader">
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
            )}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    all: state.all,
    clothes: state.clothes,
    tech: state.tech,
    activeLink: state.activeLink,
  };
};

export default connect(mapStateToProps)(withParams(Category));
