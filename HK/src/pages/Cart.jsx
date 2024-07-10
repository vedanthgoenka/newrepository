import React, { useEffect,useState } from "react";
import CartItems from "../components/CartItems";
import { useLocation,useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/Cart.css";
import axios from "axios";

function Cart(){
    const location = useLocation();
    var { itemId,price,b1,b2,b3,b4,title } = location.state;
    const [item,setItem]=useState([]);
    const [reload,setReload]=useState(0);
    const [subTotal, setSubTotal] = useState(0);

    const navigate = useNavigate();

    const handleNavigation = async (path) => {
      try {
          navigate(path); // Navigate to the specified path
        }
       catch (error) {
        console.error('Error navigating to home:', error);
        // Handle error, show error message, etc.
      }
    };
    console.log("item id in cart is:",itemId,"price of cart item: ",price,"name is: ",title);

    // const handleTotalChange =(id,value) =>{
    //   itemTotal.forEach((item,index)=>
    //     if(id===itemTotal.Cart_itemid){
    //       itemTotal
    //     }
    //   )
    // }
   
    const updateSubTotal = (itemId, newQuantity) => {
      setItem(prevItems => {
        const updatedItems = prevItems.map(item => {
          if (item.item_id === itemId) {
            return { ...item, quantity: newQuantity };
          }
          return item;
        });
        
        const newSubTotal = updatedItems.reduce((total, item) => {
          return total + (item.price * (item.quantity || 1));
        }, 0);
        
        setSubTotal(newSubTotal);
        return updatedItems;
      });
    };
  

    const handleDelete = async (id, color, dt, mt, size) => {
      console.log("Attempting to delete item:", { id, color, dt, mt, size });
      try {
          const result = await axios.delete(`http://localhost:5000/api/cart-details`, {
              params: {
                  itemId: id,
                  color: color,
                  d_type: dt,
                  m_type: mt,
                  size: size
              }
          });
          console.log("Server response for delete:", result.data);
  
          if (result.data.response === "data deleted") {
              console.log("Item successfully deleted on server");
              
              // Update local state
              setItem(prevItems => {
                  const updatedItems = prevItems.filter(item => 
                      !(item.item_id === id && 
                        item.color === color && 
                        item.d_type === dt && 
                        item.m_type === mt && 
                        item.size === size)
                  );
                  console.log("Updated items after deletion:", updatedItems);
                  
                  // Recalculate sub-total
                  const newSubTotal = updatedItems.reduce((total, item) => {
                      return total + (item.price * (item.quantity || 1));
                  }, 0);
                  setSubTotal(newSubTotal);
                  console.log("New sub-total:", newSubTotal);
                  
                  return updatedItems;
              });
  
              // Fetch updated data from server
              try {
                  const result2 = await axios.get(`http://localhost:5000/api/cart-details`);
                  console.log("Updated cart data from server:", result2.data);
                  setItem(result2.data.map(item => ({
                      ...item,
                      quantity: item.quantity || 1
                  })));
              } catch (error) {
                  console.error("Error fetching updated cart data:", error);
              }
          } else {
              console.log("Server did not confirm deletion");
          }
      } catch (error) {
          console.error('Error deleting item:', error);
      }
  };
  useEffect(() => {
    console.log("useEffect in cart is triggered");
    
    const fetchCartData = async () => {
        try {
            const result = await axios.get(`http://localhost:5000/api/cart-details`);
            console.log("cart item actual data: ", result.data);
            const itemsWithQuantity = result.data.map(item => ({
                ...item,
                quantity: item.quantity || 1
            }));
            setItem(itemsWithQuantity);
            
            // Calculate initial sub-total
            const initialSubTotal = itemsWithQuantity.reduce((total, item) => {
                return total + (item.price * item.quantity);
            }, 0);
            setSubTotal(initialSubTotal);
        } catch (error) {
            console.log("error getting cart item", error);
        }
    };

    const addToCart = async () => {
        const data = {
            itemId,
            price,
            color: b1,
            d_type: b2,
            m_type: b3,
            size: b4,
            name: title
        };
        console.log("data: ", data);

        try {
            const result = await axios.post(`http://localhost:5000/api/cart-details`, data);
            console.log("cart item: ", result.data);
            if (result.data.response === "data inserted" || result.data.response === "item already in cart") {
                await fetchCartData();
            }
        } catch (error) {
            console.error('Error adding item to cart:', error);
        }
    };

    if (itemId === "") {
        fetchCartData();
    } else {
        addToCart();
    }

}, [itemId, price, b1, b2, b3, b4, title, reload]);
      
      console.log("currently item has:", item);

    return(
        <div>
            <Navbar />
            <div className="cart-header">           
            <h2>
                Shopping Cart
            </h2>
            </div>
            {item.length > 0 && item.map((i, index) => (
                <CartItems
                key={index}
                name={i.name}
                dt={i.d_type}
                mt={i.m_type}
                color={i.color}
                size={i.size}
                price={i.price}
                id={i.item_id}
                quantity={i.quantity || 1}
                handleDelete={() => handleDelete(i.item_id, i.color, i.d_type, i.m_type, i.size)}
                updateSubTotal={updateSubTotal}
            />
            ))}

            <div className="sub-total">
                <div className="proceed-buttons">
                <div className="cs">
                    <button id="b1" onClick={()=>{handleNavigation("/")}}>
                        Continue Shopping
                    </button>
                </div>
                <div className="ptc">
                    <button id="b2">
                        Proceed to Checkout
                    </button>
                </div>
                
                
                <h2>
                Sub-total = ₹{subTotal.toFixed(2)}
                </h2>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Cart;