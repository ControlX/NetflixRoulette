import {GET_MOVIES, ERROR} from './movieActions';
import {BASE_URL} from '../utils/Constants'
function searchMovies(searchText) {
    return dispatch => {
        fetch(BASE_URL + '/movies?searchBy=title&search=' + searchText)
        .then(res => res.json())
        .then(
            (result) => {
                console.log(result.data)
                dispatch({
                    type: GET_MOVIES,
                    payload: result.data
                });
                dispatch({
                    type: ERROR,
                    payload: false
                });
            },
            (error) => {
                dispatch({
                    type: ERROR,
                    payload: true
                })
                console.log('Error in fetching all movies: ', error);
            });
    }
}

export default searchMovies;