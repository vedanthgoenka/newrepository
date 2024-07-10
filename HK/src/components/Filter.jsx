import React, { useState, useEffect } from "react";
import "../styles/cp.css";

function Filter({ onChangingDtype, onChangingMtype,onChangingGifts,onChangingGender,onChangingPrice,onChangingType,onChangingSort,cleared,param2,param3,param4,param5,title}) {
    const [typesOfD, setTypesOfD] = useState([param2]);
    const [typesOfM, setTypesofM] = useState([]);
    const [gifts,setGifts]=useState([param5]);
    const[gender,setGender]=useState([]);
    const[price,setPrice]=useState([param3]);
    const[type,setType]=useState([param4]);
    // const[sort,changeSort]=useState("default");
    var[isCleared,setisCleared]=useState(false);
    // const first= title[0]
    // const r1= title.slice(1);
    // const r2= r1.toLowerCase();
    // const title2= first+r2;
    // console.log("title2 is: ", title2)

    console.log("param2 is ",param2)
    console.log("types of d ",typesOfD);

    useEffect(() => {
        console.log("array is cleared >>", cleared);
        if (cleared) {
            console.log("Clear is clicked, resetting arrays...");
            setTypesOfD([]);
            setTypesofM([]);
            setGifts([]);
            setGender([]);
            setPrice([]);
            setType([]);
            onChangingSort("default");
            // changeSort("default");

            var labelsToClear = document.getElementsByClassName("container");
            for (var i = 0; i < labelsToClear.length; i++) {
                var checkbox = labelsToClear[i].querySelector('input[type="checkbox"]');
                checkbox.checked = false; // Uncheck each checkbox
            }
        }
    },[cleared]);

    const handleCheckboxChange = (event) => {
        const checkbox = event.target;
        const isChecked = event.target.checked;
        const labelValue = event.target.closest('label').textContent.trim();
        console.log("label value>>", labelValue);

        let previousElement = checkbox.closest('label').previousElementSibling;

        // Traverse the DOM to find the previous h3 element
        while (previousElement && previousElement.tagName !== 'H3') {
            previousElement = previousElement.previousElementSibling;
        }

        if (previousElement && previousElement.tagName === 'H3') {
            console.log('H3 Content:', previousElement.textContent);

            if (previousElement.textContent === 'Diamond Type') {
                setTypesOfD((prevTypes) => {
                    if (isChecked) {
                        return [...prevTypes, labelValue];
                    } else {
                        return prevTypes.filter((type) => type !== labelValue);
                    }
                });
            }

            if (previousElement.textContent === 'Type') {
                setType((prevTypes) => {
                    if (isChecked) {
                        return [...prevTypes, labelValue];
                    } else {
                        return prevTypes.filter((type) => type !== labelValue);
                    }
                });
            }

            if (previousElement.textContent === 'Gifts') {
                setGifts((prevTypes) => {
                    if (isChecked) {
                        return [...prevTypes, labelValue];
                    } else {
                        return prevTypes.filter((type) => type !== labelValue);
                    }
                });
            }

            if (previousElement.textContent === 'Price') {
                setPrice((prevTypes) => {
                    if (isChecked) {
                        return [...prevTypes, labelValue];
                    } else {
                        return prevTypes.filter((type) => type !== labelValue);
                    }
                });
            }

            if (previousElement.textContent === 'Gender') {
                setGender((prevTypes) => {
                    if (isChecked) {
                        return [...prevTypes, labelValue];
                    } else {
                        return prevTypes.filter((type) => type !== labelValue);
                    }
                });
            }

            if (previousElement.textContent === 'Metal Type') {
                setTypesofM((prevTypes) => {
                    if (isChecked) {
                        return [...prevTypes, labelValue];
                    } else {
                        return prevTypes.filter((type) => type !== labelValue);
                    }
                });
            }

        } else {
            console.log("No previous h3 element found.");
        }
    };

    useEffect(() => {
        // Initialize typesOfD with param2 when the component mounts or when param2 changes
        setTypesOfD([param2]);
        console.log("filter Dtype",typesOfD)
        // Clear all checkboxes
        const allCheckboxes = document.querySelectorAll('input[type="checkbox"]');
        allCheckboxes.forEach(checkbox => {
            checkbox.checked = false; // Uncheck all checkboxes
        });
    
        const h3Elements = document.querySelectorAll('h3');
        h3Elements.forEach((h3) => {
            if (h3.textContent === 'Diamond Type') {
                // Find the next sibling labels that contain checkboxes
                let sibling = h3.nextElementSibling;
                while (sibling && sibling.tagName !== 'H3') {
                    if (sibling.tagName === 'LABEL') {
                        const label = sibling;
                        if (param2 === label.textContent.trim()) {
                            const checkbox = label.querySelector('input[type="checkbox"]');
                            if (checkbox) {
                                checkbox.checked = true; // Update the checkbox state
                                console.log("dtype checkbox is checked: ", checkbox.checked);
                            }
                        }
                    }
                    sibling = sibling.nextElementSibling;
                }
            }
            // if (h3.textContent === 'Type') {
            //     // Find the next sibling labels that contain checkboxes
            //     let sibling = h3.nextElementSibling;
            //     while (sibling && sibling.tagName !== 'H3') {
            //         if (sibling.tagName === 'LABEL') {
            //             const label = sibling;
            //             if (title2 === label.textContent.trim()) {
            //                 const checkbox = label.querySelector('input[type="checkbox"]');
            //                 if (checkbox) {
            //                     checkbox.checked = true; // Update the checkbox state
            //                     console.log("type checkbox is checked: ", checkbox.checked);
            //                 }
            //             }
            //         }
            //         sibling = sibling.nextElementSibling;
            //     }
            // }
        });
    }, [param2]);
    

    useEffect(() => {
        setPrice([param3]);
        console.log("filter price",price)
        const allCheckboxes = document.querySelectorAll('input[type="checkbox"]');
        allCheckboxes.forEach(checkbox => {
            checkbox.checked = false; // Uncheck all checkboxes
        });
    
        const h3Elements = document.querySelectorAll('h3');
        h3Elements.forEach((h3) => {
            if (h3.textContent === 'Price') {
                // Find the next sibling labels that contain checkboxes
                let sibling = h3.nextElementSibling;
                while (sibling && sibling.tagName !== 'H3') {
                    if (sibling.tagName === 'LABEL') {
                        const label = sibling;
                        if (param3 === label.textContent.replace(/[^\d.,-]/g, '').trim()) {
                            const checkbox = label.querySelector('input[type="checkbox"]');
                            if (checkbox) {
                                checkbox.checked = true; // Update the checkbox state
                                console.log("price checkbox is checked: ", checkbox.checked);
                            }
                        }
                    }
                    sibling = sibling.nextElementSibling;
                }
            }
            // if (h3.textContent === 'Type') {
            //     // Find the next sibling labels that contain checkboxes
            //     let sibling = h3.nextElementSibling;
            //     while (sibling && sibling.tagName !== 'H3') {
            //         if (sibling.tagName === 'LABEL') {
            //             const label = sibling;
            //             if (title2 === label.textContent.trim()) {
            //                 const checkbox = label.querySelector('input[type="checkbox"]');
            //                 if (checkbox) {
            //                     checkbox.checked = true; // Update the checkbox state
            //                     console.log("type checkbox is checked: ", checkbox.checked);
            //                 }
            //             }
            //         }
            //         sibling = sibling.nextElementSibling;
            //     }
            // }
        });
    }, [param3]);

    useEffect(() => {
        setType([param4]);
        console.log("filter type",type)
        console.log("filter title",title)
        const allCheckboxes = document.querySelectorAll('input[type="checkbox"]');
        allCheckboxes.forEach(checkbox => {
            checkbox.checked = false; // Uncheck all checkboxes
        });
    
        const h3Elements = document.querySelectorAll('h3');
        h3Elements.forEach((h3) => {
            if (h3.textContent === 'Type') {
                // Find the next sibling labels that contain checkboxes
                let sibling = h3.nextElementSibling;
                while (sibling && sibling.tagName !== 'H3') {
                    if (sibling.tagName === 'LABEL') {
                        const label = sibling;
                        if (param4 === label.textContent.trim()) {
                            const checkbox = label.querySelector('input[type="checkbox"]');
                            if (checkbox) {
                                checkbox.checked = true; // Update the checkbox state
                                console.log("type checkbox is checked: ", checkbox.checked);
                            }
                        }
                        // if (title2 === label.textContent.trim()) {
                        //     const checkbox = label.querySelector('input[type="checkbox"]');
                        //     if (checkbox) {
                        //         checkbox.checked = true; // Update the checkbox state
                        //         console.log("type checkbox is checked: ", checkbox.checked);
                        //     }
                        // }
                    }
                    sibling = sibling.nextElementSibling;
                }
            }
        });
    }, [param4]);

    useEffect(() => {
        setGifts([param5]);
        console.log("filter gifts",gifts)
        const allCheckboxes = document.querySelectorAll('input[type="checkbox"]');
        allCheckboxes.forEach(checkbox => {
            checkbox.checked = false; // Uncheck all checkboxes
        });
    
        const h3Elements = document.querySelectorAll('h3');
        h3Elements.forEach((h3) => {
            if (h3.textContent === 'Gifts') {
                // Find the next sibling labels that contain checkboxes
                let sibling = h3.nextElementSibling;
                while (sibling && sibling.tagName !== 'H3') {
                    if (sibling.tagName === 'LABEL') {
                        const label = sibling;
                        if (param5 === label.textContent.trim()) {
                            const checkbox = label.querySelector('input[type="checkbox"]');
                            if (checkbox) {
                                checkbox.checked = true; // Update the checkbox state
                                console.log("gifts checkbox is checked: ", checkbox.checked);
                            }
                        }
                    }
                    sibling = sibling.nextElementSibling;
                }
            }
        });
    }, [param5]);

    useEffect(() => {
        onChangingDtype(typesOfD);
        console.log("filter2 dtype",typesOfD)
    }, [typesOfD, onChangingDtype]);

    useEffect(() => {
        onChangingMtype(typesOfM);
        console.log("filter2 Mtype",typesOfM)
    }, [typesOfM, onChangingMtype]);

    useEffect(() => {
        onChangingGifts(gifts);
        console.log("filter2 gifts",gifts)
    }, [gifts, onChangingGifts]);

    useEffect(() => {
        onChangingGender(gender);
        console.log("filter2 gender",gender)
    }, [gender, onChangingGender]);

    useEffect(() => {
        onChangingPrice(price);
        console.log("filter2 price",price)
    }, [price, onChangingPrice]);

    useEffect(() => {
        onChangingType(type);
        console.log("filter2 type",type)
    }, [type, onChangingType]);

    // useEffect(() => {
    //     onChangingSort(sort);
    //     console.log("filter2 sort",sort)
    // }, [sort, onChangingSort]);

    return (
        <div className="filter">
            <div className="fOptions">
                <h3>Price</h3>
                <label className="container" >
                    ₹0 - ₹49999
                    <input type="checkbox" className="checkboxes" onChange={handleCheckboxChange}/>
                    <span className="checkmark"></span>
                </label>
                <label className="container" >
                    ₹50000 - ₹99999
                    <input type="checkbox" className="checkboxes" onChange={handleCheckboxChange}/>
                    <span className="checkmark"></span>
                </label>
                <label className="container" >
                    ₹100000 - ₹149999
                    <input type="checkbox" className="checkboxes" onChange={handleCheckboxChange}/>
                    <span className="checkmark"></span>
                </label>
                <label className="container" >
                    ₹150000 - ₹199999
                    <input type="checkbox" className="checkboxes" onChange={handleCheckboxChange}/>
                    <span className="checkmark"></span>
                </label>
                <label className="container" >
                    ₹200000 +
                    <input type="checkbox" className="checkboxes" onChange={handleCheckboxChange}/>
                    <span className="checkmark"></span>
                </label>
                <h3>Type</h3>
                <label className="container" >
                    Rings
                    <input type="checkbox" className="checkboxes" onChange={handleCheckboxChange}/>
                    <span className="checkmark"></span>
                </label>
                <label className="container" >
                    Necklaces
                    <input type="checkbox" className="checkboxes" onChange={handleCheckboxChange}/>
                    <span className="checkmark"></span>
                </label>
                <label className="container" >
                    Pendants
                    <input type="checkbox" className="checkboxes" onChange={handleCheckboxChange}/>
                    <span className="checkmark"></span>
                </label>
                <label className="container" >
                    Earrings
                    <input type="checkbox" className="checkboxes" onChange={handleCheckboxChange}/>
                    <span className="checkmark"></span>
                </label>
                <label className="container" >
                    Bracelets
                    <input type="checkbox" className="checkboxes" onChange={handleCheckboxChange}/>
                    <span className="checkmark"></span>
                </label>
                <h3>Diamond Type</h3>
                <label className="container" >
                    SI-HI
                    <input type="checkbox" className="checkboxes" onChange={handleCheckboxChange} />
                    <span className="checkmark"></span>
                </label>
                <label className="container">
                    VVS-FG
                    <input type="checkbox" className="checkboxes" onChange={handleCheckboxChange}/>
                    <span className="checkmark"></span>
                </label>
                <h3>Metal Type</h3>
                <label className="container">
                    14 KT
                    <input type="checkbox" className="checkboxes" onChange={handleCheckboxChange}/>
                    <span className="checkmark"></span>
                </label>
                <label className="container">
                    18 KT
                    <input type="checkbox" className="checkboxes" onChange={handleCheckboxChange}/>
                    <span className="checkmark"></span>
                </label>
                <h3>Gender</h3>
                <label className="container">
                    Female
                    <input type="checkbox" className="checkboxes" onChange={handleCheckboxChange}/>
                    <span className="checkmark"></span>
                </label>
                <label className="container">
                    Male
                    <input type="checkbox" className="checkboxes" onChange={handleCheckboxChange}/>
                    <span className="checkmark"></span>
                </label>
                <label className="container">
                    Unisex
                    <input type="checkbox" className="checkboxes" onChange={handleCheckboxChange}/>
                    <span className="checkmark"></span>
                </label>
                <h3>Gifts</h3>
                <label className="container">
                    Anniversary
                    <input type="checkbox" className="checkboxes" onChange={handleCheckboxChange}/>
                    <span className="checkmark"></span>
                </label>
                <label className="container">
                    Birthday
                    <input type="checkbox" className="checkboxes" onChange={handleCheckboxChange}/>
                    <span className="checkmark"></span>
                </label>
                <label className="container">
                    Wedding
                    <input type="checkbox" className="checkboxes" onChange={handleCheckboxChange}/>
                    <span className="checkmark"></span>
                </label>
                <label className="container">
                    Engagement
                    <input type="checkbox" className="checkboxes" onChange={handleCheckboxChange}/>
                    <span className="checkmark"></span>
                </label>
            </div>
        </div>
    );
}

export default Filter;
