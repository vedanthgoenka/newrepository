import React from "react";
import cl1 from '/images/cl1.jpg';
import cl2 from '/images/cl2.jpg';
import cl3 from '/images/cl3.jpg';
import cl4 from '/images/cl4.jpg';
import EastIcon from '@mui/icons-material/East';
import '../styles/collection.css';

function Collection() {
    return (
        <div>
            <div className="cmain">
                <div className="collection">
                    <img className="collectionImage" src={cl1} />
                    {/* <h3>Rings Collection<span className="eastIcon"><EastIcon /></span></h3> */}
                </div>
                <div className="collection">
                    <img className="collectionImage" src={cl2} />
                    {/* <h3>Mangalsutra Bracelets<span className="eastIcon"><EastIcon /></span></h3> */}
                </div>
            </div>
            <div className="cmain">
                <div className="collection">
                    <img className="collectionImage" src={cl3} />
                    {/* <h3>Pendant Collection<span className="eastIcon"><EastIcon /></span></h3> */}
                </div>
                <div className="collection">
                    <img className="collectionImage" src={cl4} />
                    {/* <h3>Earrings and Pendants<span className="eastIcon"><EastIcon /></span></h3> */}
                </div>
            </div>
        </div>
    )
}

export default Collection