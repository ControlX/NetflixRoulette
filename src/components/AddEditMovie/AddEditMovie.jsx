import React from 'react'
import "./add_edit_movie.css"

export default function AddEditMovie(props) {

    var addMovieJson = {};

    if (props.editMovieSelection !== undefined) {
        addMovieJson = props.editMovieSelection;
    }
    else {
        addMovieJson.src = "./src/resources/movie_poster2.png" //Temperory to refer to internal asset location
    }

    function handleTitleChange(e) {
        addMovieJson.title = e.target.value;
    }

    function handleDateChange(e) {
        addMovieJson.year = e.target.value;
    }

    function handleUrlChange(e) {
        addMovieJson.src = e.target.value;
    }

    function handleGenreChange(e) {
        addMovieJson.description = e.target.value;
    }

    function handleOverviewChange(e) {
        addMovieJson.overview = e.target.value;
    }

    function handleRuntimeChange(e) {
        addMovieJson.runtime = e.target.value;
    }

    let resetFields = () => {
        if (props.editMovieSelection !== undefined) {
            document.getElementById("form-edit-movie").reset()
        }
        else {
            document.getElementById("form-add-movie").reset()
        }
    }

    return (
        (props.editMovieSelection !== undefined) ?
            <>
                <div id="myModal" className="modal">


                    <div className="modal-content">
                        <div className="modal-header">
                            <span className="close" onClick={() => props.onCloseAction()}>&times;</span>
                        </div>

                        <div className="modal-body">
                            <label className="modal-header-lbl-properties">EDIT MOVIE</label>
                            <br /><br />
                            <form id="form-edit-movie">
                                <p className="modal-body-titles">MOVIE ID</p>
                                <input className="modal-body-input-disabled" placeholder="" defaultValue={props.editMovieSelection.id} onChange={(e) => handleTitleChange(e)} disabled={true} />
                                <p className="modal-body-titles">TITLE</p>
                                <input className="modal-body-input" placeholder="Movie Title" defaultValue={props.editMovieSelection.title} onChange={(e) => handleTitleChange(e)} />
                                <p className="modal-body-titles" >RELEASE DATE</p>
                                <input className="modal-body-input" placeholder="Select Date" defaultValue={props.editMovieSelection.year} onChange={(e) => handleDateChange(e)} />
                                <p className="modal-body-titles" >MOVIE URL</p>
                                <input className="modal-body-input" placeholder="Movie URL here" defaultValue={props.editMovieSelection.src} onChange={(e) => handleUrlChange(e)} />
                                <p className="modal-body-titles" >GENRE</p>
                                <input className="modal-body-input" placeholder="Select Genre" defaultValue={props.editMovieSelection.description} onChange={(e) => handleGenreChange(e)} />
                                <p className="modal-body-titles" >OVERVIEW</p>
                                <input className="modal-body-input" placeholder="Overview here" defaultValue={props.editMovieSelection.overview} onChange={(e) => handleOverviewChange(e)} />
                                <p className="modal-body-titles" >RUNTIME</p>
                                <input className="modal-body-input" placeholder="Runtime here" defaultValue={props.editMovieSelection.runtime} onChange={(e) => handleRuntimeChange(e)} />
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button className="modal-btn-reset" onClick={() => resetFields()}>RESET</button>
                            <button className="modal-btn-submit" onClick={() => props.onSaveAction(addMovieJson)}>SAVE</button>
                        </div>
                    </div>

                </div>
            </> :
            <>
                <div id="myModal" className="modal">


                    <div className="modal-content">
                        <div className="modal-header">
                            <span className="close" onClick={() => props.onCloseAction()}>&times;</span>
                        </div>

                        <div className="modal-body">
                            <label className="modal-header-lbl-properties">ADD MOVIE</label>
                            <br /><br />
                            <form id="form-add-movie">
                                <p className="modal-body-titles">TITLE</p>
                                <input className="modal-body-input" placeholder="Movie Title" onChange={(e) => handleTitleChange(e)} />
                                <p className="modal-body-titles" >RELEASE DATE</p>
                                <input className="modal-body-input" placeholder="Select Date" onChange={(e) => handleDateChange(e)} />
                                <p className="modal-body-titles" >MOVIE URL</p>
                                <input className="modal-body-input" placeholder="Movie URL here" defaultValue="./src/resources/movie_poster2.png" onChange={(e) => handleUrlChange(e)} />
                                <p className="modal-body-titles" >GENRE</p>
                                <input className="modal-body-input" placeholder="Select Genre" onChange={(e) => handleGenreChange(e)} />
                                <p className="modal-body-titles" >OVERVIEW</p>
                                <input className="modal-body-input" placeholder="Overview here" onChange={(e) => handleOverviewChange(e)} />
                                <p className="modal-body-titles" >RUNTIME</p>
                                <input className="modal-body-input" placeholder="Runtime here" onChange={(e) => handleRuntimeChange(e)} />
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button className="modal-btn-reset" onClick={() => resetFields()}>RESET</button>
                            <button className="modal-btn-submit" onClick={() => props.onSubmitAction(addMovieJson)}>SUBMIT</button>
                        </div>
                    </div>

                </div>
            </>
    )
}