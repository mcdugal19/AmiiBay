import React from "react";

const Checkout = () => {
    return (
        <span className="container">
            <br></br>
            <form >
            <br></br>
            <label className="shipping">Shipping Info</label>
            
            <input type="text" placeholder="Address Line 1">
            </input>
            
            <input type="text" placeholder="Address Line 2">
            </input>
            
            <input type="text" placeholder="Address Line 3">
            </input>
            <br></br>
            <br></br>
            <label>Payment Method</label>
            <input type="text" placeholder="Credit Card Company">
            </input>
            <input type="text" placeholder="Name On Card">
            </input>
            <input type="text" placeholder="Credit Card Number">
            </input>
            <br></br>
            <br></br>
            <label>Review Items</label>
            <span className="container">
            </span>
            <br></br>
            <br></br>
            <button className="Checkout-button" type="submit">Place Your Order</button>
            </form>
        </span>
    )
}

export default Checkout;