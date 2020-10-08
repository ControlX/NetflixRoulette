import { BASE_URL } from './Constants'

export function FetchMovies() {
    return fetch(BASE_URL + "/movies")
        .then(res => res.json())
        .then(
            (result) => {
                return result;
            },
            (error) => {
                return error;
            });
}

export function GetMovie(id) {
    return fetch(BASE_URL + "/movies" + id)
        .then(res => res.json())
        .then(
            (result) => {
                return result;
            },
            (error) => {
                return error;
            });
}

export function AddMovie(movie) {
    return fetch(BASE_URL + "/movies", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: movie
    })
        .then(res => res.json())
        .then(
            (result) => {
                return result;
            },
            (error) => {
                return error;
            });
}

export function EditMovie(movie) {
    return fetch(BASE_URL + "/movies", {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: movie
    })
        .then(res => res.json())
        .then(
            (result) => {
                return result;
            },
            (error) => {
                return error;
            });
}

export function DeleteMovie(id) {
    return fetch(BASE_URL + "/movies/" + id, {
        method: 'DELETE'
    })
        .then(res => res.json())
        .then(
            (result) => {
                return result;
            },
            (error) => {
                return error;
            });
}