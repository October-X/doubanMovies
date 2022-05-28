import './cover'//该模块，要先执行，需要合并到主打包结果中，静态依赖会被打包进dist。那么我们不需要使用动态依赖，我们使用静态依赖
import ('./movies')//该模块，可以慢慢加载，可以动态加载，那么我们不需要使用静态依赖，静态依赖会被打包进dist。我们可以使用动态依赖.会形成独立的分包
import './global.less'
import {getMovies} from './api/movie'
// async function init(){
//     const resp = await getMovies(1,1)
//     console.log(resp);
// }
// init()
// getMovies(1,10).then(item => {console.log(item)})