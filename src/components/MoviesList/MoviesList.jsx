import React from 'react'
import MovieCard from '../MovieCard'
import PropTypes from 'prop-types'
import './movies_list.css'

export default function MoviesList(props){
    const listing = props.listing;
    return (
        <>
        {listing.map((movie) => (
            <div className='gallery' key={movie.id}>
            <MovieCard
                id={movie.id}
                src={movie.src}
                title={movie.title}
                year= {movie.year}
                description={movie.description}
                overview={movie.overview}
                runtime={movie.runtime}
                onEditAction={props.onEditAction}
                onDeleteAction={props.onDeleteAction}
            />
            </div>
        ))}
        </>
    )
}

MoviesList.propTypes = {
    listing: PropTypes.array.isRequired
}