import React from 'react';

const ReviewItem = (props) => {
    const {name,quantity} = props.product;
    const reviewItemStyle = {
        borderBottom:'1px solid lightgray',
        margin:'0 0 10px 200px',
        paddingBottom:'10px'
    }
    return (
        <div style={reviewItemStyle}>
            <h4 className='product-name'>{name}</h4>
            <p>Quantity: {quantity}</p>
            <button className='main-button'>Remove</button>
        </div>
    );
};

export default ReviewItem;