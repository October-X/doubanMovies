import axios from "axios";
export async function getMovies(page, size) {
    const resp = await axios.get('/api/movies', {
      params: {
        page,
        size,
      },
    });
    return resp.data;
  }