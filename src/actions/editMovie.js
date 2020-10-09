import { EDIT_MOVIE } from './movieActions';
import { BASE_URL } from '../utils/Constants'
function EditMovie(movieObj) {
    console.log("EditMovie")
    return dispatch => {
        fetch(BASE_URL + "/movies", {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(movieObj)
        })
            .then(res => res.json())
            .then(
                (result) => {
                    dispatch({
                        type: EDIT_MOVIE,
                        payload: result
                    })
                },
                (error) => {
                    // dispatch(getMovieError(error));
                    console.log('Error in fetching all movies: ', error);
                });
    }
}

export default EditMovie;