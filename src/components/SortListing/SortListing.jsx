import React from 'react'
import './sort_listing.css'

export default function SortListing(props) {

    return (<>
        <div className="parent-sort-div">
            <div className="sort-left-div">
                <button className={(props.filterOption === "all") ? "sort-left-button-selected" : "sort-left-button"} onClick={(e)=>props.onSortCategoryClicked(e)} value="all">All</button>
                <button className="sort-left-button" onClick={(e)=>props.onSortCategoryClicked(e)} value="documentary">Documentary</button>
                <button className="sort-left-button" onClick={(e)=>props.onSortCategoryClicked(e)} value="comedy">Comedy</button>
                <button className="sort-left-button" onClick={(e)=>props.onSortCategoryClicked(e)} value="horror">Horror</button>
                <button className="sort-left-button" onClick={(e)=>props.onSortCategoryClicked(e)} value="crime">Crime</button>
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
                <p><label><strong>{props.updateFilterResultText}</strong></label>  movies found</p>
            </div>
        </div>
    </>
    )
}