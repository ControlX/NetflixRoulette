import React from 'react'

import Header from './Header'
import Footer from './Footer'
import MovieList from './MoviesList'
import ErrorBoundary from './ErrorBoundary'
import DummyInvisionListing from './utils/Constants'

export default function AppComponent(){
    const MovieListing = DummyInvisionListing();

    return (
        <>
            <div className='parent-header-properties'>
            <Header/>
            </div>
            <ErrorBoundary>
                <div className='parent-background-properties'>
                <MovieList 
                    listing={MovieListing}
                />
                </div>
            </ErrorBoundary>
            <Footer />
        </>
    )
}