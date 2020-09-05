import React from 'react'
import "./add_movie.css"

export default function AddMovie(props) {

  var addMovieJson = {}
  addMovieJson.src = "./src/resources/movie_poster2.png" //Temperory to refer to internal asset location

  function handleTitleChange(e){
      addMovieJson.title = e.target.value;
  }

  function handleDateChange(e){
    addMovieJson.year = e.target.value;
  }

  function handleUrlChange(e){
    addMovieJson.src = e.target.value;
  }

  function handleGenreChange(e){
    addMovieJson.description = e.target.value;
  }

  function handleOverviewChange(e){
    addMovieJson.overview = e.target.value;
  }

  function handleRuntimeChange(e){
    addMovieJson.runtime = e.target.value;
  }

  function resetFields(){
      document.getElementById("form-add-movie").reset()
  }

  return (
    <>
      <div id="myModal" className="modal">


        <div className="modal-content">
          <div className="modal-header">
            <span className="close" onClick={()=> props.onCloseAction()}>&times;</span>
          </div>

          <div className="modal-body">
          <label className="modal-header-lbl-properties">ADD MOVIE</label>
          <br /><br />
          <form id="form-add-movie">
          <p className="modal-body-titles">TITLE</p>
          <input className="modal-body-input" placeholder="Movie Title" onChange={(e)=>handleTitleChange(e)}/>
          <p className="modal-body-titles" >RELEASE DATE</p>
          <input className="modal-body-input" placeholder="Select Date" onChange={(e)=>handleDateChange(e)}/>
          <p className="modal-body-titles" >MOVIE URL</p>
          <input className="modal-body-input" placeholder="Movie URL here" defaultValue="./src/resources/movie_poster2.png" onChange={(e)=>handleUrlChange(e)}/>
          <p className="modal-body-titles" >GENRE</p>
          <input className="modal-body-input" placeholder="Select Genre" onChange={(e)=>handleGenreChange(e)}/>
          <p className="modal-body-titles" >OVERVIEW</p>
          <input className="modal-body-input" placeholder="Overview here" onChange={(e)=>handleOverviewChange(e)}/>
          <p className="modal-body-titles" >RUNTIME</p>
          <input className="modal-body-input" placeholder="Runtime here" onChange={(e)=>handleRuntimeChange(e)}/>           
          </form>
          </div>
          <div className="modal-footer">
            <button className="modal-btn-reset" onClick={()=> resetFields()}>RESET</button>
            <button className="modal-btn-submit" onClick={()=> props.onSubmitAction(addMovieJson)}>SUBMIT</button>
          </div>
        </div>

      </div>
    </>
  )
}