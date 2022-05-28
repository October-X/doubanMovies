import $ from "jquery";
import styles from "./index.module.less";
import {createMovieTags} from '../list'
import { getMovies } from '../../api/movie'

let container;
const limit = 30
function init() {
  container = $("<div>").addClass(styles.pager).appendTo("#app");
}
init();

/**
 *
 * @param {*} page 页码
 * @param {*} size 页容量
 * @param {*} total 页总数
 */
export function createPages(page, size, total) {
  container.empty();
  console.log(page, size, total);
  /**
   * 辅助函数，负责帮忙创建一个页码标签
   * @params text 标签的文本
   * @params status 标签的状态，空字符串-普通状态，disabled-禁用状态，active-选中状态
   */
  function createTag(text, status, targetPage) {
      const span = $('<span>').appendTo(container).text(text)
      const className = styles[status]
      span.addClass(className)
      //只有是普通状态才有点击事件
      if(status === ''){
          span.on('click',async function(){
              //1.重新拿数据
               const resp = await getMovies(targetPage,limit)
               console.log(resp)
              //2.重新生成列表
              createMovieTags(resp.data.movieList)
              //3.重新生成分页区域
              createPages(targetPage,limit,resp.data.movieTotal)
          })
      }
  }
  const pageMax = Math.ceil(total/limit)
  //1. 创建首页标签
  createTag('首页',page === 1 ? 'disabled':'',1)
  //2. 创建上一页标签
  createTag('上一页',page === 1 ? 'disabled':'',page - 1)
  //3. 创建数字页码标签
  const maxCount = 10;//最大数字页码数
  let min = Math.floor(page - maxCount/2)
  min < 1 ? min = 1 : min;
  let max = min + maxCount - 1;
  max > pageMax ? max = pageMax : max
  for (let i = min; i <= max; i++) {
      i === page ? createTag(i,'active',i):createTag(i,'',i)
  }
  //4. 创建下一页标签
  createTag('下一页',page === pageMax ? 'disabled':'',page + 1)
  console.log(pageMax)
  //5. 创建尾页标签
  createTag('尾页',page === pageMax ? 'disabled':'',pageMax)
}
