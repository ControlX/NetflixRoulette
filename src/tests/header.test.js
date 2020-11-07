import React from 'react';
import ReactDOM from 'react-dom';
import { render, fireEvent } from '@testing-library/react';
import Header from '../components/Header';
import '@testing-library/jest-dom';

describe('HEADER COMPONENT TEST CASES: ', () => {
    it('tests if Header component renders without crashing', () => {
        const div = document.createElement("div");
        ReactDOM.render(<Header> </Header>, div);
        ReactDOM.unmountComponentAtNode(div);
    });

    it('tests if input field for searching movie is present', () => {
        const { getByText, getByPlaceholderText } = render(<Header />);
        expect(getByText(/netflix/i)).toBeInTheDocument();
        expect(getByPlaceholderText("What do you want to watch?")).toBeInTheDocument();
    })

    it('tests if the label Find Your Movie is present', () => {
        const { getByText } = render(<Header />);
        expect(getByText("FIND YOUR MOVIE")).toBeInTheDocument();
    })

    it('tests if find movie props clicked with correct prop name', () => {
        let clicked = false;
        const { getByText } = render(<Header onAddAction={() => clicked = true} />);
        const addMovieButton = getByText(/ADD MOVIE/i);
        fireEvent.click(addMovieButton);
        expect(clicked).toBe(true);
    })

    it('tests if find movie props clicked via mocked function', () => {
        const click = jest.fn();
        const { getByText } = render(<Header onAddAction={click} />);
        const addMovieButton = getByText(/ADD MOVIE/i);
        fireEvent.click(addMovieButton);
        expect(click).toBeCalled();
    })

    it('test to add text to input field for searching movies and verify the button click of searching', () => {
        const click = jest.fn();
        const { getByText, getByPlaceholderText } = render(<Header onMovieTitleSearch={click}/>);
        const input = getByPlaceholderText("What do you want to watch?");
        fireEvent.change(input, {
            target: {
                value: "movie name",
            },
        });
        expect(input).toHaveValue("movie name");
        const searchMovieButton = getByText(/SEARCH/i);
        fireEvent.click(searchMovieButton);
        expect(click).toBeCalled();
    })
});