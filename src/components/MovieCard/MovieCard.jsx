import React from 'react'
import PropTypes from 'prop-types'
import HoverDots from '../HoverDots'
import './movie_card.css'

export default function MovieCard(props){
    return (
        <>
            <div className="dropdown">
            <HoverDots className='card-image-properties'/>
            <div className="dropdown-content">
                <a onClick={()=>props.onEditAction(props.id)}>Edit</a>
                <a onClick={()=>props.onDeleteAction(props.id)}>Delete</a>
            </div>
            </div>
            <div className='card-image-properties' onClick={()=>props.onShowMovieDetailsAction(props.id)}> <img src={props.poster_path} width="330" height="480"/></div>
            <div className='card-text-properties'>
                <div className='div-child-left'>
                    <p className='card-movie-name-font-properties'>{props.title}</p>
                    <p>{(props.genres).join(', ')}</p>
                </div>
                <div className='div-child-right card-movie-year-font-properties'>
                    <p>{(props.release_date).split('-')[0]}</p>  
                </div>
            </div>
        </>    
    )
}

MovieCard.propTypes = {
    title: PropTypes.string.isRequired,
    genres: PropTypes.array.isRequired,
    release_date: PropTypes.string.isRequired,
    poster_path: PropTypes.string.isRequired
}