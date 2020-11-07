import React from 'react';
import ReactDOM from 'react-dom';
import { render, fireEvent, waitFor } from '@testing-library/react';
import AddEditMovie from '../components/AddEditMovie';
import '@testing-library/jest-dom';
import "regenerator-runtime"

describe('ADD MOVIE COMPONENT TEST CASES: ', () => {
    it('tests if AddEditMovie component renders without crashing', () => {
        const div = document.createElement("div");
        ReactDOM.render(<AddEditMovie />, div);
        ReactDOM.unmountComponentAtNode(div);
    });

    it('submits the Add Movie form with correct values', async () => { 
        const click = jest.fn();
        const { container } = render(<AddEditMovie onAddMovieSubmitAction={click}/>) 
        const title = container.querySelector('input[name="title"]') 
        const release_date = container.querySelector('input[name="release_date"]') 
        const poster_path = container.querySelector('input[name="poster_path"]') 
        const genres = container.querySelector('input[name="genres"]') 
        const overview = container.querySelector('input[name="overview"]') 
        const runtime = container.querySelector('input[name="runtime"]') 
        const submit = container.querySelector('button[type="submit"]') 
        
        //Adding mock to scrollview, if not added it throws error
        window.HTMLElement.prototype.scrollIntoView = jest.fn()

        await waitFor(() => { fireEvent.change(title, { target: { value: "mockTitle" } }) }) 
        await waitFor(() => { fireEvent.change(release_date, { target: { value: "2012-12-12" } }) }) 
        await waitFor(() => { fireEvent.change(poster_path, { target: { value: "http://somemockpath.com" } }) }) 
        await waitFor(() => { fireEvent.change(genres, { target: { value: "mockGenre" } }) }) 
        await waitFor(() => { fireEvent.change(overview, { target: { value: "mockOverview" } }) }) 
        await waitFor(() => { fireEvent.change(runtime, { target: { value: "123" } }) }) 
        await waitFor(() => { fireEvent.click(submit) }) 
        
        expect(click).toBeCalled();
    })
});