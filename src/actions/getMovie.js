import {GET_MOVIE} from './movieActions';
import {BASE_URL} from '../utils/Constants'
function getMovie(id) {
    return dispatch => {
        fetch(BASE_URL + '/movies/' + id)
        .then(res => res.json())
        .then(
            (result) => {
                console.log("movie details", result)
                dispatch({
                    type: GET_MOVIE,
                    payload: result
                })
            },
            (error) => {
                // dispatch(getMovieError(error));
                console.log('Error in fetching all movies: ', error);
            });
    }
}

export default getMovie;