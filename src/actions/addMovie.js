import { ADD_MOVIE } from './movieActions';
import { BASE_URL } from '../utils/Constants'
function AddMovie(movieObj) {
    console.log("AddMovie", movieObj)
    return dispatch => {
        fetch(BASE_URL + "/movies", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(movieObj)
        })
            .then(res => res.json())
            .then(
                (result) => {
                    console.log("result", result)
                    dispatch({
                        type: ADD_MOVIE,
                        payload: result
                    })
                },
                (error) => {
                    // dispatch(getMovieError(error));
                    console.log('Error in fetching all movies: ', error);
                });
    }
}

export default AddMovie;