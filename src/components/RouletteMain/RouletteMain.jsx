import React, { useState, useEffect, useCallback } from 'react'
import Header from '../Header'
import Footer from '../Footer'
import ErrorBoundary from '../ErrorBoundary'
import { ProcessGetRequest } from '../../utils/RestUtils'
import AddEditMovie from '../AddEditMovie'
import DeleteMovie from '../DeleteMovie'
import SortFilterListing from '../SortFilterListing'
import MovieDetails from '../MovieDetails'
import FetchMovies from '../CustomHooks'
import "regenerator-runtime"
const MoviesList = React.lazy(() => import("../MoviesList"));

export default function RouletteMain() {
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
        let stateList = [...movieList];
        let listObject = stateList.find(obj => obj.id === id)
        setEditMovieSelection(listObject);
        setEditModalVisible(true);
    }

    function onDeleteAction(id) {
        let stateList = [...movieList];
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
        let stateList = [...movieList];
        let uniqueId = stateList.length + 1;
        item.id = uniqueId;
        stateList.push(item);
        setMovieList(stateList)
        filterMovieVisibility(stateList);
        onCloseAction();
    }

    function onEditMovieSaveAction(item) {
        let stateList = [...movieList];
        stateList.forEach((obj, i) => { if (obj.id === item.id) { stateList[i] = item } });
        setMovieList(stateList)
        filterMovieVisibility(stateList);
        onCloseAction();
    }

    function onDeleteMovieConfirmAction(item) {
        let stateList = [...movieList];
        stateList = stateList.filter((obj) => obj.id !== item.id);
        setMovieList(stateList);
        setMovieList((state) => {
            console.log(state);
            filterMovieVisibility(state);
            onCloseAction();
            return state;
          }); 
    }

    function onShowMovieDetailsAction(id) {
        let stateList = [...movieList];
        let listObject = stateList.find(obj => obj.id === id);
        setMovieDetailSelection(listObject);
        setMovieDetailsVisible(true);
        window.scrollTo(0, 0);
    }

    function onFilterCategoryClicked(category) {       
        let stateList = sortByKey([...movieList]);
        setFilterOption(category);
        filterMovieVisibility(stateList, category);
    }

    function onHandleSelectedSortOption(selectedOption) {
        setSortOption(selectedOption);
        let stateList = sortByKey(visibleMovies, selectedOption);
        filterMovieVisibility(stateList);
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
        let filteredList = (key === 'all') ? initialList : array.filter(item => item.description.toLowerCase().includes(key));
        console.log("==filteredList ", filteredList)
        setVisibleMovies([...filteredList]);
    }

    const {response, error} = FetchMovies();
    useEffect(() => {        
            let list = sortByKey(response || []);
            setMovieList(list);
            //BUGS:
            //1) Adding setState(setMovieList) in useEffect is not updating state immediately, hence required for initial call. Need to verify with Alex.
            //2) On deleting a movie, movieList is not updating. I think it is related to useEffect hook somehow.
            setMovieList((state) => {
                //movieList remains empty here
                filterMovieVisibility(state);
                return state;
            }); 
            console.log(response);
    }, [response]);

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
                    displayedMoviesCount={visibleMovies.length}
                    selectedFilter = {filterOption}
                />
                <ErrorBoundary
                    isError={isError}>
                    <React.Suspense
                        fallback={<p className="parent-general-message">Loading titles...</p>}>
                        <MoviesList
                            movieList={visibleMovies}
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
}//useMemo, useCallback