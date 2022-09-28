export const BASE_URL = 'https://api.diploma.nomorepartiesxyz.ru'

const headers = {
    'Accept': 'application/json',
    'Content-type': 'application/json',
}

const checkResponce = (res) => {
    if (res.ok){
        return res.json();
    }
    // console.log(res.json())
    return Promise.reject(res.status)
}

export const register = (name, email, password) => {
    return fetch(`${BASE_URL}/signup`,{
        method: 'POST',
        credentials: 'include',
        headers: headers,
        body: JSON.stringify({name, email, password})
    }).then(checkResponce)
}

export const autorize = (email, password) => {
    return fetch(`${BASE_URL}/signin`,{
        method: 'POST',
        credentials: 'include',
        headers: headers,
        body: JSON.stringify({email, password})
    }).then(checkResponce)
}

export const getToken = () => {
    return fetch(`${BASE_URL}/users/me`,{
        method: 'GET',
        credentials: 'include',
        headers: headers
    }).then(checkResponce)
}

export const clearcokkie = () => {
    return fetch(`${BASE_URL}/signout`,{
        method: 'POST',
        credentials: 'include',
        headers: headers
    }).then(checkResponce)
}

export const getProfile = () => {
    return fetch(`${BASE_URL}/users/me`, {
        method: 'GET',
        credentials: 'include',
        headers: headers
    }).then(checkResponce)
}

export const updateProfile = (name, email) => {
    return fetch(`${BASE_URL}/users/me`, {
        method: 'PATCH',
        credentials: 'include',
        headers: headers,
        body: JSON.stringify({name, email})
    }).then(checkResponce)
}

export const getMovies = () => {
    return fetch(`${BASE_URL}/movies`, {
        method: 'GET',
        credentials: 'include',
        headers: headers,
    }).then(checkResponce)
}

export const createMovies = (country, director, duration, year, description, image,
    trailerLink, thumbnail, movieId, nameRU, nameEN) => {
    return fetch(`${BASE_URL}/movies`, {
        method: 'POST',
        credentials: 'include',
        headers: headers,
        body: JSON.stringify({
            country, 
            director, 
            duration, 
            year, 
            description, 
            image: `https://api.nomoreparties.co${image}`,
            trailerLink, 
            thumbnail: `https://api.nomoreparties.co${thumbnail}`, 
            movieId, 
            nameRU, 
            nameEN
        })
    }).then(checkResponce)
}

export const deleteMovies = (id) => {
    return fetch(`${BASE_URL}/movies/${id}`, {
        method: 'DELETE',
        credentials: 'include',
        headers: headers
    }).then(checkResponce)
}