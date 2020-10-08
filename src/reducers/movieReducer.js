const movieReducer = (state = [], action) => {

    switch (action.type) {
        case 'ADD_MOVIE':
            let stateCopy = [...state]
            stateCopy.push(action.payload);
            console.log("statecopy", stateCopy)
            return stateCopy

        case 'DELETE_MOVIE':
            stateCopy = state.filter(x => x.id !== action.payload);
            console.log("deleteMovieList", stateCopy)
            return stateCopy

        case 'EDIT_MOVIE':
            stateCopy = state.map((movie) => {
                const { title, genres, release_date, poster_path, id, vote_average, runtime, overview } = action.payload;
                if (movie.id === id) {
                    movie.title = title;
                    movie.genres = genres;
                    movie.release_date = release_date;
                    movie.poster_path = poster_path;
                    movie.vote_average = vote_average;
                    movie.runtime = runtime;
                    movie.overview = overview;
                }
                return movie;
            })
            return stateCopy
        
        case 'GET_MOVIES':
            return action.payload

        case 'SORT_MOVIES':
            return action.payload

        case 'FILTER_MOVIES':
            return action.payload
            
        default:
            return state;
    }

}
export default movieReducer;