import React, { useEffect,useRef } from "react";
import '../styles/item.css';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useNavigate } from "react-router-dom";
import j3 from "/images/j3.jpg";


function Item(props) {
    const navigate = useNavigate();
    const cardRef = useRef(null);
    const imageRef = useRef(null);

    const handleNavigation = async (path, title) => {
        try {
            console.log("Dropdown button clicked");
            navigate(path, { state: { title } }); // Navigate to the specified path
        } catch (error) {
            console.error('Error navigating to category page:', error);
            // Handle error, show error message, etc.
        }
    };

    useEffect(() => {
        const card = cardRef.current;
        const image = imageRef.current;

        const handleMouseOver = () => {
            image.src = j3;
        };

        const handleMouseOut = () => {
            image.src = props.loc;
        };

        card.addEventListener('mouseover', handleMouseOver);
        card.addEventListener('mouseout', handleMouseOut);

        return () => {
            card.removeEventListener('mouseover', handleMouseOver);
            card.removeEventListener('mouseout', handleMouseOut);
        };
    }, [props.loc]);

    return (
        <a onClick={() => handleNavigation("/item", props.title)} className="card-link">
            <div className="card" style={{ width: "18rem" }} ref={cardRef}>
                <div className="heart-class">
                <FavoriteBorderIcon className="heartIcon2" />
                </div>
                <img className="card-img-top j1" src={props.loc} alt="Card image cap" ref={imageRef} />
                <div className="card-body d-flex flex-column align-items-center">
                    <h5 className="card-title text-center">{props.title}</h5>
                    <p className="card-text text-center">
                        {props.nprice ? (
                            <>
                                from <span className="spanner">{props.nprice}</span>
                                <span className="spanner2">{props.oprice}</span>
                            </>
                        ) : (
                            <span className="spanner">{props.oprice}</span>
                        )}
                    </p>
                </div>
            </div>
        </a>
    );
}

export default Item;
