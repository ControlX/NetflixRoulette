import React from 'react'
import './delete_movie.css'

export default function DeleteMovie(props){

    return (
        <>
          <div id="myModal" className="modal">
    
    
            <div className="modal-content">
              <div className="modal-header">
                <span className="close" onClick={()=> props.onCloseAction()}>&times;</span>
              </div>
    
              <div className="modal-body">
              <label className="modal-header-lbl-properties">DELETE MOVIE</label>
              <br /><br /><br />
              <label className="modal-body-lbl-properties">Are you sure you want to delete this movie?</label>
              </div>
              <div className="modal-footer">
                <button className="modal-btn-submit" onClick={()=> props.onDeleteMovieConfirmAction(props.deleteMovieSelection)}>CONFIRM</button>
              </div>
            </div>
    
          </div>
        </>
      )
}