import React from "react";
import '../styles/Footer.css';
import SmartphoneIcon from '@mui/icons-material/Smartphone';
import EmailIcon from '@mui/icons-material/Email';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';

function Footer(){
    const handleClick = (url) => {
        window.location.href = url;
    };
    return(
        <div className="f">
            <div className="Col">
                <h2>
                    ABOUT US
                </h2>
                <p onClick={() => handleClick("https://kisna.com/pages/about-kisna")}>Our Story</p>
                <p onClick={() => handleClick("https://kisna.com/pages/why-buy-from-us")}>Why Buy From Us</p>
                <p onClick={() => handleClick("https://kisna.com/pages/kisna-csr")}>Kisna CSR</p>
                <p onClick={() => handleClick("https://kisna.com/pages/kisna-corporate-gifting")}>Corporate Gifting</p>
                <p onClick={() => handleClick("https://kisna.com/blogs/news")}>Our Blogs</p>
                <p onClick={() => handleClick("https://kisna.com/pages/press-room")}>Press Room</p>
            </div>
            <div className="Col">
                <h2>
                    JEWELLERY GUIDE
                </h2>
                <p onClick={() => handleClick("https://kisna.com/pages/buying-and-price-guide")}>Buying & Price Guide</p>
                <p onClick={() => handleClick("https://kisna.com/pages/the-guide-to-diamond-and-solitaire")}>Diamond Guide</p>
                <p onClick={() => handleClick("https://kisna.com/pages/kisna-jewellery-care-guide")}>Jewellery Care Guide</p>
                <p onClick={() => handleClick("https://kisna.com/pages/certification-guide")}>Certification Guide</p>
            </div>
            <div className="Col">
                <h2>
                    OUR POLICIES
                </h2>
                <p onClick={() => handleClick("https://kisna.com/pages/terms-of-service")}>Terms of Service</p>
                <p onClick={() => handleClick("https://kisna.com/policies/privacy-policy")}>Privacy Policy</p>
                <p onClick={() => handleClick("https://kisna.com/policies/shipping-policy")}>Shipping/Return Policy</p>
                <p onClick={() => handleClick("https://kisna.com/pages/buyback-and-exchange-policy")}>Buyback & Exchange Policy</p>
            </div>
            <div className="Col">
                <h2>
                    USEFUL LINKS
                </h2>
                <p onClick={() => handleClick("https://kisna.com/pages/locate-our-stores")}>Locate Our Stores</p>
                <p onClick={() => handleClick("https://kisna.com/pages/kisna-authorized-dealers")}>Kisna Authorized Dealers</p>
                <p onClick={() => handleClick("https://kisna.com/pages/franchise-partners")}>Franchise Enquiry</p>
                <p onClick={() => handleClick("https://kisna.com/pages/kisna-careers")}>Careers</p>
                <p onClick={() => handleClick("https://kisna.com/pages/faqs")}>FAQs</p>
                
            </div>
            <div className="Col">
                <h2>
                    GET IN TOUCH
                </h2>
                <p className="i"><span><SmartphoneIcon /></span>+91 8976825413</p>
                <p className="i"><span><EmailIcon  /></span>shop@kisna.com</p>
                <p className="i" ><span ><LocalPhoneIcon /></span>(09:00AM to 06:00PM Mon to Sat)</p>
                <p >Contact Us</p>
            </div>
        </div>
    )
}

export default Footer;