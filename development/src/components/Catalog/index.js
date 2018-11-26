import React, { Component } from 'react';
import ProductsList from '../ProductsList';
import Product from '../ProductDetails';
import ReviewsList from '../ReviewsList';
import RequestService from '../../services/RequestService';
import './Catalog.css';

export default class Catalog extends Component {

  requestService = new RequestService();

  state = {
    idProduct: 1,
    rateReview: null
  }

  onClickProduct = (id)=>{
    this.setState({
        idProduct: id
      })
  };

  onClickRate = (rate)=>{
    this.setState({
        rateReview: rate
      })
  };

  render() {
    const showProductslist = <ProductsList onItemSelected={this.onClickProduct} token={this.props.token} />;
    const showProduct = <Product idProduct={this.state.idProduct} token={this.props.token} />;
    const showReviewsList = <ReviewsList idProduct={this.state.idProduct}
                                         rateReview={this.state.rateReview}
                                         onRateSelected={this.onClickRate}
                                         token={this.props.token} />;

    return (
      <main>
          {showProductslist}
        <div className="product">
          {this.state.idProduct?showProduct:null}
          {this.state.idProduct?showReviewsList:null}
        </div>
      </main>
     )
  }
}
