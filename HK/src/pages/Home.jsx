import React, { useState, useEffect } from "react";
import axios from 'axios';
import Navbar from "../components/Navbar"
import MyCarousel from "../components/MyCarousel";
import NewArrivals from "../components/NewArrivals";
import Collection from "../components/collection";
import Categories from "../components/Categories";
import MoneyCategory from "../components/MoneyCategory";
import Footer from "../components/Footer";

function Home(){
  //   const [messages, setMessages] = useState([]);

  // useEffect(() => {
  //   axios.get('http://localhost:5000/api/messages')
  //     .then(response => {
  //       setMessages(response.data);
  //       console.log("response>>", response);
  //       console.log("messages", messages)
  //     })
  //     .catch(error => {
  //       console.error('There was an error fetching the data!', error);
  //     });
  // }, []);

  return(
    <div>
      <Navbar />
      <MyCarousel />
      <NewArrivals main="New Arrivals" />
      <Collection />
      <NewArrivals main="Bestsellers" />
      <Categories />
      <MoneyCategory />
      <Footer />
      {/* <div>
        <h1>Messages from Backend:</h1>
        <ul>
          {messages.map(message => (
            <li key={message.id}>{message.text}</li>
          ))}
        </ul>
      </div> */}
    </div>
  )
}

export default Home;