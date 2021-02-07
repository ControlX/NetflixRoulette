import React from 'react';
import './header.css';

export default function Header(props){
    let searchString = "";

    function searchTitles(){
        if(searchString !== ""){
            props.onMovieTitleSearch(searchString);
        }
    }

    return (
        <div>
        <p className='header-parent-label-properties'><strong>netflix</strong>roulette</p>
        <button className='header-btn-add-movie-properties' onClick={()=>props.onAddAction()}>+ ADD MOVIE</button>
        <br /><br />

        <label className='header-lbl-find-properties'>FIND YOUR MOVIE</label>
        <br />
        <input className='header-input-properties' placeholder={'What do you want to watch?'} onChange={(e) => {searchString = e.target.value}}/>
        <button className='header-btn-search-properties' onClick={searchTitles}>SEARCH</button>
        </div>
    )
}