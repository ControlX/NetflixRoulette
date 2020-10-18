import React from 'react'
import Footer from '../Footer'
import "./page_not_found.css"
import not_found_image_path from '../../resources/not_found_image.png'
import { useHistory } from "react-router-dom";

export default function PageNotFound() {
    const history = useHistory();
    
    function handleClick() {
        history.push("/film");
    }

    return (
        <>
        <div className='not-found-parent-background-properties'>
            <p className='not-found-netflix-label'><strong>netflix</strong>roulette</p>
            <p className="not-found-title" >Page Not Found</p>
            <div className="not-found-image"><img src={not_found_image_path}/></div>
            <div className="not-found-btn-parent-div">
                <button className="not-found-home-btn" onClick={handleClick}>GO BACK TO HOME</button>
            </div>
        </div>
         <div className='parent-footer-properties'>
         <Footer />
        </div>
        </>
    );
}