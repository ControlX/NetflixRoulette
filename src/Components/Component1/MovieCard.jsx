import React from 'react'
import PropTypes from 'prop-types'
import img from './assets/movie_poster.png'

export default function MovieCard(props){
    return (
        <>
            <div> <img className='image-properties' src={img} /></div>
            <div> <p>{props.title}</p> </div>
            <div> <p>{props.description}</p> </div>    
        </>    
    )
}

MovieCard.propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired
}