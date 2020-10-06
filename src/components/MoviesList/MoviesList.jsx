import React from 'react'
import MovieCard from '../MovieCard'
import PropTypes from 'prop-types'
import './movies_list.css'

export default function MoviesList(props){
    const movieList = props.movieList;
    return (
        <>
        {movieList.map((movie) => (
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
                onShowMovieDetailsAction={props.onShowMovieDetailsAction}
            />
            </div>
        ))}
        </>
    )
}

MoviesList.propTypes = {
    movieList: PropTypes.array.isRequired
}