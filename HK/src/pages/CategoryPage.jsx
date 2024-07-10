import React, { useState, useEffect } from "react";
import axios from 'axios';
import Navbar from "../components/Navbar";
import { useLocation } from "react-router-dom";
import x1 from "/images/10+1 installment plam.jpg";
import "../styles/cp.css";
import Filter from "../components/Filter";
import Item from "../components/ItemCard";
import j1 from "/images/j1.jpg";
import DropdownMenu from "../components/DropdownMenu";
import Footer from "../components/Footer";

function CategoryPage() {
  const location = useLocation();
  var { title, param1, param2, param3, param4, param5, param6 } = location.state;
  const [messages, setMessages] = useState([]);
  const [sortBy, setSortBy] = useState("default");
  const [dType, setDType] = useState([param2]);
  const [mType, setMType] = useState([]);
  const [gifts, setGifts] = useState([param5]);
  const [gender, setGender] = useState([]);
  const [price, setPrice] = useState([param3]);
  const [type, setType] = useState([param4]);
  const [clear, setClear] = useState(false);
  const [activeFilters, setActiveFilters] = useState(0); // State for active filter count

  console.log("param6>>", param6);

  const handleSortChange = (value) => {
    console.log("Sort by:", value);
    setSortBy(value);
  };

  const handleDtype = (arr) => {
    console.log("Diamond type: ", arr);
    setDType(arr);
  };

  const handleMtype = (arr) => {
    console.log("Metal type: ", arr);
    setMType(arr);
  };

  const handleGifts = (arr) => {
    console.log("Gifts: ", arr);
    setGifts(arr);
  };

  const handleGender = (arr) => {
    console.log("Gender: ", arr);
    setGender(arr);
  };

  const handlePrice = (arr) => {
    console.log("Price: ", arr);
    setPrice(arr);
  };

  const handleType = (arr) => {
    console.log("Type: ", arr);
    setType(arr);
  };

  const handleClear = () => {
    setClear(true);
    // setSortBy("default");
  };

  useEffect(()=>{
    console.log("title has changed to:",title)
  },[title])

  useEffect(() => {
    setClear(false);
  }, [clear]);

  useEffect(() => {
    let queryParameters = `${dType ? `&dtype=${dType}` : ''}${mType ? `&mtype=${mType}` : ''}${gifts ? `&gifts=${gifts}` : ''}${gender ? `&gender=${gender}` : ''}${price ? `&price=${price}` : ''}${type ? `&type=${type}` : ''}`;
  
    if (title === "BESTSELLERS" || title === "Bestsellers") {
      queryParameters += `&bestseller=1`;
      console.log("title in bestseller", title);
    }
    if (title === "NEW ARRIVALS" || title === "New Arrivals") {
      queryParameters += `&new=1`;
      console.log("title in new", title);
    }
    if (title === "READY TO SHIP") {
      queryParameters += `&rts=1`;
      console.log("title in rts", title);
    }
    if (title === "ALL JEWELLERY" || title === "BESTSELLERS" || title === "GIFTS" || title === "NEW ARRIVALS" || title === "READY TO SHIP" || title === "New Arrivals" || title === "Bestsellers") {
      title = '';
      console.log("in title", title);
    }
  
    if (param1) {
      queryParameters += `&style=${param1}`;
    }
    if (param6) {
      queryParameters += `&relation=${param6}`;
    }
  
    const fetchData = async () => {
      try {
        let response;
        let url = `http://localhost:5000/api/category?parameter=${title}${queryParameters}`;
        
        switch (sortBy) {
          case "lth":
            url = `http://localhost:5000/api/category/lth/?parameter=${title}${queryParameters}`;
            break;
          case "htl":
            url = `http://localhost:5000/api/category/htl/?parameter=${title}${queryParameters}`;
            break;
          case "new":
            url = `http://localhost:5000/api/category/new/?parameter=${title}${queryParameters}`;
            break;
          case "bestsellers":
            url = `http://localhost:5000/api/category/bestsellers/?parameter=${title}${queryParameters}`;
            break;
          case "discount":
            url = `http://localhost:5000/api/category/discount/?parameter=${title}${queryParameters}`;
            break;
          default:
            url = `http://localhost:5000/api/category?parameter=${title}${queryParameters}`;
            break;
        }
  
        console.log("Fetching data from URL:", url);
        response = await axios.get(url);
        console.log("response>>", response.data);
        setMessages(response.data);
      } catch (error) {
        console.error('There was an error fetching the data!', error);
      }
    };
  
    console.log("sortBy in url>>>", sortBy);
    fetchData();
  }, [title, sortBy, dType, mType, gifts, gender, price, type, param1, param6]);
  
  // Calculate number of active filters
  useEffect(() => {
    let count = 0;

    if (dType.length > 0) {
        dType.forEach((item) => {
            if (item !== '' && item !== undefined && item !== null) {
                count++;
            }
        });
    }
    
    if (mType.length > 0) {
        mType.forEach((item) => {
            if (item !== '' && item !== undefined && item !== null) {
                count++;
            }
        });
    }
    
    if (gifts.length > 0) {
        gifts.forEach((item) => {
            if (item !== '' && item !== undefined && item !== null) {
                count++;
            }
        });
    }
    
    if (gender.length > 0) {
        gender.forEach((item) => {
            if (item !== '' && item !== undefined && item !== null) {
                count++;
            }
        });
    }
    
    if (price.length > 0) {
        price.forEach((item) => {
            if (item !== '' && item !== undefined && item !== null) {
                count++;
            }
        });
    }
    
    if (type.length > 0) {
        type.forEach((item) => {
            if (item !== '' && item !== undefined && item !== null) {
                count++;
            }
        });
    }
    
    setActiveFilters(count);
  }, [dType, mType, gifts, gender, price, type]);

  return (
    <div>
      <Navbar />
      <img className="x1" src={x1} alt="categoryPhoto" />
      <div className="cp1">
        <h3>HOME / CATEGORIES / {title} {param1 ? ` / ${param1}` : ''} {param2 ? ` / ${param2}` : ''}{param3 ? ` / ${param3}` : ''} {param4 ? ` / ${param4}` : ''} {param5 ? ` / ${param5}` : ''} {param6 ? ` / ${param6}` : ''}</h3>
        <p>{messages.length} designs</p>
        <DropdownMenu onChange={handleSortChange} sortValue={sortBy} />
      </div>
      <div className="fHeading">
        <p>FILTER</p>
        {activeFilters > 0 && <span className="filterCount">({activeFilters})</span>} {/* Display filter count */}
        <p className="ca" onClick={handleClear}>CLEAR ALL</p>
      </div>
      <div className="cp2">
        <div className="scroll">
          <Filter
            className="scrolled"
            onChangingDtype={handleDtype}
            onChangingMtype={handleMtype}
            onChangingGifts={handleGifts}
            onChangingGender={handleGender}
            onChangingPrice={handlePrice}
            onChangingType={handleType}
            cleared={clear}
            onChangingSort={handleSortChange}
            param2={param2}
            param3={param3}
            param4={param4}
            param5={param5}
            title={title}
          />
        </div>
        <div className="items">
          {messages.map((item, index) => (
            <Item
              key={index}
              loc={j1}
              title={item.name}
              nprice={item.discounted_price !== null ? item.discounted_price : item.price}
              oprice={item.discounted_price != null ? item.price : null}
            />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default CategoryPage;
