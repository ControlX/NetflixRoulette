import React from 'react';
import './header.css';

export default function Header(props){
    return (
        <div>
        <p className='header-parent-label-properties'><strong>netflix</strong>roulette</p>
        <button className='header-btn-add-movie-properties' onClick={()=>props.onAddAction()}>+ ADD MOVIE</button>
        <br /><br />

        <label className='header-lbl-find-properties'>FIND YOUR MOVIE</label>
        <br />
        <input className='header-input-properties' placeholder={'What do you want to watch?'}/>
        <button className='header-btn-search-properties'>SEARCH</button>
        </div>
    )
}