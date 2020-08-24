import React from 'react'

import Header from './Header'
import Footer from './Footer'
import MovieList from './MoviesList'
import ErrorBoundary from './ErrorBoundary'

export default function AppComponent(){
    return (
        <>
            <Header />
            <ErrorBoundary>
                <MovieList />
            </ErrorBoundary>
            <Footer />
        </>
    )
}