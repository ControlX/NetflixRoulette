const movieDetailReducer = (state = [], action) => {

    switch (action.type) {
        case 'GET_MOVIE':
            return action.payload

        default:
            return state;
    }

}
export default movieDetailReducer;