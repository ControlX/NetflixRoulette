import React, { Component } from 'react'
import Header from '../Header'
import Footer from '../Footer'
import ErrorBoundary from '../ErrorBoundary'
import { ProcessGetRequest } from '../../utils/RestUtils'
import EditMovie from '../EditMovie'
import AddMovie from '../AddMovie'
import DeleteMovie from '../DeleteMovie'
import SortListing from '../SortListing'
import "regenerator-runtime"
const MoviesList = React.lazy(() => {
    return new Promise(resolve => setTimeout(resolve, 500)).then(() => import("../MoviesList"));
})

class RouletteMain extends Component {
    constructor(props) {
        super(props);
        this.state = {
            movieList: [],
            sortOption: "year", 
            isError: false,
            isAddModalVisible: false,
            isEditModalVisible: false,
            isDeleteModalVisible: false,
            processEditMovieField: {},
            processDeleteMovieField: {}
        }
    }

    onAddAction() {
        this.setState({ isAddModalVisible: true })
    }

    onEditAction(id) {
        let stateList = this.state.movieList;
        stateList.forEach((obj, i) => { if (obj.id === id) { this.setState({ processEditMovieField: obj }) } });
        this.setState({ isEditModalVisible: true })
    }

    onDeleteAction(id) {
        let stateList = this.state.movieList;
        stateList.forEach((obj, i) => { if (obj.id === id) { this.setState({ processDeleteMovieField: obj }) } });
        this.setState({ isDeleteModalVisible: true })
    }

    onCloseAction() {
        this.setState({ isAddModalVisible: false, isEditModalVisible: false, isDeleteModalVisible: false })
    }

    onSubmitAction(item) {
        let stateList = this.state.movieList;
        let uniqueId = stateList.length + 1;
        item.id = uniqueId;
        stateList.push(item);
        this.setState({ movieList: stateList })
        this.onCloseAction();
    }

    onSaveAction(item) {
        let stateList = this.state.movieList;
        stateList.forEach((obj, i) => { if (obj.id === item.id) { stateList[i] = item } });
        this.setState({ movieList: stateList })
        this.onCloseAction();
    }

    onConfirmAction(item) {
        let stateList = this.state.movieList;
        stateList.forEach((obj, i, jsonObj) => { if (obj.id === item.id) { jsonObj.splice(i, 1); } });
        this.setState({ movieList: stateList })
        this.onCloseAction();
    }

    onHandleSelect(event){
        this.setState({sortOption: event.target.value})
        let stateList = this.sortByKey(this.state.movieList, event.target.value);
        this.setState({ movieList: stateList })
    }

    sortByKey(array, key) {
        return array.sort(function(a, b) {
            var x = a[key]; var y = b[key];
            return ((x < y) ? -1 : ((x > y) ? 1 : 0));
        });
    }

    async componentDidMount() {
        let list = await this.fetchMovieListing();
        let stateList = this.sortByKey(list, this.state.sortOption);
        this.setState({ movieList: stateList })
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
                    <SortListing onHandleSelect={this.onHandleSelect.bind(this)}/>
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
                    <EditMovie
                        processEditMovieField={this.state.processEditMovieField}
                        onCloseAction={this.onCloseAction.bind(this)}
                        onSaveAction={this.onSaveAction.bind(this)}
                    /> : null}
                {(this.state.isAddModalVisible) ?
                    <AddMovie
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