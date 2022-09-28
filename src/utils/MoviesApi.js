const BASE_URL = 'https://api.nomoreparties.co/beatfilm-movies'

const checkResponce = (res) => {
    if (res.ok){
        return res.json();
    }
    // console.log(res.json())
    return Promise.reject(res.status)
}

export const getMovies = () => {
    return fetch(`${BASE_URL}`,{
        method: 'GET',
        headers: {
            'Accept': 'application/json',
        }
    }).then(checkResponce);
}