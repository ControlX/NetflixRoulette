import {GET_MOVIES} from './movieActions';
import {BASE_URL} from '../utils/Constants'
function getMovies() {
    return dispatch => {
        fetch(BASE_URL + '/movies')
        .then(res => res.json())
        .then(
            (result) => {
                dispatch({
                    type: GET_MOVIES,
                    payload: result.data
                })
            },
            (error) => {
                // dispatch(getMovieError(error));
                console.log('Error in fetching all movies: ', error);
            });
    }
}

export default getMovies;