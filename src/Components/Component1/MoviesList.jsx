import React from 'react'
import MovieCard from './MovieCard'
import { DUMMY_JSON_PAYLOAD } from './Constants'
import './styles.css'
let movies = DUMMY_JSON_PAYLOAD

export default function MoviesList(){
    return (
        <>
        {movies.map((movie) => (
            <div className='gallery'>
            <MovieCard
                src={movie.src}
                title={movie.title}
                description={movie.description}
            />
            </div>
        ))}
        </>
    )
}