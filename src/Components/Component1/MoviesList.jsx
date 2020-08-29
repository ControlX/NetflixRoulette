import React from 'react'
import MovieCard from './MovieCard'


export default function MoviesList(props){
    let movies = props.listing;

    return (
        <>
        {movies.map((movie) => (
            <div className='gallery' key={movie.id}>
            <MovieCard
                src={movie.src}
                title={movie.title}
                year= {movie.year}
                description={movie.description}
            />
            </div>
        ))}
        </>
    )
}