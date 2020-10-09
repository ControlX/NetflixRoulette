import React from 'react'
import './sort_filter_listing.css'
import { FilterCategories } from '../../utils/Constants'

export default function SortFilterListing(props) {
    const movieFilterArray = FilterCategories();

    let processFilterClick = (e) => {
        props.onFilterCategoryClicked(e.target.value);
    }

    return (<>
        <div className="parent-sort-div">
            <div className="sort-left-div">
            {movieFilterArray.map( filterEl => 
            (<button key={filterEl} className={`sort-left-button${filterEl === props.selectedFilter ? '-selected' : ''}`} onClick={processFilterClick} value={filterEl}>{filterEl}</button>))}
            </div>
            <div className="sort-right-div">
                <label className="parent-sort-label"> SORT BY </label>
                <select name="movies" id="movies" className="parent-sort-select" onChange={(e) => props.onHandleSelectedSortOption(e.target.value)}>
                    <option value="release_date">RELEASE DATE</option>
                    <option value="title">TITLE</option>
                    <option value="genres">GENRE</option>
                    <option value="vote_average">RATINGS</option>
                </select>
            </div>
            <div className="sort-result-number">
    <p><label><strong>{props.displayedMoviesCount}</strong></label>  {(props.displayedMoviesCount === 1) ? '  movie found' : '  movies found'}</p>
            </div>
        </div>
    </>
    )
}