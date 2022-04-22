import React from "react";

const Checkout = () => {
    return (
        <span className="container">
            <form >
            <label className="shipping">Shipping Info</label>
            <input type="text" placeholder="Address Line 1">
            </input>
            <input type="text" placeholder="Address Line 2">
            </input>
            <input type="text" placeholder="Address Line 3">
            </input>
            <label>Payment Method</label>
            <input type="text" placeholder="Credit Card Company">
            </input>
            <input type="text" placeholder="Name On Card">
            </input>
            <input type="text" placeholder="Credit Card Number">
            </input>
            <label>Review Items</label>
            <input>
            </input>
            <label>Place Your order</label>
            <button type="submit">Place Your Order</button>
            </form>
        </span>
    )
}

export default Checkout;