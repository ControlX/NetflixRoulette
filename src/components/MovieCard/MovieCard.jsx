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
            <div className='card-image-properties'> <img src={props.src} /></div>
            <div className='card-text-properties'>
                <div className='div-child-left'>
                    <p className='card-movie-name-font-properties'>{props.title}</p>
                    <p>{props.description}</p>
                </div>
                <div className='div-child-right card-movie-year-font-properties'>
                    <p>{props.year}</p>  
                </div>
            </div>
        </>    
    )
}

MovieCard.propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    year: PropTypes.number.isRequired,
    src: PropTypes.string.isRequired
}