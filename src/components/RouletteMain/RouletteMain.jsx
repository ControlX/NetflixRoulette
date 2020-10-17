import React, { useState, useEffect, useCallback } from 'react'
import Header from '../Header'
import Footer from '../Footer'
import ErrorBoundary from '../ErrorBoundary'
import AddEditMovie from '../AddEditMovie'
import DeleteMovie from '../DeleteMovie'
import SortFilterListing from '../SortFilterListing'
import MovieDetails from '../MovieDetails'
import { AddMovie, FetchMovies } from '../../utils/RestUtils'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import getMovies from '../../actions/fetchMovies';
import addMovie from '../../actions/addMovie';
import editMovie from '../../actions/editMovie';
import deleteMovie from '../../actions/deleteMovie';
import getMovie from '../../actions/getMovie';
import sortMovies from '../../actions/sortMovies';
import filterMovies from '../../actions/filterMovies';
import "regenerator-runtime"
const MoviesList = React.lazy(() => import("../MoviesList"));
const movies = [];
function RouletteMain(props) {
    const [isError, setError] = useState(false);
    const [movieList, setMovieList] = useState([]);
    const [visibleMovies, setVisibleMovies] = useState([]);
    const [sortOption, setSortOption] = useState("year");
    const [filterOption, setFilterOption] = useState("all");
    const [isAddModalVisible, setAddModalVisible] = useState(false);
    const [isEditModalVisible, setEditModalVisible] = useState(false);
    const [isDeleteModalVisible, setDeleteModalVisible] = useState(false);
    const [isMovieDetailsVisible, setMovieDetailsVisible] = useState(false);
    const [editMovieSelection, setEditMovieSelection] = useState({});
    const [deleteMovieSelection, setDeleteMovieSelection] = useState({});
    const [movieDetailSelection, setMovieDetailSelection] = useState({});

    function onAddAction() {
        setAddModalVisible(true);
    }

    function onEditAction(id) {
        let stateList = [...props.movieProps];
        let listObject = stateList.find(obj => obj.id === id)
        setEditMovieSelection(listObject);
        setEditModalVisible(true);
    }

    function onDeleteAction(id) {
        let stateList = [...props.movieProps];
        let listObject = stateList.find(obj => obj.id === id);
        console.log("--", listObject)
        setDeleteMovieSelection(listObject);
        setDeleteModalVisible(true);
    }

    function onCloseAction() {
        setAddModalVisible(false);
        setEditModalVisible(false);
        setDeleteModalVisible(false);
        setMovieDetailsVisible(false);
    }

    function onAddMovieSubmitAction(item) {
        props.addMovie(item)
        onCloseAction();
    }

    function onEditMovieSaveAction(item) {
        props.editMovie(item)
        onCloseAction();
    }

    function onDeleteMovieConfirmAction(item) {
        props.deleteMovie(item.id);
        onCloseAction();
    }

    function onShowMovieDetailsAction(id) {
        props.getMovie(id)
        let stateList = [...props.movieProps];
        let listObject = stateList.find(obj => obj.id === id);
        setMovieDetailSelection(listObject);
        setMovieDetailsVisible(true);
        window.scrollTo(0, 0);
    }

    function onFilterCategoryClicked(category) {
        setFilterOption(category);
        props.filterMovies(category);
    }

    function onHandleSelectedSortOption(selectedOption) {
        setSortOption(selectedOption);
        setSortOption((state) => {
            props.sortMovies([...props.movieProps], state)
        })
    }

    function sortByKey(array, key = sortOption) {
        return array.sort(function (a, b) {
            var x = a[key]; var y = b[key];
            return ((x < y) ? -1 : ((x > y) ? 1 : 0));
        });
    }

    function onMovieDetailsSearch() {
        setMovieDetailsVisible(false);
    }

    function filterMovieVisibility(array, key = filterOption) {
        console.log("==key ", key)
        console.log("==array ", array)
        console.log("==movieList ", movieList)
        let initialList = [];
        (movieList.length === 0) ? initialList = array : initialList = [...movieList]; //hack as movieList is empty initially always. Need to check and remove this.
        let filteredList = (key === 'all') ? initialList : array.filter(item => ((item.genres).toString()).toLowerCase().includes(key));
        console.log("==filteredList ", filteredList)
        setVisibleMovies([...filteredList]);
    }
  
    useEffect(() => {
        props.getMovies()
    }, []);

    return (
        <>
            {(isMovieDetailsVisible) ?
                <div className='parent-header-movie-details-properties'>
                    <div className='parent-header-layer'>
                        <MovieDetails
                            movieDetailSelection={movieDetailSelection}
                            onMovieDetailsSearch={onMovieDetailsSearch}
                        />
                    </div>
                </div> :
                <div className='parent-header-properties'>
                    <Header
                        isAddModalVisible={isAddModalVisible}
                        onAddAction={onAddAction}
                    />
                </div>
            }

            <div className='parent-background-properties'>
                <SortFilterListing onHandleSelectedSortOption={onHandleSelectedSortOption}
                    onFilterCategoryClicked={onFilterCategoryClicked}
                    displayedMoviesCount={props.movieProps.length}
                    selectedFilter={filterOption}
                />
                <ErrorBoundary
                    isError={isError}>
                    <React.Suspense
                        fallback={<p className="parent-general-message">Loading titles...</p>}>
                        <MoviesList
                            movieList={props.movieProps}
                            onEditAction={onEditAction}
                            onDeleteAction={onDeleteAction}
                            onShowMovieDetailsAction={onShowMovieDetailsAction}
                        />
                    </React.Suspense>
                </ErrorBoundary>
            </div>
            <div className='parent-footer-properties'>
                <Footer />
            </div>
            {(isEditModalVisible) ?
                <AddEditMovie
                    editMovieSelection={editMovieSelection}
                    onCloseAction={onCloseAction}
                    onEditMovieSaveAction={onEditMovieSaveAction}
                /> : null}
            {(isAddModalVisible) ?
                <AddEditMovie
                    onCloseAction={onCloseAction}
                    onAddMovieSubmitAction={onAddMovieSubmitAction}
                /> : null}
            {(isDeleteModalVisible) ?
                <DeleteMovie
                    deleteMovieSelection={deleteMovieSelection}
                    onCloseAction={onCloseAction}
                    onDeleteMovieConfirmAction={onDeleteMovieConfirmAction}
                /> : null}
        </>
    )
}

const mapStateToProps = (state) => {
    console.log("ooo", state)
    const {movieReducer, movieDetailReducer} = state;
    
    return {
        movieProps : movieReducer,
        movieDetailProps : movieDetailReducer
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        addMovie: addMovie,
        editMovie: editMovie,
        deleteMovie: deleteMovie,
        getMovies: getMovies,
        getMovie: getMovie,
        sortMovies: sortMovies,
        filterMovies: filterMovies
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(RouletteMain)