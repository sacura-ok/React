import React, { Component } from 'react';
import RequestService from '../../services/RequestService';
import './ProductsList.css';

export default class ProductsList extends Component {

  requestService = new RequestService();

  state = {
    productsList: []
  }

  componentDidMount(){
    this.requestService
      .getListProducts(this.props.token)
        .then((product) => {
          this.setState({
            productsList: product
          })
        });
  }
  listItems(arr) {
    return arr.map(({id,title}) => {
      return ( <li className="list-group__item"
        key={id}
        onClick={() => this.props.onItemSelected(id)}>
        {title}
        </li> )
      });
    }

  render() {
    const  {productsList} = this.state;

     if (!productsList){
       return
     }
    const items = this.listItems(productsList);
    return (
        <ul className="list-group">
          {items}
        </ul>
    );
  }
}
