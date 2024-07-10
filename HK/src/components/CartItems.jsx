import React, { useEffect, useState } from "react";
import j1 from "/images/j1.jpg";
import "../styles/Cart.css";
import arrowIcon from '/images/down-arrow.png';
import DeleteIcon from '@mui/icons-material/Delete';

function CartItems(props) {
    const [showDropdown, setShowDropdown] = useState(false);
    const [buttonName, setButtonName] = useState(props.quantity || 1);
    const [itemTotal, setItemTotal] = useState(props.price * (props.quantity || 1));
    

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };

    const handleSortChange = (displayName) => {
        setButtonName(displayName);
        setShowDropdown(false);
        props.updateSubTotal(props.id, displayName);
      };

    const handleDeleteClick = () => {
        props.handleDelete();
        setButtonName(1);
    };
    
      

    useEffect(()=>{
        setItemTotal(props.price*buttonName);
        handleSortChange(buttonName)
    },[buttonName,props.price])
    


    return (
        <div>
            <div className="cart-card">
                <div>
                    <img src={j1} alt="j1" id="item-image"/>
                </div>
                <div className="cart-body">
                    <h3>
                        {props.name}
                        <p id="custom">
                            Color: {props.color}
                        </p>
                        <p id="custom">
                            Diamond Type: {props.dt}
                        </p>
                        <p id="custom">
                            Metal type: {props.mt}
                        </p>
                        <p id="custom">
                            Size: {props.size}
                        </p>
                    </h3>
                    <h3>
                        Each
                        <p id="custom">
                            ₹{props.price}
                        </p>
                    </h3>
                    <h3>
                        Quantity
                        <div className="dropdown3" id="quantity">
                            <button onClick={toggleDropdown} className="dropbtn3">
                                {buttonName}
                                <img src={arrowIcon} alt="arrow" className={`arrow-icon2 ${showDropdown ? "rotate3" : ""}`} />
                            </button>
                            <div id="myDropdown3" className={`dropdown-content3 ${showDropdown ? "show" : ""}`}>
                                <a onClick={() => handleSortChange(1)}>1</a>
                                <a onClick={() => handleSortChange(2)}>2</a>
                                <a onClick={() => handleSortChange(3)}>3</a>
                                <a onClick={() => handleSortChange(4)}>4</a>
                                <a onClick={() => handleSortChange(5)}>5</a>
                            </div>
                        </div>
                    </h3>
                    <h3>
                        Price
                        <p id="custom">
                        ₹{itemTotal}
                        </p>
                        {/* <div>
                    <button className="delete-item">
                        Delete
                    </button>
                </div> */}
                <DeleteIcon 
    className="delete-item" 
    onClick={handleDeleteClick} 
/>
                    {console.log("this is the props in cart items",props.id,props.color,props.dt,props.mt,props.size)}
                    </h3>
                </div>
            </div>
        </div>
    );
}

export default CartItems;
