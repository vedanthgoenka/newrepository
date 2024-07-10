import React from "react";
import "../styles/navbar.css";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import logo from '/images/logo.jpg';
import Dropdown from "./Dropdown";
import { useNavigate } from 'react-router-dom';


function Navbar() {

    const navigate = useNavigate();

  const handleNavigation = async (path,title,param1,param2,param3,param4,param5,param6) => {
    try {
      console.log("Dropdown button clicked");
      navigate(path,{state:{title,param1,param2,param3,param4,param5,param6}}); // Navigate to the specified path
    } catch (error) {
      console.error('Error navigating to category page:', error);
      // Handle error, show error message, etc.
    }
  };

  const handleNavigation2 = async (path,itemId) => {
    try {
      console.log("Cart button clicked");
      navigate(path,{state:{itemId}}); // Navigate to the specified path
    } catch (error) {
      console.error('Error navigating to category page:', error);
      // Handle error, show error message, etc.
    }
  };

  const handleLogoClick = async () => {
    try {
      console.log("Logo clicked");
      navigate('/'); // Navigate to the home page
    } catch (error) {
      console.error('Error handling logo click:', error);
      // Handle error, show error message, etc.
    }
  };
  
    

    return (
        <div>
            <div className="header">
                <div>
                <img className="logoItem" src={logo} alt="HK Logo" onClick={handleLogoClick} />
                </div>
                <div className="search-container">
                    <input name="searchedItem" placeholder="Search..." />
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" className="bi bi-search searchIcon" viewBox="0 0 16 16">
                        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
                    </svg>
                </div>
                <div className="navbarIcons">
                    <button><FavoriteBorderIcon className="heartIcon" fontSize="large" /></button>
                    <button onClick={()=>handleNavigation2("/Cart","","","","","","","")}><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-cart2 cartIcon" viewBox="0 0 16 16" color="gray">
                        <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5M3.14 5l1.25 5h8.22l1.25-5zM5 13a1 1 0 1 0 0 2 1 1 0 0 0 0-2m-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0m9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2m-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0" />
                    </svg></button>
                    <button><PermIdentityIcon className="personIcon" fontSize="large" /></button>
                </div>
            </div>
            <div className="navbar">
                <Dropdown title="RINGS" />
                <Dropdown title="NECKLACES" />
                <Dropdown title="PENDANTS" />
                {/* <Dropdown title="ALL JEWELLERY" /> */}
                <div className="dropdown">
      <button onClick={() => handleNavigation("/category","ALL JEWELLERY","","","","","","")} className="dropbtn">
        ALL JEWELLERY
        {/* <i className="fa fa-caret-down" color="black" font-size="20px">abcd</i> */}
      </button>
      <div className="dropdown-content">   
        <div className="row">
          <div className="column">
            <h3>By Type</h3>
            <a onClick={() => handleNavigation("/category","ALL JEWELLERY","","","","Rings","","")}>Rings</a>
            <a onClick={() => handleNavigation("/category","ALL JEWELLERY","","","","Earrings","","")}>Earrings</a>
            <a onClick={() => handleNavigation("/category","ALL JEWELLERY","","","","Necklaces","","")}>Necklaces</a>
            <a onClick={() => handleNavigation("/category","ALL JEWELLERY","","","","Pendants","","")}>Pendants</a>
          </div>
          <div className="column">
            <h3>Diamond Type</h3>
            <a onClick={() => handleNavigation("/category","ALL JEWELLERY","","SI-HI","","","","")}>SI-HI</a>
            <a onClick={() => handleNavigation("/category","ALL JEWELLERY","","VVS-FG","","","","")}>VVS-FG</a>
          </div>
          <div className="column">
            <h3>Price</h3>
            <a onClick={() => handleNavigation("/category","ALL JEWELLERY","","","0-49999","","","")}>UNDER 50K</a>
            <a onClick={() => handleNavigation("/category","ALL JEWELLERY","","","50000-99999","","","")}>50K TO 100K</a>
            <a onClick={() => handleNavigation("/category","ALL JEWELLERY","","","100000-149999","","","")}>100K TO 150K</a>
            <a onClick={() => handleNavigation("/category","ALL JEWELLERY","","","150000-199999","","","")}>150K TO 200K</a>
            <a onClick={() => handleNavigation("/category","ALL JEWELLERY","","","200000","","","")}>200K +</a>
          </div>
        </div>
      </div>
    </div>
    <div className="dropdown">
      <button onClick={() => handleNavigation("/category","BESTSELLERS","","","","","","")} className="dropbtn">
        BESTSELLERS
        {/* <i className="fa fa-caret-down" color="black" font-size="20px">abcd</i> */}
      </button>
      </div>
                {/* <Dropdown title="GIFTS" /> */}
                <div className="dropdown">
      <button onClick={() => handleNavigation("/category","GIFTS","","","","","","")} className="dropbtn">
        GIFTS
        {/* <i className="fa fa-caret-down" color="black" font-size="20px">abcd</i> */}
      </button>
      <div className="dropdown-content">   
        <div className="row">
          <div className="column">
            <h3>Occasion</h3>
            <a onClick={() => handleNavigation("/category","GIFTS","","","","","Anniversary","")}>Anniversary</a>
            <a onClick={() => handleNavigation("/category","GIFTS","","","","","Birthday","")}>Birthday</a>
            <a onClick={() => handleNavigation("/category","GIFTS","","","","","Engagement","")}>Engagement</a>
            <a onClick={() => handleNavigation("/category","GIFTS","","","","","Wedding","")}>Wedding</a>
          </div>
          <div className="column">
            <h3>For</h3>
            <a onClick={() => handleNavigation("/category","GIFTS","","","","","","Her")}>Her</a>
            <a onClick={() => handleNavigation("/category","GIFTS","","","","","","Him")}>Him</a>
            <a onClick={() => handleNavigation("/category","GIFTS","","","","","","Father")}>Father</a>
            <a onClick={() => handleNavigation("/category","GIFTS","","","","","","Mother")}>Mother</a>
            <a onClick={() => handleNavigation("/category","GIFTS","","","","","","Brother")}>Brother</a>
            <a onClick={() => handleNavigation("/category","GIFTS","","","","","","Sister")}>Sister</a>
          </div>
          <div className="column">
            <h3>Price</h3>
            <a onClick={() => handleNavigation("/category","GIFTS","","","0-49999","","","")}>UNDER 50K</a>
            <a onClick={() => handleNavigation("/category","GIFTS","","","50000-99999","","","")}>50K TO 100K</a>
            <a onClick={() => handleNavigation("/category","GIFTS","","","100000-149999","","","")}>100K TO 150K</a>
            <a onClick={() => handleNavigation("/category","GIFTS","","","150000-199999","","","")}>150K TO 200K</a>
            <a onClick={() => handleNavigation("/category","GIFTS","","","200000","","","")}>200K +</a>
          </div>
        </div>
      </div>
    </div>
    <div className="dropdown">
      <button onClick={() => handleNavigation("/category","NEW ARRIVALS","","","")} className="dropbtn">
        NEW ARRIVALS
        {/* <i className="fa fa-caret-down" color="black" font-size="20px">abcd</i> */}
      </button>
      </div>
                {/* <Dropdown title="CHAINS" /> */}
                <div className="dropdown">
      <button onClick={() => handleNavigation("/category","READY TO SHIP","","","")} className="dropbtn">
        READY TO SHIP
        {/* <i className="fa fa-caret-down" color="black" font-size="20px">abcd</i> */}
      </button>
      </div>
                <a href="https://meriroshni.kisna.com/">10+1 MONTHLY PLAN</a>
                <a href="https://kisna.com/pages/locate-our-stores">LOCATE OUR STORE</a>
            </div>
        </div>
    )
}

export default Navbar;
