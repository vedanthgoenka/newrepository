import React, { useEffect, useState } from "react";
import { useLocation,useNavigate } from "react-router-dom";
import axios from 'axios';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import j1 from "/images/j1.jpg";
import j2 from "/images/j2.jpg";
import j3 from "/images/j3.jpg";
import "../styles/ip.css";
import '../styles/dm.css';
import arrowIcon from '/images/down-arrow.png'; // Update with the correct path to your arrow image
import policy from "/images/7-day-return2.jpg";
import "../components/ItemPage.js";
import Item from "../components/ItemCard";
import Reviews from "../components/Reviews";



function ItemPage() {
    const location = useLocation();
    var { title } = location.state;
    const [buttonName1,setButtonName1]=useState("COLOR");
    const [buttonName2,setButtonName2]=useState("DIAMOND TYPE");
    const [buttonName3,setButtonName3]=useState("METAL TYPE");
    const [buttonName4,setButtonName4]=useState("SELECT");
    const [isActive, setIsActive] = useState(false);
    const [currentRating,setRating]=useState(0);
    const [similarDesigns,setsimilarDesigns]=useState([])
    const [showDropdown1, setShowDropdown1] = useState(false);
    const [showDropdown2, setShowDropdown2] = useState(false);
    const [showDropdown3, setShowDropdown3] = useState(false);
    const [showDropdown4, setShowDropdown4] = useState(false);
    const [slideIndex, setSlideIndex] = useState(1);
    const[item,setItem]=useState([])
    const[review,setReview]=useState([]);
    const[reload,setReload]=useState(0);
      const [visibleItems, setVisibleItems] = useState(5); // Initial visible items
    
      const showMoreItems = () => {
        setVisibleItems(prev => prev + 5); // Show 5 more items when "View More" is clicked
      };
    // let warCards;
    // function warButton(){
    //   console.log("is active :",isActive)
    //   if(isActive){
    //     warCards=document.getElementsByClassName('war-card');
    //     warCards.style.display="block";
    //   }
    //   else{
    //     warCards.style.display="none";
    //   }
    // }
    const navigate = useNavigate();

  const handleNavigation = async (path,itemId,price,b1,b2,b3,b4,title) => {
    try {
      if(buttonName1==="COLOR"||buttonName2==="DIAMOND TYPE"||buttonName3==="METAL TYPE"||buttonName4==="SELECT"){
        alert("enter all customisation fields");
        return;
      }else{
        console.log("navigating to cart: ",itemId,price,b1,b2,b3,b4,title);
        navigate(path,{state:{itemId,price,b1,b2,b3,b4,title}}); // Navigate to the specified path
      }
      
    } catch (error) {
      console.error('Error navigating to category page:', error);
      // Handle error, show error message, etc.
    }
  };
function toggleReview(){
        setIsActive(!isActive)
        // warButton();
        console.log("in toggle review")
    }

function handleClick(starIndex) {
    setRating(starIndex);
    const stars = document.querySelectorAll('.stars');
    stars.forEach((star, index) => {
        if (index < starIndex) {
            star.classList.add('checked', 'clicked');
        } else {
            star.classList.remove('checked', 'clicked');
        }
    });
}

function handleHover(starIndex) {
    const stars = document.querySelectorAll('.stars');
    stars.forEach((star, index) => {
        if (index < starIndex) {
            star.classList.add('checked');
        } else {
            star.classList.remove('checked');
        }
    });
}

function resetHover() {
    const stars = document.querySelectorAll('.stars');
    stars.forEach((star, index) => {
        if (index < currentRating) {
            star.classList.add('checked');
        } else {
            star.classList.remove('checked');
        }
    });
}

const start = (similarDesigns.findIndex((item) => item.name === title))%20+1;

const end = start + 4;
console.log("start", start, "end", end);


// const getRandomRange = (arrayLength, rangeSize) => {
//       const maxStart = arrayLength - rangeSize;
//       const start = Math.floor(Math.random() * (maxStart + 1));
//       const end = start + rangeSize;
//       return [start, end];
//   };
  
//   const randomRange = getRandomRange(similarDesigns.length, 4);
//   const [start, end] = randomRange;

    const toggleDropdown1 = () => {
        setShowDropdown1(!showDropdown1);
    };
    const toggleDropdown2 = () => {
        setShowDropdown2(!showDropdown2);
    };
    const toggleDropdown3 = () => {
        setShowDropdown3(!showDropdown3);
    };
    const toggleDropdown4 = () => {
        setShowDropdown4(!showDropdown4);
    };

    const plusSlides = (n) => {
        let newIndex = slideIndex + n;
        if (newIndex > 4) newIndex = 1;
        if (newIndex < 1) newIndex = 4;
        setSlideIndex(newIndex);
    };

    const currentSlide = (n) => {
        setSlideIndex(n);
    };

    const handleRequest=(data)=>{
      setItem(data);
    }

    const handleReview=(data)=>{
      setReview(data);
    }

    const handleSimilar=(data)=>{
      setsimilarDesigns(data);
    }

    const nameChange1=(value)=>{
      setButtonName1(value);
      setShowDropdown1(false);
    }

    const nameChange2=(value)=>{
      setButtonName2(value);
      setShowDropdown2(false);
    }

    const nameChange3=(value)=>{
      setButtonName3(value);
      setShowDropdown3(false);
    }

    const nameChange4=(value)=>{
      setButtonName4(value);
      setShowDropdown4(false);
    }
    const price=item.length > 0&&item[0].discounted_price? item.length > 0&&item[0].discounted_price:item.length > 0&&item[0].price;
    const itemId= item.length>0 && item[0].item_id[0]? item[0].item_id[0]:null;
    console.log("the item id to be sent is",itemId,"type of item id",typeof(itemId));
    useEffect(()=>{
      console.log("Item details2: ",item)
    },[item])


    useEffect(() => {
      console.log("useEffect triggered"); // Debugging statement
  
      const form = document.getElementById('reviewForm');
      if (form) {
          console.log("Form found:", form); // Debugging statement
  
          const submitHandler = async (event) => {
              event.preventDefault(); // Prevent the default form submission
  
              const formData = new FormData(form);
              const data = {
                  name: formData.get('name'),
                  Rating: formData.get('Rating'),
                  itemId: formData.get('itemId'),
                  itemName: formData.get('itemName'),
                  review: formData.get('review')
              };
  
              console.log("Form data:", data); // Debugging statement
  
              // Uncomment the axios code when ready to handle form submission
              try {
                  const response = await axios.post('/api/reviews', data);
                  const result = response.data;
                  console.log("Response of post is:", result);
  
                  if (result.redirectUrl) {
                      setReload(1);
                      console.log("Submitted and reloaded...");
                  } else {
                      console.log(result.message);
                      // Handle errors or success message as needed
                  }
              } catch (error) {
                  console.error('Error:', error);
              }
          };
  
          form.addEventListener('submit', submitHandler);
  
          return () => {
              form.removeEventListener('submit', submitHandler);
          };
      } else {
          console.log("Form not found"); // Debugging statement
      }
  }, []); // Ensure empty dependency array to run once on mount

  useEffect(()=>{
    setReload(0);
  },[reload])
  
  

    useEffect(() => {
      console.log("Fetching item with title:", title); // Log to check title value
      const fetchData = async () => {
        try {
          const url1 = `http://localhost:5000/api/item?parameter=${title}`;
          console.log("Fetching data from URL:", url1);
          const response = await axios.get(url1);
          handleRequest(response.data);
          console.log("Item details: ", item); // Log to verify item state after fetching
    
          // Assuming item[0].Category_id is available after fetching item details
          const catId = item.length > 0 && item[0].Category_id[0] ? item[0].Category_id[0] : null;
          console.log("catid is >>>",catId,"type of cat",typeof(catId))
    
          if (catId) {
            const url2 = `http://localhost:5000/api/similar?catId=${catId}`;
            console.log("Fetching similar designs from URL:", url2);
            const response2 = await axios.get(url2);
            setsimilarDesigns(response2.data)
            console.log("Similar designs: ", similarDesigns); // Log to verify similarDesigns state after fetching
          }

          const url3 = `http://localhost:5000/api/review?itemId=${itemId}`;
          console.log("Fetching data from URL:", url3);
          const response3 = await axios.get(url3);
          handleReview(response3.data);
          console.log("Review details: ", review); // Log to verify item state after fetching
    
          // Assuming item[0].Category_id is available after fetching item details
          
              
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
    
      fetchData();
    }, [title, item.length,itemId,reload]); // Dependencies array for useEffect
    

    const itemDetails = item[0] || {};

    const g_price = (item.length>0 && item[0].gold_price? item[0].gold_price:null);
    const d_price = (item.length>0 && item[0].diamond_price? item[0].diamond_price:null);
    const make_price = (item.length>0 && item[0].making_charges? item[0].making_charges:null);
    const gst = (item.length>0 && item[0].gst? item[0].gst:null);
    
    return (
        <div>
            <Navbar />
            <div className="main-container">
                <div className="crumbs">
                    Home / {item.length>0&&item[0].name[1]?item[0].name[1]:null} / {title}
                </div>
                <div className="info1">
                    <div className="container1">
                        <div className="mySlides1" style={{ display: slideIndex === 1 ? 'block' : 'none' }}>
                            <img src={j1} alt="Slide 1" style={{ width: "100%" }} />
                        </div>
                        <div className="mySlides1" style={{ display: slideIndex === 2 ? 'block' : 'none' }}>
                            <img src={j2} alt="Slide 2" style={{ width: "100%" }} />
                        </div>
                        <div className="mySlides1" style={{ display: slideIndex === 3 ? 'block' : 'none' }}>
                            <img src={j3} alt="Slide 3" style={{ width: "100%" }} />
                        </div>
                        <div className="mySlides1" style={{ display: slideIndex === 4 ? 'block' : 'none' }}>
                            <img src={j1} alt="Slide 4" style={{ width: "100%" }} />
                        </div>

                        <a className="prev1" onClick={() => plusSlides(-1)}>❮</a>
                        <a className="next1" onClick={() => plusSlides(1)}>❯</a>

                        <div className="row1">
                            <div className="column1">
                                <img className="demo1 cursor" src={j1} alt="Thumbnail 1" style={{ width: "100%" }} onClick={() => currentSlide(1)} />
                            </div>
                            <div className="column1">
                                <img className="demo1 cursor" src={j2} alt="Thumbnail 2" style={{ width: "100%" }} onClick={() => currentSlide(2)} />
                            </div>
                            <div className="column1">
                                <img className="demo1 cursor" src={j3} alt="Thumbnail 3" style={{ width: "100%" }} onClick={() => currentSlide(3)} />
                            </div>
                            <div className="column1">
                                <img className="demo1 cursor" src={j1} alt="Thumbnail 4" style={{ width: "100%" }} onClick={() => currentSlide(4)} />
                            </div>
                        </div>
                    </div>
                    <div className="info1-c1">
                        <h2>
                            {title}
                        </h2>
                        <h2 className="prices">
                        ₹ {item.length > 0&&item[0].discounted_price? item.length > 0&&item[0].discounted_price:item.length > 0&&item[0].price}
                            {
                              (item.length > 0&&item[0].discounted_price)?
                               (item.length > 0 && item[0].price && (
                                <span>
                                    ₹ {item[0].price}
                                </span>)
                                ):null
                            }

                        </h2>
                        {
                            item.length > 0 && item[0].discounted_price ? (
                                <p>
                                    Save {parseFloat(((item[0].price - item[0].discounted_price) / item[0].price * 100).toFixed(2))
                                    } %
                                </p>
                            ) : null
                        }

                          <p>
                            MRP incl of all taxes
                        </p>
                        <h3>
                            USUALLY SHIPS IN 48 HRS*
                        </h3>
                        <h3>
                            CUSTOMISE THIS PRODUCT
                        </h3>
                        <div className="customise">
                            <div className="dropdown2" id="dropdowns">
                                <button onClick={toggleDropdown1} className="dropbtn2">
                                    {buttonName1}
                                    <img src={arrowIcon} alt="arrow" className={`arrow-icon ${showDropdown1 ? "rotate" : ""}`} />
                                </button>
                                <div id="myDropdown2" className={`dropdown-content2 ${showDropdown1 ? "show" : ""}`}>
                                    <a id="drop" onClick={() => nameChange1("YELLOW")}>YELLOW</a>
                                    <a id="drop" onClick={() => nameChange1("WHITE")}>WHITE</a>
                                </div>
                            </div>
                            <div className="dropdown2" id="dropdowns">
                                <button onClick={toggleDropdown2} className="dropbtn2">
                                {buttonName2}
                                    <img src={arrowIcon} alt="arrow" className={`arrow-icon ${showDropdown2 ? "rotate" : ""}`} />
                                </button>
                                <div id="myDropdown2" className={`dropdown-content2 ${showDropdown2 ? "show" : ""}`}>
                                    <a id="drop" onClick={() => nameChange2("VVS-FG")}>VVS-FG</a>
                                    <a id="drop" onClick={() => nameChange2("SI-HI")}>SI-HI</a>
                                </div>
                            </div>
                            <div className="dropdown2" id="dropdowns">
                                <button onClick={toggleDropdown3} className="dropbtn2">
                                {buttonName3}
                                    <img src={arrowIcon} alt="arrow" className={`arrow-icon ${showDropdown3 ? "rotate" : ""}`} />
                                </button>
                                <div id="myDropdown2" className={`dropdown-content2 ${showDropdown3 ? "show" : ""}`}>
                                    <a id="drop" onClick={() => nameChange3("14KT")}>14KT</a>
                                    <a id="drop" onClick={() => nameChange3("18KT")}>18KT</a>
                                </div>
                            </div>
                        </div>
                        <div>
                            <h3>
                                SIZE:
                                <div className="dropdown2" id="dropdowns2">
                                    <button onClick={toggleDropdown4} className="dropbtn2">
                                    {buttonName4}
                                        <img src={arrowIcon} alt="arrow" className={`arrow-icon ${showDropdown4 ? "rotate" : ""}`} />
                                    </button>
                                    <div id="myDropdown2" className={`dropdown-content2 ${showDropdown4 ? "show" : ""}`}>
                                        <a id="drop" onClick={() => nameChange4("8")}>8</a>
                                        <a id="drop" onClick={() => nameChange4("9")}>9</a>
                                        <a id="drop" onClick={() => nameChange4("10")}>10</a>
                                        <a id="drop" onClick={() => nameChange4("11")}>11</a>
                                        <a id="drop" onClick={() => nameChange4("12")}>12</a>
                                        <a id="drop" onClick={() => nameChange4("13")}>13</a>
                                        <a id="drop" onClick={() => nameChange4("14")}>14</a>
                                    </div>
                                </div>
                            </h3>
                        </div>
                        <div>
                            <button type="button" className="btn btn-primary" id="atc" onClick={()=> handleNavigation("/Cart",itemId,price,buttonName1,buttonName2,buttonName3,buttonName4,title)}>ADD TO CART</button>
                            <button type="button" className="btn btn-primary" id="plan" onClick={() => window.location.href = "https://meriroshni.kisna.com/"}>10+1 MONTHLY PLAN</button>
                        </div>
                        <div className="policy">
                            <img id="policy" src={policy} alt="policy" />
                        </div>
                    </div>
                </div>
                
                
            </div>
                <div className="detailsP">
                  <div className="detailsCard">
                  <h3>
                  PRODUCT DETAILS
                </h3>
                <p className="detailPara">
                  Product Code
                  <span className="detailSpan">
                    AB12CD56
                  </span>
                </p>
                <p className="detailPara">
                  Country of origin
                  <span className="detailSpan">
                    {(item.length>0 && item[0].country? item[0].country:null)}
                  </span>
                </p>
                <p className="detailPara">
                  Dimension 
                  <span className="detailSpan">
                  {(item.length>0 && item[0].height? item[0].height:null)}mm * {(item.length>0 && item[0].width? item[0].width:null)}mm
                  </span>
                </p>
                  </div>
                  <div className="detailsCard">
                  <h3>
                  DIAMOND DETAILS
                </h3>
                <p className="detailPara">
                  Diamond Weight
                  <span className="detailSpan">
                  {(item.length>0 && item[0].d_weight? item[0].d_weight:null)}
                  </span>
                </p>
                <p className="detailPara">
                  Total no of Diamonds
                  <span className="detailSpan">
                  {(item.length>0 && item[0].no_of_d? item[0].no_of_d:null)}
                  </span>
                </p>
                <p className="detailPara">
                  Clarity
                  <span className="detailSpan">
                  {(item.length>0 && item[0].clarity? item[0].clarity:null)} 
                  </span>
                </p>
                  </div>
                  <div className="detailsCard">
                  <h3 >
                  METAL DETAILS
                </h3>
                <p className="detailPara">
                  Type
                  <span className="detailSpan">
                  {(item.length>0 && item[0].m_type? item[0].m_type:null)}
                  </span>
                </p>
                <p className="detailPara">
                Metal Weight
                  <span className="detailSpan">
                  {(item.length>0 && item[0].m_weight? item[0].m_weight:null)}
                  </span>
                </p>
                  </div>
                  <div className="detailsCard" style={{border: 'none'}}>
                  <h3>
                 PRICE BREAKUP
                </h3>
                <p className="detailPara">
                  Gold
                  <span className="detailSpan">
                   {g_price}
                  </span>
                </p>
                <p className="detailPara">
                  Diamond
                  <span className="detailSpan">
                    {d_price}
                  </span>
                </p>
                <p className="detailPara">
                  Making Charges
                  <span className="detailSpan">
                    {make_price} 
                  </span>
                </p>
                <p className="detailPara">
                  GST
                  <span className="detailSpan">
                    {gst} 
                  </span>
                </p>
                <p className="detailPara">
                  Coupon worth
                  <span className="detailSpan">
                  -{g_price+d_price+make_price+gst- (item.length > 0&&item[0].discounted_price? item.length > 0&&item[0].discounted_price:item.length > 0&&item[0].price) }
                  </span>
                </p>
                <p className="detailPara">
                 Total
                  <span className="detailSpan">
                  {(item.length > 0&&item[0].discounted_price? item.length > 0&&item[0].discounted_price:item.length > 0&&item[0].price)}
                  </span>
                </p>
                </div>
                </div>
                <div className="designS">
                <h3>
                  SIMILAR DESIGNS
                </h3>
                </div>
                <div className="similar">
  {/* Assuming `similarDesigns` is your array of designs */}
  {similarDesigns.slice(start,end).map((design, index) => ( // Use slice to get the first 4 elements
    <Item 
    key={index} 
    title={design.name} 
    nprice={design.discounted_price ? `₹${design.discounted_price}` : undefined} 
    oprice={`₹${design.price}`} 
    loc={j1} 
  />
  
  ))}
</div>

                <div className="designS">
                <h3>
                  CUSTOMER REVIEWS
                </h3>
                </div>
                <button type="button" className="btn btn-primary" id="war" onClick={()=>{toggleReview()}}>WRITE A REVIEW</button>
                <div className="war-card" style={{ display: isActive ? 'block' : 'none' }}>
                  <form id="reviewForm">
                  <label htmlFor="name">Name:</label>
                  <input type="text" name="name" id="name" />
                  <div className="star-main">

                  
                  <p>Rating</p>
                  <div className="star-class">
                  <span class="fa fa-star stars" onClick={()=>handleClick(1)} onMouseEnter={()=>handleHover(1)} onMouseLeave={()=>resetHover()}></span>
                  <span class="fa fa-star stars" onClick={()=>handleClick(2)} onMouseEnter={()=>handleHover(2)} onMouseLeave={()=>resetHover()}></span>
                  <span class="fa fa-star stars" onClick={()=>handleClick(3)} onMouseEnter={()=>handleHover(3)} onMouseLeave={()=>resetHover()}></span>
                  <span class="fa fa-star stars" onClick={()=>handleClick(4)} onMouseEnter={()=>handleHover(4)} onMouseLeave={()=>resetHover()}></span>
                  <span class="fa fa-star stars" onClick={()=>handleClick(5)} onMouseEnter={()=>handleHover(5)} onMouseLeave={()=>resetHover()}></span>
                    </div>
                    </div>

                  <input type="hidden" name="Rating" id="rating" value={currentRating}/>
                  <input type="hidden" name="itemId" id="itemId" value={itemId}/>
                  <input type="hidden" name="itemName" id="itemName" value={title}/>
                  {
                    console.log("item id:>>",itemId,"rating>>",currentRating)
                  }
                  <label htmlFor="review">Review:</label>
                  <input type="text" name="review" id="review" />
                  <br />
                  <button type="submit" className="btn btn-primary">Submit</button> 
                  </form>
                </div>
                {review.length > 0 ? review.slice(0,visibleItems).map(r => {
  return <Reviews key={r.id} name={r.Cust_name} rating={r.rating} review={r.Review} />;
}) : null}
            {visibleItems < review.length &&(
            <button type="button" className="btn btn-primary" id="war" onClick={showMoreItems}>VIEW MORE</button>)
            } 
            <Footer />
        </div>
    );
}

export default ItemPage;
