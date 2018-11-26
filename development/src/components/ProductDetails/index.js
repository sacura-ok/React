import React, { Component } from 'react';
import RequestService from '../../services/RequestService';

export default class ProductDetails extends Component {

  requestService = new RequestService();

  state = {
    productsList: []
  };

  componentDidMount(){
    this.updateProduct();
  }

  componentDidUpdate(prevProps){
    if (this.props.idProduct!==prevProps.idProduct) {
      this.updateProduct();
    }
  }

  updateProduct(){
    const {idProduct} = this.props;
    if (!idProduct) {
      return
    }

    this.requestService
      .getProduct(idProduct)
        .then((product) => {
            this.setState({
              productsList: product
            })
          })
    }

  render() {
     if (!this.state.productsList){
       return
     }

    const {title,img,text}= this.state.productsList;
    return (
      <section className="product__about">
        <h2 className="product__title">{title}</h2>
        <div className="product__details">
          <img className="product__img" src={img} alt="" />
          <section className="product__description description">
            <h3 className="description__title ">Description</h3>
            <p className="description__text">{text}</p>
          </section>
        </div>
      </section>
     )
  }
}
