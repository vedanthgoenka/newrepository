import React, { useState, useEffect } from "react";
import Item from "./ItemCard";
import j1 from '/images/j1.jpg';
import j2 from '/images/j2.jpg';
import j3 from '/images/j3.jpg';
import right from '/images/right.png';
import line from '/images/line.png';
import axios from "axios";
import '../styles/new.css';
import EastIcon from '@mui/icons-material/East';
import { useNavigate } from 'react-router-dom';

function NewArrivals(props) {
  const [newArrivals, setNew] = useState([]);
  const [bestseller, setBestseller] = useState([]);
  const navigate = useNavigate();

  const handleNavigation = async (path, title) => {
    try {
      console.log("Dropdown button clicked");
      navigate(path, { state: { title } }); // Navigate to the specified path
    } catch (error) {
      console.error('Error navigating to category page:', error);
      // Handle error, show error message, etc.
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        let dType = '';
        let mType = '';
        let gifts = '';
        let gender = '';
        let price = '';
        let type = '';
        let queryParameters = `&dtype=${dType}&mtype=${mType}&gifts=${gifts}&gender=${gender}&price=${price}&type=${type}`;
        const title = '';
          if(props.main==='New Arrivals'){
          let url1 = `http://localhost:5000/api/category/new/?parameter=${title}${queryParameters}`;
          console.log("calling url new", url1);
          const response1 = await axios.get(url1);
          setNew(response1.data);
          }
          if(props.main==='Bestsellers'){
          let url2 = `http://localhost:5000/api/category/bestsellers/?parameter=${title}${queryParameters}`;
          console.log("calling url best", url2);
          const response2 = await axios.get(url2);
          setBestseller(response2.data);
          }
        
      } catch (error) {
        console.log("Error getting new arrivals", error);
      }
    };

    fetchData(); // Call fetchData function to initiate data fetching
  }, []); // Dependency array to run effect on prop changes

  return (
    <div className="header2">
      <div className="main">
        <h1>{props.main}</h1>
      </div>
      <div className="para">
        <p>
          Lorem Ipsum is simply dummy text of the printing and typesetting industry.
        </p>
      </div>
      <div className="arrow">
        <img className="line" src={line} alt="line" />
      </div>
      <div className="y1">
        {console.log("new arrivals as items:", newArrivals)}
        {props.main === "New Arrivals" && newArrivals.slice(0, 4).map((item) => (
          <Item
            key={item.id} // Make sure each item has a unique key prop
            title={item.name}
            nprice={item.discounted_price === null ? `₹${item.price}` : `₹${item.discounted_price}`}
            oprice={item.discounted_price === null ? null : `₹${item.price}`}
            loc={j1}
          />
        ))}
        {console.log("bestsellers as items:", bestseller)}
        {props.main === "Bestsellers" && bestseller.slice(0, 4).map((item) => (
          <Item
            key={item.id} // Make sure each item has a unique key prop
            title={item.name}
            nprice={item.discounted_price === null ? `₹${item.price}` : `₹${item.discounted_price}`}
            oprice={item.discounted_price === null ? null : `₹${item.price}`}
            loc={j1}
          />
        ))}
        <div className="in-right">
          <EastIcon className="right-arrow" onClick={() => handleNavigation("/category", props.main)} />
        </div>
      </div>
    </div>
  );
}

export default NewArrivals;
