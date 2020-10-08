const movieReducer = (state = [], action) => {

    switch (action.type) {
        case 'ADD_MOVIE':
            let stateCopy = [...state, action.payload];
            localStorage.setItem('movie_titles', JSON.stringify(stateCopy));
            return stateCopy

        case 'DELETE_MOVIE':
            stateCopy = state.filter(x => x.id !== action.payload);
            localStorage.setItem('movie_titles', JSON.stringify(stateCopy));
            return stateCopy

        case 'EDIT_MOVIE':
            stateCopy = state.map((movie) => {
                const { title, description, year, src, id, rating, runtime, overview } = action.payload;
                if (movie.id === id) {
                    movie.title = title;
                    movie.description = description;
                    movie.year = year;
                    movie.src = src;
                    movie.rating = rating;
                    movie.runtime = runtime;
                    movie.overview = overview;
                }
                return movie;
            })
            localStorage.setItem('movie_titles', JSON.stringify(stateCopy));
            return stateCopy
        default:
            return state;
    }

}
export default movieReducer;