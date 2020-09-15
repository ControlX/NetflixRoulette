import React from 'react'
import PropTypes from 'prop-types'
import './movie_details.css'

export default function MovieDetails(props){
    
    return (
        <div>
            <p className='header-parent-label-properties'><strong>netflix</strong>roulette</p>
            <img className='movie-details-search' src="./src/resources/icon_search_transparent.png" onClick={() => props.onMovieDetailsSearch()}/>
        <div className='movie-details-parent'>
            <div className='movie-details-movie-placeholder'>
            <img src={props.processMovieDetailsInfo.src} />
            </div>
            <div className='movie-details-information'>
                <label className='movie-details-title-name'>{props.processMovieDetailsInfo.title}</label>
                <span className='movie-details-rating'>{props.processMovieDetailsInfo.rating}</span>
                <p className='movie-details-genre'>{props.processMovieDetailsInfo.description}</p>
                <p className='movie-details-year-runtime'>{props.processMovieDetailsInfo.year + '\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0' + props.processMovieDetailsInfo.runtime + ' min'}</p>
                <p className='movie-details-overview'>{props.processMovieDetailsInfo.overview}</p>
            </div>
        </div>
        </div>
    )
}