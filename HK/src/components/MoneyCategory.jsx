import React from "react";
import u1 from "/images/u11.jpg";
import u2 from "/images/u21.jpg";
import u3 from "/images/u31.jpg";
import u4 from "/images/u41.jpg";
import '../styles/MoneyCategory.css';
import { useNavigate } from 'react-router-dom';

function MoneyCategory(){

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

    return(
        <div className="header3">
            <div className="under">
               <img onClick={() => handleNavigation("/category","ALL JEWELLERY","","","0-49999","","","")} src={u1} alt="u1" /> 
            </div>
            <div className="under">
               <img onClick={() => handleNavigation("/category","ALL JEWELLERY","","","0-99999","","","")} src={u2} alt="u2" /> 
            </div>
            <div className="under">
               <img onClick={() => handleNavigation("/category","ALL JEWELLERY","","","0-149999","","","")} src={u3} alt="u3" /> 
            </div>
            <div className="under">
               <img onClick={() => handleNavigation("/category","ALL JEWELLERY","","","0-199999","","","")} src={u4} alt="u4" /> 
            </div>
        </div>
    )
}

export default MoneyCategory