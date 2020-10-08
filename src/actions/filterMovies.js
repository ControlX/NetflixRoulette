import {FILTER_MOVIES} from './movieActions';
import {BASE_URL} from '../utils/Constants'
function filterMovies(key) {
    return dispatch => {
        fetch(BASE_URL + '/movies')
        .then(res => res.json())
        .then(
            (result) => {
                let filteredList = (key === 'all') ? result.data : (result.data).filter(item => ((item.genres).toString()).toLowerCase().includes(key));
                dispatch({
                    type: FILTER_MOVIES,
                    payload: filteredList
                })
            },
            (error) => {
                // dispatch(getMovieError(error));
                console.log('Error in fetching all movies: ', error);
            });
    }
}

export default filterMovies;