import React from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import "../styles/navbar.css"

function Dropdown(props){
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

  return (
    <div className="dropdown">
      <button onClick={() => handleNavigation("/category",props.title,"","","","","","")} className="dropbtn">
        {props.title}
      </button>
      <div className="dropdown-content">   
        <div className="row">
          <div className="column">
            <h3>By Style</h3>
            <a onClick={() => handleNavigation("/category",props.title,"Solitaire","","","","","")}>Solitaire</a>
            <a onClick={() => handleNavigation("/category",props.title,"Gemstone","","","","","")}>Gemstone</a>
            <a onClick={() => handleNavigation("/category",props.title,"Adjustable","","","","","")}>Adjustable</a>
            <a onClick={() => handleNavigation("/category",props.title,"Band","","","","","")}>Band</a>
            <a onClick={() => handleNavigation("/category",props.title,"Casual","","","","","")}>Casual</a>
            <a onClick={() => handleNavigation("/category",props.title,"Cocktail","","","","","")}>Cocktail</a>
            <a onClick={() => handleNavigation("/category",props.title,"Couple Band","","","","","")}>Couple Band</a>
            <a onClick={() => handleNavigation("/category",props.title,"Engagement","","","","","")}>Engagement</a>
            <a onClick={() => handleNavigation("/category",props.title,"Fashion","","","","","")}>Fashion</a>
            <a onClick={() => handleNavigation("/category",props.title,"Floral","","","","","")}>Floral</a>
            <a onClick={() => handleNavigation("/category",props.title,"Navratna","","","","","")}>Navratna</a>
          </div>
          <div className="column">
            <h3>Diamond Type</h3>
            <a onClick={() => handleNavigation("/category",props.title,"","SI-HI","","","","")}>SI-HI</a>
            <a onClick={() => handleNavigation("/category",props.title,"","VVS-FG","","","","")}>VVS-FG</a>
          </div>
          <div className="column">
            <h3>Price</h3>
            <a onClick={() => handleNavigation("/category",props.title,"","","0-49999","","","")}>UNDER 50K</a>
            <a onClick={() => handleNavigation("/category",props.title,"","","50000-99999","","","")}>50K TO 100K</a>
            <a onClick={() => handleNavigation("/category",props.title,"","","100000-149999","","","")}>100K TO 150K</a>
            <a onClick={() => handleNavigation("/category",props.title,"","","150000-199999","","","")}>150K TO 200K</a>
            <a onClick={() => handleNavigation("/category",props.title,"","","200000","","","")}>200K +</a>
          </div>
        </div>
      </div>
    </div> 
  );
}

export default Dropdown;
