const movieNotFound = (state = false, action) => {

    switch (action.type) {
        case 'ERROR':
            return action.payload

        default:
            return state;
    }

}
export default movieNotFound;