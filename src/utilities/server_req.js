import axios from 'axios'

const api_get_movies = 'http://api.themoviedb.org/3/discover/movie'

export async function get_movies_list(page = 1) {
    const response = await axios.get(api_get_movies, {
        params : {
            api_key : 'acea91d2bff1c53e6604e4985b6989e2',
            page
        }
    })
    return response
}