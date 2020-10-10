import React from 'react'
import "./add_edit_movie.css"
import { isValidUrl, isNumber, isValidDate } from '../../utils/Validation'
import { FilterCategories } from '../../utils/Constants'
import { useFormik } from "formik"

export default function AddEditMovie(props) {
    const movieFilterArray = FilterCategories();
    let isSubmitButton = false;
    var boxRef = React.createRef();

    function submitRequest() {
        isSubmitButton = true;
        formik.handleSubmit();
    }

    const formik = (props.editMovieSelection !== undefined) ?
        useFormik({
            initialValues: props.editMovieSelection,
            validate() {
                console.log("Inside validate", formik.values, isSubmitButton)
                const errors = {};
                // Added the touched to avoid the validator validating all fields at once
                if ((formik.touched.title && !formik.values.title) || (isSubmitButton && !formik.values.title)) {
                    errors.title = "*Title is a required field";
                }

                if ((formik.touched.release_date && !isValidDate(formik.values.release_date)) || (isSubmitButton && !isValidDate(formik.values.release_date))) {
                    errors.release_date = "*Not a valid Release Date. Please enter in YYYY-MM-DD format.";
                }

                if ((formik.touched.poster_path && !formik.values.poster_path) || (isSubmitButton && !formik.values.poster_path)) {
                    errors.poster_path = "*Movie URL is a required field";
                } else if ((formik.touched.poster_path && !isValidUrl(formik.values.poster_path)) || (isSubmitButton && !isValidUrl(formik.values.poster_path))) {
                    errors.poster_path = "*Not a valid Movie URL";
                }

                if ((formik.touched.overview && !formik.values.overview) || (isSubmitButton && !formik.values.overview)) {
                    errors.overview = "*Overview is a required field";
                }

                if ((formik.touched.genres && !formik.values.genres) || (isSubmitButton && !formik.values.genres)) {
                    errors.genres = "*Genres is a required field";
                }

                if ((formik.touched.runtime && !formik.values.runtime) || (isSubmitButton && !formik.values.runtime)) {
                    errors.runtime = "*Runtime is a required field";
                }
                else if ((formik.touched.runtime && !isNumber(formik.values.runtime)) || (isSubmitButton && !isNumber(formik.values.runtime))) {
                    errors.runtime = "Runtime accepts only numbers";
                }

                if (isSubmitButton) {
                    boxRef.current.scrollIntoView();
                    isSubmitButton = false;
                }

                return errors;
            },
            onSubmit(values) {
                if (!Array.isArray(values.genres))
                    values.genres = (values.genres).split(',');
                values.runtime = Number(values.runtime);
                console.log("Form values: ", values);
                props.onEditMovieSaveAction(values);
            }
        }) :
        useFormik({
            initialValues: {
                title: "",
                release_date: "",
                poster_path: "",
                genres: "",
                overview: "",
                runtime: ""
            },

            validate() {
                console.log("Inside validate", formik.values, isSubmitButton)
                const errors = {};
                // Added the touched to avoid the validator validating all fields at once
                if ((formik.touched.title && !formik.values.title) || (isSubmitButton && !formik.values.title)) {
                    errors.title = "*Title is a required field";
                }

                if ((formik.touched.release_date && !isValidDate(formik.values.release_date)) || (isSubmitButton && !isValidDate(formik.values.release_date))) {
                    errors.release_date = "*Not a valid Release Date. Please enter in YYYY-MM-DD format.";
                }

                if ((formik.touched.poster_path && !formik.values.poster_path) || (isSubmitButton && !formik.values.poster_path)) {
                    errors.poster_path = "*Movie URL is a required field";
                } else if ((formik.touched.poster_path && !isValidUrl(formik.values.poster_path)) || (isSubmitButton && !isValidUrl(formik.values.poster_path))) {
                    errors.poster_path = "*Not a valid Movie URL";
                }

                if ((formik.touched.overview && !formik.values.overview) || (isSubmitButton && !formik.values.overview)) {
                    errors.overview = "*Overview is a required field";
                }

                if ((formik.touched.genres && !formik.values.genres) || (isSubmitButton && !formik.values.genres)) {
                    errors.genres = "*Genres is a required field";
                }

                if ((formik.touched.runtime && !formik.values.runtime) || (isSubmitButton && !formik.values.runtime)) {
                    errors.runtime = "*Runtime is a required field";
                }
                else if ((formik.touched.runtime && !isNumber(formik.values.runtime)) || (isSubmitButton && !isNumber(formik.values.runtime))) {
                    errors.runtime = "Runtime accepts only numbers";
                }

                if (isSubmitButton) {
                    boxRef.current.scrollIntoView();
                    isSubmitButton = false;
                }

                return errors;
            },
            onSubmit(values) {
                values.genres = (values.genres).split(',');
                values.runtime = Number(values.runtime);
                console.log("Form values: ", values);
                props.onAddMovieSubmitAction(values);
            }
        })

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
                            <form id="form-edit-movie" onSubmit={formik.handleSubmit}>
                                <p className="modal-body-titles">MOVIE ID</p>
                                <input className="modal-body-input-disabled" placeholder="" value={formik.values.id} onChange={(e) => handleTitleChange(e)} disabled={true} />
                                <p className="modal-body-titles" ref={boxRef}>TITLE</p>
                                <input type="title" name="title" id="title" className="modal-body-input" autoComplete="off" placeholder="Movie Title" value={formik.values.title} onBlur={formik.handleBlur} onChange={formik.handleChange} />
                                <p className="modal-error-msg">{formik.errors.title ? formik.errors.title : null}</p>
                                <p className="modal-body-titles" >RELEASE DATE</p>
                                <input type="release_date" name="release_date" id="release_date" className="modal-body-input" autoComplete="off" placeholder="Select Date" value={formik.values.release_date} onBlur={formik.handleBlur} onChange={formik.handleChange} />
                                <p className="modal-error-msg">{formik.errors.release_date ? formik.errors.release_date : null}</p>
                                <p className="modal-body-titles" >MOVIE URL</p>
                                <input type="poster_path" name="poster_path" id="poster_path" className="modal-body-input" autoComplete="off" placeholder="Movie URL here" value={formik.values.poster_path} onBlur={formik.handleBlur} onChange={formik.handleChange} />
                                <p className="modal-error-msg">{formik.errors.poster_path ? formik.errors.poster_path : null}</p>
                                <p className="modal-body-titles" >GENRE</p>
                                <input type="genres" name="genres" id="genres" className="modal-body-input" autoComplete="off" placeholder="Select Genre" value={formik.values.genres} onBlur={formik.handleBlur} onChange={formik.handleChange} />
                                <p className="modal-error-msg">{formik.errors.genres ? formik.errors.genres : null}</p>
                                <p className="modal-body-titles" >OVERVIEW</p>
                                <input type="overview" name="overview" id="overview" className="modal-body-input" autoComplete="off" placeholder="Overview here" value={formik.values.overview} onBlur={formik.handleBlur} onChange={formik.handleChange} />
                                <p className="modal-error-msg">{formik.errors.overview ? formik.errors.overview : null}</p>
                                <p className="modal-body-titles" >RUNTIME</p>
                                <input type="runtime" name="runtime" id="runtime" className="modal-body-input" autoComplete="off" placeholder="Runtime here" value={formik.values.runtime} onBlur={formik.handleBlur} onChange={formik.handleChange} />
                                <p className="modal-error-msg">{formik.errors.runtime ? formik.errors.runtime : null}</p>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="reset" className="modal-btn-reset" onClick={formik.handleReset}>RESET</button>
                            <button type="submit" className="modal-btn-submit" onClick={submitRequest}>SAVE</button>
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
                            <form id="form-add-movie" onSubmit={formik.handleSubmit}>
                                <p className="modal-body-titles" ref={boxRef}>TITLE</p>
                                <input type="title" name="title" id="title" className="modal-body-input" autoComplete="off" placeholder="Movie Title" value={formik.values.title} onBlur={formik.handleBlur} onChange={formik.handleChange} />
                                <p className="modal-error-msg">{formik.errors.title ? formik.errors.title : null}</p>
                                <p className="modal-body-titles" >RELEASE DATE</p>
                                <input type="release_date" name="release_date" id="release_date" className="modal-body-input" autoComplete="off" placeholder="Select Date" value={formik.values.release_date} onBlur={formik.handleBlur} onChange={formik.handleChange} />
                                <p className="modal-error-msg">{formik.errors.release_date ? formik.errors.release_date : null}</p>
                                <p className="modal-body-titles" >MOVIE URL</p>
                                <input type="poster_path" name="poster_path" id="poster_path" className="modal-body-input" autoComplete="off" placeholder="Movie URL here" value={formik.values.poster_path} onBlur={formik.handleBlur} onChange={formik.handleChange} />
                                <p className="modal-error-msg">{formik.errors.poster_path ? formik.errors.poster_path : null}</p>
                                <p className="modal-body-titles" >GENRE</p>
                                <input type="genres" name="genres" id="genres" className="modal-body-input" autoComplete="off" placeholder="Select Genre" value={formik.values.genres} onBlur={formik.handleBlur} onChange={formik.handleChange} />
                                <p className="modal-error-msg">{formik.errors.genres ? formik.errors.genres : null}</p>
                                <p className="modal-body-titles" >OVERVIEW</p>
                                <input type="overview" name="overview" id="overview" className="modal-body-input" autoComplete="off" placeholder="Overview here" value={formik.values.overview} onBlur={formik.handleBlur} onChange={formik.handleChange} />
                                <p className="modal-error-msg">{formik.errors.overview ? formik.errors.overview : null}</p>
                                <p className="modal-body-titles" >RUNTIME</p>
                                <input type="runtime" name="runtime" id="runtime" className="modal-body-input" autoComplete="off" placeholder="Runtime here" value={formik.values.runtime} onBlur={formik.handleBlur} onChange={formik.handleChange} />
                                <p className="modal-error-msg">{formik.errors.runtime ? formik.errors.runtime : null}</p>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="reset" className="modal-btn-reset" onClick={formik.handleReset}>Reset</button>
                            <button type="submit" onClick={submitRequest} className="modal-btn-submit">Submit</button>
                        </div>
                    </div>
                </div>
            </>
    )
}


//============ For later reference
    // var expanded = false;

    // function showCheckboxes() {
    //     var checkboxes = document.getElementById("checkboxes");
    //     if (!expanded) {
    //         checkboxes.style.display = "block";
    //         expanded = true;
    //     } else {
    //         checkboxes.style.display = "none";
    //         expanded = false;
    //     }
    // }

    // function hideCheckboxes(){
    //     let checkboxes = document.getElementById("checkboxes");
    //     if (expanded) {
    //         checkboxes.style.display = "none";
    //         expanded = false;
    //     }
    // }

    // <div className="multiselect modal-body-titles">
    //                         <div className="selectBox" onBlur={hideCheckboxes} onClick={showCheckboxes}>
    //                             <select className="modal-body-input-select">
    //                                 <option className="modal-body-input">Select Genre</option>
    //                             </select>
    //                             <div className="overSelect"></div>
    //                         </div>
    //                         <div id="checkboxes">
    //                             {movieFilterArray.map(element =>
    //                                 ((element !== "all") ? <label htmlFor={`${element}`}><input type="checkbox" className="capitalize-genre" id={`${element}`} />{element}</label> : null))}
    //                         </div>
    //                     </div>