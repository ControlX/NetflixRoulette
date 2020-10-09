import { DELETE_MOVIE } from './movieActions';
import { BASE_URL } from '../utils/Constants'
function DeleteMovie(movieId) {
    console.log("DeleteMovie")
    return dispatch => {
        fetch(BASE_URL + "/movies/" + movieId, {
            method: 'DELETE'
        })
            .then(res => "")
            .then(
                (result) => {
                    dispatch({
                        type: DELETE_MOVIE,
                        payload: movieId
                    })
                },
                (error) => {
                    // dispatch(getMovieError(error));
                    console.log('Error in fetching all movies: ', error);
                });
    }
}

export default DeleteMovie;