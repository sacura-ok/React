import React, { Component } from 'react';
import './ReviewDetails.css';

export default class ReviewDetails extends Component {

  render() {
    const {username,rate,text} = this.props.reviews;
      return (
          <div className="review">
            <span className="review__item review__rate review__rate--color">{rate}</span>
            <span className="review__item review__username">{username}</span>
            <span className="review__item review__text">{text}</span>
          </div>
       )
    }
}
