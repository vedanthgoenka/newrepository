import React, { useState } from "react";
import '../styles/dm.css';
import arrowIcon from '/images/down-arrow.png'; // Update with the correct path to your arrow image

function DropdownMenu({ onChange,sortValue }) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [buttonName, setButtonName] = useState("Sort By");

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleSortChange = (value, nameButton) => {
    console.log("Dropdown value:", value); // Debugging line to check if the dropdown is passing the value correctly
    onChange(value);
    setButtonName(nameButton); // Update buttonName state with the selected option
    setShowDropdown(false); // Close the dropdown after selection
  };
  console.log("logged first")
  return (
    <div className="dropdown2">
      <button onClick={toggleDropdown} className="dropbtn2">
        {sortValue==="default"?"Sort By":buttonName} {/* Display current button name */}
        <img src={arrowIcon} alt="arrow" className={`arrow-icon ${showDropdown ? "rotate" : ""}`} />
      </button>
      <div id="myDropdown2" className={`dropdown-content2 ${showDropdown ? "show" : ""}`}>
        <a onClick={() => handleSortChange("lth", "Price: Low to High")}>Price: Low to High</a>
        <a onClick={() => handleSortChange("htl", "Price: High to Low")}>Price: High to Low</a>
        <a onClick={() => handleSortChange("new", "New arrivals")}>New arrivals</a>
        <a onClick={() => handleSortChange("bestsellers", "Bestsellers")}>Bestsellers</a>
        <a onClick={() => handleSortChange("discount", "Discount")}>Discount</a>
      </div>
    </div>
  );
}

export default DropdownMenu;
