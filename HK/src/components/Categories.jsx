import React from "react";
import r1 from '/images/r1.jpg';
import r2 from '/images/r2.jpg';
import r3 from '/images/r3.jpg';
import r4 from '/images/r4.jpg';
import r5 from '/images/r5.jpg';
import r6 from '/images/r6.jpg';
import r7 from '/images/r7.jpg';
import r8 from '/images/r8.jpg';
import r9 from '/images/r9.jpg';
import r10 from '/images/r10.jpg';
import '../styles/categories.css';
import { useNavigate } from 'react-router-dom';

function Categories(){
    const navigate = useNavigate();

  const handleNavigation = async (path,title) => {
    try {
      console.log("Dropdown button clicked");
      navigate(path,{state:{title}}); // Navigate to the specified path
    } catch (error) {
      console.error('Error navigating to category page:', error);
      // Handle error, show error message, etc.
    }
  };
    return(
        <div>
            <div className="categoryClass">
                <h1>Categories</h1>
            </div>
            <div className="rImages">
                <div className="rImages1">
                <div className="ri" onClick={() => handleNavigation("/category","RINGS")}>
                    <img src={r1} alt="r1" />
                    <h3>RINGS</h3>
                </div>
                <div className="ri" onClick={() => handleNavigation("/category","EARRINGS")}>
                    <img src={r2} alt="r1" />
                    <h3>EARRINGS</h3>
                </div>
                <div className="ri" onClick={() => handleNavigation("/category","PENDANTS")}>
                    <img src={r3} alt="r1" />
                    <h3>PENDANTS</h3>
                </div>
                <div className="ri" onClick={() => handleNavigation("/category","BRACELETS")}>
                    <img src={r6} alt="r1" />
                    <h3>BRACELETS</h3>
                </div>
                <div className="ri" onClick={() => handleNavigation("/category","NECKLACES")}>
                    <img src={r7} alt="r1" />
                    <h3>NECKLACES</h3>
                </div>
                {/* <div className="ri">
                    <img src={r4} alt="r1" />
                    <h3>BANGLES</h3>
                </div>
                <div className="ri">
                    <img src={r5} alt="r1" />
                    <h3>NOSE PINS</h3>
                </div>
                </div>
                <div className="rImages1">
                
                
                <div className="ri">
                    <img src={r8} alt="r1" />
                    <h3>MANGALSUTRA</h3>
                </div>
                <div className="ri">
                    <img src={r9} alt="r1" />
                    <h3>GOLD JEWELLERY</h3>
                </div>
                <div className="ri">
                    <img src={r10} alt="r1" />
                    <h3>BULLION</h3>
                </div>
                 */}
                 </div>
            </div>
        </div>
    )
}

export default Categories;


