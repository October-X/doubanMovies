import {createMovieTags} from './list'
import { getMovies } from '../api/movie'
import {createPages} from './pager'
async function init(){
    const resp = await getMovies(1,30)
    createMovieTags(resp.data.movieList)//创建列表
    createPages(1,30,resp.data.movieTotal)//创建分页
}
init()