import React, { Component } from 'react';
import ReviewDetails from '../ReviewDetails';
import RequestService from '../../services/RequestService';
import './ReviewsList.css';

export default class ReviewsList extends Component {

  requestService = new RequestService();

  state = {
    reviewsList: [],
    review_id: null,
    text: ''
  }

  componentDidMount(){
    this.updateReviews();
  }

  componentDidUpdate(prevProps){
    if (this.props.idProduct!==prevProps.idProduct) {
      this.updateReviews();
    }
  }

  updateReviews(){
    const {idProduct, token} = this.props;
    if (!idProduct) {
      return
  }

  this.requestService
    .getListReviews(idProduct, token)
      .then((reviews) => {
        const reviewsRev = reviews.reverse();
        this.setState({
          reviewsList: reviewsRev
        })
      });
  }

  addReview = () =>{
    const {idProduct, token} = this.props;
    const {rateReview} = this.props;

    this.requestService
      .postReview(idProduct, { rate:rateReview, text:this.state.text}, token)
        .then((res) => {
          this.setState({
            review_id: res.review_id,
            text: ''
          });
        });

    this.updateReviews();
  }

  listItems(arr) {
    return arr.map(({id, username, rate, text}) => {
      return (
         <li className="list-group-review" key={id}>
             <ReviewDetails reviews = {{username,rate,text}} />
         </li> )
      });
  }

  listRates() {
    const arrRates = [{id:1, rate:1},{id:2, rate:2},{id:3, rate:3},{id:4, rate:4},{id:5, rate:5}];
    return arrRates.reverse().map(({id, rate}) => {
      return (
        <li className="list-group-item review__rate" key={id}
              onClick={() => this.props.onRateSelected(rate)}>
            {rate}
        </li> )
      });
  }

  addReviewText = (e) => {
    this.setState({text: e.target.value});
  }

  allowAddReview = () => {
    const itemsRate = this.listRates();
      return(
        <div className="list-reviews__add">
          <ul className="list-reviews__rate">
            {itemsRate}
          </ul>
          <textarea className="list-reviews__review"
                    id={this.state.review_id}
                    placeholder="Type your review..."
                    onChange={this.addReviewText}
                    value={this.state.text}></textarea>
          <button className="list-reviews__button"
                  onClick={this.addReview}>Submit Review</button>
      </div>
      );
  }

  render() {
    const  {reviewsList} = this.state;
    const items = this.listItems(reviewsList);
    const notAllowAddReview = <div className="list-reviews__not-allow">Sign in to leave a review.</div>;
    return (
      <div className="list-reviews">
        {this.props.token?this.allowAddReview():notAllowAddReview}
        <section className="list-reviews__items">
          <h3>Reviews</h3>
          {items}
        </section>
      </div>
    )
  }
}
