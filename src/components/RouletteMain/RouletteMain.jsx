import React, { Component } from 'react'
import Header from '../Header'
import Footer from '../Footer'
import ErrorBoundary from '../ErrorBoundary'
import { ProcessGetRequest } from '../../utils/RestUtils'
import AddEditMovie from '../AddEditMovie'
import DeleteMovie from '../DeleteMovie'
import SortListing from '../SortListing'
import "regenerator-runtime"
const MoviesList = React.lazy(() => import("../MoviesList"));

class RouletteMain extends Component {
    constructor(props) {
        super(props);
        this.state = {
            movieList: [],
            filterList: [],
            sortOption: "year",
            filterOption: "all",
            isError: false,
            isAddModalVisible: false,
            isEditModalVisible: false,
            isDeleteModalVisible: false,
            processEditMovieField: {},
            processDeleteMovieField: {},
            updateFilterResultText: 0
        }
    }

    onAddAction() {
        this.setState({ isAddModalVisible: true })
    }

    onEditAction(id) {
        let stateList = this.state.movieList;
        let listObject = stateList.find(obj => obj.id === id)
        this.setState({ processEditMovieField: listObject, isEditModalVisible: true })
    }

    onDeleteAction(id) {
        let stateList = this.state.movieList;
        let listObject = stateList.find(obj => obj.id === id);
        this.setState({ processDeleteMovieField: listObject, isDeleteModalVisible: true })
    }

    onCloseAction() {
        this.setState({ isAddModalVisible: false, isEditModalVisible: false, isDeleteModalVisible: false })
    }

    onSubmitAction(item) {
        let stateList = this.state.movieList;
        let uniqueId = stateList.length + 1;
        item.id = uniqueId;
        stateList.push(item);
        this.setState({ movieList: [...this.state.movieList, item] })
        this.onCloseAction();
    }

    onSaveAction(item) {
        let stateList = [...this.state.movieList];
        stateList.forEach((obj, i) => { if (obj.id === item.id) { stateList[i] = item } });
        this.setState({ movieList: stateList })
        this.onCloseAction();
    }

    onConfirmAction(item) {
        let stateList = this.state.movieList;
        let modList = stateList.filter((obj) => obj.id !== item.id);
        this.setState({ movieList: modList })
        this.onCloseAction();
    }

    async onSortCategoryClicked(event){
        let type = event.target.value;
        switch(type){
            case "all":
                let list = await this.fetchMovieListing();
                let stateList = this.sortByKey(list, this.state.sortOption);
                this.setState({ filterOption: type, updateFilterResultText : stateList.length, movieList: stateList })
                break;
            case "documentary":
            case "comedy":
            case "horror":
            case "crime":
                let initialList = await this.fetchMovieListing();
                this.setState({ movieList: initialList })
                let newList = [...this.state.movieList];
                let newStateList = this.filterByGenreType(newList, type);
                this.setState({ filterOption: type, updateFilterResultText : newStateList.length, movieList: newStateList })
                break;
        }
    }

    onHandleSelect(event){
        this.setState({sortOption: event.target.value})
        let stateList = this.sortByKey(this.state.movieList, event.target.value);
        this.setState({ updateFilterResultText : stateList.length, movieList: stateList })
    }

    sortByKey(array, key) {
        return array.sort(function(a, b) {
            var x = a[key]; var y = b[key];
            return ((x < y) ? -1 : ((x > y) ? 1 : 0));
        });
    }

    filterByGenreType(array, key) {
        return array.filter(item => item.description.toLowerCase().includes(key))
    }

    async componentDidMount() {
        let list = await this.fetchMovieListing();
        let stateList = this.sortByKey(list, this.state.sortOption);
        this.setState({ updateFilterResultText: stateList.length, movieList: stateList })
    }

    async fetchMovieListing() {
        let response = await ProcessGetRequest();
        if (response.status === 200) {
            return response.data;
        }
        else {
            this.setState({ isError: true })
        }
    }

    render() {
        return (
            <>
                <div className='parent-header-properties'>
                    <Header
                        isAddModalVisible={this.state.isAddModalVisible}
                        onAddAction={this.onAddAction.bind(this)}
                    />
                </div>

                <div className='parent-background-properties'>
                    <SortListing onHandleSelect={this.onHandleSelect.bind(this)} 
                        onSortCategoryClicked={this.onSortCategoryClicked.bind(this)} 
                        updateFilterResultText={this.state.updateFilterResultText}
                        filterOption={this.state.filterOption}
                        />
                    <ErrorBoundary
                        isError={this.state.isError}>
                        <React.Suspense
                            fallback={<p className="parent-general-message">Loading titles...</p>}>
                            <MoviesList
                                listing={this.state.movieList}
                                onEditAction={this.onEditAction.bind(this)}
                                onDeleteAction={this.onDeleteAction.bind(this)}
                            />
                        </React.Suspense>
                    </ErrorBoundary>
                </div>
                <div className='parent-footer-properties'>
                    <Footer />
                </div>
                {(this.state.isEditModalVisible) ?
                    <AddEditMovie
                        processEditMovieField={this.state.processEditMovieField}
                        onCloseAction={this.onCloseAction.bind(this)}
                        onSaveAction={this.onSaveAction.bind(this)}
                    /> : null}
                {(this.state.isAddModalVisible) ?
                    <AddEditMovie
                        onCloseAction={this.onCloseAction.bind(this)}
                        onSubmitAction={this.onSubmitAction.bind(this)}
                    /> : null}
                {(this.state.isDeleteModalVisible) ?
                    <DeleteMovie
                        processDeleteMovieField={this.state.processDeleteMovieField}
                        onCloseAction={this.onCloseAction.bind(this)}
                        onConfirmAction={this.onConfirmAction.bind(this)}
                    /> : null}
            </>
        )
    }
}

export default RouletteMain;