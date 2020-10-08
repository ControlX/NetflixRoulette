import {SORT_MOVIES} from './movieActions';

function sortMovies(array, key) {
    return dispatch => {
        let sortedArray = sortByKey(array, key);
                dispatch({
                    type: SORT_MOVIES,
                    payload: sortedArray
                })
            }
}

function sortByKey(array, key = sortOption) {
    return array.sort(function (a, b) {
        var x = a[key]; var y = b[key];
        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });
}

export default sortMovies;