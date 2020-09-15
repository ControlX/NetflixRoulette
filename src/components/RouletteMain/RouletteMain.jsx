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

export default function RouletteMain(props) {
    const [isError, setError] = useState(false);
    const [movieList, setMovieList] = useState([]);
    const [sortOption, setSortOption] = useState("year");
    const [filterOption, setFilterOption] = useState("all");
    const [isAddModalVisible, setAddModalVisible] = useState(false);
    const [isEditModalVisible, setEditModalVisible] = useState(false);
    const [isDeleteModalVisible, setDeleteModalVisible] = useState(false);
    const [isMovieDetailsVisible, setMovieDetailsVisible] = useState(false);
    const [processEditMovieField, setProcessEditMovieField] = useState({});
    const [processDeleteMovieField, setProcessDeleteMovieField] = useState({});
    const [processMovieDetailsInfo, setProcessMovieDetailsInfo] = useState({});
    const [updateFilterResultText, setUpdateFilterResultText] = useState(0);

    function onAddAction() {
        setAddModalVisible(true);
    }

    function onEditAction(id) {
        let stateList = [...movieList];
        let listObject = stateList.find(obj => obj.id === id)
        setProcessEditMovieField(listObject);
        setEditModalVisible(true);
    }

    function onDeleteAction(id) {
        let stateList = [...movieList];
        let listObject = stateList.find(obj => obj.id === id);
        setProcessDeleteMovieField(listObject);
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
        setProcessMovieDetailsInfo(listObject);
        setMovieDetailsVisible(true);
        window.scrollTo(0, 0);
    }

    function onFilterCategoryClicked(event) {
        let type = event.target.value;
        switch (type) {
            case "all":
                let list = [...movieList];
                list = enableAllMovieCards(list);
                let stateList = sortByKey(list, sortOption);
                setUpdateFilterResultText(stateList.length);
                setMovieList(stateList);
                break;
            default:
                let newList = [...movieList];
                let newStateList = filterByGenreType(newList, type);
                setMovieList(newStateList);
                break;
        }
        setFilterOption(type);
    }

    function onHandleSelect(event) {
        setSortOption(event.target.value);
        let stateList = sortByKey(movieList, event.target.value);
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
        setUpdateFilterResultText(enabledCount);
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
        setUpdateFilterResultText(stateList.length);
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
                            processMovieDetailsInfo={processMovieDetailsInfo}
                            onMovieDetailsSearch={onMovieDetailsSearch.bind(this)}
                        />
                    </div>
                </div> :
                <div className='parent-header-properties'>
                    <Header
                        isAddModalVisible={isAddModalVisible}
                        onAddAction={onAddAction.bind(this)}
                    />
                </div>
            }

            <div className='parent-background-properties'>
                <SortFilterListing onHandleSelect={onHandleSelect.bind(this)}
                    onFilterCategoryClicked={onFilterCategoryClicked.bind(this)}
                    updateFilterResultText={updateFilterResultText}
                />
                <ErrorBoundary
                    isError={isError}>
                    <React.Suspense
                        fallback={<p className="parent-general-message">Loading titles...</p>}>
                        <MoviesList
                            listing={movieList}
                            onEditAction={onEditAction.bind(this)}
                            onDeleteAction={onDeleteAction.bind(this)}
                            onShowMovieDetailsAction={onShowMovieDetailsAction.bind(this)}
                        />
                    </React.Suspense>
                </ErrorBoundary>
            </div>
            <div className='parent-footer-properties'>
                <Footer />
            </div>
            {(isEditModalVisible) ?
                <AddEditMovie
                    processEditMovieField={processEditMovieField}
                    onCloseAction={onCloseAction.bind(this)}
                    onSaveAction={onSaveAction.bind(this)}
                /> : null}
            {(isAddModalVisible) ?
                <AddEditMovie
                    onCloseAction={onCloseAction.bind(this)}
                    onSubmitAction={onSubmitAction.bind(this)}
                /> : null}
            {(isDeleteModalVisible) ?
                <DeleteMovie
                    processDeleteMovieField={processDeleteMovieField}
                    onCloseAction={onCloseAction.bind(this)}
                    onConfirmAction={onConfirmAction.bind(this)}
                /> : null}
        </>
    )
}