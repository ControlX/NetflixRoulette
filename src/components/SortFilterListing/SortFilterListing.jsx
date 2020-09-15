import React from 'react'
import './sort_filter_listing.css'

export default function SortFilterListing(props) {
    let filterArray = ["all", "documentary", "comedy", "horror", "crime"];

    let processFilterClick = (e) => {
        props.onFilterCategoryClicked(e);
        document.getElementById(e.target.value).className = "sort-left-button-selected"
        filterArray.forEach(item => {
                if(item !== e.target.value){
                    document.getElementById(item).className = "sort-left-button"
                }
            })
    }

    return (<>
        <div className="parent-sort-div">
            <div className="sort-left-div">
                <button id="all" className={"sort-left-button-selected"} onClick={(e)=>processFilterClick(e)} value="all">All</button>
                <button id="documentary" className={"sort-left-button"} onClick={(e)=>processFilterClick(e)} value="documentary">Documentary</button>
                <button id="comedy" className={"sort-left-button"} onClick={(e)=>processFilterClick(e)} value="comedy">Comedy</button>
                <button id="horror" className={"sort-left-button"} onClick={(e)=>processFilterClick(e)} value="horror">Horror</button>
                <button id="crime" className={"sort-left-button"} onClick={(e)=>processFilterClick(e)} value="crime">Crime</button>
            </div>
            <div className="sort-right-div">
                <label className="parent-sort-label"> SORT BY </label>
                <select name="movies" id="movies" className="parent-sort-select" onChange={(e) => props.onHandleSelect(e)}>
                    <option value="year">RELEASE DATE</option>
                    <option value="title">TITLE</option>
                    <option value="description">GENRE</option>
                </select>
            </div>
            <div className="sort-result-number">
    <p><label><strong>{props.updateFilterResultText}</strong></label>  {(props.updateFilterResultText === 1) ? '  movie found' : '  movies found'}</p>
            </div>
        </div>
    </>
    )
}