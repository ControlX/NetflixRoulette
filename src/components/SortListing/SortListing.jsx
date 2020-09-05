import React from 'react'
import './sort_listing.css'

export default function SortListing(props) {
    return (
        <div className="parent-sort-div">
            <label className="parent-sort-label"> SORT BY </label>
            <select name="movies" id="movies" className="parent-sort-select" onChange={(e) => props.onHandleSelect(e)}>
                <option value="year">RELEASE DATE</option>
                <option value="title">TITLE</option>
                <option value="description">GENRE</option>
            </select>
        </div>
    )
}