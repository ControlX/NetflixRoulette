import React, { useState, useEffect, useCallback } from 'react'
import Header from '../Header'
import Footer from '../Footer'
import ErrorBoundary from '../ErrorBoundary'
import { ProcessGetRequest } from '../../utils/RestUtils'
import AddEditMovie from '../AddEditMovie'
import DeleteMovie from '../DeleteMovie'
import SortFilterListing from '../SortFilterListing'
import MovieDetails from '../MovieDetails'
import "regenerator-runtime"
const MoviesList = React.lazy(() => import("../MoviesList"));

export default function RouletteMain() {
    const [isError, setError] = useState(false);
    const [movieList, setMovieList] = useState([]);
    const [sortOption, setSortOption] = useState("year");
    const [filterOption, setFilterOption] = useState("all");
    const [isAddModalVisible, setAddModalVisible] = useState(false);
    const [isEditModalVisible, setEditModalVisible] = useState(false);
    const [isDeleteModalVisible, setDeleteModalVisible] = useState(false);
    const [isMovieDetailsVisible, setMovieDetailsVisible] = useState(false);
    const [editMovieSelection, setEditMovieSelection] = useState({});
    const [deleteMovieSelection, setDeleteMovieSelection] = useState({});
    const [movieDetailSelection, setMovieDetailSelection] = useState({});
    const [displayedMoviesCount, setDisplayedMoviesCount] = useState(0);

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
        setDeleteMovieSelection(listObject);
        setDeleteModalVisible(true);
    }

    function onCloseAction() {
        setAddModalVisible(false);
        setEditModalVisible(false);
        setDeleteModalVisible(false);
        setMovieDetailsVisible(false);
    }

    function onSubmitAction(item) {
        let stateList = [...movieList];
        let uniqueId = stateList.length + 1;
        item.id = uniqueId;
        item.isEnabled = true;
        stateList.push(item);
        let newStateList = filterByGenreType(stateList, filterOption);
        setMovieList(newStateList);
        onCloseAction();
    }

    function onSaveAction(item) {
        let stateList = [...movieList];
        stateList.forEach((obj, i) => { if (obj.id === item.id) { stateList[i] = item } });
        let newStateList = filterByGenreType(stateList, filterOption);
        setMovieList(newStateList);
        onCloseAction();
    }

    function onConfirmAction(item) {
        let stateList = [...movieList];
        let modList = stateList.filter((obj) => obj.id !== item.id);
        let newStateList = filterByGenreType(modList, filterOption);
        setMovieList(newStateList);
        onCloseAction();
    }

    function onShowMovieDetailsAction(id) {
        let stateList = [...movieList];
        let listObject = stateList.find(obj => obj.id === id);
        setMovieDetailSelection(listObject);
        setMovieDetailsVisible(true);
        window.scrollTo(0, 0);
    }

    function onFilterCategoryClicked(category) {
        switch (category) {
            case "all":
                let list = [...movieList];
                list = enableAllMovieCards(list);
                let stateList = sortByKey(list, sortOption);
                setDisplayedMoviesCount(stateList.length);
                setMovieList(stateList);
                break;
            default:
                let newList = [...movieList];
                let newStateList = filterByGenreType(newList, category);
                setMovieList(newStateList);
                break;
        }
        setFilterOption(category);
    }

    function onHandleSelect(selectedOption) {
        setSortOption(selectedOption);
        let stateList = sortByKey(movieList, selectedOption);
        setMovieList(stateList);
    }

    function sortByKey(array, key) {
        return array.sort(function (a, b) {
            var x = a[key]; var y = b[key];
            return ((x < y) ? -1 : ((x > y) ? 1 : 0));
        });
    }

    function enableAllMovieCards(list) {
        return list.map(item => {
            item.isEnabled = true;
            return item;
        })
    }

    function filterByGenreType(array, key) {
        let enabledCount = 0;
        let filteredList = [];
        if(key === 'all'){
            filteredList = enableAllMovieCards(array)
            enabledCount = filteredList.length;
        }
        else{
            filteredList = array.map(item => {
       
                if (item.description.toLowerCase().includes(key)) {
                    item.isEnabled = true;
                    enabledCount++;
                }
                else {
                    item.isEnabled = false;
                }
                return item;
            });
        }
        setDisplayedMoviesCount(enabledCount);
        return filteredList;
    }

    function onMovieDetailsSearch() {
        setMovieDetailsVisible(false);
    }

    async function fetchMovieListing() {
        let response = await ProcessGetRequest();
        if (response.status === 200) {
            return response.data;
        }
        else {
            setError(true);
        }
    }

    const initRoulette = useCallback(async () => {
        let list = await fetchMovieListing();
        let stateList = sortByKey(list, sortOption);
        setDisplayedMoviesCount(stateList.length);
        setMovieList(stateList);
    });

    useEffect(() => {
        initRoulette();
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
                <SortFilterListing onHandleSelect={onHandleSelect}
                    onFilterCategoryClicked={onFilterCategoryClicked}
                    displayedMoviesCount={displayedMoviesCount}
                    selectedFilter = {filterOption}
                />
                <ErrorBoundary
                    isError={isError}>
                    <React.Suspense
                        fallback={<p className="parent-general-message">Loading titles...</p>}>
                        <MoviesList
                            movieList={movieList}
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
                    onSaveAction={onSaveAction}
                /> : null}
            {(isAddModalVisible) ?
                <AddEditMovie
                    onCloseAction={onCloseAction}
                    onSubmitAction={onSubmitAction}
                /> : null}
            {(isDeleteModalVisible) ?
                <DeleteMovie
                    deleteMovieSelection={deleteMovieSelection}
                    onCloseAction={onCloseAction}
                    onConfirmAction={onConfirmAction}
                /> : null}
        </>
    )
}